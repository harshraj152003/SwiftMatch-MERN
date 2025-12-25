import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";

const Connections = () => {
  const [connections, setConnections] = useState([]);

  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      setConnections(res?.data?.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  return (
    <div className="flex flex-col items-center my-10">
      <div className="w-full max-w-2xl bg-base-100 shadow-xl rounded-box p-6 border border-base-300">
        <h1 className="text-3xl font-bold mb-6 text-center">My Connections</h1>

        {connections.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-lg opacity-60">No connections found yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {connections.map((user) => (
              <div 
                key={user._id} 
                className="flex items-center gap-4 p-4 bg-base-200 rounded-xl hover:bg-base-300 transition-colors"
              >
                {/* Profile Image */}
                <div className="avatar">
                  <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img 
                      src={user.photoUrl || "https://via.placeholder.com/150"} 
                      alt={`${user.firstName} profile`} 
                    />
                  </div>
                </div>

                {/* User Info */}
                <div className="grow">
                  <h2 className="text-xl font-bold">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-sm opacity-70 italic">
                    {user.age && `${user.age} years old`} {user.gender && `| ${user.gender}`}
                  </p>
                  <p className="text-sm mt-1 line-clamp-1">
                    {user.about || "No bio available"}
                  </p>
                </div>

                {/* Action Button */}
                <button className="btn btn-sm btn-ghost text-error">
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Connections;