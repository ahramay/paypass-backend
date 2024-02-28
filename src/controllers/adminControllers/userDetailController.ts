import { Request, Response } from "express";
import User from "../../models/User/userModel";

// export const getAllUser = async (req: Request, res: Response) => {
//   const page: number = parseInt(req.query.page as string, 10) || 1;
//   const pageSize: number = parseInt(req.query.pageSize as string, 10) || 10;
//   const skip = (page - 1) * pageSize;

//   const users = await User.find().skip(skip).limit(pageSize);

//   res.json({ data: users, total: users.length });
// };

export const getAllUser = async (req: Request, res: Response) => {
  const { pageIndex = 1, pageSize = 10, sort, query, filterData } = req.body;
  const sortField = sort && sort.key ? sort.key : "_id";
  const sortOrder = sort && sort.order === "desc" ? -1 : 1;
  const status = filterData && filterData.status ? filterData.status : null;

  const queryConditions: Record<string, any> = {};

  if (status) {
    queryConditions.status = status;
  }

  if (query) {
    queryConditions.fullName = new RegExp(query, "i");
  }

  const totalLength = await User.countDocuments(queryConditions);

  const result = await User.find(queryConditions)
    .sort({ [sortField]: sortOrder })
    .skip((pageIndex - 1) * pageSize)
    .limit(pageSize);

  res.json({ status: "success", data: result, total: totalLength });
};

export const getUserStatisticByStatus = async (req: Request, res: Response) => {
  const result = await User.aggregate([
    {
      $group: {
        _id: '$status',
        totalLength: { $sum: 1 },
      },
    },
  ]);

  const response: Record<string, number> = {
    totalUsers: await User.countDocuments(),
    active: 0,
    pending: 0,
    onboarding: 0,
    blocked: 0,
    rejected: 0,
  };

  result.forEach((item: { _id: string; totalLength: number }) => {
    response[item._id] = item.totalLength;
  });

  res.json(response);
};
