import { FaUserCircle } from "react-icons/fa"
import { FaUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaArrowRightLong } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import axios from "axios";
import { baseUrl, REGISTER } from "../../../Components/Api/Api";
import Cookie from 'cookie-universal'
export default function Signup()
{
  const[name , setName] = useState();
  const[email , setEmail] = useState();
  const[password , setPassword] = useState();
  const[error , setError] = useState('');
  
  const cookie = Cookie();
 async function sendData(e)
  {
    const form = new FormData()
    form.append("name" , name)
    form.append("email" , email)
    form.append("password" , password)

      e.preventDefault();
      try {
          let response = await axios.post(`${baseUrl}/${REGISTER}` , form)
           console.log("Sucsses")
           console.log(response)
           const token = response.data.token;
           cookie.set("e-commerce" , token);
           window.location.pathname = '/dashboard/users'
      }catch(err) {
        console.log(err)
        console.log(err.response.status)
        setError(err.response.status)
      }
  }
    return(
        <div className="flex justify-center mt-8 mb-9 box-border items-center p-3 sm:p-0">
            <div className="flex justify-center items-center gap-7 flex-col p-4 shadow-2xl  sm:w-[80%] md:w-[70%] lg:w-[520px]">
              <FaUserCircle className=" w-[35px] h-[35px] sm:w-[40px] sm:h-[40px] md:w-[50px] md:h-[50px] text-purple-800 fill-current"/>
              <h2 className=" text-[22px] sm:text-[26px] md:text-[30px] lg:text-[35px] font-medium text-[#000000] font-[Roboto] ">Create Account</h2>
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
              <div className="flex items-start w-[94%] sm:w-[86%]">
                 <button onClick={sendData} className="flex justify-center items-center gap-2 p-4 bg-purple-800 rounded-[20px] text-white text-[18px] sm:text-[22px] w-[120px] sm:w-[190px] font-[Roboto]">Create <FaArrowRightLong className="mt-1"/></button>
              </div>
             { error === 422 && <div className="flex items-start w-[94%] sm:w-[86%]"><p className=" text-[17px] sm:text-[18px]  text-red-700 font-[Roboto]">The Email already been token!</p></div>}
              <span className="w-[86%] bg-gray-400 h-[2px] mt-2"></span>
              <h3 className=" text-[17px] sm:text-[22px] text-center text-gray-400 font-[Roboto]">Or create account using social media!</h3>
              <div className="flex justify-center items-center gap-3">
                 <a className=" text-[17px] sm:text-[22px] text-center text-gray-400 font-[Roboto] flex justify-center items-center gap-2" href={'http://127.0.0.1:8000/login-google'}><FcGoogle className="w-[24px] h-[24px]" />Sign in with google</a>
              </div>
            </div>
        </div>
    )
}