import { useContext } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Menu } from "../../Context/Context";
export default function TopBar()
{
    const menu = useContext(Menu);
    //const isOpen = menu.isOpen;
    return(
        <div className="w-full shadow-xl">
             <nav className="w-full h-[90px] flex items-center gap-6 pl-4">
                <p className="font-[Roboto] text-[33px]">E-commerce</p>
                <GiHamburgerMenu onClick={() => {menu.setisOpen((prev) => !prev); console.log(menu.isOpen)}} className="w-[35px] h-[35px] mt-0"/>
             </nav>
        </div>
    )
}