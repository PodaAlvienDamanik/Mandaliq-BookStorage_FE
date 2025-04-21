	import React from 'react'
	import { Menu } from '@headlessui/react'

	// Utility function untuk menggabungkan class
	function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ')
	}

	const NavbarHome = () => {
	return (
		<Menu as="div" className="relative">
		<div>
			<Menu.Button className="flex items-center rounded-full focus:outline-none">
			<img
				className="h-8 w-8 rounded-full ring-2 ring-indigo-500"
				src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
				alt="User"
			/>
			</Menu.Button>
		</div>

		<Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
			<Menu.Item>
			{({ active }) => (
				<a
				href="#"
				className={classNames(
					active ? 'bg-gray-100' : '',
					'block px-4 py-2 text-sm text-gray-700'
				)}
				>
				Your Profile
				</a>
			)}
			</Menu.Item>

			<Menu.Item>
			{({ active }) => (
				<a
				href="#"
				className={classNames(
					active ? 'bg-gray-100' : '',
					'block px-4 py-2 text-sm text-gray-700'
				)}
				>
				Settings
				</a>
			)}
			</Menu.Item>

			<Menu.Item>
			{({ active }) => (
				<a
				href="#"
				className={classNames(
					active ? 'bg-gray-100' : '',
					'block px-4 py-2 text-sm text-gray-700'
				)}
				>
				Sign out
				</a>
			)}
			</Menu.Item>
		</Menu.Items>
		</Menu>
	)
	}

	export default NavbarHome
