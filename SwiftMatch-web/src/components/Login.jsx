import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-300 px-4">
      <div className="card bg-base-100 w-full max-w-md shadow-xl border border-base-300">
        <div className="card-body gap-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Welcome Back</h2>
            <p className="text-sm text-base-content/60 mt-2">
              Please enter your details to sign in
            </p>
          </div>

          <div className="form-control w-full">
            {/* Email Field */}
            <label className="label">
              <span className="label-text font-semibold">Email Address</span>
            </label>
            <div className="relative">
              <input
                type="email"
                value={emailId}
                placeholder="email@example.com"
                className="input input-bordered w-full focus:input-primary transition-all"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </div>

            {/* Password Field */}
            <label className="label mt-2">
              <span className="label-text font-semibold">Password</span>
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              className="input input-bordered w-full focus:input-primary transition-all"
              onChange={(e) => setPassword(e.target.value)}
            />

            <label className="label">
              <a
                href="#"
                className="label-text-alt link link-hover link-primary"
              >
                Forgot password?
              </a>
            </label>
          </div>

          <div className="card-actions flex-col gap-3">
            {/* Conditional rendering: only shows if 'error' has a value */}
            {error && (
              <p className="text-error text-sm text-center animate-bounce">
                {error}
              </p>
            )}

            <button
              className="btn btn-primary btn-block text-lg"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>

          <p className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <Link to={"/signup"} className="link link-primary font-semibold">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
