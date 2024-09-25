import { useEffect, useRef, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Axios } from "../../../Components/Api/Axios/Axios";
import { CAT, pro } from "../../../Components/Api/Api";
import { MdOutlineSubtitles } from "react-icons/md";
import { useNavigate } from "react-router-dom";
//import { FaImage } from "react-icons/fa6";
export default function AddCategories()
{
   const nav = useNavigate();
   const[category , setCategory] = useState('Select Category');
   const[title , setTitle] = useState('')
   const[description , setDescription] = useState('');
   const[price , setPrice] = useState('');
   const[discount , setDiscount] = useState('');
   const[about , setAbout] = useState('');
   const[send , setSend] = useState(false);
   const[id , setId] = useState();
   const progress = useRef([]);
   const picture = useRef([]);
   const j = useRef(-1);

   const[images , setImages]  = useState([]);
    
   const[catgoriesArray , setcatgoriesArray] = useState([])

   const TemForm = {
    category: null,
    title: 'dumy',
    description: 'dumy',
    price: 222,
    discount: 0,
    About: 'About',
   }
    
   useEffect(() => {
    Axios.get(`/${CAT}`)
    .then((data) => setcatgoriesArray(data.data))
  }, [])

   const categoriesShow = catgoriesArray.map((item , key) => 
                           <option 
                               value={item.id} 
                               key={key}
                           >
                              {item.title}
                           </option>
                 );

  const imagesShow = images.map((item , key) => 
    <div  key={key} className="flex w-full justify-center items-start flex-col gap-5 border-solid border-[0.2px] p-2 shadow-xl border-gray-200 rounded-[10px]">
      <div className="w-full flex items-center justify-between">
        <div className="w-full flex justify-start items-center gap-4 ">
          <img src={URL.createObjectURL(item)} className="w-[70px] h-[70px]" alt=""/>
          <div className="flex justify-start items-center flex-col gap-3">
            <p>{item.name}</p>
            <p>{(item.size / 1024).toFixed(2)}KB</p>
          </div>
        </div>
        <button onClick={() => deleteImage(key , item)} className="flex justify-center items-center bg-purple-800 rounded-[20px] text-white text-[18px] sm:text-[22px] w-[120px] sm:w-[190px] font-[Roboto] ">Delete</button>
        </div>
        <div className="w-full h-[9px] rounded-[4px] bg-gray-600">
          <span 
            ref={(e) => (progress.current[key]) = e}
            className='relative bg-[#56b6ff] h-full block  rounded-[10px] transition-[0.3s] after:content[percent] after:absolute after:top-[-25px] after:right-0 after:bg-gray-500 after:text-white after:w-[18px] after:h-[21px] after:flex after:items-center after:justify-center after:font-[12px] after:rounded-[3px]'
          ></span>
        </div>
    </div>
  )

    async function addProducts(e)
    {
        e.preventDefault();
        const form = new FormData();
        form.append('category' , category)
        form.append('title' , title);
        form.append('description' , description);
        form.append('price' , price)
        form.append('discount' , discount);
        form.append('About' , about)
        try{
         let res = await Axios.post(`${pro}/edit/${id}` , form)
          console.log(res)
          nav('/dashboard/products')

        }catch(err) {
          console.log(err)
        }
    }

    async function temporaryData() {
    
      try{
        let res = await Axios.post(`/${pro}/add` , TemForm)
        console.log(res)
        setId(res.data.id);
        console.log(id);
      }catch(err){
        console.log(err)
      } 
    }

    async function HandelImages(e)
    {
      //...prev تعني أنه يعيد جميع الصور السابقة في حال أردنا إضافة صور جديدة بالإضافة للصور القديمة
      setImages((prev) => [...prev , ...e.target.files])
      const imagesAsFiles = e.target.files;
      const data = new FormData()

      for(let i = 0 ; i<imagesAsFiles.length ; i++)
      {
        j.current++
        data.append('image' , imagesAsFiles[i])
        data.append('product_id' , id)
        try{
          let res = await Axios.post('/product-img/add' , data , {
            onUploadProgress : (ProgressEvent) => {
              const {loded , total} = ProgressEvent
              const percent = Math.floor((loded * 100) / total)
              if(percent % 10 === 0) 
              {
                progress.current[j.current].style.width = `${percent}`
                progress.current[j.current].setAttribute('percent' , `${percent}%`)
                console.log(progress.current[j.current].style.width)
              }
            }
          })
          console.log(res)
          picture.current[j.current] = res.data.id;
        
        }catch(err) {
          console.log(err)
        }
      }
    }

   async function deleteImage(key , item)
    {
     const findId = picture.current[key];
    // const find = key;
     console.log(findId);
     try{
       const res = await Axios.delete(`product-img/${findId}`)
       console.log(res)
       setImages((prev) => prev.filter(image => image !== item))
       picture.current = picture.current.filter(id => id !== findId);
       --j.current;
     }
     catch(err) {
      console.log(err)
     }
    }
    


    console.log(id);
    console.log(picture.current)
    return(
        <div className="w-[1100px] my-[5px] mx-auto flex flex-col items-center gap-1  box-border pt-[10px]">
        <form onSubmit={addProducts} className="flex justify-center items-center gap-7 flex-col p-4 shadow-2xl  sm:w-[80%] md:w-[70%] lg:w-[520px]">
          <h2 className=" text-[22px] sm:text-[26px] md:text-[30px] lg:text-[35px] font-medium text-[#000000] font-[Roboto] ">Add Product</h2>
           <div className="flex items-start  flex-col gap-3 w-[94%] sm:w-[86%] ">
             <label className="text-gray-500 text-[20px] sm:text-[24px] md:text-[28px] font-[Roboto]">Category</label>
             <div className="flex justify-around items-center w-full border border-solid border-b-gray-500 border-b-4 border-l-0 border-r-0 border-t-0 p-2">
                 <select
                     value={category}
                     onChange={(e) =>
                      {
                        setCategory(e.target.value) ; 
                        setSend(true);
                        if(send !== 1){
                          temporaryData()
                        }
                      }} 
                     className="w-[90%]  h-[40px]" 
                 >
                  <option disabled>Select Category</option>
                  {categoriesShow}
                 </select>
                 <MdOutlineSubtitles className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] text-purple-800 fill-current" />
             </div>
           </div>
           <div className="flex items-start flex-col gap-3 w-[94%] sm:w-[86%]">
             <label className="text-gray-500 text-[20px] sm:text-[24px] md:text-[28px] font-[Roboto]">Title</label>
             <div className="flex justify-around items-center w-full border border-solid border-b-gray-500 border-b-4 border-l-0 border-r-0 border-t-0 p-2">
                 <input disabled={!send} value={title} onChange={(e) => setTitle(e.target.value)} className="w-[90%] outline-none pl-2 " type="text" required/>
                 <MdOutlineSubtitles className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] text-purple-800 fill-current" />
             </div>
           </div>
           <div className="flex items-start flex-col gap-3 w-[94%] sm:w-[86%]">
             <label className="text-gray-500 text-[20px] sm:text-[24px] md:text-[28px] font-[Roboto]">Description</label>
             <div className="flex justify-around items-center w-full border border-solid border-b-gray-500 border-b-4 border-l-0 border-r-0 border-t-0 p-2">
                 <input disabled={!send} value={description} onChange={(e) => setDescription(e.target.value)} className="w-[90%] outline-none pl-2 " type="text" required/>
                 <MdOutlineSubtitles className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] text-purple-800 fill-current" />
             </div>
           </div>
           <div className="flex items-start flex-col gap-3 w-[94%] sm:w-[86%]">
             <label className="text-gray-500 text-[20px] sm:text-[24px] md:text-[28px] font-[Roboto]">Price</label>
             <div className="flex justify-around items-center w-full border border-solid border-b-gray-500 border-b-4 border-l-0 border-r-0 border-t-0 p-2">
                 <input disabled={!send} value={price} onChange={(e) => setPrice(e.target.value)} className="w-[90%] outline-none pl-2 " type="text" required/>
                 <MdOutlineSubtitles className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] text-purple-800 fill-current" />
             </div>
           </div>
           <div className="flex items-start flex-col gap-3 w-[94%] sm:w-[86%]">
             <label className="text-gray-500 text-[20px] sm:text-[24px] md:text-[28px] font-[Roboto]">Discount</label>
             <div className="flex justify-around items-center w-full border border-solid border-b-gray-500 border-b-4 border-l-0 border-r-0 border-t-0 p-2">
                 <input disabled={!send} value={discount} onChange={(e) => setDiscount(e.target.value)} className="w-[90%] outline-none pl-2 " type="text" required/>
                 <MdOutlineSubtitles className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] text-purple-800 fill-current" />
             </div>
           </div>
           <div className="flex items-start flex-col gap-3 w-[94%] sm:w-[86%]">
             <label className="text-gray-500 text-[20px] sm:text-[24px] md:text-[28px] font-[Roboto]">About</label>
             <div className="flex justify-around items-center w-full border border-solid border-b-gray-500 border-b-4 border-l-0 border-r-0 border-t-0 p-2">
                 <input disabled={!send} value={about} onChange={(e) => setAbout(e.target.value)} className="w-[90%] outline-none pl-2 " type="text" required/>
                 <MdOutlineSubtitles className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] text-purple-800 fill-current" />
             </div>
           </div>
           <div className="flex items-start flex-col gap-11 w-[94%] sm:w-[86%]">
             <label className="text-gray-500 text-[20px] sm:text-[24px] md:text-[28px] font-[Roboto]">Images</label>
             <div className="relative w-full  p-2">
                  <label className="text-purple-700 flex justify-center items-center text-[15px]  sm:text-[24px] md:text-[28px] font-[Roboto] w-full z-[20] absolute bottom-[6%] right-[0.4%] bg-gray-300 rounded-[10px]"  htmlFor="img">Add Images</label>
                 <input disabled={!send} id="img" multiple onChange={HandelImages} className="w-[90%] outline-none pl-2 z-[10] absolute bottom-[6%] right-[0.4%]" type="file" />
             </div>
           </div>
           <div className="flex justify-center items-start flex-col gap-8">
                    {imagesShow}
           </div>

           <div className="flex items-start w-[94%] sm:w-[86%]">
              <button className="flex justify-center items-center gap-2 p-4 bg-purple-800 rounded-[20px] text-white text-[18px] sm:text-[22px] w-full sm:w-[250px] font-[Roboto]">Add product <FaArrowRightLong className="mt-1"/></button>
           </div>
         </form>
     </div>
    )
}