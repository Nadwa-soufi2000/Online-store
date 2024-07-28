import Cookie from 'cookie-universal'
import { useEffect, useState } from 'react';
import { user } from '../../../Components/Api/Api';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { Axios } from '../../../Components/Api/Axios/Axios';
export default function ReqireAuth()
{
    const cookie = Cookie();
    const token = cookie.get("e-commerce");
    const nav = useNavigate();

    const[User , setUser] = useState({})
    console.log(User)

    useEffect(() => {
        
        try {
          Axios.get(`/${user}`)
         .then((data) => { setUser(data.data) ;  console.log(data) });

        }catch(err) {
            console.log(err)
            nav('/login' , { replace : true });
        }
    }, [])


    return(
        token ? (
         User === " " ? ( 
            alert("Loading...") 
            )
         :
          (
             <Outlet/>  
          )
        )
        : 
        (
        <Navigate to='/login' replace={true}/>
        )
    )
}