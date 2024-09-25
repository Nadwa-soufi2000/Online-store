import { FaUsers } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { MdProductionQuantityLimits } from "react-icons/md"

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
    ,
    {
        "name" : "Catgories",
        "path" : "/dashboard/categories",
        "icon" :  <MdProductionQuantityLimits />,
        "role" : ["1995" , "1999"]
    }
    ,
    {
        "name" : "Add Catgories ",
        "path" : "/dashboard/user/Catgory",
        "icon" :  <FaPlus />,
        "role" : ["1995" , "1999"]
    }
    ,
    {
        "name" : "Products",
        "path" : "/dashboard/products",
        "icon" :  <MdProductionQuantityLimits />,
        "role" : ["1995" , "1999"]
    }
    ,
    {
        "name" : "Add Products ",
        "path" : "/dashboard/product/add",
        "icon" :  <FaPlus />,
        "role" : ["1995" , "1999"]
    }
]

