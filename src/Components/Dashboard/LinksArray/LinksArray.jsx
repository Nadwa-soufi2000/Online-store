import { FaUsers } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";


export const LinksArray = [
    {
        "name" : "Users",
        "path" : "users",
        "icon" :  <FaUsers />,
        "role" : "1995"
    }
    ,
    {
        "name" : "Add user",
        "path" : "/dashboard/user/add",
        "icon" :  <FaPlus />,
         "role" : "1995"
    }
    ,
    {
        "name" : "Writer",
        "path" : "/dashboard/user/writer",
        "icon" :  <FaPlus />,
        "role" : ["1995" , "1996"]
    }
]

