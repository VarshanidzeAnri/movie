import { useEffect, useRef, useState } from 'react'
import axiosClient from '../axios-clinet'
import './comments.css'

function Comments({movieId}) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [deleteCommentId, setDeleteCommentId] = useState(null);

    useEffect(() => {
        axiosClient.get(`comments/movie/${movieId}`)
        .then(({data}) => {
            setComments(data.data)
        })
    }, [comments])

    const createComments = (e) => {
        e.preventDefault();
        const data = {
            comment: comment
        }

        axiosClient.post(`comment/store/${movieId}`, data)
        .then(() => {
            setComment('');
        })
    }

    const deleteComment = (e) => {
        e.preventDefault()
        axiosClient.delete(`comment/delete/${deleteCommentId}`)
    }

    return (
        <div className='bg-zinc-800 p-5 comments'>
                    <div className='flex flex-col-reverse md:flex-row justify-between mt-2'>
                        <div className='flex flex-col gap-5 w-full md:w-[45%] overflow-auto h-72 mt-10 md:mt-0'>
                        <div className='text-xl '>კომენტარები</div>
                        {comments.map(comment => (
                                <div key={comment.id}>
                                    <div className='border-black border-r-0 border-2 p-3 flex justify-between items-center'>
                                        <div className='flex flex-col flex-wrap break-all'>
                                            <div className='text-sm '>{comment.user.name}</div>
                                            <div className='text-lg'>{comment.comment}</div>
                                        </div>
                                        <div>
                                            <form onSubmit={deleteComment} className='bg-[#ff0009] p-3'>
                                                <button onClick={() => setDeleteCommentId(comment.id)} type='submit'>წაშლა</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='w-full md:w-[50%]'>
                            <form onSubmit={createComments} className='flex flex-col gap-3 '>
                                <div className='text-xl '>კომენტარის დაწერა</div>
                                <div ><textarea value={comment} onChange={(e) => setComment(e.target.value)} className='w-full h-40 rounded-lg p-2 text-black' placeholder="კომენტარი..."></textarea></div>
                                <button type='submit' className='p-2 bg-[#ff0009] text-white'>ატვირთვა</button>
                            </form>
                        </div>
                    </div>
                    
                </div>
    )
}

export default Comments
