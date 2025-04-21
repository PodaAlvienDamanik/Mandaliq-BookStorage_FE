import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import PublicRoute from "./utils/PublicRoute";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Book from "./pages/Book";
import CategoryBook from "./pages/CategoryBook";
import Wishlist from "./pages/Wishlist";
import { AuthProvider } from "./utils/AuthProvider";
import BaseLayout from "./layouts/Baselayout";
import Register from "./pages/Register";
import PrivateRoute from "./utils/PrivateRoute";


const queryClient = new QueryClient()

function App() {
	const router = createBrowserRouter(createRoutesFromElements(
		<Route>
			<Route path="/" element={<BaseLayout />}>
			<Route path="login" element={ <PublicRoute> <Login /> </PublicRoute>}/>
				<Route path="register" element={ <PublicRoute> <Register /> </PublicRoute>}/>
			</Route>

			<Route path="/" element={<RootLayout />}>
				<Route index element={ <PrivateRoute><Home/></PrivateRoute>} />
				<Route path="book" element={ <PrivateRoute><Book/></PrivateRoute>} />
				<Route path="category" element={ <PrivateRoute><CategoryBook/></PrivateRoute>} />
				<Route path="wishlist" element={ <PrivateRoute><Wishlist/></PrivateRoute>} />
			</Route>
		</Route>
	));
	return (
		<>
		<AuthProvider>
		<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</AuthProvider>
		</>
	)
}

export default App