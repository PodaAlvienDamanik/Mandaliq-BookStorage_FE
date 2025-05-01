	import {
		Disclosure,
		Menu,
		MenuButton,
		MenuItem,
		MenuItems,
	} from "@headlessui/react";
	import { NavLink, Link } from "react-router-dom"; // Import Link
	import { useAuth } from "../utils/AuthProvider";

	
	const navigation = [
		{ name: "Home", to: "/", current: false },
		{ name: "Book", to: "/book", current: false },
		{ name: "Category", to: "/category", current: false },
		{ name: "Wishlist", to: "/wishlist", current: false },
	];
	
	function classNames(...classes: string[]) {
		return classes.filter(Boolean).join(" ");
	}
	
	const Navbar = () => {
		const { logout } = useAuth();
	
		return (
		<Disclosure as="nav" className="bg-gray-800">
			<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
			<div className="relative flex h-16 items-center justify-between">
				<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
				<div className="hidden sm:ml-6 sm:block">
					<div className="flex space-x-4">
					{navigation.map((item) => (
						<NavLink
						to={item.to}
						key={item.name}
						className={({ isActive }) =>
							classNames(
							isActive
								? "bg-gray-900 text-white"
								: "text-gray-300 hover:bg-gray-700 hover:text-white",
							"rounded-md px-3 py-2 text-sm font-medium"
							)
						}
						>
						{item.name}
						</NavLink>
					))}
					</div>
				</div>
				</div>
				<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
				
	
				{/* Profile dropdown */}
				<Menu as="div" className="relative ml-3">
					<div>
					<MenuButton className="flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
						<span className="sr-only">Open user menu</span>
						<img
						className="h-8 w-8 rounded-full"
						src= {'/projectfrontend/venelop.jpeg'}
						alt="gambar profile"
						/>
					</MenuButton>
					</div>
					<MenuItems
					className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
					>
					<MenuItem>
						<Link
						to="/profile"
						className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
						>
						Your Profile
						</Link>
					</MenuItem>
					<MenuItem>
						<button
						onClick={logout}
						className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
						>
						Sign out
						</button>
					</MenuItem>
					</MenuItems>
				</Menu>
				</div>
			</div>
			</div>
		</Disclosure>
		);
	};
	
	export default Navbar;
	