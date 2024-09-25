import { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Axios } from "../../../Components/Api/Axios/Axios";
import { CAT2 } from "../../../Components/Api/Api";
import { MdOutlineSubtitles } from "react-icons/md";
//import { FaImage } from "react-icons/fa6";
export default function AddCategories()
{
    const[title , setTitle] = useState('');
    const[image , setImage] = useState();


    async function addCategories(e)
    {
        e.preventDefault();
        const form = new FormData();
        form.append("title" , title)
        form.append("image" , image)
        try {
          const res = await Axios.post(`/${CAT2}/add` ,   form );
          console.log(res)
          window.location.pathname = '/dashboard/user/categories'
        }catch(err) {
          console.log(err)
        }
    }
    return(
        <div className="w-[1100px] my-[5px] mx-auto flex flex-col items-center gap-1  box-border pt-[10px]">
        <form onSubmit={addCategories} className="flex justify-center items-center gap-7 flex-col p-4 shadow-2xl  sm:w-[80%] md:w-[70%] lg:w-[520px]">
          <h2 className=" text-[22px] sm:text-[26px] md:text-[30px] lg:text-[35px] font-medium text-[#000000] font-[Roboto] ">Add Category</h2>
           <div className="flex items-start flex-col gap-3 w-[94%] sm:w-[86%]">
             <label className="text-gray-500 text-[20px] sm:text-[24px] md:text-[28px] font-[Roboto]">Title</label>
             <div className="flex justify-around items-center w-full border border-solid border-b-gray-500 border-b-4 border-l-0 border-r-0 border-t-0 p-2">
                 <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-[90%] outline-none pl-2 " type="text" required/>
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
              <button className="flex justify-center items-center gap-2 p-4 bg-purple-800 rounded-[20px] text-white text-[18px] sm:text-[22px] w-full sm:w-[250px] font-[Roboto]">Add Categories <FaArrowRightLong className="mt-1"/></button>
           </div>
         </form>
     </div>
    )
}