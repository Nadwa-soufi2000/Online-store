import { useEffect, useState } from "react";
import TableComponent from "../../../Components/Dashboard/TableComponent/TableComponent";
import { Axios } from "../../../Components/Api/Axios/Axios";
import { CAT, CAT2 } from "../../../Components/Api/Api";
import { Link } from "react-router-dom";

export default function Catgories()
{
    const[catgoriesArray , setcatgoriesArray] = useState([])
    const[deleteCategories , setDeleteCategories] = useState(true)
    const header = [
        {
           'name' : 'Title',
           'key' : 'title'
        }
        ,
        {
            'name' :'Image',
            'key' : 'image'
        }
    ];

    useEffect(() => {
      Axios.get(`/${CAT}`)
      .then((data) => setcatgoriesArray(data.data))
    }, [])

    useEffect(() => {
        Axios.get(`/${CAT}`)
        .then((data) => setcatgoriesArray(data.data))
      }, [deleteCategories])


      if(localStorage.getItem('delete')=== 'deleted item') 
      {
        setDeleteCategories(false)
        localStorage.setItem('delete' , 'done')
      }

    
    return(
        <div className='w-[76%] my-[5px] mx-auto flex flex-col items-start gap-1 pl-[10px] box-border pt-[10px]'>
              <div className="w-full flex items-center justify-between">
                <h1 className="text-[20px] md:text-[38px] font-[Roboto] text-purple-800 font-bold">Categories page</h1>
                <Link className="flex justify-center items-center gap-2 p-2 md:p-4 bg-purple-800 rounded-[20px] text-white text-[14px] md:text-[22px] w-[110px] md:w-[190px] font-[Roboto] hover:bg-white hover:border-[2px] hover:border-purple-800 hover:text-purple-800" to='/dashboard/user/Catgory'>Add Category</Link>
             </div>
            <TableComponent
               header={header}
               data={catgoriesArray}
               delete={CAT2}
               link='catgories'
            />
        </div>
    )
}