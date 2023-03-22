import express from "express";
import protectedRoute from "../middleware/authMiddleware";
import {
  getBasket,
  addBasketItem,
  removeBasketItem,
  //   clearBasket,
} from "../../client/src/redux/actions/basketActions";

const basketRoutes = express.Router();

basketRoutes.route("/").get(protectedRoute, getBasket);
basketRoutes.route("/add").post(protectedRoute, addBasketItem);
basketRoutes.route("/remove/:bookId").delete(protectedRoute, removeBasketItem);
// basketRoutes.route("/clear").delete(protectedRoute, clearBasket);

export default basketRoutes;
