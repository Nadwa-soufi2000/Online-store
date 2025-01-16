import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import { GiShoppingCart } from "react-icons/gi";
import { NavLink } from "react-router-dom";

export default function Product(props)
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
        <div>
            <NavLink to={`/product/${props.id}`} className="flex flex-col justify-center items-center gap-8 sm:w-[290px] w-[244px] p-4 bg-[#e3ccf1] sm:bg-[#efe2f7] rounded-[15px] shadow-2xl hover:scale-[1.2] hover:opacity-[0.8] hover:duration-[1s] border-solid border-[1px] border-gray-300 no-underline">
                <div className="flex flex-col justify-center items-start">
                   <h1 className="font-bold font-[Roboto] text-[18px] sm:text-[20px] text-[#000000] no-underline">{props.title.length > 35 ? props.title.slice(1,35) : props.title}</h1>
                   <p className="font-[Roboto] sm:text-[17px] text-[15px] text-[#000000] no-underline">{props.description}</p>
                   <div className="p-1">
                      <div className="font-[Roboto] no-underline text-white bg-purple-600 p-3 ml-[25px] rounded-full flex justify-center items-center">Sale</div>
                  </div>
                  <div className="w-full flex justify-center items-center">
                     <img className="w-[100px] h-[100px]" src={props.img}/>
                   </div>
                </div>
                <span className="w-full h-[2px] bg-[#000000]"></span>
                <div className="flex w-full justify-around items-center">
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
                  <GiShoppingCart className="sm:w-[45px] sm:h-[45px] w-[30px] h-[30px] text-gray-600 rounded-[10px] p-2 border-solid border-gray-400 border-[1px] fill-current sm:mt-0 mt-3" />
                  </div>
            </NavLink>
        </div>
    )
}