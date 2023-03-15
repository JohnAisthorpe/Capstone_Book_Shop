"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./database"));
const express_1 = __importDefault(require("express"));
dotenv_1.default.config();
(0, database_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = process.env.PORT || 4999;
//if we hit this route then we go to the book route.
// app.use("/api/books", bookRoutes);
app.get("/", (req, res) => res.send("YO"));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
