import { BsCameraReels, BsPersonVideo3, BsTagsFill, BsPeopleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Choose() {
    const cardVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        hover: { scale: 1.05, transition: { duration: 0.2 } }
    };

    const containerVariants = {
        animate: { transition: { staggerChildren: 0.1 } }
    };

    return (
        <div className="w-[90vw] max-w-6xl mx-auto mt-32 lg:mt-40">
            <h1 className="text-white text-4xl font-bold mb-10 text-center">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                    რა გსურთ დაამატოთ?
                </span>
            </h1>
            
            <motion.div 
                className="text-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" 
                variants={containerVariants}
                initial="initial"
                animate="animate"
            >
                <motion.div variants={cardVariants} whileHover="hover">
                    <Link to='/add/movie' className="block h-full">
                        <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-8 rounded-xl shadow-lg hover:shadow-purple-900/20 flex flex-col items-center justify-center gap-6 h-full transition-all duration-300">
                            <div className="text-7xl text-purple-500 mb-2"><BsCameraReels /></div>
                            <div className="text-xl font-medium">ფილმის დამატება</div>
                        </div>
                    </Link>
                </motion.div>
                
                <motion.div variants={cardVariants} whileHover="hover">
                    <Link to='/add/director' className="block h-full">
                        <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-8 rounded-xl shadow-lg hover:shadow-blue-900/20 flex flex-col items-center justify-center gap-6 h-full transition-all duration-300">
                            <div className="text-7xl text-blue-500 mb-2"><BsPersonVideo3 /></div>
                            <div className="text-xl font-medium">რეჟისორის დამატება</div>
                        </div>
                    </Link>
                </motion.div>
                
                <motion.div variants={cardVariants} whileHover="hover">
                    <Link to='/add/genre' className="block h-full">
                        <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-8 rounded-xl shadow-lg hover:shadow-green-900/20 flex flex-col items-center justify-center gap-6 h-full transition-all duration-300">
                            <div className="text-7xl text-green-500 mb-2"><BsTagsFill /></div>
                            <div className="text-xl font-medium">ჟანრის დამატება</div>
                        </div>
                    </Link>
                </motion.div>
                
                <motion.div variants={cardVariants} whileHover="hover">
                    <Link to='/add/actor' className="block h-full">
                        <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-8 rounded-xl shadow-lg hover:shadow-amber-900/20 flex flex-col items-center justify-center gap-6 h-full transition-all duration-300">
                            <div className="text-7xl text-amber-500 mb-2"><BsPeopleFill /></div>
                            <div className="text-xl font-medium">მსახიობის დამატება</div>
                        </div>
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default Choose
