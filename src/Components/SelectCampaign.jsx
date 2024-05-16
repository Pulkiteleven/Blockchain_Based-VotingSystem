import React, { useContext, useState } from 'react'
import { Alert } from '@material-tailwind/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToasterError ,Toaster} from '../Alerts/Alerts';
import userIdContext from '../Context/context';
import ProviderContext from '../Context/ProviderContext';
import { ethers } from 'ethers';
import { contractAbi, contractAddress } from '../Constants/constants';
import { useNavigate } from 'react-router-dom';


const SelectCampaign = () => {



const userId = useContext(userIdContext);
const globalProvider = useContext(ProviderContext);
const [cId,setcId] = useState(0);
const navigate = useNavigate();

  async function getCampaign(id){
    // const provider = globalProvider.provider;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
      
      const signer = provider.getSigner();
      
      const contractInstance = new ethers.Contract (
       contractAddress,contractAbi,signer
      );
      try{
        const Campaign = await contractInstance.getCampaign(id);
        console.log(Campaign);
        userId.setCampaign({
          creator:Campaign[0],
          title:Campaign[1],
          options:Campaign[2],
          active:Campaign[3],
          id:id,
        });
        navigate('/OneCampaign');

      }
      catch(err){
        ToasterError("Invald CampaignId")
        console.log(err);
      }
  }

  return (
    <div className='w-screen bg-slate-700 flex flex-col place-content-center place-items-center h-screen'>
        <p className='text-4xl text-amber-500 font-bold'>Hello Voter</p>
        <p className='text-[12px] text-white font-sans pt-2'>{userId.uid}</p>

        <div className='flex flex-row flex-wrap mt-3 gap-3'>
            <input type="number" class="block w-[50%] p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base
         focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
          dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-15
          " placeholder='Enter Campaign Id' value={cId} onChange={(e) => {setcId(e.target.value)}}/>
          <button className=' h-15 bg-amber-500 rounded-md t p-4 text-white hover:bg-amber-200 text-1xl font-bold'
          onClick={() => {
            getCampaign(cId);
          }}
        //   onClick={()=>{notify())}}
          >Select Campaign</button>
          {/* <button className='bg-amber-500 rounded-md max-h-fit text-white hover:bg-amber-200 text-1xl font-bold'>Select Campaign</button> */}
          <ToastContainer/>
        

        
      </div>
    </div>
  )
}

export default SelectCampaign
