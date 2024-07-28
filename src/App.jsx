import { Route, Routes } from "react-router-dom"
import Uesrs from "./Pages/Dashboard/Users/Users"
import Signup from "./Pages/Website/Signup/Signup"
import Login from "./Pages/Website/Login/Login"
import GoogleCallback from "./Pages/Website/Google/GoogleCallback"
import Dashboard from "./Pages/Dashboard/dashboard/Dashboard"
import ReqireAuth from "./Pages/Website/RequireAuth/RequireAuth"
import EditUser from "./Pages/Dashboard/EditUser/EditUser"


function App() {

  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route element={<ReqireAuth />}>
            <Route path="/dashboard" element={<Dashboard/>}>
               <Route path="users" element={<Uesrs/>}></Route>
               <Route path="users/:id" element={<EditUser/>}></Route>
            </Route>
        </Route>
        <Route path="/auth/google/callback" element={<GoogleCallback />}></Route>
      </Routes>
    </>
  )
}

export default App
