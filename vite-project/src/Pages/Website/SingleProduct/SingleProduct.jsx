import { useContext, useEffect, useState } from "react";
//import ImageGallery from "react-image-gallery";
import { useParams } from "react-router-dom";
import { Axios } from "../../../Components/Api/Axios/Axios";
import { CART, pro } from "../../../Components/Api/Api";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import { RiArrowLeftDoubleFill } from "react-icons/ri";
import { GiShoppingCart } from "react-icons/gi";
import Navbar from '../../../Components/Website/Navbar/Navbar'
import SkeletonComponent from "../../../Components/Website/Skeleton/SkeletonComponent";
import { Cart } from "../../../Components/Context/CartChangeContext";
import PlusAndMinus from "../../../Components/Website/PlusAndMinus/PlusAndMinus";


export default function SingleProduct()
{
    const[product , setProduct] = useState({});
    const[productImages , setProductImages] = useState([])
    const[imagesSlider , setImagesSlider] = useState(0);
    const[loading , setLoading] = useState(true)
    const[Count , setCount] = useState(5);
    //const[error , setError] = useState(false);
    const { id } = useParams();
    const { setIsChange } = useContext(Cart);
    console.log(id);

    const roundStars = Math.round(product.rating)
    const stars = Math.min(roundStars , 5);

    const showColoredStars = Array.from({length : stars}).map((item , key) => 
         <FaStar className='text-yellow-500 fill-current' key={key} />
    );

    const showEmptyStars = Array.from({length : 5 - stars}).map((item , key) => 
         <FaRegStar key={key} />
    )

    useEffect(() => {
        Axios.get(`/${pro}/${id}`)
        .then((res) => {setProduct(res.data[0]) ; setProductImages(res.data[0].images)})
        .catch((err) => console.log(err))
        .finally(() => setLoading(false))
    }, [])
    
    console.log(product);
    console.log(Count);

    const images = [] ;

    for(let i = 0 ; i < productImages.length ; i++) 
    {
        images.push(productImages[i].image);
    }

     function sliderToLeft()
     {
           if(imagesSlider < images.length - 1)
           setImagesSlider(prev => prev + 1)
     }

     function sliderToRight()
     {
          if(imagesSlider > 0)
          setImagesSlider(prev => prev - 1)
     }
     const checkStock = async () => 
     {
        try{
            const getItems = JSON.parse(localStorage.getItem('product')) || [];
            const productCount = getItems.filter((item) => item.id == id)[0].count;
            console.log(productCount);
           await Axios.post(`${CART}/check` , {
                product_id : product.id,
                count : Count + (productCount ? productCount : 0),
            });
            return true;
        }catch(err) {
            console.log(err)
            return false;
        }
     }

     function handleSave()
     {
       const check = checkStock();

        if(check) 
            {
               const getItem = JSON.parse(localStorage.getItem('product')) || [];
               const productExist = getItem.findIndex((pro) => pro.id == id)
               console.log(productExist)
               if(productExist !== -1)
                  {
                     if(getItem[productExist].count)
                     getItem[productExist].count = Count;
               else
                     getItem[productExist].count = Count;
                  }
               else 
                {
                   if(Count > 1)
                   product.count = Count;
                   getItem.push(product)
                }
                   localStorage.setItem('product' , JSON.stringify(getItem))
                   setIsChange(prev => !prev)
             } 
      }

    return(
       <div>
          <Navbar/>
          <div className="flex lg:items-start items-center justify-center lg:flex-row flex-col gap-4  xl:w-[1490px] mx-auto w-full p-4 m-8 ">
                <div className="lg:w-[40%] w-[97%] flex justify-center items-center">
                  { loading ?
                       <SkeletonComponent size='450px' long='310px' />
                     :
                   <div className='relative sm:w-[450px] w-full sm:h-[310px] h-[250px]'>
                        <img className="w-full h-full" src={images[imagesSlider]} alt="Image Not Found"/>
                        <RiArrowRightDoubleFill onClick={sliderToRight} className='absolute top-[50%] left-[3px] sm:w-[50px] sm:h-[50px] w-[30px] h-[30px] hover:text-gray-500 hover:duration-[1s]' />
                        <RiArrowLeftDoubleFill onClick={sliderToLeft} className='absolute top-[50%] right-[3px] sm:w-[50px] sm:h-[50px] w-[30px] h-[30px] hover:text-gray-500 hover:duration-[1s]' />
                   </div>
                   }
                </div>
               { loading ?
                   <SkeletonComponent size='60%' long='310px' />
                  :
                <div className="flex justify-center items-start gap-2 flex-col lg:w-[60%] w-[97%] sm:py-0 py-2">
                    <h1 className="font-[Roboto] font-bold text-[#000000] text-[28px] sm:text-[36px]">{product.title}</h1>
                    <p className="font-[Roboto] font-normal text-[#000000] text-[15px]">{product.About}</p>
                    <h3 className="font-[Roboto] font-normal text-[#000000] text-[17px] sm:text-[25px]">{product.description}</h3>
                    <span className="sm:w-[30%] w-full h-[1px] bg-[#000000]"></span>
                 <div className="flex justify-between sm:items-center items-start w-[80%] sm:flex-row flex-col">
                  <div className="flex justify-center items-center flex-col gap-4">
                       {product.stock === 1 && <p className="font-[Roboto] font-bold text-red-600 text-[15px]">There is only 1 left</p>}
                       <div className="flex justify-center items-center gap-3">
                           {showColoredStars}
                           {showEmptyStars}
                      </div>
                      <div className="flex justify-between items-center w-full">
                          <p className="font-[Roboto]">{product.discount}$</p>
                          <div className=" relative">
                              <p className="font-[Roboto] text-gray-500 line-through">{product.price}</p>
                          </div>
                      </div>
                  </div>
                  <div className="flex justify-center items-center gap-1">
                       <PlusAndMinus setCount={(data) => setCount(data)} />
                       <GiShoppingCart onClick={handleSave} className="sm:w-[45px] sm:h-[45px] w-[30px] h-[30px] text-gray-600 rounded-[10px] p-2 border-solid border-gray-400 border-[1px] fill-current" />
                  </div>
                  </div>
               </div>
               }
          </div>
      </div>
    )
}