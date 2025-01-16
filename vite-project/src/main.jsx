import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import MenuContext from './Components/Context/Context.jsx'
import WindowContext from './Components/Context/Window.jsx'
import 'react-loading-skeleton/dist/skeleton.css'

import CartChangeContext from './Components/Context/CartChangeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <MenuContext>
      <WindowContext>
        <CartChangeContext>
          <BrowserRouter>
             <App />
          </BrowserRouter>
      </CartChangeContext>
      </WindowContext>
     </MenuContext>
  </React.StrictMode> ,
)
