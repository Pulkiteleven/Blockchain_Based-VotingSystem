import React, { useContext, useState } from 'react'
import { Alert } from '@material-tailwind/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToasterError ,Toaster, OneDialog} from '../Alerts/Alerts';
import userIdContext from '../Context/context';
import ProviderContext from '../Context/ProviderContext';
import { ethers } from 'ethers';
import { contractAbi, contractAddress } from '../Constants/constants';
import { useEffect } from 'react';

const AllElection = () => {

    const[alls, setAlls] = useState([]);

    useEffect(() =>{
        // Call your function here
        getAllElection()
    }
      , []);
    async function getAllElection(){
        console.log("Kem Cho");
        // const provider = globalProvider.provider;
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
          
          const signer = provider.getSigner();
          
          const contractInstance = new ethers.Contract (
           contractAddress,contractAbi,signer
          );
          try{
            const Campaign = await contractInstance.getAllCampaigns();
            console.log(Campaign);
            const newArr = [];
            for(let item of Campaign){
                let newObj = await getOneElection(item);
                console.log('newObj:', newObj);
                newArr.push(newObj);
            }
        
            setAlls(newArr);
            console.log('newArr:', newArr);
            console.log("done");
            
          }
          catch(err){
            ToasterError("Invald CampaignId")
            console.log(err);
          }
      }
async function getOneElection(ind){
        // const provider = globalProvider.provider;
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
          
          const signer = provider.getSigner();
          
          const contractInstance = new ethers.Contract (
           contractAddress,contractAbi,signer
          );
          try{
            const Campaign = await contractInstance.getCampaign(ind);
            const aa = {
              creator:Campaign[0],
              title:Campaign[1],
              options:Campaign[2],
              active:Campaign[3],
              id:ind,
            };
            
            // setAlls(updatedAlls); 
            return aa;  
    
          }
          catch(err){
            ToasterError("Invald CampaignId")
            console.log(err);
          }
      
}
  return (
    <div className='bg-slate-700 w-screen h-screen flex flex-col place-items-center'>
        <div className='p-6'>
            <p className='text-4xl text-amber-500 font-bold'> ALL ELECTIONS</p>

            <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-3">
    <table class="w-full text-sm text-left rtl:text-right text-gray-400">
        <thead class="text-xs  uppercase bg-gray-700 text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                   ID
                </th>
                <th scope="col" class="px-6 py-3">
                    Election Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Options
                </th>
            </tr>
        </thead>
        <tbody>
            {alls.map((opt,index) =>
             <tr class=" bg-gray-800 border-gray-700  hover:bg-gray-600">
             <th scope="row" class="px-6 py-4 font-medium  whitespace-nowrap text-white">
                 {opt.id.toNumber()}
             </th>
             <td class="px-6 py-4">
                 {opt.title}
             </td>
             <td class="px-6 py-4">
                {opt.options.join(", ")}
             </td>
            
         </tr>
            )}
           
        
        </tbody>
    </table>
</div>
        </div>
      
    </div>
  )
}

export default AllElection
