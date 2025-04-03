import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const BlogPage = () => {
    const {id} = useParams()
    const [blog, setBlog] = useState();
    const token = localStorage.getItem("token")
    const getBlog = async() =>{
        try{
            const data = await axios.get(`http://localhost:8080/api/v1/blog/${id}`, 
                {
                    headers:{
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            setBlog(data?.data.blogById)
        } catch (e) {
            toast(e.message)
        }
    }
    useEffect(()=>{
            getBlog()
    },[id])
  return (
    <>
    <div className='h-[100vh] w-[100vw] flex justify-center'>
     <div className='h-[95vh] w-[95vw] mt-4 flex flex-col items-center border-1 rounded-3xl border-gray-300 '>
        <div className=' mt-4 text-4xl '>{blog?.name}</div>    
        <div className=' mt-4 text-xl'>{blog?.desc}</div>    
    </div>  
    </div> 
    </>
  )
}

export default BlogPage