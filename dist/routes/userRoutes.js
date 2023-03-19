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
const User_1 = __importDefault(require("../models/User"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
dotenv_1.default.config();
const userRoutes = express_1.default.Router();
//Just a test to get all users
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield User_1.default.find({});
    res.json(books);
});
//just a test to get a usuer by id
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.params.id);
    if (user) {
        res.json(user);
    }
    else {
        res.status(404);
        throw new Error("User not found");
    }
});
//TODO: redefine expiresIn
const genToken = (id) => {
    // we are using the ! operator to tell TypeScript that we are sure that the TOKEN_SECRET environment variable exists and is not undefined.
    return jsonwebtoken_1.default.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: "60d" });
};
const loginUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield User_1.default.findOne({ email });
    if (user && (yield user.matchPasswords(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: genToken(user._id),
        });
    }
    else {
        //not authenticated
        res.status(401);
        throw new Error("Invalid email or password");
    }
}));
const registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const userExist = yield User_1.default.findOne({ email });
    if (userExist) {
        res.status(400);
        throw new Error("We already have an account with that email address.");
    }
    const user = yield User_1.default.create({
        name,
        email,
        password,
    });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: genToken(user._id),
        });
    }
    else {
        //bad request
        res.json(400);
        throw new Error("Invalid user data.");
    }
}));
userRoutes.route("/login").post(loginUser);
userRoutes.route("/register").post(registerUser);
userRoutes.route("/").get(getUsers); //test route to get all users
userRoutes.route("/:id").get(getUser); // test route to get a user by id
exports.default = userRoutes;
