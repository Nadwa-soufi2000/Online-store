import { LOGOUT } from "../../../Components/Api/Api"
import { Axios } from "../../../Components/Api/Axios/Axios"
import Cookie from 'cookie-universal'
export default function Home()
{
    const cookie =  Cookie()
    async function handellogout()
    {
        try{
           let res = await Axios.get(`/${LOGOUT}`)
            console.log(res)
            cookie.remove("e-commerce")
            window.location.pathname('/login')
        }catch(err) {
            console.log(err)
        }
    }
    return(
        <div>
            <h1>Home page</h1>
            <button onClick={handellogout}>logout</button>
        </div>
    )
}