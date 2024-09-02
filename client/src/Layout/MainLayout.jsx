import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { DarkMode } from "../context/DarkMode";


export default function MainLayout() {
    
    const navigate = useNavigate()
    const token = localStorage.getItem('token');
    return (
        <>
            <div className={`drawer`}>
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* Navbar */}
                    <div className="navbar bg-base-300 w-full fixed top-0 left-0 right-0 z-50">
                        <div className="flex-none lg:hidden">
                            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="inline-block h-6 w-6 stroke-current">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </label>
                        </div>
                        <div className="mx-2 flex-1 px-2 text-4xl">
                            <Link to={'/'}>
                                IndoNews
                            </Link>
                        </div>
                        <div className="hidden flex-none lg:block">
                            <ul className="menu menu-horizontal">
                                {/* Navbar menu content here */}
                                {token ? (
                                    <div className="dropdown dropdown-end">
                                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                            <div className="w-10 rounded-full">
                                                <img
                                                    alt="Tailwind CSS Navbar component"
                                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                            </div>
                                        </div>
                                        <ul
                                            tabIndex={0}
                                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                            <li>
                                                <Link to={"/dashboard"}>
                                                    Dashboard
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={"/search-ai"}>
                                                    SearchAI
                                                </Link>
                                            </li>
                                            <li>
                                                <button onClick={() => {
                                                    localStorage.clear();
                                                    navigate('/login');
                                                }}>
                                                    <a>Logout</a>

                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                ) : (
                                    <div className="flex">
                                        <li>
                                            <Link to={"/search-ai"}>
                                                SearchAI
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={'/register'}>
                                                Register
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={'/login'}>
                                                Login
                                            </Link>
                                        </li>
                                    </div>

                                )}
                            </ul>
                        </div>
                    </div>
                    {/* Page content here */}
                    <Outlet />
                </div>
                <div className="drawer-side mt-16">
                    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 min-h-full w-80 p-4">
                        {/* Sidebar content here */}
                        {token ? (
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="Tailwind CSS Navbar component"
                                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                    <li>
                                        <Link to={"/dashboard"}>
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={"/search-ai"}>
                                            SearchAI
                                        </Link>
                                    </li>
                                    <li>
                                        <button onClick={() => {
                                            localStorage.clear();
                                            navigate('/login');
                                        }}>
                                            <a>Logout</a>

                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div>
                                <Link to={"/search-ai"}>
                                    SearchAI
                                </Link>
                                <li>
                                    <Link to={'/register'}>
                                        Register
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/login'}>
                                        Login
                                    </Link>
                                </li>
                            </div>

                        )}
                    </ul>
                </div>
            </div>

        </>
    )
}