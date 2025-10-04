 
import { createRoot } from 'react-dom/client'

import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css"
 
 import { RouterProvider } from "react-router-dom";
 
import {HeroUIProvider} from "@heroui/react";
import {

  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Router from './Router/Router.jsx'
 
 import AuthContextProvider from './Context/authContext.jsx';

 const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <HeroUIProvider>
 
 <AuthContextProvider>
<RouterProvider router={Router}/>
 
 </AuthContextProvider>

 
  

  
  </HeroUIProvider></QueryClientProvider>
 
)
