import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Components/Login'
import SelectCampaign from './Components/SelectCampaign'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import userIdContext from './Context/context'
import ProviderContext from './Context/ProviderContext'
import { ethers } from 'ethers'
import OneCampaign from './Components/OneCampaign'
import Election from './Components/Election'
import AllElection from './Components/AllElection'
import Winner from './Components/Winner'


function App() {
  const [count, setCount] = useState(0);
  const [uid,setUid] = useState(0);
  const [provider, setProvider] = useState(null);
  const [campaign, setCampaign] = useState(null);
  const router = createBrowserRouter([
    {
      path:"",
      element:<Login/>
    },
    {
      path:"/Campaign",
      element:<SelectCampaign/>
    },
    {
      path:"/OneCampaign",
      element:<OneCampaign/>
    },
    {
      path:"/Election",
      element:<Election/>
    },
    {
      path:"/AllElection",
      element:<AllElection/>
    },
    {
      path:"/Winner",
      element:<Winner/>
    },

  ]);

  return (
    <ProviderContext.Provider value={{provider,setProvider}}>
    <userIdContext.Provider value={{uid,setUid,campaign,setCampaign}}>
    <RouterProvider router={router}/>
    </userIdContext.Provider>
    </ProviderContext.Provider>
//  <Login/>
//  <SelectCampaign/>

  )
}

export default App
