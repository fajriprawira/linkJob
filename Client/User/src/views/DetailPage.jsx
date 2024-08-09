import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Toastify from "toastify-js";

export default function Details({ url }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  async function newsArticle() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${url}/apis/pub/news-portal/articles/${id}`
      );
      setArticles(data.data);
    } catch (error) {
      Toastify({
        text: error.response.data.error,
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
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    newsArticle();
  }, []);

  return (
    <>
      <div className="p-20 bg-gray-100 shadow-2xl flex flex-row">
        <figure className="flex flex-1">
          <img
            src={articles.imgUrl}
            alt="Article image"
            className="w-1/2 ml-20 rounded-xl"
          />
        </figure>
        <div className="flex flex-1 flex-col">
          <b className="mb-5 text-left">{articles.title}</b>
          <p className="text-left">{articles.content}</p>
        </div>
      </div>
    </>
  );
}
