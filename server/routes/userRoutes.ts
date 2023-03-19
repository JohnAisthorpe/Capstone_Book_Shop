import User from "../models/User";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { IUser } from "../models/User";
import express, { Request, Response } from "express";

dotenv.config();

const userRoutes = express.Router();
//Just a test to get all users
const getUsers = async (
  req: Request,
  res: Response<IUser[]>
): Promise<void> => {
  const books: IUser[] = await User.find({});
  res.json(books);
};
//just a test to get a usuer by id
const getUser = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

//TODO: redefine expiresIn
const genToken = (id: number) => {
  // we are using the ! operator to tell TypeScript that we are sure that the TOKEN_SECRET environment variable exists and is not undefined.
  return jwt.sign({ id }, process.env.TOKEN_SECRET!, { expiresIn: "60d" });
};

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user: IUser | null = await User.findOne({ email });

  if (user && (await user.matchPasswords(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: genToken(user._id),
    });
  } else {
    //not authenticated
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("We already have an account with that email address.");
  }

  const user = await User.create({
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
  } else {
    //bad request
    res.json(400);
    throw new Error("Invalid user data.");
  }
});

userRoutes.route("/login").post(loginUser);
userRoutes.route("/register").post(registerUser);
userRoutes.route("/").get(getUsers); //test route to get all users
userRoutes.route("/:id").get(getUser); // test route to get a user by id

export default userRoutes;
