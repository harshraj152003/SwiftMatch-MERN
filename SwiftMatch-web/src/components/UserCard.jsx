import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";
import { useState } from "react";

const UserCard = ({ user, showButtons = true }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about, skills } =
    user;
  const [toast, setToast] = useState(null);
  const dispatch = useDispatch();

  const reviewRequest = async (status) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      setToast(status === "interested" ? "success" : "warning");
      setTimeout(() => {
        dispatch(removeFeed(_id));
        setToast(null);
      }, 2000);
    } catch (err) {
      console.error("Request failed:", err.message);
    }
  };

  return (
    <div className="relative">
      {/* Toast Notifications */}
      {toast && (
        <div className="toast toast-top toast-center z-50">
          <div
            className={`alert ${
              toast === "success" ? "alert-success" : "alert-warning"
            } shadow-lg`}
          >
            <span>
              {toast === "success"
                ? `Request Sent to ${firstName}`
                : `Ignored ${firstName}`}
            </span>
          </div>
        </div>
      )}

      {/* Main Card */}
      <div className="card bg-base-300 w-96 shadow-xl transition-all duration-300 border border-white/5">
        <figure className="px-4 pt-4">
          <img
            src={photoUrl || "https://via.placeholder.com/150"}
            alt="Profile"
            className="rounded-xl h-64 w-full object-cover shadow-inner"
          />
        </figure>

        <div className="card-body items-center text-center p-6">
          {/* Name */}
          <h2 className="card-title text-2xl font-bold">
            {firstName} {lastName}
          </h2>

          {/* Age and Gender Badges */}
          <div className="flex gap-2 mb-2">
            {age && (
              <div className="badge badge-secondary font-semibold">
                {age} years
              </div>
            )}
            {gender && (
              <div className="badge badge-outline opacity-70 capitalize">
                {gender}
              </div>
            )}
          </div>

          {/* About/Bio */}
          <p className="italic text-gray-400 text-sm mb-4">
            {about ? `"${about}"` : "No bio provided."}
          </p>

          {/* Skills Section */}
          {skills &&
            (Array.isArray(skills) ? skills : skills.split(",")).length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {(Array.isArray(skills) ? skills : skills.split(","))
                  .map((skill) => skill.trim())
                  .filter((skill) => skill !== "")
                  .map((skill, index) => (
                    <span
                      key={index}
                      className="badge badge-outline badge-info gap-2 py-3"
                    >
                      {skill}
                    </span>
                  ))}
              </div>
            )}

          {/* Action Buttons */}
          {showButtons && (
            <div className="card-actions justify-center mt-auto gap-4 w-full pt-4">
              <button
                className="btn btn-outline btn-error flex-1"
                onClick={() => reviewRequest("ignored")}
              >
                Ignore
              </button>
              <button
                className="btn btn-primary flex-1"
                onClick={() => reviewRequest("interested")}
              >
                Interested
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
