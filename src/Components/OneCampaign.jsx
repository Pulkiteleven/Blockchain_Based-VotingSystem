import React, { useContext, useState } from 'react'
import { Alert } from '@material-tailwind/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToasterError ,Toaster, OneDialog} from '../Alerts/Alerts';
import userIdContext from '../Context/context';
import ProviderContext from '../Context/ProviderContext';
import { ethers } from 'ethers';
import { contractAbi, contractAddress } from '../Constants/constants';

const OneCampaign = () => {
    const userId = useContext(userIdContext);
    const allOptions = userId.campaign.options;
    const [myoption,setMyOption] = useState(null);
    const [showDialog, setShowDialog] = useState(false);

    function showAlert(){
        console.log("Hehe");
    }

    async function voteNow(){
        console.log("Hello");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract (
        contractAddress, contractAbi, signer
      );
      try{
      const tx = await contractInstance.vote(userId.campaign.id,myoption);
      await tx.wait();
      Toaster("You have Successfully Voted");
      setShowDialog(false);
      }
      catch(e){
        if (e.data && contract) {
            const decodedError = contract.interface.parseError(e.data);
            console.log(`Transaction failed: ${decodedError?.name}`);
          } else {
            console.log(`Error in widthrawContract:`, e.error.data.message);
            ToasterError(e.error.data.message);
          }
          setShowDialog(false);
      }
    }
  return (
    <div className='grid place-content-center h-screen bg-slate-700'>
    {/* <div className='w-screen  bg-slate-700 flex items-center h-screen'> */}
    {showDialog && (
  <OneDialog
    title={`You Want to Vote to ${myoption}`}
    desc="Are You Sure you want to Vote"
    done={() => {voteNow()}}
    notdone={() => setShowDialog(false)}
  />
)}    
<div className='flex flex-col gap-0 align-middle items-center'>
      <p className='text-1xl text-white font-bold'>Election Name</p>
      <p className='text-4xl text-amber-500 font-bold'>{userId.campaign.title}</p>
      </div>

<div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-3">
    <table class="w-full text-sm text-left rtl:text-right text-gray-400">
        <thead class="text-xs  uppercase bg-gray-700 text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                   S.No
                </th>
                <th scope="col" class="px-6 py-3">
                    Candidate Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Vote
                </th>
            </tr>
        </thead>
        <tbody>
            {allOptions.map((opt,index) =>
             <tr class=" bg-gray-800 border-gray-700  hover:bg-gray-600">
             <th scope="row" class="px-6 py-4 font-medium  whitespace-nowrap text-white">
                 {++index}
             </th>
             <td class="px-6 py-4">
                 {opt}
             </td>
             <td class="px-6 py-4">
                 <button className='p-2 bg-amber-500 text-white font-semibold rounded-md' onClick={() => {
                    setShowDialog(true);
                    
                    console.log(opt);
                    setMyOption(opt);
                    // voteNow();
                    }}>
                    Vote Now
                 </button>
             </td>
            
         </tr>
            )}
           
        
        </tbody>
    </table>
</div>
    {/* </div> */}
    <ToastContainer/>

    </div>
    
  )
}

export default OneCampaign
