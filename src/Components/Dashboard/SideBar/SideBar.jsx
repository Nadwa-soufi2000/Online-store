import { NavLink } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { useContext } from "react";
import { Menu } from "../../Context/Context";
import { WindowSize } from "../../Context/WindowContext";


export default function SideBar()
{
    const menu = useContext(Menu)
    const isOpen = menu.isOpen;
   
    return(
        <div className="flex flex-col items-center pt-5 h-screen shadow-xl" 
             style={{ width: isOpen ? '290px' : 'fit-content'}}>
            <NavLink to={"users"} className="flex justify-center items-center gap-2 bg-gray-300 rounded-[11px] text-[28px] font-[Roboto] text-purple-800 w-[90%] p-[10px]"><FaUsers /><p style={{display: isOpen ? "flex" : "none"}}>Users</p></NavLink>
        </div>
    )
}