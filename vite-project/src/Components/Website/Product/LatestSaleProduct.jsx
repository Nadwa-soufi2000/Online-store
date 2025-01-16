import { useEffect, useState } from "react"
import { Axios } from "../../Api/Axios/Axios"
import { LatestSale, PRO } from "../../Api/Api"
import Product from "./Product"
import Skeleton from "react-loading-skeleton";
import SkeletonComponent from "../Skeleton/SkeletonComponent";

export default function LatestSaleProduct()
{
    const[products , setProducts] = useState([]);
    const[loading , setLoading] = useState(true)
    
    useEffect(() => {
        Axios.get(`${PRO}`)
        .then((res) => setProducts(res.data.slice(-5)))
        .finally(() => setLoading(false))
    } , [])
   
    console.log(products)
    const showProducts = products.map((item , key) => 
     <Product 
       key={key} 
       title={item.title} 
       description={item.description}
       img={item.images[0].image}
       price={item.price}
       discount={item.discount}
       rating={item.rating}
       id={item.id}
      />)

        const showSkeleton = Array.from({length : 5}).map(( item, key) =>
                            <SkeletonComponent key={key} size='290px' long='290px'/>
                       )
      
    return(
        <div className="w-full p-3">
             <h1 className="font-[Roboto] font-bold sm:text-[39px] tetx-[24px] text-[#000000] p-3">Latest Sale Products</h1>
             <div className="sm:w-full w-[96%] flex justify-center items-center gap-6 flex-wrap mt-6">
                 { 
                 loading 
                 ? 
                 showSkeleton
                 :
                 showProducts
                 }
              </div>
        </div>
    )
}