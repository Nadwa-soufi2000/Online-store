import { Route, Routes } from "react-router-dom"
import Uesrs from "./Pages/Dashboard/Users/Users"
import Signup from "./Pages/Website/Signup/Signup"
import Login from "./Pages/Website/Login/Login"
import GoogleCallback from "./Pages/Website/Google/GoogleCallback"
import Dashboard from "./Pages/Dashboard/dashboard/Dashboard"
import ReqireAuth from "./Pages/Website/RequireAuth/RequireAuth"
import EditUser from "./Pages/Dashboard/EditUser/EditUser"
import EditCategory from './Pages/Dashboard/EditCategory/EditCategory'
import AddUser from "./Pages/Dashboard/AddUser/AddUser"
import Writer from "./Pages/Website/Writer/Writer"
import Error404 from "./Pages/Website/Error404/Error404"
import RequireBack from "./Pages/Website/RequireBack/RequireBack"
import Catgories from "./Pages/Dashboard/Catgories/Catgories"
import AddCategories from "./Pages/Dashboard/AddCategories/AddCategories"
import AddProducts from "./Pages/Dashboard/AddProducts/AddProducts"
import Loading from "./Components/Website/Loadind/Loading"
import Products from "./Pages/Dashboard/Products/Products"
import Home from "./Pages/Website/Home/Home"
import Logout from "./Pages/Website/Logout/Logout"
import EditProduct from "./Pages/Dashboard/EditProduct/EditProduct"
//import Error403 from "./Pages/Dashboard/Error403/Error403"



function App() {

  return (
    <>
      <Routes>
        <Route element={<RequireBack/>}>
               <Route path="/signup" element={<Signup />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path='/' element={<Home/>}></Route>
        </Route>
        <Route path='/logout' element={<Logout/>}></Route>
        <Route path="/auth/google/callback" element={<GoogleCallback />}></Route>
        <Route path="/*" element={<Error404/>}></Route>

        <Route element={<ReqireAuth allowRole={['1995' , '1996']} />}>
           <Route path="/dashboard" element={<Dashboard/>}>
              <Route element={<ReqireAuth allowRole={['1995']}/>}>
                  <Route path="users" element={<Uesrs/>}></Route>
                  <Route path="users/:id" element={<EditUser/>}></Route>
                  <Route path="user/add" element={<AddUser/>}></Route>
                  <Route path="categories/:id" element={<EditCategory/>}></Route>
               </Route>

               <Route element={<ReqireAuth allowRole={['1995' , '1996']}/>}>
                  <Route path="user/writer" element={<Writer/>}></Route>
               </Route>

               <Route element={<ReqireAuth allowRole={['1995' , '1999']}/>}>
                  <Route path="categories" element={<Catgories/>}></Route>
               </Route>
               
               <Route element={<ReqireAuth allowRole={['1995' , '1999']}/>}>
                  <Route path="user/Catgory" element={<AddCategories/>}></Route>
                  <Route path="categories" element={<Catgories/>}></Route>
                  <Route path="categories/:id" element={<EditCategory/>}></Route>

                  <Route path="products" element={<Products/>}></Route>
                  <Route path="products/:id" element={<EditProduct/>}></Route>
                  <Route path="product/add" element={<AddProducts />}></Route>
               </Route>

           </Route>
        </Route>
  
      </Routes>
    </>
  )
}

export default App
