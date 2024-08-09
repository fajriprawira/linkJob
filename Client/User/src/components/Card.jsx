import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Toastify from 'toastify-js';

export default function Card({ job, url, fetchMyJob }) {
  const navigate = useNavigate();

  async function handleDelete(id) {
    try {
      await axios.delete(`${url}/myjob/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      Toastify({
        text: "Job deleted successfully",
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

      fetchMyJob(); // Refresh job list after deletion
    } catch (error) {
      Toastify({
        text: error.response?.data?.error || "Error deleting job",
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
    }
  }

  function handleDetail(id) {
    navigate(`/detail/${id}`);
  }

  function handleEdit(id) {
    navigate(`/edit/${id}`);
  }

  return (
    <div className="card bg-gray-100 shadow flex flex-row">
      <div className="card-body flex-1">
        <b>{job.title}</b>
        <p>{job.description}</p>
        <div className="flex space-x-2 mt-4">
          <button
            onClick={() => handleDetail(job.id)}
            className="btn btn-accent btn-sm"
          >
            Detail
          </button>
          <button
            onClick={() => handleDelete(job.id)}
            className="btn btn-error btn-sm"
          >
            Delete
          </button>
          <button
            onClick={() => handleEdit(job.id)}
            className="btn btn-warning btn-sm"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
