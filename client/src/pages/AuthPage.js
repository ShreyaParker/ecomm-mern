import React, {useState} from 'react';
import Register from "../components/Register";
import Login from "../components/Login";

const AuthPage = () => {
    const [register,setRegister]=useState(false)
    const [login,setLogin]=useState(false)

    return (
        <div className={"flex justify-center items-center h-screen   "}>
            <div className={"rounded-2xl bg-gray-200 h-1/2 w-1/2 flex justify-center items-center flex-col"}>
                {
                    register ?
                        <Register setRegister={setRegister}/>


                     : login ?
                            <Login setLogin={setLogin}/>

                            :


                      <div className="flex flex-col">
                          <button onClick={()=>setRegister(true)} className="py-4 px-6 m-4 border-cyan-400 border-2 rounded-2xl ">
                              Register
                          </button>
                          <button onClick={()=> setLogin(true)} className="py-4 px-6 m-4 border-cyan-400 border-2 rounded-2xl ">
                              Login
                          </button>
                      </div>
                }


            </div>
        </div>
    );
};

export default AuthPage;