import { useEffect, useState } from "react"
import newsApi from "../helpers/axios";

import { useSelector, useDispatch } from "react-redux";
// import { setNews }  from '../features/News/NewsSlice'
import { getNews } from '../features/News/NewsSlice'
import serverApi from "../helpers/axios2";

export default function HomePage() {
    const [newsLocal, setNewsLocal] = useState([])
    const news = useSelector(state => state.news) // redux
    console.log(news.news);

    const dispatch = useDispatch()//redux

    async function getNewsLocal() {
        try {
            let news = await serverApi({
                url: '/news',
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem(`token`)}`
                }

            });

            console.log(news.data.data);
            setNewsLocal(news.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    console.log(newsLocal);

    useEffect(() => {
        dispatch(getNews())//redux
        getNewsLocal();
    }, []);

    if (news.loading.loading) {
        return <h1>loading...</h1>
    }
    return (

        <>
            <div className="flex flex-wrap gap-7 mt-16">

                {news.news.map((el, idx) => (

                    <div className="card glass w-96 mt-3" key={idx + 1}>
                        <figure>
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJt080YseVVXjyH2pRpeLfOhTCEzFaMXivlg&s"
                                alt="News!" />

                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{el.title}</h2>
                            <h3></h3>
                            <div className="card-actions justify-end mt-auto">
                                <a className="btn btn-primary" href={el.url} target="_blank" rel="noopener noreferrer">Read more!</a>
                            </div>
                        </div>
                    </div>
                ))}
                {newsLocal.map((el, idx) => (

                    <div className="card glass w-96 mt-3" key={idx + 1}>
                        <figure>
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJt080YseVVXjyH2pRpeLfOhTCEzFaMXivlg&s"
                                alt="News!" />

                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{el.title}</h2>
                            <h3></h3>
                            <div className="card-actions justify-end mt-auto">
                                <a className="btn btn-primary" href={el.url} target="_blank" rel="noopener noreferrer">Read more!</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>

    )
}