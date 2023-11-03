import React, {useState} from 'react';
import axios from "axios";

const Register = ({setRegister}) => {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
            const port = process.env.REACT_APP_PORT;
            await axios.post(`http://localhost:${port}/user/register`, {username, password});
            alert("Registration Completed : Now Login")
        }catch (e){
            alert(e.message)
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
                    <input id="username" className="rounded p-2  "  type={"text"} value={username} onChange={(e)=>setUsername(e.target.value)}/>
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
                    Register
                </button>
            </form>

            <div className="flex justify-center">
                <h2 className={"font-bold"}>

                    Already a user?
                </h2>
                <button onClick={()=>setRegister(false)} className="px-2">
                    Login
                </button>
            </div>

        </div>
    );
};

export default Register;