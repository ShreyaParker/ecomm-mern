import React, {useState} from 'react';
import axios from "axios";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";


const Login = ({setLogin,setIsUser}) => {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [_,setCookies ] = useCookies(["access-token"])

    const navigation = useNavigate()
    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
            const result = await axios.post(`http://localhost:${process.env.REACT_APP_PORT}/user/login`,{
                username,password
            })

            setCookies("access_token",result.data.token)
            console.log(_)
            localStorage.setItem("userId" , result.data.userId)
            setIsUser(true)

            navigation("/")




            alert("Login Completed : Now start shopping")
        }catch (e){
            console.log(e)
        }

    }
    return (
        <div className="flex flex-col">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 flex items-center">
                <h2 className="">
                   Welcome
                </h2>
                <div className=" flex flex-col gap-2">
                    <label htmlFor="username">
                        UserName
                    </label>
                    <input id="username" className="rounded p-2  " type={"text"} value={username} onChange={(e)=>setUsername(e.target.value)}/>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="password">
                        Password
                    </label>
                    <input id="password" className="rounded p-2  "  type={"password"}
                           value={password} onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="py-4 px-6 m-4 border-cyan-400 border-2 rounded-2xl ">
                    Login
                </button>
            </form>

            <div className="flex justify-center">
                <h2 className={"font-bold"}>

                    Not a user?
                </h2>
                <button onClick={()=>setLogin(false)} className="px-2 text-cyan-600">
                   Register
                </button>
            </div>

        </div>
    );
};

export default Login;