// import ArticleForm from "../components/ArticleForm";
// import axios from "axios";
// import Toastify from "toastify-js";
// import { useNavigate } from "react-router-dom";

// export default function ArticlesForm({ url }) {
//   const navigate = useNavigate();

//   async function handleSubmit(
//     e,
//     name,
//     title,
//     content,
//     imgUrl,
//     rating,
//     categoryId
//   ) {
//     e.preventDefault();
//     try {
//       const dataAdded = {
//         name,
//         title,
//         content,
//         imgUrl,
//         rating: +rating,
//         categoryId: +categoryId,
//       };

//       const { data } = await axios.post(
//         `${url}/apis/news-portal/articles`,
//         dataAdded,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.access_token}`,
//           },
//         }
//       );

//       Toastify({
//         text: "Success add new data",
//         duration: 2000,
//         newWindow: true,
//         close: true,
//         gravity: "top",
//         position: "left",
//         stopOnFocus: true,
//         style: {
//           background: "#00B29F",
//           color: "#17202A",
//           boxShadow: "0 5px 10px black",
//           fontWeight: "bold",
//         },
//       }).showToast();

//       navigate("/");
//     } catch (error) {
//       Toastify({
//         text: error.response.data.error,
//         duration: 2000,
//         newWindow: true,
//         close: true,
//         gravity: "top",
//         position: "left",
//         stopOnFocus: true,
//         style: {
//           background: "#EF4C54",
//           color: "#17202A",
//           boxShadow: "0 5px 10px black",
//           fontWeight: "bold",
//         },
//       }).showToast();
//     }
//   }

//   return (
//     <>
//       <ArticleForm
//         url={url}
//         handleSubmit={handleSubmit}
//         nameProp="Add Article"
//       />
//     </>
//   );
// }
