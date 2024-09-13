import { useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

export default function LoginPage({ url }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const loginData = { email, password };
      const { data } = await axios.post(`${url}/login`, loginData);

      Toastify({
        text: "Login Successful",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {  
          background: "#00B29F",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("username", data.username)
      navigate("/profile"); // Ganti dengan halaman yang diinginkan setelah login
    } catch (error) {
      console.log(error);
      Toastify({
        text: error.response?.data?.error || "Login Failed",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
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
  }

  async function googleLogin(codeResponse) {
    try {
      console.log(codeResponse);
      const { data } = await axios.post(
        `${url}/google-login`,
        {},
        {
          headers: {
            token: codeResponse.credential,
          },
        }
      );
      localStorage.setItem("access_token", data.access_token);
      navigate("/profile");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
      });
    }
  }

  function emailOnChange(event) {
    setEmail(event.target.value);
  }

  function passwordOnChange(event) {
    setPassword(event.target.value);
  }

  return (
    <div className="flex flex-col justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800">
          Login to Your Account
        </h2>
        <p className="text-center text-gray-500 mt-2 mb-8">
          Enter your credentials to access your account.
        </p>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={emailOnChange}
              value={email}
            />
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={passwordOnChange}
              value={password}
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Log In
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
        <div className="divider px-10">OR</div>
        <div className="mt-6 flex justify-center items-center">
          <GoogleLogin onSuccess={googleLogin} />
        </div>
      </div>
    </div>
  );
}
