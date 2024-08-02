import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import MenuContext from './Components/Context/Context.jsx'
import WindowContext from './Components/Context/Window.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <MenuContext>
      <WindowContext>
       <BrowserRouter>
         <App />
      </BrowserRouter>
      </WindowContext>
     </MenuContext>
  </React.StrictMode> ,
)
