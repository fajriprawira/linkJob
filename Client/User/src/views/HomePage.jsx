import Card from "../components/Card";
import { useEffect, useState } from "react";
import magnifyingGlass from "../components/assets/search-svgrepo-com.svg"; // Gambar search icon
import axios from "axios";
import Toastify from "toastify-js";

export default function HomePage({ url }) {
  const [myjob, setMyJob] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState([]);

  // Fungsi untuk mengambil data pekerjaan
  async function fetchMyJob() {
    try {
      setLoading(true); // Tampilkan loading indicator
      const { data } = await axios.get(`${url}/myjob`);
      setMyJob(data.data); // Sesuaikan dengan struktur data dari backend
    } catch (error) {
      console.log(error);
      Toastify({
        text: error.response
          ? error.response.data.message
          : "Failed to fetch data",
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
      setLoading(false); // Sembunyikan loading indicator
    }
  }

  async function getAiPrompt() {
    // console.log("getAiPrompt")
    try {
      setLoading(true);
      const { data } = await axios.get(`${url}/job`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      // console.log(data)
      setJobs(data.data);

    } catch (error) {
      console.log(error);
      Toastify({
        text: error.response
          ? error.response.data.message
          : "Failed to fetch data",
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
      setLoading(false); // Sembunyikan loading indicator
    
    }
  }

  async function fetchJob(title,description) {
    try {
    console.log(title, description,"ini title ya bosskuu")
      const { data } = await axios.post(`${url}/myjob`, {title,description},{
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
        
      });
      
      // console.log(data)
      
    } catch (error) {
      console.log(error);
      
    } 
  }

  // Panggil fetchMyJob saat komponen dimuat dan ketika search berubah
  // useEffect(() => {
  //   getAiPrompt();
  // }, [search]);

  // Fungsi untuk menangani perubahan input pencarian
  // function searchOnChange(event) {
  //   let newSearch = event.target.value;
  //   setSearch(newSearch);
  // }

  return (
    <>
      <div id="PAGE-HOME" className="p-3">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center bg-gray-100 py-20 mt-12">
          <h1 className="text-4xl font-bold mb-4">DISCOVER YOUR FUTURE</h1>
          <p className="text-lg mb-6">Find your next job</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-lg hover:bg-blue-700 transition"
            onClick={getAiPrompt}
          >
            Discover Now
          </button>
          <p className="mt-12 text-sm ">
            No time to look for jobs? Drop your resume with{" "}
            <span className="text-purple-600 font-bold">LINK JOB</span>{" "}
            headhunters here.
          </p>
        </section>

        {/* {JSON.stringify(jobs)} */}
        {/* Indikator Loading */}
        {loading ? (
          <div className="mt-32 flex justify-center items-center">
            {/* <img src={magnifyingGlass} alt="Loading..." /> */}
            <h1>loading yee bos</h1>
          </div>
        ) : (
          // <main className="grid grid-cols-3 gap-5 px-10 my-8 bg-white">
          //   {myjob.map((job) => (
          //     <Card key={job.id} job={job} url={url} fetchMyJob={fetchMyJob} />
          //   ))}
          // </main>
          <section className="flex flex-col gap-4 rounded bg-gray-100 p-4">
            <p className="text-2xl font-bold">DataTable Page</p>

            {jobs.length > 0 && (
              <table className="border-1 border border-emerald-400">
                <thead>
                  <tr>
                    <th className="border border-emerald-400">title</th>
                    <th className="border border-emerald-400">description</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job,idx) => (
                    <tr key={idx}>
                      <td className="border border-emerald-400">{job.title}</td>
                      <td className="border border-emerald-400">
                        {job.description}
                      </td>
                      <td className="border border-emerald-400">
                        <button
                         className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-lg hover:bg-blue-700 transition"
                         onClick={() => fetchJob(job.title, job.description)}
                        >Bookmark
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        )}
      </div>
    </>
  );
}
