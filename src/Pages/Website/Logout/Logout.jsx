import { LOGOUT } from "../../../Components/Api/Api"
import Cookie from 'cookie-universal'
import { Axios } from "../../../Components/Api/Axios/Axios";
export default function Logout()
{
    const cookie = Cookie();


    async function handellogout()
    {
        try{
           let res = await Axios.get(`/${LOGOUT}`)
            console.log(res)
            cookie.remove("e-commerce")
        }catch(err) {
            console.log(err)
        }
    }
    return(
        <div>
             <button onClick={handellogout}>Logout</button>
        </div>
    )
}