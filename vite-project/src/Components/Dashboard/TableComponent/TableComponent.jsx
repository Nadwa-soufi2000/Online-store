import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
//import { user } from "../../Api/Api";
//import { useState } from "react";
import { Axios } from "../../Api/Axios/Axios";
import '../../../index.css' 
export default function TableComponent(props)
{
    //const[deleteUser , setDeleteUser] = useState(true);
   // const[currentUser , setCurrentUser] = useState('')
     // const[temp , setTemp] = useState([props.data]);
      //console.log(temp)
    const currentuser = props.currentUser || false;
    let pics ;

    const showHeader = props.header.map((item , key3) => <th key={key3}  className="text-[22px] font-[Roboto] p-3">{item.name}</th>)
    const showData = props.data.map((item , key) => (
         <tr key={key} style={{backgroundColor : key % 2 === 0 && '#bfbfbf'}}>
           <td data-table='Id' className="text-[17px] lg:text-[20px] font-[Roboto] text-center p-3">{item.id}</td>
          {props.header.map((item2 , key2) => (
            <td key={key2} data-table={item2.key} className="text-[17px] lg:text-[20px] font-[Roboto] text-center p-3">
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
                   <div key={index} className=" w-full flex justify-center items-center p-1">
                       <img className="w-[50px] h-[50px] " src={i.image} alt=""/>  
                   </div>
                    )
                : item[item2.key] 
                }
                {currentuser && currentuser.name === item[item2.key] && '(you)'}
                </td>
          ))}
          <td className=" flex justify-center items-center gap-1  p-3">
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

    


   console.log(showData)
    return(
        <table className="w-full border border-b-[1px] border-solid border-[#cfcfcf]   border-collapse table-fixed shadow-2xl">
        <thead>
          <tr className="bg-slate-400">
          <th className="text-[22px] font-[Roboto] p-3">Id</th>
            {showHeader}
            <th className="text-[22px] font-[Roboto] p-3">Action</th>
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
    )
}