import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import { connectToDatabase } from "./dbConnection/connect.js";
import seedUsers from "./data/users.js";

const port = process.env.PORT;
const devDB = process.env.PROD_DATABASE.replace(
  "<password>",
  process.env.PASSWORD
);

// Connect to the database
connectToDatabase(devDB);

// After connecting to the database
await seedUsers();
  // .then(async () => {
  //   // Seed initial users into the database
  //   await seedUsers();
  //   console.log("Users seeded successfully!");

  //   // Start the server
  //   app.listen(port, () =>
  //     console.log(`Server started at http://127.0.0.1:${port}`)
  //   );
  // })
  // .catch((err) => {
  //   console.error("Failed to connect to the database or seed users:", err);
  // });

app.listen(port, () =>
  console.log(`server started at http://127.0.0.1:${port}`)
);
