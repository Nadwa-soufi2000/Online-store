import Navbar from "../Navbar/Navbar";

export default function Landing()
{
    return(
        <div>
            <div className='w-full xl:w-[1490px]' >
              <Navbar/>
              <div className='flex pl-[200px] items-center w-[90%] py-9 mx-auto my-[40px] relative opacity-[0.92]' id='pp'>
                <div className='flex  justify-center items-center  p-3 w-[28%]  absolute top-[60%]'>
                    <button className=' rounded-[13px] w-full shadow-xl flex justify-center items-center p-4  bg-purple-700 text-[34px] text-white font-bold font-[Roboto]'>Get Started</button>
                </div>
             </div>
           </div>
        </div>
    )
}