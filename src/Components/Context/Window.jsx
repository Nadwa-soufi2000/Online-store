import { createContext, useEffect, useState } from "react";

export const WindowSize = createContext(null);

export default function WindowContext({ children })
{
    const[windowSSize , setWindowSize] = useState(window.innerWidth);

    useEffect(() => {
        
        function setWindowwidth() {
            setWindowSize(window.innerWidth)
        }
        window.addEventListener("resize" , setWindowwidth)

        return () => {
            window.removeEventListener("resize" , setWindowwidth)
        };

    }, [])

    return (
        <WindowSize.Provider value={{ windowSSize }}>{children}</WindowSize.Provider>
    )
}