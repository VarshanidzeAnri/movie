import './comments.css'

function Comments() {
    return (
        <div className='bg-zinc-800 p-5 comments'>
                    <div className='flex justify-between mt-2'>
                        <div className='flex flex-col gap-5 w-[45%] overflow-auto h-72 '>
                        <div className='text-xl '>კომენტარები</div>
                            <div className='border-black border-r-0 border-2 p-3 flex flex-col flex-wrap break-all'>
                                <div className='text-sm '>anri</div>
                                <div className='text-lg'>magaria dzaan</div>
                            </div>

                            <div className='border-black border-r-0 border-2 p-3 flex flex-col flex-wrap break-all'>
                                <div className='text-sm '>anri</div>
                                <div className='text-lg'>magaria dzaan</div>
                            </div>
                            <div className='border-black border-r-0 border-2 p-3 flex flex-col flex-wrap break-all'>
                                <div className='text-sm '>anri</div>
                                <div className='text-lg'>magaria dzaan</div>
                            </div>
                            <div className='border-black border-r-0 border-2 p-3 flex flex-col flex-wrap break-all'>
                                <div className='text-sm '>anri</div>
                                <div className='text-lg'>magaria dzaan</div>
                            </div>
                        </div>
                        
                        <div className='w-[50%]'>
                            <form className='flex flex-col gap-3 '>
                                <div className='text-xl '>კომენტარის დაწერა</div>
                                <div ><textarea className='w-full h-40 rounded-lg p-2 text-black' placeholder="კომენტარი..."></textarea></div>
                                <button type='submit' className='p-2 bg-[#ff0009] text-white'>დაწერა</button>
                            </form>
                        </div>
                    </div>
                    
                </div>
    )
}

export default Comments
