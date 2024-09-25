import { Outlet } from "react-router-dom";
import SideBar from "../../../Components/Dashboard/SideBar/SideBar";
import TopBar from "../../../Components/Dashboard/TopBar/TopBar";

export default function Dashboard()
{
    return(
        <div className="">
            <TopBar/>
            <div className="flex">
                <SideBar/>
                <Outlet/>
            </div>
        </div>
    )
}