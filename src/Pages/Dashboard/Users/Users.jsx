import { useEffect, useState } from "react"
import { user, USER } from "../../../Components/Api/Api"
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { Axios } from "../../../Components/Api/Axios/Axios";

export default function Uesrs()
{
    const[usersArray , setusersArray] = useState([])
    const[deleteUser , setDeleteUser] = useState(true);
    const[currentUser , setCurrentUser] = useState('')

    console.log(usersArray)

    useEffect(() => {
      Axios.get(`/${USER}`)
      .then((data) => {console.log(data) ; setusersArray(data.data)})
    }, [deleteUser])


    const showUsers = usersArray.map((item , key) => 
      <tr key={key} style={{backgroundColor : key % 2 === 0 && '#f1f7f0'}}>
        <td className="text-[20px] font-[Roboto] p-3">{item.id}</td>
        <td className="text-[20px] font-[Roboto] p-3">{item.name}</td>
        <td className="text-[20px] font-[Roboto] p-3">{item.email}</td>
        <td className=" flex justify-center items-center gap-1  p-3">
             <Link to={`${item.id}`}><FaRegEdit className=" w-[20px] text-purple-800 fill-current" /></Link>  
             <MdDelete onClick={() => handleDelete(item.id)} className="w-[20px] text-purple-800 fill-current"/>
        </td>
      </tr>
    )
    

    async function handleDelete(id)
    {
      try{
        let res = await Axios.delete(`${user}/${id}`)
        console.log(res)
        setDeleteUser((prev) => !prev)
      }catch(err)
      {
        console.log(err)
      }
    }

    return(
        <div className="w-[1100px] my-[5px] mx-auto flex flex-col items-start gap-1 pl-[10px] box-border pt-[10px]">
           <h1 className="text-[38px] font-[Roboto] text-purple-800 font-bold">Users page</h1>
           <table className="w-full border border-b-[1px] border-solid border-[#CFCFCF] relative top-[6px] left-[12px] border-collapse table-fixed">
            <thead>
              <tr>
                <th className="text-[22px] font-[Roboto] border-[1px] border-solid border-[#95dae4] p-3">id</th>
                <th className="text-[22px] font-[Roboto] border-[1px] border-solid border-[#95dae4] p-3">Name</th>
                <th className="text-[22px] font-[Roboto] border-[1px] border-solid border-[#95dae4] p-3">Email</th>
                <th className="text-[22px] font-[Roboto] border-[1px] border-solid border-[#95dae4] p-3">Action</th>
              </tr>
            </thead>
            <tbody>
               {showUsers.length === 0 ? <tr>Loading</tr> : showUsers }
            </tbody>
           </table>
        </div>
    )
}