import express, { Request, Response } from "express";
import { Document, Model } from "mongoose";

// Define a generic Express route handler function
function createGetDataApiHandler<T extends Document>(
  model: Model<T>,searchField?: keyof T
): express.RequestHandler {
  return async (req: Request, res: Response) => {
    const { pageIndex = 1, pageSize = 10, sort, query, filterData } = req.body;

    const sortField = sort && sort.key ? sort.key : 'createdAt';
    const sortOrder = sort && sort.order === 'asc' ? 1 : -1;
    const status = filterData && filterData.status ? filterData.status : null;

    const queryConditions: Record<string, any> = {};

    if (status) {
      queryConditions.status = status;
    }

    if (query && searchField) {
      const validSearchField = searchField as string;
      queryConditions[validSearchField] = new RegExp(query, 'i');
    }

    const totalLength = await model.countDocuments(queryConditions);

    const result = await model
      .find(queryConditions)
      .sort({ [sortField]: sortOrder })
      .skip((pageIndex - 1) * pageSize)
      .limit(pageSize);

    res.json({ status: "success", data: result,  total:totalLength });
  };
}

export default createGetDataApiHandler;
