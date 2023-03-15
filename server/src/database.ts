import mongoose, { ConnectOptions } from "mongoose";

interface CustomConnectOptions extends ConnectOptions {
  useUnifiedTopology: boolean;
}

const connectToDatabase = async () => {
  const MONGO_URI: string | undefined = process.env.MONGO_URI;

  try {
    if (!MONGO_URI) {
      throw new Error("MONGO_URI is not defined in the environment variables");
    }

    const connect = await mongoose.connect(
      MONGO_URI,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      } as CustomConnectOptions // <-- Type assertion to CustomConnectOptions
    );
    console.log(`MongoDB Connect: ${connect.connection.host}`);
  } catch (error: any) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error("An unknown error occurred:", error);
    }
  }
};

export default connectToDatabase;
