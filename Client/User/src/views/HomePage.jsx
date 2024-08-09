import Card from "../components/Card";
import { useEffect, useState } from "react";
import magnifyingGlass from "../components/assets/search-svgrepo-com.svg"; // Gambar search icon
import axios from "axios";
import Toastify from "toastify-js";

export default function HomePage({ url }) {
  const [myjob, setMyJob] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  // console.log(localStorage.access_token);

  // Fungsi untuk mengambil data pekerjaan
  // async function fetchMyJob() {
  //   try {
  //     setLoading(true); // Tampilkan loading indicator
  //     const { data } = await axios.get(`${url}/myjob`);
  //     setMyJob(data.data); // Sesuaikan dengan struktur data dari backend
  //   } catch (error) {
  //     console.log(error);
  //     Toastify({
  //       text: error.response
  //         ? error.response.data.message
  //         : "Failed to fetch data",
  //       duration: 2000,
  //       newWindow: true,
  //       close: true,
  //       gravity: "top",
  //       position: "left",
  //       stopOnFocus: true,
  //       style: {
  //         background: "#EF4C54",
  //         color: "#17202A",
  //         boxShadow: "0 5px 10px black",
  //         fontWeight: "bold",
  //       },
  //     }).showToast();
  //   } finally {
  //     setLoading(false); // Sembunyikan loading indicator
  //   }
  // }

  async function getAiPrompt() {
    try {
      const { data } = await axios.get(`${url}/job`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Panggil fetchMyJob saat komponen dimuat dan ketika search berubah
  useEffect(() => {
    getAiPrompt();
  }, [search]);

  // Fungsi untuk menangani perubahan input pencarian
  function searchOnChange(event) {
    let newSearch = event.target.value;
    setSearch(newSearch);
  }

  return (
    <>
      <div id="PAGE-HOME" className="p-3">
        {/* Pencarian */}
        <form
          action=""
          method="get"
          className="flex justify-center items-center mt-5"
        >
          <input
            type="search"
            name="search"
            placeholder="Search job titles or skills..."
            className="input input-bordered input-accent md:w-auto mx-1 input-sm"
            value={search}
            onChange={searchOnChange}
          />
          <img src={magnifyingGlass} alt="Search" className="w-5 h-5 ml-2" />
        </form>

        {/* Indikator Loading */}
        {loading ? (
          <div className="mt-32 flex justify-center items-center">
            <img src={magnifyingGlass} alt="Loading..." />
          </div>
        ) : (
          <main className="grid grid-cols-3 gap-5 px-10 my-8 bg-white">
            {myjob.map((job) => (
              <Card key={job.id} job={job} url={url} fetchMyJob={fetchMyJob} />
            ))}
          </main>
        )}
      </div>
    </>
  );
}
