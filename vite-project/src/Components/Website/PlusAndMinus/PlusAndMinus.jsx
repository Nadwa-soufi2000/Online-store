import { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { LuMinus } from "react-icons/lu";


export default function PlusAndMinus(props)
{
    const[btnCount , setBtnCount] = useState(1);
    const isCountForThisProduct = props.countForThisProduct || false ;

    useEffect(() => {
      if(isCountForThisProduct)
      setBtnCount(isCountForThisProduct)
    }, [props.countForThisProduct])


    useEffect(() => {
        props.setCount(btnCount);
        if(props.changeCount)
        {
            props.changeCount(props.idItem , btnCount)
        }  
    }, [btnCount])


    return(
        <div className="flex justify-center items-center gap-1">
              <button onClick={() => setBtnCount(prev => ++prev)} className="flex justify-center items-center rounded-[10px] bg-green-500 w-[30px] h-[30px] sm:w-[45px] sm:h-[45px]">
                   <LuPlus className="sm:w-[20px] sm:h-[20px] w-[15px] h-[15px]" />
              </button>
              <input value={btnCount} 
                     onChange={(e) => {
                       if(e.target.value > 0) 
                          setBtnCount(e.target.value)
                       else
                          setBtnCount(0)
                        }}
                     className="sm:w-[70px] w-[60px] sm:h-[45px] h-[30px] outline-none pl-2 rounded-[10px] border-solid border-[1px] border-gray-500" type="text"/>
              <button className='flex justify-center items-center bg-red-500 w-[30px] h-[30px] sm:w-[45px] sm:h-[45px] rounded-[10px]'>
                   <LuMinus onClick={() => setBtnCount(prev => --prev)} className="sm:w-[20px] sm:h-[20px] w-[15px] h-[15px]" />
             </button>
       </div>
    )
}