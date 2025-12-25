import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard"; 
import { useNavigate } from "react-router";

const Feed = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    if (feed && feed.length > 0) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
      dispatch(addFeed(res.data.data));
    } catch (err) {
      if(err?.response?.status === 400){
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return <div className="flex justify-center my-10"><span className="loading loading-spinner loading-lg"></span></div>;

  return (
    <div className="flex flex-col items-center my-10 gap-6">
      <h1 className="text-3xl font-bold mb-4">Discover People</h1>
      
      {feed.length > 0 ? (
        <div className="flex justify-center w-full">
          <UserCard user={feed[0]} />
        </div>
      ) : (
        <div className="text-xl text-gray-500">No more users found! Check back later.</div>
      )}
    </div>
  );
};

export default Feed;