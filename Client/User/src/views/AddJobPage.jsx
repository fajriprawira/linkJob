
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsync } from "../features/myjobs/myjobsSlice";
import Toastify from 'toastify-js'
import axios from "axios";

const AddJobPage = ({url}) => {

  const { myjobs, loading, error } = useSelector((state) => state.myjobs);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchAsync())
  }, []);

  // untuk menghandle error secara UI, tidak boleh di redux
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
          fontWeight: "bold"
        }
      }).showToast();
    }
  }, [error]);

  async function handleDelete(id) {
    try {
      await axios.delete(`${url}/myjob/${id}`,{
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
        
      });
      dispatch(fetchAsync())
      
      // console.log(data)
      
    } catch (error) {
      console.log(error);
      
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
    <section className="flex flex-col gap-4 rounded bg-gray-100 p-4">
      <p className="text-2xl font-bold">DataTable Page</p>

      {!error && myjobs.length > 0 && (
        <table className="border-1 border border-emerald-400">
          <thead>
            <tr>
              <th className="border border-emerald-400">title</th>
              <th className="border border-emerald-400">description</th>
            </tr>
          </thead>
          <tbody>
            {myjobs.map((job) => (
              <tr key={job.id}>
                <td className="border border-emerald-400">{job.name}</td>
                <td className="border border-emerald-400">{job.description}</td>
                <td className="border border-emerald-400">
                        <button
                         className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-lg hover:bg-blue-700 transition"
                         onClick={() =>handleDelete(job.id)}
                        >Delete
                        </button>
                      </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default AddJobPage;
