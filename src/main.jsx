import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import MenuContext from './Components/Context/Context.jsx'
//import WindowContext from './Components/Context/WindowContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <MenuContext>
       <BrowserRouter>
         <App />
      </BrowserRouter>
     </MenuContext>
  </React.StrictMode> ,
)
