import { motion } from "framer-motion"
export default function Loading()
{

const circle = {

    start : {
        y: "0%"
    }
    ,
    end : {
        y: "100%"
    }
};

const container = {

    start : {
        transition : {
            staggerChildren : 0.1
        }
    }
    ,
    end : {
        transition : {
            staggerChildren : 0.1
        }
    }
}

 const circleTransition = {
    duration : 0.9,
    repeat: Infinity
 };

    return(
        <div className="w-full h-full bg-gray-200  flex justify-center items-center absolute z-20"> 
            <motion.div 
              variants={container} 
              initial='start' 
              animate='end' 
              className="flex justify-center items-center  gap-2 w-[400px] h-[300px]"
            >
                <motion.span 
                  variants={circle} 
                  transition={circleTransition} 
                  className="w-[30px] h-[30px] rounded-full bg-slate-600 "
                 >
                  </motion.span>
                <motion.span 
                  variants={circle} 
                  transition={circleTransition} 
                  className="w-[30px] h-[30px] rounded-full bg-slate-600"
                  >
                  </motion.span >
                <motion.span 
                  variants={circle} 
                  transition={circleTransition}  
                  className="w-[30px] h-[30px] rounded-full bg-slate-600"
                  >    
                  </motion.span >
            </motion.div>
        </div>
    )
}