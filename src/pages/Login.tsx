

    import { useNavigate } from "react-router-dom"
    import { useAuth } from "../utils/AuthProvider"
    import { useForm } from "react-hook-form"
    import axios from "../utils/AxiosInstance"
    import { useMutation } from "@tanstack/react-query"
    import { Eye, EyeOff, Mail, Lock } from "lucide-react"
    import { useState } from "react"

    export type LoginInput = {
    email: string
    password: string
    }

    const Login = () => {
    const navigate = useNavigate()
    const { login } = useAuth()
    const [showPassword, setShowPassword] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInput>()

    const handleLogin = async (data: LoginInput) => {
        try {
        const res = await axios.post<{ access_token: string }>("/api/auth/login", {
            email: data.email,
            password: data.password,
        })
        if (res.data) {
            login(res.data.access_token)
            navigate("/")
        } else {
            alert("Username or password is wrong")
        }
        } catch (err) {
        alert("Username or password is wrong")
        }
    }

    const { mutate, isPending } = useMutation({
        mutationFn: handleLogin,
    })

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] dark:shadow-[0_20px_50px_rgba(0,_0,_0,_0.3)] overflow-hidden relative">
            {isPending && (
            <div className="absolute inset-0 backdrop-blur-sm bg-white/60 dark:bg-gray-800/60 flex items-center justify-center z-20 rounded-xl">
                <div className="w-12 h-12 relative">
                <div className="w-12 h-12 rounded-full absolute border-4 border-solid border-gray-200 dark:border-gray-700"></div>
                <div className="w-12 h-12 rounded-full animate-spin absolute border-4 border-solid border-gray-800 dark:border-gray-300 border-t-transparent"></div>
                </div>
            </div>
            )}

            <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-bold text-gray-800 dark:text-white mb-2">Welcome Back</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Enter your credentials to access your account</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit((data) => mutate(data))}>
            <div className="space-y-1">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email address
                </label>
                <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                    id="email"
                    type="email"
                    required
                    className="pl-10 block w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-gray-800 dark:focus:ring-gray-600 focus:border-transparent transition-all duration-200"
                    placeholder="you@example.com"
                    {...register("email")}
                />
                </div>
                {errors.email && (
                <p className="text-red-500 text-xs mt-1" id="titleError">
                    Email is required.
                </p>
                )}
            </div>

            <div className="space-y-1">
                <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                </label>
                <button
                    type="button"
                    className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium"
                    onClick={(e) => {
                    e.preventDefault()
                    // Add forgot password functionality here
                    }}
                >
                    Forgot password?
                </button>
                </div>
                <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="pl-10 block w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-gray-800 dark:focus:ring-gray-600 focus:border-transparent transition-all duration-200"
                    placeholder="••••••••"
                    {...register("password")}
                />
                <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                </button>
                </div>
                {errors.password && (
                <p className="text-red-500 text-xs mt-1" id="titleError">
                    Password is required.
                </p>
                )}
            </div>

            <div className="pt-2">
                <button
                type="submit"
                className="w-full bg-gray-900 dark:bg-gray-700 text-white py-3 px-4 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                {isPending ? (
                    <span className="flex items-center justify-center">
                    <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        ></circle>
                        <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                    Signing in...
                    </span>
                ) : (
                    "Sign In"
                )}
                </button>
            </div>
            </form>

            

            <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Don't have an account?{" "}
            <button
                type="button"
                className="font-medium text-gray-900 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white transition-colors duration-200"
                onClick={() => {
                navigate("/register")
                }}
            >
                Sign up
            </button>
            </p>
        </div>
        </div>
    )
    }

    export default Login
