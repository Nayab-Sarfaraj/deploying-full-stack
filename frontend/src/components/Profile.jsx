import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Profile = () => {
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    const getUserProfile = async () => {

        try {
            const { data } = await axios.get("/me")
            if (!data.success) navigate("/login")
            setUser(data.user)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getUserProfile()
    }, [])
    const handleLogout = async () => {
        try {
            const { data } = await axios.get("/logout")
            if (data.success) navigate("/login")
            setUser({})
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='h-screen w-full bg-slate-700 flex items-center justify-center'>
            {
                user?.name ? <div className='text-center'>
                    <h1 className='text-2xl capitalize font-bold  text-white'>{user?.name}</h1>
                    <h2 className='text-xl italic font-bold  text-white my-5'
                    >{user?.email}</h2>
                    <button className='bg-red-700 text-white font-semibold px-3 py-2' onClick={handleLogout}>Logout</button>
                </div> : <><Link to={"/login"}>
                    <button className='bg-red-700 text-white font-semibold px-3 py-2'>Login</button>

                </Link></>
            }

        </div>
    )
}

export default Profile