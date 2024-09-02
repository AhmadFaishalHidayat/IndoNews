import { createBrowserRouter, redirect } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import HomePage from "./page/HomePage";
import RegisterPage from "./page/RegisterPage";
import LoginPage from "./page/LoginPage";
import Dashboard from "./page/Dashboard";
import FormEditPage from "./page/FormEditPage";
import FormAddPage from "./page/FormAddPage";
import SearchAI from "./page/SeacrhAI";

const router = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <HomePage />
            },
            {
                path: '/search-ai',
                element: <SearchAI />
            }
        ],
    },
    {
        element: <MainLayout />,
        loader: () => {
            if (!localStorage.token) {
              return redirect('/login')
            }
            return null;
          },
          children: [
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/news/add',
                element: <FormAddPage />
            },
            {
                path: '/news/edit/:id',
                element: <FormEditPage />
            }
          ]
    },
    {
        path: '/login',
        element: <LoginPage />,
        loader: () => {
            if (localStorage.token) {
                return redirect('/dashboard')
            }
      
            return null;
        }
    },
    {
        path: '/register',
        element: <RegisterPage />
    },
]

)

export default router