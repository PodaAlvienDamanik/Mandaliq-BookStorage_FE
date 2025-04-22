
import { Bot, Menu } from "lucide-react"
import { motion } from "framer-motion"
import type React from "react" // Added import for React


    // Pastikan komponen Button tersedia
    function Button({
		children,
		size = "md",
		variant = "default",
		className,
		...props
		}: {
		children: React.ReactNode;
		size?: "sm" | "md" | "lg";
		variant?: "default" | "outline";
		className?: string;
		} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
		const baseClass =
			"inline-flex items-center justify-center font-medium rounded-md transition-all focus:outline-none";
		const sizeClass =
			size === "sm"
			? "px-3 py-1 text-sm"
			: size === "lg"
			? "px-8 py-3 text-lg"
			: "px-5 py-2 text-base";
		const variantClass =
			variant === "outline"
			? "border bg-transparent hover:bg-purple-500/20"
			: "bg-purple-600 hover:bg-purple-700 text-white";
	
		return (
			<button
			className={`${baseClass} ${sizeClass} ${variantClass} ${className}`}
			{...props}
			>
			{children}
			</button>
		);  
		}

    interface NavLinkProps {
      href : string;
      children: React.ReactNode;
    }

    function NavLink(navLinkProps : NavLinkProps) {
      return (
        <a href={navLinkProps.href} className="text-gray-300 hover:text-white transition-colors relative group">
          {navLinkProps.children}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full" />
        </a>
      )}

export default function NavbarHome() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="flex items-center justify-between px-6 py-4 backdrop-blur-sm border-b border-white/10"
    >
      <a href="/" className="flex items-center space-x-2">
        <Bot className="w-8 h-8 text-purple-500" />
        <span className="text-white font-medium text-xl">Mandaliq Storage Book</span>
      </a>

      <div className="hidden md:flex items-center space-x-8">
        <NavLink href="/features">Features</NavLink>
        <NavLink href="/how-it-works">How it Works</NavLink>
        <NavLink href="/examples">Examples</NavLink>
        <NavLink href="/pricing">Pricing</NavLink>
      </div>

      <div className="hidden md:flex items-center space-x-4">
        <a href="/login">
        <Button variant="default" className="text-white hover:text-purple-400">
          Sign In
        </Button>
        </a>
        <a href="/register">
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">Sign Up</Button>
        </a>
      </div>

      <Button variant="default" size="sm" className="md:hidden text-white">
        <Menu className="w-6 h-6" />
      </Button>
    </motion.nav>

  );
}


