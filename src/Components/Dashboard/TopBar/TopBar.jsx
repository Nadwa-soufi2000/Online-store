import { useContext } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Menu } from "../../Context/Context";
import Cookie from 'cookie-universal'
import { Axios } from "../../Api/Axios/Axios";
import { LOGOUT } from "../../Api/Api";
export default function TopBar()
{
    const menu = useContext(Menu);
    const cookie = Cookie();
    //const isOpen = menu.isOpen;



    async function handellogout()
    {
        try{
           let res = await Axios.get(`/${LOGOUT}`)
            console.log(res)
            cookie.remove("e-commerce")
            window.location.pathname = '/dashboard/users'
        }catch(err) {
            console.log(err)
        }
    }


    return(
        <div className="w-full shadow-xl flex items-center justify-center">
             <nav className="w-[94%] h-[90px] flex items-center justify-between">
                <div className="flex items-center gap-6">
                     <p className="font-[Roboto] text-[33px]">E-commerce</p>
                     <GiHamburgerMenu onClick={() => 
                         {menu.setisOpen((prev) => !prev); 
                         console.log(menu.isOpen)}} 
                         className="w-[35px] h-[35px] mt-0"
                      />
                </div>
                     <button onClick={handellogout} className="flex justify-center items-center gap-2 p-4 bg-purple-800 rounded-[20px] text-white text-[18px] sm:text-[22px] w-[120px] sm:w-[190px] font-[Roboto]">Logout</button>
             </nav>
        </div>
    )
}