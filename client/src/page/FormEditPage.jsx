import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import serverApi from "../helpers/axios2";
import FormEditAdd from "../component/FormEditAdd";
import Swal from "sweetalert2";


export default function FormEditPage() {
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const { id } = useParams()

    const fetchNewsById = async () => {
        try {
            let { data } = await serverApi({
                url: `/news/${id}`,
                method: "GET",
                headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
            })
            console.log("Ini di EDIT", data);
            setTitle(data.title)
            setUrl(data.url)
        } catch (error) {
            console.log(error.response);
        }
    }

    const handleUpdateNews = async (e) => {
        e.preventDefault()
        try {
            
            let { data } = await serverApi({
                url: `/news/edit/${id}`,
                method: "PUT",
                data: { title: title, url: url },
                headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
            })
            console.log(data);
            Swal.fire({
                icon: "Success",
                title: "information",
                text: 'Edit News Success',
            });
            navigate('/dashboard')
        } catch (error) {
            console.log(error.response);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${error.response.data.message}`,
            });
        }
    }

    useEffect(() => {
        fetchNewsById()
    }, [])

    return (
        <>
            <FormEditAdd
                namePage={'Update News'}
                handleSubmit={handleUpdateNews}
                setTitle={setTitle}
                title={title}
                setUrl={setUrl}
                url={url}
            />
        </>
    )
}