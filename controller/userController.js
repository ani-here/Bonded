import { findById } from "../utils/userFunction.js";
import { AppError } from "../utils/AppError.js";

const getUser = async (req, res, next) => {
  const id = req.user._id;

  const user = await findById(id);
  if (!user) return next(new AppError("User not found with given id", 404));

  res.status(200).json({
    status: "success",
    user,
  });
};

const followUser = async (req, res, next) => {
  try {
    const authenticatedUserId = req.user._id;
    const userToFollowId = req.params.id;

    const authenticatedUser = await findById(authenticatedUserId);
    const userToFollow = await findById(userToFollowId);

    if (!authenticatedUser || !userToFollow)
      return next(new AppError("User not found!", 404));

    if (authenticatedUserId.equals(userToFollowId))
      return next(new AppError("You can't follow yourself!", 400));

    if (authenticatedUser.following.includes(userToFollowId))
      return next(new AppError("Already following this user!", 400));

    authenticatedUser.following.push(userToFollowId);
    userToFollow.followers.push(authenticatedUserId);

    await authenticatedUser.save();
    await userToFollow.save();

    res.status(200).json({
      status: "success",
      message: `You started following ${userToFollow.username}!`,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Some error occurred!",
      error: err.message,
    });
  }
};

const unFollowUser = async (req, res, next) => {
  try {
    const authenticatedUserId = req.user._id;
    const userToUnfollowId = req.params.id;

    const authenticatedUser = await findById(authenticatedUserId);
    const userToUnfollow = await findById(userToUnfollowId);

    if (!authenticatedUser || !userToUnfollow)
      return next(new AppError("User not found!", 404));

    if (authenticatedUserId.equals(userToUnfollowId))
      return next(new AppError("Sorry, you can't unfollow yourself!", 400));

    if (!authenticatedUser.following.includes(userToUnfollowId))
      return next(new AppError("Sorry, you don't follow this user!", 400));

    authenticatedUser.following.pull(userToUnfollowId);
    userToUnfollow.followers.pull(authenticatedUserId);

    await authenticatedUser.save();
    await userToUnfollow.save();

    res.status(200).json({
      status: "success",
      message: `You unfollowed ${userToUnfollow.username}!`,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Some error occurred!",
      error: err.message,
    });
  }
};

export default {
  getUser,
  followUser,
  unFollowUser,
};