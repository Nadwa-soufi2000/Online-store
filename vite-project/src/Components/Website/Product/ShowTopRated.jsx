import { useEffect, useState } from "react"
import { Axios } from "../../Api/Axios/Axios"
import TopRated from "./TopRated"
import { TopRatedApi } from "../../Api/Api"
import SkeletonComponent from "../Skeleton/SkeletonComponent"

export default function ShowTopRated()
{

    const[topRatedProducts , setTopRatedProducts] = useState([])
    const[loading , setLoading] = useState(true)

    useEffect(() => {
       Axios.get(`${TopRatedApi}`)
       .then(res => setTopRatedProducts(res.data))
       .finally(setLoading(false))
    }, [])

    console.log(topRatedProducts);

    const showTopRatedProducts = topRatedProducts.map((item , key) =>
        <TopRated 
            key={key}
            title={item.title} 
            description={item.description}
            img={item.images[0].image}
            price={item.price}
            discount={item.discount}
            rating={item.rating}
            id={item.id}
        />
    )

    const ShowSkeleton = Array.from({length : 6}).map((item , key) => 
        <SkeletonComponent key={key} size='200px' long='120px' />
    )
    
    return(
        <div className="w-full p-3">
            <h1 className="font-[Roboto] font-bold sm:text-[39px] text-[24px] text-[#000000] p-3">Top Rated Products</h1>
            <div className="flex flex-col justify-start items-center gap-12">
                { loading 
                ?
                ShowSkeleton 
                :
                showTopRatedProducts
                }
            </div>

        </div>
    )
}