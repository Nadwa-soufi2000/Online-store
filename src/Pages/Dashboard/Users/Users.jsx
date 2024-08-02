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
    //const[noUsers , setNoUsers] = useState(true)
     //const currentUser = localStorage.getItem("userId")
    console.log(usersArray)

    useEffect(() => {
         Axios.get(`${user}`)
         .then((data) => setCurrentUser(data.data))
    }, [])

    useEffect(() => {
      Axios.get(`/${USER}`)
      .then((data) => {console.log(data) ; setusersArray(data.data)})
    }, [deleteUser])

    const userFilter = usersArray.filter((item) => item.id !== currentUser.id)
    console.log( userFilter)
    const showUsers = usersArray.map((item , key) => 
      <tr key={key} style={{backgroundColor : key % 2 === 0 && '#f1f7f0'}}>
        <td className="text-[20px] font-[Roboto] p-3">{item.id}</td>
        <td className="text-[20px] font-[Roboto] p-3">{currentUser.name === item.name ? item.name + "(you)" : item.name}</td>
        <td className="text-[20px] font-[Roboto] p-3">{item.email}</td>
        <td className="text-[20px] font-[Roboto] p-3">
          {
          item.role === '1995' ? 
          'admin' 
          : 
          item.role === '2001' ? 
          'user' 
          : 'writer'
          }
          </td>
        <td className=" flex justify-center items-center gap-1  p-3">
             <Link to={`${item.id}`}><FaRegEdit className=" w-[20px] text-purple-800 fill-current" /></Link>  
            <div>
                <MdDelete 
                     onClick={() => handleDelete(item.id)} 
                     style={{
                          color: item.id === currentUser.id ? 'gray' : 'purple' , 
                          width:'24px'
                          }}
                      />
             </div>
        </td>
      </tr>
    )
    

    async function handleDelete(id)
    {
      if(currentUser.id !== id) {
           try{
               let res = await Axios.delete(`${user}/${id}`)
               console.log(res)
               setDeleteUser((prev) => !prev)
           }catch(err)
              {
               console.log(err)
              }
         }
    }

    return(
        <div className="w-[1100px] my-[5px] mx-auto flex flex-col items-start gap-1 pl-[10px] box-border pt-[10px]">
          <div className="w-full flex items-center justify-between">
             <h1 className="text-[38px] font-[Roboto] text-purple-800 font-bold">Users page</h1>
             <Link className="flex justify-center items-center gap-2 p-4 bg-purple-800 rounded-[20px] text-white text-[18px] sm:text-[22px] w-[120px] sm:w-[190px] font-[Roboto]" to='/dashboard/user/add'>Add User</Link>
          </div>
           <table className="w-full border border-b-[1px] border-solid border-[#CFCFCF] relative top-[6px] left-[12px] border-collapse table-fixed">
            <thead>
              <tr>
                <th className="text-[22px] font-[Roboto] border-[1px] border-solid border-[#95dae4] p-3">id</th>
                <th className="text-[22px] font-[Roboto] border-[1px] border-solid border-[#95dae4] p-3">Name</th>
                <th className="text-[22px] font-[Roboto] border-[1px] border-solid border-[#95dae4] p-3">Email</th>
                <th className="text-[22px] font-[Roboto] border-[1px] border-solid border-[#95dae4] p-3">Role</th>
                <th className="text-[22px] font-[Roboto] border-[1px] border-solid border-[#95dae4] p-3">Action</th>
              </tr>
            </thead>
            <tbody>
               {
               showUsers.length === 0 ? 
               <div className="bg-gray-300 w-[1090px] flex justify-center items-center"><td className="text-[20px] font-[Roboto] text-center">Loading...</td></div> 
               : showUsers
                }
            </tbody>
           </table>
        </div>
    )
}