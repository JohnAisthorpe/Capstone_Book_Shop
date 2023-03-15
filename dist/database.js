"use strict";
// // connection to database
// import mongoose from "mongoose";
// // const MONGO_URI: string | undefined = process.env.MONGO_URI;
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
// const connectToDatabase = async () => {
//   console.log(process.env.MONGO_URI);
//   const connect = await mongoose.connect(process.env.MONGO_URI, {
//     useUnifiedTopology: true,
//     useNewUriParser: true,
//   });
// };
const mongoose_1 = __importDefault(require("mongoose"));
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const MONGO_URI = process.env.MONGO_URI;
    try {
        if (!MONGO_URI) {
            throw new Error("MONGO_URI is not defined in the environment variables");
        }
        console.log(MONGO_URI);
        const connect = yield mongoose_1.default.connect(MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        } // <-- Type assertion to CustomConnectOptions
        );
        console.log(`MongoDB Connect: ${connect.connection.host}`);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(`Error: ${error.message}`);
        }
        else {
            console.error("An unknown error occurred:", error);
        }
    }
});
exports.default = connectToDatabase;
