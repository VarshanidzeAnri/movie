import { useEffect, useRef, useState } from 'react'
import axiosClient from '../axios-clinet'
import './comments.css'

function Comments({movieId}) {
    const [comments, setComments] = useState([]);
    const commentRef = useRef();

    useEffect(() => {
        axiosClient.get(`comments/movie/${movieId}`)
        .then(({data}) => {
            setComments(data.data)
        })
    }, [])

    const createComments = (e) => {
        e.preventDefault();
        const data = {
            comment: commentRef.current.value
        }

        axiosClient.post(`comment/store/${movieId}`, data)
        .then(() => {
            window.location.reload();
        })
    }

    return (
        <div className='bg-zinc-800 p-5 comments'>
                    <div className='flex justify-between mt-2'>
                        <div className='flex flex-col gap-5 w-[45%] overflow-auto h-72 '>
                        <div className='text-xl '>კომენტარები</div>
                        {comments.map(comment => (
                                <div key={comment.id}>
                                    <div className='border-black border-r-0 border-2 p-3 flex flex-col flex-wrap break-all'>
                                        <div className='text-sm '>{comment.user.name}</div>
                                        <div className='text-lg'>{comment.comment}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='w-[50%]'>
                            <form onSubmit={createComments} className='flex flex-col gap-3 '>
                                <div className='text-xl '>კომენტარის დაწერა</div>
                                <div ><textarea ref={commentRef} className='w-full h-40 rounded-lg p-2 text-black' placeholder="კომენტარი..."></textarea></div>
                                <button type='submit' className='p-2 bg-[#ff0009] text-white'>ატვირთვა</button>
                            </form>
                        </div>
                    </div>
                    
                </div>
    )
}

export default Comments
