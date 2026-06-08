import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MONGODB connected");
  } catch (error) {
    console.log("Error connecting to database", error);
    process.exit(1);
  }
};

export default connectDb;
