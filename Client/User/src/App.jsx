import { RouterProvider } from "react-router-dom";
import router from "./routers";
import "./App.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function App() {
  return (
    <>
      <GoogleOAuthProvider clientId="196923627568-9la3pmfhrimm67jftilr8stvvmev9ok1.apps.googleusercontent.com">
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </>
  );
}
