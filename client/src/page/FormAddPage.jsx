import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import serverApi from "../helpers/axios2"
import FormEditAdd from "../component/FormEditAdd"
import Swal from "sweetalert2"



export default function FormAddPage() {
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')

    const handleAddNews = async (e) => {
        e.preventDefault()
        try {

            let { data } = await serverApi({
                url: `/news/add`,
                method: "POST",
                data: { title: title, url: url },
                headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
            })
            console.log(data);
            Swal.fire({
                icon: "Success",
                title: "information",
                text: 'Add News Success',
            });
            navigate('/dashboard')
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${error.response.data.message}`,
            });
        }
    }

    return (
        <>
            
            <FormEditAdd

                namePage={'Create News'}
                handleSubmit={handleAddNews}
                setTitle={setTitle}
                setUrl={setUrl}
            />
        </>
    )
}