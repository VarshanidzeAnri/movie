import { BsCameraReels } from "react-icons/bs";
import { Link } from "react-router-dom";

function Choose() {
    return (
        <div className="w-[90vw] mx-auto mt-80">
            <div className=" text-white flex justify-between gap-5 text-2xl items-center">
                <Link to='/add/movie' className="bg-zinc-900 p-5 flex flex-col items-center justify-start gap-5">
                    <div>ფილმის დამატება</div>
                    <div className="text-7xl"><BsCameraReels /></div>
                </Link>
                <div className="bg-zinc-900 p-5">
                    რეჟისორის დამატება
                </div>
                <div className="bg-zinc-900 p-5">
                    ჟანრის დამატება
                </div>
                <div className="bg-zinc-900 p-5">
                    მსახიობის დამატება
                </div>
            </div>
        </div>
    )
}

export default Choose
