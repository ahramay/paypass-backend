"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Define a generic Express route handler function
function createGetDataApiHandler(model, searchField) {
    return (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { pageIndex = 1, pageSize = 10, sort, query, filterData } = req.body;
        const sortField = sort && sort.key ? sort.key : 'createdAt';
        const sortOrder = sort && sort.order === 'asc' ? 1 : -1;
        const status = filterData && filterData.status ? filterData.status : null;
        const queryConditions = {};
        if (status) {
            queryConditions.status = status;
        }
        if (query && searchField) {
            const validSearchField = searchField;
            queryConditions[validSearchField] = new RegExp(query, 'i');
        }
        const totalLength = yield model.countDocuments(queryConditions);
        const result = yield model
            .find(queryConditions)
            .sort({ [sortField]: sortOrder })
            .skip((pageIndex - 1) * pageSize)
            .limit(pageSize);
        res.json({ status: "success", data: result, total: totalLength });
    });
}
exports.default = createGetDataApiHandler;
