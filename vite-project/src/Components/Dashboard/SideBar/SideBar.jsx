import { NavLink, useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { Menu } from "../../Context/Context";
import { WindowSize } from "../../Context/Window";
import { user } from "../../Api/Api";
import { Axios } from "../../Api/Axios/Axios";
import { LinksArray } from "../LinksArray/LinksArray";



export default function SideBar()
{
    const menu = useContext(Menu)
    const isOpen = menu.isOpen;
    const WindowContext = useContext(WindowSize);
    const windowSize = WindowContext.windowSSize;
    console.log(windowSize)
    const[User , setUser] = useState({})
    const nav = useNavigate();
    console.log(User)

    useEffect(() => {
        
        try {
          Axios.get(`/${user}`)
         .then((data) => { setUser(data.data) ;  console.log(data) });

        }catch(err) {
            console.log(err)
            nav('/login' , { replace : true });
        }
    }, [])



    return(
        <div className="flex flex-col items-center pt-5 h-[998px] shadow-xl gap-3 " 
             style={{
                 position: windowSize < '768' ? 'fixed' : 'sticky' ,
                 left: windowSize < '768' && isOpen ?  "-100%" : 0 ,
                 width: isOpen ? '22%' : 'fit-content'
                 }}>
              {
                LinksArray.map((item , key) => 
                  item.role.includes(User.role) &&
                  <NavLink key={key} to={item.path} className="flex justify-center items-center gap-2 bg-gray-300 rounded-[11px]  sm:text-[24px] font-[Roboto] text-purple-800 w-[90%] p-[10px]">
                      {item.icon}
                      <p style={{display: isOpen ? "flex" : "none"}}>{item.name}</p>
                  </NavLink>
                )
              }
        </div>
    )
}