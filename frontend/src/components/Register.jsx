import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            if (!email || !name || !password) return;
            console.log(email, password, name)
            const { data } = await axios.post("/register", { email, name, password })
            console.log(data)
            if (data.success) navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='h-screen  w-full flex flex-col items-center justify-center bg-slate-800'>
            <div className='w-[20%] h-[65%] py-5 bg-slate-500'>
                <h1 className=' text-white text-2xl  font-bold w-full text-center'>Regitser</h1>
                <form className='flex items-center justify-center gap-10 h-full w-full flex-col' >
                    <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' className=' px-2 py-1 ' />

                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className=' px-2 py-1 ' />

                    <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className=' px-2 py-1 ' />
                    <button type='submit' className='bg-black text px-2 py-2 text-white' onClick={handleSubmit}>Submit</button>
                    <Link to={"/login"}><div className='w-full text-right'>Alreadyy have a account ? Login</div></Link>
                </form>
            </div>
        </div>
    )
}

export default Register