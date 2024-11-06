import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Movies from "./views/Movies";
import Serials from "./views/Serials";
import Animes from "./views/Animes";
import NotFound from "./views/NotFound";
import Layout from "./Layout/Layout";
import MovieDetail from "./views/MovieDetail";
import Register from "./views/Auth/Register";
import Login from "./views/Auth/Login";
import AddLayout from "./views/Add/AddLayout";
import Choose from "./views/Add/Choose";
import AddMovie from "./views/Add/AddMovie";
import EditMovie from "./views/Add/EditMovie";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Dashboard />
            },
            {
                path: '/movies',
                element: <Movies />
            },
            {
                path: '/serials',
                element: <Serials />
            },
            {
                path: '/animes',
                element: <Animes />
            },
            {
                path: '/:id',
                element: <MovieDetail />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/add',
                element: <AddLayout />,
                children: [
                    {
                        path: '/add',
                        element: <Choose />
                    },
                    {
                        path: '/add/movie',
                        element: <AddMovie />
                    }
                ]
            },
            {
                path: '/edit',
                element: <AddLayout />,
                children: [
                    {
                        path: '/edit/:id',
                        element: <EditMovie />
                    }
                ]
            },
        ]
    },
    
    {
        path: '*',
        element: <NotFound />
    }
]);

export default router