import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import serverApi from '../helpers/axios2'


export default function RegisterPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            let { data } = await serverApi({
                url: "/register",
                method: "POST",
                data: { email: email, password: password }
            })
            console.log(data);
            Swal.fire({
                icon: "Success",
                title: "information",
                text: 'Register Success',
            });
            navigate('/login')
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
            <div className="hero bg-base-100 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Register</h1>
                        <p className="py-6">
                            Please register an account if you don't have an account yet.
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form className="card-body" onSubmit={handleRegister}>
                            
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" className="input input-bordered" />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Sumbit</button>
                                <label className="label">
                                    <a className="label-text-alt text-center">Already have an account?</a>
                                </label>
                                <Link to={'/login'} className="btn btn-ghost mt-2 border-black">
                                    Login
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}