import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const LoginPage = () => {
        const navigate = useNavigate()
        const [inputData , setInputData] = useState({
            name:"",
            password:"",
        })
        function onChange (e)
        {
            const {name, value} = e.target
            setInputData({
                ...inputData,
                [name]:value
            })
        }
        async function  handleOnClick(e)
        {
            e.preventDefault(); 
            try{
                if(inputData.name !="" && inputData.password !="") {
                const token = await axios.post("http://localhost:8080/api/v1/user/login",{
                    name: inputData.name,
                    password: inputData.password,
                })
                localStorage.setItem("token", token.data.token);
                navigate("/")
            } else {
                toast("Please enter the required field")
            }
            } catch (e) {
                toast(e.message)
            }
        }
  return (
    <>
    <div className='w-[100vw] h-[100vh]  flex justify-center items-center'>
                <div className=' w-[20VW] flex items-center h-[60vh]  rounded-3xl shadow-lg'>
                    <form className="max-w-md mx-auto">
                        <h1 className='text-3xl pb-4'>Login</h1>
                        <div className="relative z-0 w-full mb-5 group">
                            <input onChange={onChange} value={inputData.name} name="name"  className=" block py-2.5 px-0 w-[100%] text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input onChange={onChange} value={inputData.password} type="password" name="password" className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                        </div>
                        <button onClick={(e)=>{handleOnClick(e)}} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                    </form>
                </div>
            </div>
    </>
  )
}

export default LoginPage