import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router";

const SignUp = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(18);
  const [gender, setGender] = useState("male");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState("");

  const [error, setError] = useState("");

  const handleSignUp = async () => {
    try {
      const skillsArray = skills.split(",").map(skill => skill.trim()).filter(s => s !== "");

      const res = await axios.post(`${BASE_URL}/signup`, {
        firstName,
        lastName,
        emailId,
        password,
        age,
        gender,
        about, 
        skills: skillsArray
      }, {
        withCredentials: true,
      });

      console.log("User Registered:", res.data);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card w-96 bg-base-300 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl font-bold">Create Account</h2>

          <div className="space-y-4">
            <div className="flex gap-2">
              <label className="form-control w-1/2">
                <span className="label-text">First Name</span>
                <input type="text" className="input input-bordered" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </label>
              <label className="form-control w-1/2">
                <span className="label-text">Last Name</span>
                <input type="text" className="input input-bordered" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </label>
            </div>

            <label className="form-control w-full">
              <span className="label-text">Email ID</span>
              <input type="email" className="input input-bordered" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
            </label>

            <label className="form-control w-full">
              <span className="label-text">Password</span>
              <input type="password" placeholder="Strong password..." className="input input-bordered" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>

            <div className="flex gap-4">
              <label className="form-control w-1/2">
                <span className="label-text">Age</span>
                <input type="number" className="input input-bordered" value={age} onChange={(e) => setAge(e.target.value)} />
              </label>
              <label className="form-control w-1/2">
                <span className="label-text">Gender</span>
                <select className="select select-bordered" value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
              </label>
            </div>

            {/* About Field */}
            <label className="form-control w-full">
              <span className="label-text">About</span>
              <textarea 
                className="textarea textarea-bordered h-24" 
                placeholder="Tell us about yourself..."
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>
            </label>

            {/* Skills Field */}
            <label className="form-control w-full">
              <span className="label-text">Skills (comma separated)</span>
              <input 
                type="text" 
                placeholder="React, Node, Java..." 
                className="input input-bordered" 
                value={skills} 
                onChange={(e) => setSkills(e.target.value)} 
              />
            </label>
          </div>

          {error && <p className="text-error text-xs italic mt-2 text-center">{error}</p>}

          <div className="card-actions justify-center mt-6">
            <button className="btn btn-primary w-full" onClick={handleSignUp}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;