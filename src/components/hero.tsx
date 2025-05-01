

    import { motion } from "framer-motion";
    import { FloatingPaper } from "../components/floating-paper";
    import { RoboAnimation } from "../components/robo-animation";


    export default function Hero() {
    return (
        <div className="relative min-h-[calc(100vh-76px)] flex items-center">
        {/* Floating papers background */}
        <div className="absolute inset-0 overflow-hidden">
            <FloatingPaper count={6} />
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
            {/* Title Animation */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                Mandaliq
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    {" "}
                    Book Storage
                </span>
                </h1>
            </motion.div>

            {/* Description Animation */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto"
            >
                Upload your Favorite Book , Manage Them, And Make This Storage Like Your Library.
            </motion.p>

            {/* Buttons Animation */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
            </motion.div>
            </div>
        </div>

        {/* Animated robot */}
        <div className="absolute bottom-0 right-0 w-96 h-96">
            <RoboAnimation />
        </div>
        </div>
    );
    }
