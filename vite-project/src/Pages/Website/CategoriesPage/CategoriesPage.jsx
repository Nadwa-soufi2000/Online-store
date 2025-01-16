import { useEffect, useState } from "react";
import { Axios } from "../../../Components/Api/Axios/Axios";
import { CAT } from "../../../Components/Api/Api";
import Navbar from "../../../Components/Website/Navbar/Navbar";

export default function CategoriesPage()
{
    const[categories , setCategories] = useState([])
    useEffect(() => {
        Axios.get(`/${CAT}`)
        .then((res) => setCategories(res.data.data))
    }, [])

     console.log(categories)
    const showCategories = categories.map((item , key) =>
        <div key={key} className="flex w-[250px] h-[100px] hover:scale-[1.2] transition-[2s] justify-center items-center p-3 rounded-[15px] gap-3 bg-[#def5f7] shadow-xl">
             <img src={item.image} className="w-[50px] h-[50px]" alt=""/>
             <p className="text-[#000000] text-[20px] font-[Roboto]">{item.title.length > 12 ? item.title.slice(1 , 12) + '....' : item.title}</p>
        </div>
    )
    return(
        <div>
            <Navbar/>
            <div className="w-full flex justify-center items-center gap-5 flex-wrap bg-slate-100 p-7">
                {showCategories}
            </div>
        </div>
    )
}