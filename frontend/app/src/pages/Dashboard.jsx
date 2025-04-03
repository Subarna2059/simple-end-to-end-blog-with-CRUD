import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Modal from '../components/Modal'

const Dashboard = () => {
    const navigate = useNavigate()
    const [blogs, setBlogs] = useState([])
    const [modal, setModal] = useState(false)
    const [edit,setEdit] = useState(false)
    const [dataToBeEdited, setDataToBeEdited] = useState({
        _id:"",
        name:"",
        desc:""
    })
    const token = localStorage.getItem("token")
    const auth = async () => {
        const data = await axios.get("http://localhost:8080/api/v1/blog", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        setBlogs(data.data.blogs);
    }
    const handleOnAddClick = () => {
        setModal(!modal)
    }
    useEffect(() => {
        const data = async () => {
            await auth();
        }
        data();
    },
        [blogs])
    const handleOnClick = (id) => {
        try {
            navigate(`/blog/${id}`)
        } catch (e) {
            toast(e.message)
        }
    }
    const handleOnDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/blog/${id}`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            toast("Data deleted successfully")
        } catch (e) {
            toast(e.message)
        }
    }
    const handleOnEdit = async (id) => {
        try {
            setModal(true)
            const data = await axios.get(`http://localhost:8080/api/v1/blog/${id}`, 
                {
                    headers:{
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            const dataFetched = await data.data.blogById;
            setDataToBeEdited({
                ...dataToBeEdited,
                name:dataFetched.name,
                desc:dataFetched.desc,
                _id:dataFetched._id
            })
            setEdit(true)
        } catch (e) {
            toast(e.message)
        }
    }
    const handleLogOut = () =>{
        localStorage.clear()
        navigate("/login")
    }
    return (
        <>
            {
                modal ? <Modal changeModalState={handleOnAddClick}  edit={edit} dataForEdit={dataToBeEdited} /> :
                    (
                        <>
                            <div className='flex w-[95vw] justify-end'>
                                <i onClick={() => { handleOnAddClick() }} className="bi bi-plus-square-fill shadow-4xl"></i>
                                <i onClick={()=>{handleLogOut()}} className="bi bi-box-arrow-left ml-4"></i>
                            </div>
                            {blogs.map((items, index) => {
                                return (
                                    <div key={index} className='flex justify-center '>
                                        <div key={index} className='flex flex-col border-1 rounded-2xl border-gray-300  h-[20vh] items-center justify-center mb-5 w-[50vw] hover:shadow-xl'>
                                            <div className='text-3xl font-semibold pt-5'>{items.name}</div>
                                            <div>{items.desc}</div>
                                            <div className='w-[100%] flex justify-end'>
                                            <button onClick={() => {
                                                    handleOnClick(items._id)
                                                }} 
                                                type="button" class="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900">Detail</button>
                                                <button onClick={() => { handleOnDelete(items._id) }} type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
                                                <button onClick={() => { handleOnEdit(items._id) }} type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Edit</button>
                                            </div>
                                            <div className='w-[100%] flex justify-end'>
                                                 </div>
                                        </div>
                                    </div>
                                )
                            })
                            }
                        </>
                    )
            }
        </>
    )
}

export default Dashboard