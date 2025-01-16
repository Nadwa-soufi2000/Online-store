import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import { GiShoppingCart } from "react-icons/gi";
import { NavLink } from "react-router-dom";


export default function TopRated(props)
{
    const roundStars = Math.round(props.rating)
    const stars = Math.min(roundStars , 5);

    const showColoredStars = Array.from({length : stars}).map((item , key) => 
         <FaStar className='text-yellow-500 fill-current' key={key} />
    );

    const showEmptyStars = Array.from({length : 5 - stars}).map((item , key) => 
         <FaRegStar className="text-[#000000] fill-current" key={key} />
    )
    return(
        <NavLink to={`/product/${props.id}`} className="flex lg:flex-row flex-col justify-center items-center gap-2 bg-[#efe2f7] hover:scale-[1.2] hover:duration-[1s] hover:opcity-[0.8] rounded-[15px] w-[244px] md:w-[290px] lg:w-[50%] p-2 shadow-xl border-solid border-[1px] border-gray-300 no-underline">
            <div className="lg:w-[40%] w-[100%] flex justify-center items-center ">
                <img className="lg:w-[150px] w-[100%] h-[150px]" src={props.img}/>
            </div>
            <div className="flex lg:w-[60%] w-full flex-col justify-start items-center gap-8  p-2  rounded-[15px]">
                <div className="flex flex-col justify-center items-start w-full ">
                   <h1 className="font-bold font-[Roboto] text-[18px] sm:text-[20px] text-[#000000]">{props.title.length > 35 ? props.title.slice(1,35) : props.title}</h1>
                   <p className="font-[Roboto] text-[#000000] text-[15px] sm:text-[17px]">{props.description}</p>
                </div>
                <div className='flex justify-between items-center w-[95%] '>
                  <div className="flex justify-center items-center flex-col gap-4">
                    <div className="flex justify-center items-center gap-3">
                      {showColoredStars}
                      {showEmptyStars}
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <p className="font-[Roboto]">{props.discount}$</p>
                       <div className=" relative">
                        <p className="font-[Roboto] text-gray-500 line-through">{props.price}</p>
                       
                        </div>
                    </div>
                  </div>
                  <GiShoppingCart className="sm:w-[45px] sm:h-[45px] w-[30px] h-[30px] sm:mt-0 mt-3 text-gray-400 rounded-[10px] p-2 border-solid border-gray-400 border-[1px] fill-current" />
                  </div>
            </div>
        </NavLink>
    )
}