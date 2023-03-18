import dotenv from "dotenv";
import connectToDatabase from "./database";
import express from "express";

//Our Routes
import bookRoutes from "../routes/bookRoutes";
import userRoutes from "../routes/userRoutes";

dotenv.config();
connectToDatabase();
const app = express();

app.use(express.json());

const port = process.env.PORT || 4999;
// if we hit this route then we go to the book route.
app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutesga);

// app.get("/", (req, res) => res.send("YO"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
