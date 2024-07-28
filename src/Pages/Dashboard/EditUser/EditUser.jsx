import { FaUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaArrowRightLong } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { user } from "../../../Components/Api/Api";
//import Cookie from "cookie-universal"
import { Axios } from "../../../Components/Api/Axios/Axios";
export default function EditUser()
{
    //const cookie = Cookie()
   // const token = cookie.get("e-commerce")
    const[name , setName] = useState("")
    const[email , setEmail] = useState("")
    const[disable , setDisable] = useState('')

    let id = Number(window.location.pathname.replace("/dashboard/users/" , ""))
    console.log(id)

    useEffect(() => {
       Axios.get(`/${user}/${id}`)
       .then((data) => {setName(data.data.name) ; setEmail(data.data.email)})
       .then(() => setDisable(false))
    }, [])

   async function editData(e)
    {
        e.preventDefault();
        try {
          const res = await Axios.post(`/${user}/edit/${id}` , {name: name , email: email});
          console.log(res)
          window.location.pathname = '/dashboard'
        }catch(err) {
          console.log(err)
        }
    }
    return(
        <div className="w-[1100px] my-[5px] mx-auto flex flex-col items-center gap-1  box-border pt-[10px]">
           <h1 className="text-[38px] font-[Roboto] text-purple-800 font-bold">Edit user</h1>
           <form onSubmit={editData} className="flex justify-center items-center gap-7 flex-col p-4 shadow-2xl  sm:w-[80%] md:w-[70%] lg:w-[520px]">
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
                    <input className="w-[90%] outline-none pl-2" type="password"/>
                    <RiLockPasswordFill className=" w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] text-purple-800 fill-current" />
                </div>
              </div>
              <div className="flex items-start w-[94%] sm:w-[86%]">
                 <button disabled={disable} className="flex justify-center items-center gap-2 p-4 bg-purple-800 rounded-[20px] text-white text-[18px] sm:text-[22px] w-[120px] sm:w-[190px] font-[Roboto]">Edit <FaArrowRightLong className="mt-1"/></button>
              </div>
            </form>
        </div>
    )
}