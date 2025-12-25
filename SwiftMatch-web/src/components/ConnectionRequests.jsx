import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";

const ConnectionRequests = () => {
  const [requests, setRequests] = useState([]);

  const getListOfRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/pending", {
        withCredentials: true,
      });
      setRequests(res?.data?.data || []);
    } catch (err) {
      console.error(err.message);
    }
  };

  const reviewRequest = async (status, requestId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );
      // Remove the reviewed request from the local UI state
      setRequests((prev) => prev.filter((req) => req._id !== requestId));
    } catch (err) {
      console.error("Failed to review request", err);
    }
  };

  useEffect(() => {
    getListOfRequests();
  }, []);

  return (
    <div className="flex flex-col items-center my-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Pending Requests</h1>

      <div className="w-full max-w-xl space-y-4">
        {requests.length === 0 ? (
          <div className="text-center bg-base-100 p-10 rounded-2xl shadow-inner border border-dashed border-base-300">
            <p className="text-lg opacity-50">No pending connection requests</p>
          </div>
        ) : (
          requests.map((request) => {
            const user = request.fromUserId; 

            return (
              <div 
                key={request._id} 
                className="flex items-center justify-between p-4 bg-base-100 border border-base-300 shadow-md rounded-2xl hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="avatar">
                    <div className="w-14 h-14 rounded-full border border-base-300">
                      <img
                        src={user?.photoUrl || "https://cdn.vectorstock.com/i/500p/46/76/gray-male-head-placeholder-vector-23804676.jpg"}
                        alt="sender"
                      />
                    </div>
                  </div>
                  <div>
                    <h2 className="font-bold text-lg">
                      {user?.firstName} {user?.lastName}
                    </h2>
                    <p className="text-xs opacity-60">
                      {user?.about || "Interested in connecting"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    className="btn btn-primary btn-sm px-5"
                    onClick={() => reviewRequest("accepted", request._id)}
                  >
                    Accept
                  </button>
                  <button 
                    className="btn btn-outline btn-error btn-sm px-5"
                    onClick={() => reviewRequest("rejected", request._id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ConnectionRequests;