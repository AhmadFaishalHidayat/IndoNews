import { useState } from "react";
import serverApi from "../helpers/axios2";
import Swal from 'sweetalert2'; // Import Swal jika belum diimpor

export default function SearchAI() {
    const [search, setSearch] = useState("");
    const [result, setResult] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Set isLoading menjadi true saat memulai pencarian

        try {
            let data = await serverApi({
                method: 'POST',
                url: '/search-ai',
                data: { search: search }
            });
            console.log(data.data);
            setResult(data.data);
        } catch (error) {
            console.log(error.response);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${error.response.data.message}`
            });
        } finally {
            setIsLoading(false); // Set isLoading menjadi false setelah pencarian selesai
        }
    };

    console.log(result);

    return (
        <>
            <form onSubmit={handleSearch} className="mt-16">
                <h1 className="text-2xl underline mb-5">SEARCH-AI</h1>
                <label className="input input-bordered flex items-center gap-2">
                    <input 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                        type="text" 
                        className="grow" 
                        placeholder="Search" 
                    />
                    <button type="submit" className="p-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </label>
            </form>

            {/* CARD */}
            <div className="flex flex-wrap gap-7">
                {isLoading ? (
                    <div className="loading">Loading...</div> // Ganti ini dengan animasi loading yang sesuai
                ) : (
                    result.map((el, idx) => (
                        <div className="card glass w-96 mt-3" key={idx + 1}>
                            <figure>
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJt080YseVVXjyH2pRpeLfOhTCEzFaMXivlg&s"
                                    alt="News!" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{el.title}</h2>
                                <h4 className="text-left mt-auto">{el.body}</h4>
                                <div className="card-actions justify-end mt-auto">
                                    <a className="btn btn-primary" href={el.url} target="_blank" rel="noopener noreferrer">Read more!</a>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}
