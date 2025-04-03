import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { data, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Modal = ({changeModalState, handleOnAddClickFunction, edit, dataForEdit}) => {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const [blogData, setBlogData ] = useState({
        name:"",
        desc:""
    })
    useEffect(() => {
        if (dataForEdit) {  
            setBlogData({
                name: dataForEdit.name || "",  
                desc: dataForEdit.desc || ""
            })
        }
    }, [dataForEdit]) 
    const handleOnChange = (e) => 
    {
        const {name, value} = e.target

        setBlogData({
            ...blogData,
            [name] : value
        })
    }
    const handleOnSubmit = async() => 
    {
        try{
            await axios.post("http://localhost:8080/api/v1/blog", {
                name: blogData.name,
                desc: blogData.desc
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            changeModalState()
            toast("Blog created successfully")
        } catch (e) {
            toast(e.message)
        }
    }
    const handleOnEditClick = async(id)=> {
        try{
           const updateData = await axios.put(`http://localhost:8080/api/v1/blog/${id}`,
                {
                    name:blogData.name,
                    desc:blogData.desc
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
            })
            if (updateData) {
            changeModalState()
                toast("Data updated successfully")
            } else {
                toast("Data not updated")
            }
        } catch (e) {
            toast(e.message)
        }
    }
    return (
        <>
            <div className='h-[100vh] w-[100vw] flex justify-center items-center'>
                <div className='shadow-2xl  h-[50vh] w-[30vw] flex flex-col items-center'>
                    <div>
                        Create blog
                    </div>
                    <div className='h-[100%]  mt-5'>
                        <div className='flex flex-col'>
                            <label >Name</label>
                            <input value={blogData.name} onChange={handleOnChange} name='name' className='border-1 border-gray-300 focus:border-blue-500 focus:outline-none' required={true} />
                        </div>
                        <div className='flex flex-col mt-4'>
                            <label >Description</label>
                            <textarea value={blogData.desc} onChange={handleOnChange} name='desc' className='border-1 border-gray-300 focus:border-blue-500 focus:outline-none'  rows="4" cols="40" required={true}></textarea>
                        </div>
                        <div className='flex justify-end'>
                        <button onClick={ !edit ? ()=>{
                            handleOnSubmit()
                        }:()=>{
                            handleOnEditClick(dataForEdit._id)
                        }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                            Submit
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal