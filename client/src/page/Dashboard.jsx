import { useEffect, useState } from "react"
import serverApi from "../helpers/axios2";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import TableDasboard from "../component/TableDasboard";

export default function Dashboard() {
    const [news, setNews] = useState([])
    async function getNews() {
        try {
            let news = await serverApi({
                url: `/news-byuser`,
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem(`token`)}`
                }

            });

            console.log(news.data.data);
            setNews(news.data.data)
        } catch (error) {
            console.log(error.response);
        }
    }

    const delNews = async (id) => {
        try {
            let { news } = await serverApi({
                url: `/news/delete/${id}`,
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            Swal.fire({
                icon: "Success",
                title: "information",
                text: 'Delete Success',
            });
            getNews()
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${error.response.data.message}`,
            });
        }
    }

    useEffect(() => {
        getNews();
    }, []);
    return (
        <>

            <div className="place-content-center mt-16">
                <h1 className="text-4xl text-white underline my-3">List News</h1>
                <div className="mb-2 flex">
                    <Link to={"/news/add"}>
                        <button className="btn btn-primary btn-sm mr-4">Add News</button>
                    </Link>
                </div>
                <TableDasboard news={news} delNews={delNews} />
            </div>

            
        </>
    )
}