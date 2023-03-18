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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Book_1 = __importDefault(require("../models/Book"));
const bookRoutes = express_1.default.Router();
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield Book_1.default.find({});
    res.json(books);
});
const getBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield Book_1.default.findById(req.params.id);
    if (book) {
        res.json(book);
    }
    else {
        res.status(404);
        throw new Error("Book not found");
    }
});
bookRoutes.route("/").get(getBooks);
bookRoutes.route("/:id").get(getBook);
exports.default = bookRoutes;
