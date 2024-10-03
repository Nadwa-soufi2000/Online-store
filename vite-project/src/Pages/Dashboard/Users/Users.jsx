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
    }, [])


    useEffect(() => {
      Axios.get(`/${USER}`)
      .then((data) => {console.log(data) ; setusersArray(data.data)})
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

    //const userFilter = usersArray.filter((item) => item.id !== currentUser.id)
   // console.log( userFilter)
   // const showUsers = usersArray.map((item , key) => 
     // <tr key={key} style={{backgroundColor : key % 2 === 0 && '#f1f7f0'}}>
      //  <td className="text-[20px] font-[Roboto] p-3">{item.id}</td>
       // <td className="text-[20px] font-[Roboto] p-3">{currentUser.name === item.name ? item.name + "(you)" : item.name}</td>
      //  <td className="text-[20px] font-[Roboto] p-3">{item.email}</td>
       // <td className="text-[20px] font-[Roboto] p-3">
         // {
         // item.role === '1995' ? 
         // 'admin' 
         // : 
         // item.role === '2001' ? 
        //  'user' 
         // : 'writer'
         // }
         // </td>
       // <td className=" flex justify-center items-center gap-1  p-3">
            // <Link to={`${item.id}`}><FaRegEdit className=" w-[20px] text-purple-800 fill-current" /></Link>  
           // <div>
              //  <MdDelete 
                    // onClick={() => handleDelete(item.id)} 
                     //style={{
                        //  color: item.id === currentUser.id ? 'gray' : 'purple' , 
                         // width:'24px'
                         // }}
                    //  />
            // </div>
       // </td>
      //</tr>
  //  )
    
    return(
        <div className="w-[76%] gap-4 p-4 my-[5px] mx-auto flex flex-col items-start  box-border pt-[10px]">
          <div className="w-full flex items-center justify-between">
             <h1 className="text-[22px] md:text-[38px] font-[Roboto] text-purple-800 font-bold">Users page</h1>
             <Link className="flex justify-center items-center gap-2 p-2 md:p-4 bg-purple-800 rounded-[20px] text-white text-[14px] md:text-[22px] w-[100px] md:w-[190px] font-[Roboto] hover:bg-white hover:border-[2px] hover:border-purple-800 hover:text-purple-800" to='/dashboard/user/add'>Add User</Link>
          </div>
        
           <TableComponent 
              header={header} 
              data={usersArray}
              currentUser={currentUser}
              delete={user}
              link='users'
            />
        </div>
    )
}