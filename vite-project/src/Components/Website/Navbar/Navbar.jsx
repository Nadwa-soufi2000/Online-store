import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"
import { FaCartShopping } from "react-icons/fa6";
import { GiShoppingCart } from "react-icons/gi";
import { IoMdCloseCircle } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import { Axios } from "../../Api/Axios/Axios";
import { CAT } from "../../Api/Api";
import SkeletonComponent from "../Skeleton/SkeletonComponent";
import { Button, Modal } from "react-bootstrap";
import { Cart } from "../../Context/CartChangeContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import PlusAndMinus from "../PlusAndMinus/PlusAndMinus";

export default function Navbar() 
{
    const[categories , setCategories] = useState([]);
    const[loading , setLoading] = useState(true);
    const[products , setProducts] = useState([]);
    const[Count , setCount] = useState();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleDelete = (id) => 
    {
         const ProductsAfterFiltered = products.filter((pro) => pro.id !== id);
         setProducts(ProductsAfterFiltered);
         localStorage.setItem('product' , JSON.stringify(ProductsAfterFiltered))
    }

    const { isChange } = useContext(Cart) ;
   


    useEffect(() => {
      Axios.get(`${CAT}`)
      .then((res) => setCategories(res.data.data))
      .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
     const getProducts = JSON.parse(localStorage.getItem('product')) || [];
     setProducts(getProducts);
    }, [isChange])

   const start = categories.length-1 - 8 ;
   const end = categories.length - 1;
   const CategoriesFilterd = categories.slice(start , end);
   const showCategories = CategoriesFilterd.map((item , key) => <div className="text-purple-500 font-bold font-[Roboto] text-[16px] sm:text-[20px] flex justify-center items-center gap-4" key={key}>{item.title.length > 15 ? item.title.slice(1 , 15) + '....' : item.title }</div>)
   
   

   const changeCount = (id , btnCount) => {
    console.log(id , btnCount);
    const getItems = JSON.parse(localStorage.getItem('product')) || [];
    const findProduct = getItems.find((pro) => pro.id === id)
    findProduct.count = btnCount ;
    localStorage.setItem('product' , JSON.stringify(getItems))               
   }

   const showSkeleton = Array.from({length : 8}).map((item , key) => 
                      <SkeletonComponent key={key} size='90px' long='40px'/>
                    )
   const showProducts = products.map((item , key) => 
                     <div key={key} className="flex w-full justify-center items-start gap-2 flex-col">
                        <div  className="flex justify-between items-center  w-full">
                        <div className="flex justify-center items-center gap-2">
                            <img className="w-[70px] h-[80px]" src={item.images[0].image} alt=""/>
                            <div className="flex flex-col items-start justify-center">
                            <p>{item.title}</p>
                            <p>{item.description}</p>
                            </div>
                        </div>
                        <IoMdCloseCircle onClick={() => handleDelete(item.id)} className="w-[40px] h-[40px] text-red-600 fill-current" />
                      </div>
                      <PlusAndMinus
                          idItem={item.id}
                          changeCount={changeCount}
                          countForThisProduct={item.count || 1} 
                          setCount={setCount} 
                      />
                   </div>   
                        )  
                        
  

    return(
        <>
        <Modal show={show} onHide={handleClose}>
           <Modal.Header closeButton>
               <Modal.Title>Cart</Modal.Title>
           </Modal.Header>
           <Modal.Body>
                <div className="flex flex-col items-start justify-center gap-3">
                     {showProducts}
                </div>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Checkout
          </Button>
        </Modal.Footer>
      </Modal>
         <div>
             <div className="flex justify-around items-center gap-10 p-4">
                <div className="flex justify-center items-center gap-2"><FaCartShopping className="w-[60px] h-[60px] text-purple-800 fill-current"/><p className="text-[20px] font-[Roboto] font-bold text-purple-700">Showpping</p></div>
                 <div className="flex justify-center items-center w-[530px] h-[70px] rounded-[10px] border-[1px] border-solid border-gray-300">
                     <input type="search" className="w-[85%] h-full outline-none pl-3 rounded-l-[10px]" placeholder="Search product"/>
                     <button className="w-[15%] h-full bg-purple-700 text-white font-[Roboto] font-normal flex justify-center items-center rounded-r-[10px]">Search</button>
                 </div>
                 <div className="flex justify-center items-center gap-3">
                    <div><GiShoppingCart onClick={handleShow} className="w-[40px] h-[40px] text-purple-800 fill-current" /></div>
                    <Link><FaUserCircle className=" w-[40px] h-[40px] text-purple-800 fill-current"/></Link>
                 </div>
             </div>
             <div className="flex flex-wrap justify-center items-center gap-6 sm:px-0 px-2">
                { 
                 loading ?
                 showSkeleton
                 :
                 showCategories
                }
                <Link to='/categories' className="sm:text-[20px] text-[16px] text-purple-500 font-bold font-[Roboto] no-underline">Show All</Link>
             </div>
         </div>
         </>
    )
}