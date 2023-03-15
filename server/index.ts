import dotenv from "dotenv";
import connectToDatabase from "./database";
import express from "express";

dotenv.config();
connectToDatabase();
const app = express();

app.use(express.json());
