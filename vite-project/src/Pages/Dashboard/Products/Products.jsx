import { useEffect, useState } from "react";
import TableComponent from "../../../Components/Dashboard/TableComponent/TableComponent";
import { Axios } from "../../../Components/Api/Axios/Axios";
import { pro, PRO } from "../../../Components/Api/Api";
import { Link } from "react-router-dom";

export default function Products()
{
    const[ProductsArray , setProductsArray] = useState([])
    const[limit , setLimit] = useState(6) ;
    const[page , setPage] = useState(1)
    const[total , setTotal] = useState(0)
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
      Axios.get(`/${PRO}?page=${page}&limit=${limit}`)
      .then((data) => {setProductsArray(data.data.data) ; setTotal(data.data.total)})
    }, [ limit , page])


      if(localStorage.getItem('delete')=== 'deleted item') 
      {
       // setDeleteCategories(false)
        localStorage.setItem('delete' , 'done')
      }

    
    return(
        <div className='sm:w-[76%] w-[85%] my-[5px] mx-auto flex flex-col sm:items-start items-end  gap-1 pl-[10px] box-border pt-[10px]'>
              <div className="w-full flex items-center justify-between">
                <h1 className="text-[22px] md:text-[38px] font-[Roboto] text-purple-800 font-bold">Products page</h1>
                <Link className="flex justify-center items-center no-underline gap-2 p-3 md:p-4 bg-purple-800 rounded-[20px] text-white text-[14px] md:text-[22px] w-[110px] md:w-[190px] font-[Roboto] hover:bg-purple-400 hover:border-[2px] hover:border-purple-800 hover:text-purple-800" to='/dashboard/user/Catgory'>Add Product</Link>
             </div>
            <TableComponent
               header={header}
               data={ProductsArray}
               delete={pro}
               link='products'
               limit={limit}
               page={page}
               setPage={setPage}
               total={total}
               search='title'
               searchLink={pro}
            />
        </div>
    )
}