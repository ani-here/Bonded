import User from "../models/usermodel.js";

export const findOne = async (email) => {
  return await User.findOne({ email }).select("+password");
};

export const findById = async (id) => {
  return await User.findById(id).select("+password");
};