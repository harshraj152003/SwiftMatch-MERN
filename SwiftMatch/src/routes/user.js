const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const userRouter = express.Router();

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

// Get all the pending connection request for the loggedIn user
userRouter.get("/user/requests/pending", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);

    res.json({
      message: "Data fetched Successfully",
      data: connectionRequests,
    });
  } catch (err) {
    res.status(404).send("ERROR: " + err.message);
  }
});

// Get your connections
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user._id;

    const connections = await ConnectionRequest.find({
      $or: [
        {
          toUserId: loggedInUser,
        },
        {
          fromUserId: loggedInUser,
        },
      ],
      status: "accepted",
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const connectionUsers = connections.map((connection) => {
      if (connection.fromUserId._id.equals(loggedInUser)) {
        return connection.toUserId;
      } else {
        return connection.fromUserId;
      }
    });

    res.json({
      message: "Data fetched Successfully!",
      data: connectionUsers,
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// Get all the users who are not the connections -> feed
userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user._id;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    const connectionRequest = await ConnectionRequest.find({
      $or: [
        {
          fromUserId: loggedInUser,
        },
        {
          toUserId: loggedInUser,
        },
      ],
    }).select("fromUserId toUserId");

    const hideUsersFromFeed = new Set();

    connectionRequest.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    // users that are not connected ...
    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        {
          _id: { $ne: loggedInUser },
        },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    res.json({
      message: "Users fetched Successfully",
      data: users,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = userRouter;
