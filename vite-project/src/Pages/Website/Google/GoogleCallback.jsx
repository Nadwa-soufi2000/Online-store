import axios from 'axios';
import Cookie from 'cookie-universal'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { baseUrl, GOOGLE_CALL_BACK } from '../../../Components/Api/Api';
export default function GoogleCallback()
{
    const cookie = Cookie();
    const location = useLocation();

    useEffect(() => {
        async function GoogleCall()
        {
            try{
                const res = await axios.get(`${baseUrl}/${GOOGLE_CALL_BACK}${location.search}`)
                const token = res.data.access_token;
                cookie.set("e-commerce" , token)
                console.log(res)
            }catch(err) {
                console.log(err)
            }
        }
        GoogleCall();
    }, [])
    return(
        <div>
            Signup using google account
        </div>
    )
}