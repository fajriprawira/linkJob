import { useState, useEffect } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsync } from "../features/profile/profileSlice";

export default function ProfilePage({ url }) {
  const [fullname, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [skill, setSkill] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.profile);

  // Fetch user profile on component mount
  useEffect(() => {
    dispatch(fetchAsync());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      Toastify({
        text: error,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#EF4C54",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    }
  }, [error]);

  async function createProfile(e) {
    e.preventDefault();
    try {
      const newProfile = { fullname, age, phoneNumber, address, skill };
      await axios.post(`${url}/profiles`, newProfile,{
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      Toastify({
        text: "Profile Created Successfully",
        duration: 2000,
        close: true,
        gravity: "top",
        position: "right",
        style: {
          background: "#00B29F",
          color: "#FFFFFF",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();

      navigate("/");
    } catch (error) {
      Toastify({
        text: error.response?.data.error || "Profile Creation Failed",
        duration: 2000,
        close: true,
        gravity: "top",
        position: "right",
        style: {
          background: "#EF4C54",
          color: "#FFFFFF",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    }
  }

  async function editProfile() {
    try {
      const editProfile = { fullname, age, phoneNumber, address, skill };
      await axios.put(`${url}/editProfiles`, editProfile,{
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      Toastify({
        text: "Profile Updated Successfully",
        duration: 2000,
        close: true,
        gravity: "top",
        position: "right",
        style: {
          background: "#00B29F",
          color: "#FFFFFF",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();

      navigate("/");
    } catch (error) {
      Toastify({
        text: error.response?.data.error || "Profile Updated Failed",
        duration: 2000,
        close: true,
        gravity: "top",
        position: "right",
        style: {
          background: "#EF4C54",
          color: "#FFFFFF",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    }
  }

  if (loading) {
    return (
      <>
        <section className="flex justify-center items-center" >
          {/* <img src={gifLoading} /> */}
          <h1>
            loading woiiii!!!
          </h1>
        </section>
      </>
    );
  }

  return (
    <>
    {
    Object.keys(profile).length === 0
    ?(
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Create Your Profile
        </h2>
        <form className="space-y-4" onSubmit={createProfile}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              placeholder="Enter your age"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              placeholder="Enter your address"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Skill</label>
            <input
              type="text"
              placeholder="Enter your skill"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:ring-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              Submit Profile
            </button>
          </div>
        </form>
      </div>
    </div>
    ):(
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Create Your Profile
        </h2>
        <form className="space-y-4" onSubmit={editProfile}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={profile.fullname}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              placeholder="Enter your age"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={profile.age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={profile.phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              placeholder="Enter your address"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={profile.address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Skill</label>
            <input
              type="text"
              placeholder="Enter your skill"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={profile.skill}
              onChange={(e) => setSkill(e.target.value)}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:ring-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              Submit Profile
            </button>
          </div>
        </form>
      </div>
    </div>
    )}
    </>
  );
}
