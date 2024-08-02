import Cookie from 'cookie-universal'
import { useEffect, useState } from 'react';
import { user } from '../../../Components/Api/Api';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { Axios } from '../../../Components/Api/Axios/Axios';
import Error403 from '../../Dashboard/Error403/Error403';

export default function ReqireAuth({ allowRole })
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
          allowRole.includes(User.role) ?
          (
             <Outlet/>  
          )
          :
        <Error403 role={User.role}/>
        )
        : 
        (
        <Navigate to='/login' replace={true}/>
        )
    )
}