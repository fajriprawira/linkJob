import { createBrowserRouter, redirect } from "react-router-dom";
import LoginPage from "../views/LoginPage";
import RegisterPage from "../views/RegisterPage";
import BaseLayout from "../views/BaseLayout";
import HomePage from "../views/HomePage";
// import DetailPage from "../views/DetailPage";
// import AddJobPage from "../views/AddJobPage";
import EditProfilePage from "../views/EditProfilePage";
import Toastify from "toastify-js";

// Base URL for the API
const url = "http://localhost:3000";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage url={url} />,
    loader: () => {
      if (localStorage.access_token) {
        Toastify({
          text: "You are already logged in",
          duration: 2000,
          close: true,
          gravity: "top",
          position: "left",
          style: {
            background: "#EF4C54",
            color: "#17202A",
            boxShadow: "0 5px 10px black",
            fontWeight: "bold",
          },
        }).showToast();
        return redirect("/");
      }
      return null;
    },
  },
  {
    path: "/register",
    element: <RegisterPage url={url} />,
  },
  // {
  //   path: "/google-login",
  //   element: <GoogleLoginPage url={url} />,
  // },
  {
    element: <BaseLayout />,
    loader: () => {
      if (!localStorage.access_token) {
        Toastify({
          text: "Please login first",
          duration: 2000,
          close: true,
          gravity: "top",
          position: "left",
          style: {
            background: "#EF4C54",
            color: "#17202A",
            boxShadow: "0 5px 10px black",
            fontWeight: "bold",
          },
        }).showToast();
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <HomePage url={url} />,
        loader: () => {
          if (!localStorage.access_token) {
            return redirect("/login");
          }
          return null;
        },
      },
      // {
      //   path: "/detail/:id",
      //   element: <DetailPage url={url} />,
      // },
      // {
      //   path: "/add-job",
      //   element: <AddJobPage url={url} />,
      // },
      // {
      //   path: "/edit-profile/:id",
      //   element: <EditProfilePage url={url} />,
      // },
      // {
      //   path: "/edit-profile/:id/image",
      //   element: <EditProfilePage url={url} uploadImage />,
      // },
    ],
  },
]);

export default router;
