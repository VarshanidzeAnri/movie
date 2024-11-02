function Comments() {
    return (
        <div className='bg-zinc-800 p-5'>
                    <div className='flex justify-between mt-2'>
                        <div className='flex flex-col gap-2 w-[40%]'>
                        <div className='text-xl'>კომენტარები</div>
                            <div className='border-zinc-900 border-2 p-3'>
                                <div className='text-sm '>anri</div>
                                <div className='text-lg'>magaria dzaan</div>
                            </div>

                            <div className='border-zinc-900 border-2 p-3'>
                                <div className='text-sm '>anri</div>
                                <div className='text-lg'>magaria dzaan</div>
                            </div>
                        </div>
                        
                        <div className='w-[50%]'>
                            <form className='flex flex-col gap-3 '>
                                <div className='text-xl'>კომენტარის დაწერა</div>
                                <div ><textarea className='w-full h-40 rounded-lg p-2 text-black'></textarea></div>
                                <button type='submit' className='p-2 bg-green-500 text-white'>დაწერა</button>
                            </form>
                        </div>
                    </div>
                    
                </div>
    )
}

export default Comments
