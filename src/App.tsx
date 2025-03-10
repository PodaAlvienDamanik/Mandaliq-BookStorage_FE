import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Post from "./pages/Post";
import Recipes from "./pages/Recipes";
import Home from "./pages/Home";
import DetailRecipes from "./pages/DetailRecipes";
import EditRecipes from "./pages/EditRecipes";
import AddRecipes from "./pages/AddRecipes";
import AddPost from "./pages/AddPost";
import EditPost from "./pages/EditPost";
import Todo from "./pages/Todo";
import Comments from "./pages/Comments";
import AddTodo from "./pages/AddTodo";
import EditTodo from "./pages/EditTodo";
import AddComents from "./pages/AddComments"
import EditComments from "./pages/EditComments";


const queryClient = new QueryClient()

function App() {
	const router = createBrowserRouter(createRoutesFromElements(
		<Route path="/" element={<RootLayout />}>
			<Route index element={<Home/>} />
			<Route path="recipes/:id/edit" element={<EditRecipes/>}/>
			<Route path="recipes" element={<Recipes />} />
			<Route path="recipes/add" element={<AddRecipes />} />
			<Route path="recipes/:id" element={<DetailRecipes />} />
			<Route path="/todo" element={<Todo/>}/>
			<Route path="/todo/add" element={<AddTodo/>}/>
			<Route path="posts" element={<Post />} />
			<Route path="posts/add" element={<AddPost />} />
			<Route path="posts/:id/edit" element={<EditPost />} />
			<Route path="/comments" element={<Comments/>}/>
			<Route path="/todo/:id/edit" element={<EditTodo/>}/>
			<Route path="comments/add"element={<AddComents/>} />
			<Route path="comments/:id/edit" element={<EditComments/>}/>
		</Route>
	));
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</>
	)
}

export default App