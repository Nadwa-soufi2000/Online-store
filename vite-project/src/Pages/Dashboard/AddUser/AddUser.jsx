import { FaUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaArrowRightLong } from "react-icons/fa6";
import {useState } from "react";
import { user } from "../../../Components/Api/Api";
import { FaUserCircle } from "react-icons/fa"
//import Cookie from "cookie-universal"
import { Axios } from "../../../Components/Api/Axios/Axios";
import Loading from "../../../Components/Website/Loadind/Loading";
export default function AddUser()
{
    //const cookie = Cookie()
   // const token = cookie.get("e-commerce")
    const[name , setName] = useState("")
    const[email , setEmail] = useState("")
    const[role , setRole] = useState('')
    const[password , setPassword] = useState('')
    const[loading , setLoading] = useState(false)


   async function addData(e)
    {
        setLoading(true);
        e.preventDefault();
        try {
          const res = await Axios.post(`/${user}/add` , 
            {
                name: name ,
                email: email,
                password: password,
                role: role
            });
          console.log(res)
          setLoading(false)
          window.location.pathname = '/dashboard/users'
        }catch(err) {
          console.log(err)
        }
    }
    return(
     <div className="relative w-[80%] mr-auto ml-auto">
         { loading && <Loading/> }
        <div className="w-full my-[5px] mx-auto flex flex-col items-center gap-1  box-border pt-[10px] z-10">
           <form onSubmit={addData} className="flex justify-center items-center gap-7 flex-col p-4 shadow-2xl  sm:w-[80%] md:w-[70%] lg:w-[520px]">
           <FaUserCircle className=" w-[35px] h-[35px] sm:w-[40px] sm:h-[40px] md:w-[50px] md:h-[50px] text-purple-800 fill-current"/>
              <div className="flex items-start flex-col gap-3 w-[94%] sm:w-[86%]">
                <label className="text-gray-500 text-[20px] sm:text-[24px] md:text-[28px] font-[Roboto]">Name</label>
                <div className="flex justify-around items-center w-full border border-solid border-b-gray-500 border-b-4 border-l-0 border-r-0 border-t-0 p-2">
                    <input value={name} onChange={(e) => setName(e.target.value)} className="w-[90%] outline-none pl-2 " type="text"required/>
                    <FaUser className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] text-purple-800 fill-current" />
                </div>
              </div>

              <div className="flex items-start flex-col gap-3 w-[94%] sm:w-[86%] ">
                <label className="text-gray-500 text-[20px] sm:text-[24px] md:text-[28px] font-[Roboto]">E-mail</label>
                <div className="flex justify-around items-center w-full border border-solid border-b-gray-500 border-b-4 border-l-0 border-r-0 border-t-0 p-2">
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-[90%] outline-none pl-2" type="email"/>
                    <MdEmail className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] text-purple-800 fill-current" />
                </div>
              </div>

              <div className="flex items-start flex-col gap-3 w-[94%] sm:w-[86%]">
                <label className="text-gray-500 text-[20px] sm:text-[24px] md:text-[28px] font-[Roboto]">Password</label>
                <div className="flex justify-around items-center w-full border border-solid border-b-gray-500 border-b-4 border-l-0 border-r-0 border-t-0 p-2">
                    <input value={password} onChange={(e) => setPassword(e.target.value)} className="w-[90%] outline-none pl-2" type="password"/>
                    <RiLockPasswordFill className=" w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] text-purple-800 fill-current" />
                </div>
              </div>
              <select className="w-[94%] sm:w-[86%] p-3 bg-gray-300 rounded-[10px]" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value='1995'>Admin</option>
                <option value='2001'>User</option>
                <option value='1996'>Wrtier</option>
              </select>
              <div className="flex items-start w-[94%] sm:w-[86%]">
                 <button className="flex justify-center items-center gap-2 p-4 bg-purple-800 rounded-[20px] text-white text-[18px] sm:text-[22px] w-[120px] sm:w-[190px] font-[Roboto]">Add user <FaArrowRightLong className="mt-1"/></button>
              </div>
            </form>
        </div>
        </div>
    )
}