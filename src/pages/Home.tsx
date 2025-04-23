    import React, { useEffect } from "react";
    import { BookOpen, ArrowRight } from "lucide-react";

    const Home: React.FC = () => {
        useEffect(()=>{
            console.log("masukkkk")
        },[])
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex flex-col justify-center items-center p-6 text-center">
        <div className="max-w-2xl">
            <div className="flex justify-center mb-6">
            <BookOpen className="w-16 h-16 text-indigo-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-indigo-900">
            Mandaliq BookStorage
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-6">
            Temukan, kelola, dan simpan koleksi buku favoritmu di satu tempat.
            </p>
            <button className="bg-indigo-600 text-white text-lg px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-indigo-700 transition">
            Explore Books <ArrowRight className="w-5 h-5" />
            </button>
        </div>
        </div>
    );
    };

    export default Home;