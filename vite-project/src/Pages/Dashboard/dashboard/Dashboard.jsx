import { Outlet } from "react-router-dom";
import SideBar from "../../../Components/Dashboard/SideBar/SideBar";
import TopBar from "../../../Components/Dashboard/TopBar/TopBar";

export default function Dashboard()
{
    return(
        <div className="relative z-10 xl:w-[1480px] w-full">
            <TopBar/>
            <div className="flex">
                <SideBar/>
                <Outlet/>
            </div>
        </div>
    )
}