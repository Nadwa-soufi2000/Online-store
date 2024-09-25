import { FaArrowRightLong } from "react-icons/fa6";
import { MdOutlineSubtitles } from "react-icons/md";
import { useEffect, useState } from "react";
import { CAT2, user } from "../../../Components/Api/Api";
import { Axios } from "../../../Components/Api/Axios/Axios";
import { useNavigate } from "react-router-dom";
export default function EditUser()
{
    const[Title , setTitle] = useState('')
    const[image , setImage] = useState('')
    const[disable , setDisable] = useState(true)

    const nav = useNavigate();

    let id = Number(window.location.pathname.replace("/dashboard/categories/" , ""))
    console.log(id)

    useEffect(() => {
       Axios.get(`/${CAT2}/${id}`)
       .then((data) => {
        setTitle(data.data.title)
      })
       .then(() => setDisable(false))
       .catch(() => nav("/dashboard/users/page/404"))
       
    }, [])

   async function editData(e)
    {
        e.preventDefault();
        const Form = new FormData()
        Form.append('title' , Title)
        Form.append('image' , image)
        try {
          const res = await Axios.post(`/${CAT2}/edit/${id}` , Form);
          console.log(res)
          window.location.pathname = '/dashboard/categories'
        }catch(err) {
          console.log(err)
        }
    }
    return(
        <div className="w-[1100px] my-[5px] mx-auto flex flex-col items-center gap-1  box-border pt-[10px]">
           <form onSubmit={editData} className="flex justify-center items-center gap-7 flex-col p-4 shadow-2xl  sm:w-[80%] md:w-[70%] lg:w-[520px]">
              <div className="flex items-start flex-col gap-3 w-[94%] sm:w-[86%]">
                <label className="text-gray-500 text-[20px] sm:text-[24px] md:text-[28px] font-[Roboto]">Title</label>
                <div className="flex justify-around items-center w-full border border-solid border-b-gray-500 border-b-4 border-l-0 border-r-0 border-t-0 p-2">
                    <input value={Title} onChange={(e) => setTitle(e.target.value)} className="w-[90%] outline-none pl-2 " type="text"required/>
                    <MdOutlineSubtitles className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] text-purple-800 fill-current" />
                </div>
              </div>
              <div className="flex items-start flex-col gap-3 w-[94%] sm:w-[86%] ">
                <label className="text-gray-500 text-[20px] sm:text-[24px] md:text-[28px] font-[Roboto]">Image</label>
                <div className="relative flex justify-center items-center w-full border border-solid border-b-gray-500 border-b-4 border-l-0 border-r-0 border-t-0 p-2 mt-4">
                    <label htmlFor="1" className="w-[100%] font-[Roboto] outline-none p-3 bg-gray-200 rounded-[10px] absolute z-20 flex justify-center items-center">Add Image</label>
                    <input id="1" onChange={(e) => setImage(e.target.files[0])} className="w-[100%] outline-none p-3  absolute z-10 " type="file" required/>
                </div>
              </div>
              <div className="flex items-start w-[94%] sm:w-[86%]">
                 <button disabled={disable} className="flex justify-center items-center gap-2 p-4 bg-purple-800 rounded-[20px] text-white text-[18px] sm:text-[22px] w-[120px] sm:w-[190px] font-[Roboto]">Edit <FaArrowRightLong className="mt-1"/></button>
              </div>
            </form>
        </div>
    )
}