import { useEffect, useState } from "react";
import TableComponent from "../../../Components/Dashboard/TableComponent/TableComponent";
import { Axios } from "../../../Components/Api/Axios/Axios";
import { pro, PRO } from "../../../Components/Api/Api";
import { Link } from "react-router-dom";

export default function Products()
{
    const[ProductsArray , setProductsArray] = useState([])
   // const[deleteCategories , setDeleteCategories] = useState(true)
    const header = [
        {
          'name' : 'Images',
          'key' : 'images'
        }
        ,
        {
           'name' : 'Title',
           'key' : 'title'
        }
        ,
        {
            'name' :'Description',
            'key' : 'description'
        }
        ,
        {
            'name' :'Price',
            'key' : 'price'
        }
        ,
        {
            'name' :'Rating',
            'key' : 'rating'
        }
    ];

    useEffect(() => {
      Axios.get(`/${PRO}`)
      .then((data) => setProductsArray(data.data))
    }, [])


      if(localStorage.getItem('delete')=== 'deleted item') 
      {
       // setDeleteCategories(false)
        localStorage.setItem('delete' , 'done')
      }

    
    return(
        <div className='w-[76%] my-[5px] mx-auto flex flex-col items-start gap-1 pl-[10px] box-border pt-[10px]'>
              <div className="w-full flex items-center justify-between">
                <h1 className="text-[22px] md:text-[38px] font-[Roboto] text-purple-800 font-bold">Products page</h1>
                <Link className="flex justify-center items-center gap-2 p-2 md:p-4 bg-purple-800 rounded-[20px] text-white text-[14px] md:text-[22px] hover:bg-white hover:border-[2px] hover:border-purple-800 hover:text-purple-800 w-[100px] md:w-[190px] font-[Roboto]" to='/dashboard/user/Catgory'>Add Product</Link>
             </div>
            <TableComponent
               header={header}
               data={ProductsArray}
               delete={pro}
               link='products'
            />
        </div>
    )
}