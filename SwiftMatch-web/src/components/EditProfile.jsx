import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import UserCard from "./UserCard";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [showToast, setShowToast] = useState(false);
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [skills, setSkills] = useState(user?.skills?.join(", ") || "");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSaveProfile = async () => {
    try {
      setError("");

      // Validation before sending
      if (!age || Number(age) < 18) {
        return setError("Age must be at least 18");
      }
      if (!gender) {
        return setError("Please select a gender");
      }

      const dataToSave = {
        firstName,
        lastName,
        age: Number(age),
        gender: gender.toLowerCase(),
        about,
        photoUrl,
        skills: skills
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s !== ""),
      };

      const res = await axios.patch(BASE_URL + "/profile/edit", dataToSave, {
        withCredentials: true,
      });

      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data || "Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-base-300 py-10">
      <div className="flex flex-col lg:flex-row justify-center items-start gap-10 px-4 max-w-6xl mx-auto">
        {/* LEFT: EDIT FORM */}
        <div className="card bg-base-100 w-full lg:w-1/2 shadow-xl border border-base-300">
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold mb-4">Edit Profile</h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">First Name</span>
                </label>
                <input
                  type="text"
                  value={firstName}
                  className="input input-bordered focus:input-primary"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Last Name</span>
                </label>
                <input
                  type="text"
                  value={lastName}
                  className="input input-bordered focus:input-primary"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Age</span>
                </label>
                <input
                  type="number"
                  value={age}
                  className="input input-bordered focus:input-primary"
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Gender</span>
                </label>
                <select
                  className="select select-bordered focus:select-primary"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Other</option>
                </select>
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Photo URL</span>
              </label>
              <input
                type="text"
                value={photoUrl}
                className="input input-bordered focus:input-primary"
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">About</span>
              </label>
              <textarea
                value={about}
                className="textarea textarea-bordered focus:textarea-primary h-24"
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">
                  Skills (comma separated)
                </span>
              </label>
              <input
                type="text"
                value={skills}
                className="input input-bordered focus:input-primary"
                onChange={(e) => setSkills(e.target.value)}
              />
            </div>

            {error && <p className="text-error text-sm mt-2">{error}</p>}

            <div className="card-actions mt-6">
              <button
                className="btn btn-primary btn-block"
                onClick={handleSaveProfile}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-80 flex flex-col items-center">
          <h3 className="text-lg font-bold mb-4 opacity-50 uppercase tracking-widest">
            Preview
          </h3>
          <UserCard
            user={{
              firstName,
              lastName,
              photoUrl,
              about,
              skills: skills.split(","),
              age,
              gender,
            }}
            showButtons={false}
          />
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Profile updated successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
