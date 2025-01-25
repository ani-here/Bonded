import User from "../models/usermodel.js";

const seedUsers = async () => {
  const users = [
    {
      email: "tony@stark.io",
      password: "test123",
      username: "tony",
    },
    {
      email: "captain@steve.roger",
      password: "test123",
      username: "captain",
    },
  ];

  // await User.deleteMany({}); // Clear existing users
  // await User.insertMany(users); // Insert new users
  // console.log("Users seeded successfully!");
};
export default seedUsers;