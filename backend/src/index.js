import dotenv from "dotenv";
import app from "./app.js";
dotenv.config({
  path: "./.env",
});
import connectDb from "./db/databaseConnect.js";
const PORT = process.env.PORT || 3000;

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongo Connection Error", err);
    process.exit(1);
  });
