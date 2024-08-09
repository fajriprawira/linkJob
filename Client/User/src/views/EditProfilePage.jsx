import { useState, useEffect } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import { useNavigate } from "react-router-dom";

export default function EditProfilePage({ url }) {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the user's profile data when the component mounts
    async function fetchProfile() {
      setLoading(true);
      try {
        const { data } = await axios.get(`${url}/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });
        setFullName(data.fullname);
        setEmail(data.email);
      } catch (error) {
        Toastify({
          text: "Failed to load profile data",
          duration: 2000,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "left",
          stopOnFocus: true,
          style: {
            background: "#EF4C54",
            color: "#17202A",
            boxShadow: "0 5px 10px black",
            fontWeight: "bold",
          },
        }).showToast();
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [url]);

  async function handleUpdateProfile(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedData = { fullname, email };
      await axios.put(`${url}/profile`, updatedData, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      Toastify({
        text: "Profile updated successfully",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "#00B29F",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();

      navigate("/profile"); // Redirect to profile page
    } catch (error) {
      Toastify({
        text: "Failed to update profile",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "#EF4C54",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex flex-col justify-center h-[85dvh] overflow-hidden bg-base-100">
      <div className="w-full p-6 m-auto rounded-lg shadow-md lg:max-w-lg bg-base-200">
        <h1 className="text-3xl font-semibold text-center text-accent-focus">
          Edit Profile
        </h1>

        {loading ? (
          <div className="flex justify-center my-8">
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleUpdateProfile}>
            <div>
              <label className="label">
                <span className="text-base label-text">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter Full Name"
                className="w-full input input-bordered input-accent"
                value={fullname}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="text-base label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                className="w-full input input-bordered input-accent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <button type="submit" className="btn btn-accent w-full">
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
