import Landing from "../../../Components/Website/Landing/Landing";
import Navbar from "../../../Components/Website/Navbar/Navbar";
import LatestSaleProduct from "../../../Components/Website/Product/LatestSaleProduct";
import ShowTopRated from "../../../Components/Website/Product/ShowTopRated";

export default function Home()
{
    
    return(
        <div className="xl:w-[1490px] mx-auto w-full">
            <Landing/>
            <LatestSaleProduct/>
            <ShowTopRated/>
        </div>
    )
}