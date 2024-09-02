import { useEffect, useState } from "react"
import serverApi from '../helpers/axios2'
import { Link, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from "axios"
import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            let { data } = await serverApi({
                method: 'POST',
                url: '/login',
                data: { email: email, password: password }
            });

            console.log(data);
            let tokens = data.access_token;

            localStorage.setItem('token', tokens);
            
            Swal.fire({
                icon: "Success",
                title: "information",
                text: 'Login Success',
            });
            navigate("/");

        } catch (error) {
            console.log(error.response);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${error.response.data.message}`,
            });
        }
    }

    function handleCredentialResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential);
    }

    useEffect(() => {
        window.google.accounts.id.initialize({
            client_id: "783044947667-e0dtobejbo624ngnl35s6ldp5troglr2.apps.googleusercontent.com",
            callback: async (response) => {
                const googleToken = response.credential;
                try {
                    const { data } = await serverApi({
                        method: "POST",
                        url: "/login/google",
                        data: { googleToken }
                    })
                    console.log(data);
                    localStorage.setItem('token', data.access_token);
                    Swal.fire({
                        icon: "Success",
                        title: "information",
                        text: 'Login Success',
                    });
                    navigate("/");

                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: `${error.response.data.message}`,
                    });
                }
            }
        });
        google.accounts.id.renderButton(
            document.getElementById("buttonDiv"),
            { theme: "outline", size: "large" }  // customization attributes
        );
        google.accounts.id.prompt(); // also display the One Tap dialog
    })

    return (
        <>
            <div className="hero bg-base-100 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left ml-5">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                        Please log in with your account to continue and access our services. Make sure the login information you enter is correct so you can use the available features.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form className="card-body" onSubmit={handleLogin}>
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
                                <button className="btn btn-primary">Login</button>
                                <hr />
                            </div>
                            <div className="flex justify-center">
                                <div id="buttonDiv" className="mx-2 my-2"></div>
                            </div>
                            <label className="label">
                                <a className="label-text-alt text-center">Don't have an account yet?</a>
                            </label>
                            <Link to={'/register'} className="btn btn-ghost border-black">
                                Register
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}