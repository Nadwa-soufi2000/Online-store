import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
//import { user } from "../../Api/Api";
//import { useState } from "react";
import { Axios } from "../../Api/Axios/Axios";
import '../../../index.css' 
import PaginatedItems from "../Pagination/Pagination";
import { useEffect, useState } from "react";


export default function TableComponent(props)
{
    const currentuser = props.currentUser || false;

    //const start = (props.page - 1) * props.limit  ;
    //const end = start + props.limit;
    //const final = props.data.slice(start , end);


    const[search , setSearch] = useState('');
    const[filterdData , setFilterdData] = useState([])
    const showSelectData = filterdData.length > 0  ? filterdData : props.data ;


    //search on frontEnd
    //const filteredData = props.data.filter((item) => item[props.search].toLowerCase().includes(search.toLowerCase()));
    

    useEffect(() => {
        const debounes = setTimeout(() => {
         search.length > 0 && handleSearch();
        } , 500)

        return () => clearTimeout(debounes);
      },[search])
    
      async function handleSearch()
      {
         try{
           const res = await Axios.post(`${props.searchLink}/search?title=${search}`)
           console.log(res)
           setFilterdData(res.data)
         } catch(err) {
          console.log(err)
         }
      }


    const showHeader = props.header.map((item , key3) => <th key={key3}  className="text-[22px] font-[Roboto] p-3 text-center">{item.name}</th>)
    const showData = showSelectData.map((item , key) => (
         <tr key={key} style={{backgroundColor : key % 2 === 0 && '#bfbfbf'}}>
           <td data-table='Id :' className="text-[15px] lg:text-[20px] font-[Roboto] text-left p-3">{item.id}</td>
          {props.header.map((item2 , key2) => (
            <td key={key2} data-table={item2.key !== 'description' ?  item2.key + ":" : ''} className="text-[15px] lg:text-[18px] font-[Roboto] text-left p-3 ">
                {item[item2.key] === '1995' 
                ? 'admin'
                : item[item2.key] === '2001' 
                ?  'user' 
                : item[item2.key] === '1996'
                ? 'writer' 
                : item2.key === 'image'
                ? <div className="flex justify-center items-center"><img src={item[item2.key]} className="w-[70px] h-[70px]" alt=" "/></div>
                : item2.key === 'images' 
                ? item[item2.key].map((i , index) =>  
                   <div key={index} className=" flex flex-warp justify-center items-center p-1">
                       <img className="w-[50px] h-[50px] " src={i.image} alt=""/>  
                   </div>
                    )
                : item[item2.key] 
                }
                {currentuser && currentuser.name === item[item2.key] && '(you)'}
                </td>
          ))}
          <td className=" flex justify-left items-center gap-1  p-3">
             <Link to={`${item.id}`}><FaRegEdit className=" w-[20px] text-purple-800 fill-current" /></Link>  
            <div>
                <MdDelete 
                     onClick={() => handle(item.id)}
                     style={{
                          color:  currentuser.id === item.id ? 'gray' : 'purple' , 
                          width:'24px'
                          }}
                      />
             </div>
        </td>
        </tr>
    ));

    async function handle(id)
    {
           try{
               let res = await Axios.delete(`${props.delete}/${id}`)
               console.log(res)
               localStorage.setItem('delete' , 'deleted item')
               window.location.pathname = `dashboard/${props.link}`

           }catch(err)
              {
               console.log(err)
              }
    }
  // search in frontEnd
   // function handelSearch(e) 
   // {
     //   console.log(e.target.value);
      //  setSearch(e.target.value);

   // }
    


   console.log(showData)
    return(
       <>
        <input type="search" placeholder="search" onChange={(e) => setSearch(e.target.value)} className="sm:w-[300px] w-full h-[55px] pl-3 outline-none rounded-[10px] shadow-xl"/>
        <table className="sm:w-full w-[94%]  border border-b-[1px] border-solid border-[#cfcfcf]   border-collapse table-fixed shadow-2xl">
        <thead>
          <tr className="bg-slate-400">
          <th className="text-[22px] font-[Roboto] p-3 text-center">Id</th>
            {showHeader}
            <th className="text-[22px] font-[Roboto] p-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
           {
           showData.length === 0 ? 
          <td className="text-[20px] font-[Roboto] text-center  w-[1000px] flex justify-center items-center">Loading...</td>
           : showData
            }
        </tbody>
       </table>

       <PaginatedItems
           setPage={props.setPage}  
           itemsPerPage={props.limit} 
           total={props.total}
       />

       </>
    )
}