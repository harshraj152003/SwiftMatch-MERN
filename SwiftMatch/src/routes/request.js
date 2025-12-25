const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const requestRouter = express.Router();

// Send Connection request API
requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["interested", "ignored"];

      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid Status type: " + status });
      }

      // Check if there is an existing ConnectionRequest
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          {
            // is conn req already exits
            fromUserId: fromUserId,
            toUserId: toUserId,
          },
          {
            // vice versa conn req
            fromUserId: toUserId,
            toUserId: fromUserId,
          },
        ],
      });

      // if exits : Throw an Error
      if (existingConnectionRequest) {
        return res
          .status(404)
          .json({ message: "Connection Request already Exists!" });
      }

      if (toUserId === fromUserId) {
        return res.status(404).json({ message: "Connection Request FAILED!" });
      }

      // is the user exists ? if not then throw Error
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({ message: "User not exists into DB!" });
      }

      // if !exists : save into DB
      const ConnectionRequestDoc = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const ConnReqData = await ConnectionRequestDoc.save();

      let msz = "";
      if (status == "interested") {
        msz = req.user.firstName + " is " + status + " in " + toUser.firstName;
      } else if (status == "ignored") {
        msz = req.user.firstName + " " + status + " " + toUser.firstName;
      }

      res.json({
        message: msz,
        data: ConnReqData,
      });
    } catch (err) {
      res.status(404).send("Error : " + err.message);
    }
  }
);

// Accept/Reject API
requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const { status, requestId } = req.params;
      const loggedInUser = req.user;
      const allowedStatus = ["accepted", "rejected"];

      if (!allowedStatus.includes(status)) {
        return res.status(404).json({
          message: status + " is not allowed",
        });
      }

      // Find the request: Ensure receiver is logged in user and status is pending ("interested")
      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });

      if (!connectionRequest) {
        return res.status(404).json({
          message: "Connection request not found or already processed.",
        });
      }

      // Update the request status
      connectionRequest.status = status;
      const updatedRequest = await connectionRequest.save();

      return res.json({
        message: "Connection successfully accepted and established!",
        data: updatedRequest,
      });
    } catch (err) {
      res.status(500).send("ERROR: " + err.message);
    }
  }
);

module.exports = requestRouter;
