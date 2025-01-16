import { useEffect, useState } from "react"
import { user, USER } from "../../../Components/Api/Api"
//import { FaRegEdit } from "react-icons/fa";
//import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { Axios } from "../../../Components/Api/Axios/Axios";
import TableComponent from "../../../Components/Dashboard/TableComponent/TableComponent";

export default function Uesrs()
{
    const[usersArray , setusersArray] = useState([])
    const[deleteUser , setDeleteUser] = useState(true);
    const[currentUser , setCurrentUser] = useState('');
    const[limit , setLimit] = useState(3) ;
    const[page , setPage] = useState(1)
    const[total , setTotal] = useState(0)
    //const[noUsers , setNoUsers] = useState(true)
     //const currentUser = localStorage.getItem("userId")
    console.log(usersArray)

    useEffect(() => {
         Axios.get(`${user}`)
         .then((data) => setCurrentUser(data.data))
    }, [])

    useEffect(() => {
      Axios.get(`/${USER}?page=${page}&limit=${limit}`)
      .then((data) => {console.log(data) ; setusersArray(data.data.data) ; setTotal(data.data.total)})
    }, [limit , page])


    useEffect(() => {
      Axios.get(`/${USER}`)
      .then((data) => {console.log(data) ; setusersArray(data.data.data) ; console.log(usersArray)})
    }, [deleteUser])

    if(localStorage.getItem('delete') === 'deleted item') 
    {
      setDeleteUser(false)
      localStorage.setItem('delete' , 'done')
    }


    const header = [
      
      {
        "key" : "name",
        "name" : "Username"
      }
      ,
      {
        "key" : "email",
        "name" : "Email"
      }
      ,
      {
        "key" : "role",
        "name" : "Role"
      }
    ]
    
    return(
        <div className="sm:w-[76%] w-[85%] gap-4 p-4 my-[5px] mx-auto flex flex-col sm:items-start items-end  box-border pt-[10px]">
          <div className="w-full flex items-center justify-between">
             <h1 className="text-[22px] md:text-[38px] font-[Roboto] text-purple-800 font-bold">Users page</h1>
             <Link className="flex justify-center items-center no-underline gap-2 p-3 md:p-4 bg-purple-800 rounded-[20px] text-white text-[14px] md:text-[22px] w-[100px] md:w-[190px] font-[Roboto] hover:bg-purple-400 hover:border-[2px] hover:border-purple-800 hover:text-purple-800" to='/dashboard/user/add'>Add User</Link>
          </div>
        
           <TableComponent 
              header={header} 
              data={usersArray}
              currentUser={currentUser}
              delete={user}
              link='users'
              limit={limit}
              page={page}
              setPage={setPage}
              total={total}
              search='name'
              searchLink={user}
            />
        </div>
    )
}