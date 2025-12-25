import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/logout",
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUser(res.user));
      return navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar bg-base-300 shadow-sm px-4">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-xl">
          🧑‍💻SwiftMatch
        </Link>
      </div>

      {user && (
        <div className="flex items-center gap-2">
          {/* Welcome Text - Hidden on tiny screens for better UI */}
          <span className="hidden md:block font-medium">
            Welcome, {user.firstName}
          </span>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full border border-base-content/10">
                <img
                  alt="Profile"
                  src={user.photoUrl || "https://via.placeholder.com/150"}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[10] mt-3 w-52 p-2 shadow-lg"
            >
              <li>
                <Link to={"/profile"} className="justify-between">
                  Profile
                  <span className="badge badge-sm">New</span>
                </Link>
              </li>
              <li>
                <Link to={"/connections"}>Connections</Link>
              </li>
              <li>
                <Link to={"/requests"}>Requests</Link>
              </li>
              <li>
                <a onClick={handleLogOut} className="text-error">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
