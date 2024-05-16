import React, { useContext, useState } from 'react'
import { Alert } from '@material-tailwind/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToasterError ,Toaster} from '../Alerts/Alerts';
import userIdContext from '../Context/context';
import ProviderContext from '../Context/ProviderContext';
import { ethers } from 'ethers';
import { contractAbi, contractAddress } from '../Constants/constants';
import { Link, useNavigate } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Winner = () => {

    const [options, setOptions] =  useState([]);
    const [oneWinner, setWinner] = useState([]);
    const [wini,setWini] = useState(0);
    const [showresult,setShowResult] = useState(false);

    async function getWinner(id){
        // const provider = globalProvider.provider;
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
          
          const signer = provider.getSigner();
          
          const contractInstance = new ethers.Contract (
           contractAddress,contractAbi,signer
          );
          try{
            const Campaign = await contractInstance.getWinners(id);
            console.log(Campaign);
            const newArr = [];
           for(let i of Campaign){
                newArr.push(i);
            }
            console.log(newArr.length);
            setOptions(newArr);
            await findWinner(Campaign);
            setShowResult(true);
          }
          catch(e){
            console.log(e.reason);
            Toaster(e.reason);
            setShowResult(false);
            // if (e.data) {
            //     // const decodedError = contract.interface.parseError(e.data);
            //     // console.log(`Transaction failed: ${decodedError?.name}`);
            //   } else {
            //     console.log(`Error in widthrawContract:`, e.error.data.message);
            //     ToasterError(e.error.data.message);
            //   }
            
           
          }
      }

      async function findWinner(ll) {
        let max = 0;
        let wins = [];
        setWinner(wins);
        for(let item of ll){
            if(item.votes > max){
                console.log(item.option);
                wins = [];
                if(!wins.includes(item.option)){
                wins.push(item.option)
                }
                max = item.votes;
            }
            if(item.votes == max){
                if(!wins.includes(item.option)){
                    wins.push(item.option)
                    }
            }
        }
        console.log(wins.length);
        setWini(max);
        setWinner(wins);
      }

    const [cId,setcId] = useState(null);
  return (
    <div className='bg-slate-700 h-screen w-screen flex flex-col place-content-center place-items-center'>
      <p className='text-2xl text-amber-400 font-bold'>Enter Election ID</p>
      <div className='flex flex-row gap-2 h-15 place-content-center place-items-center'>
        <input type="number" class="block w-[50%] p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base
         focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
          dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-fit
          " placeholder='Enter Campaign Id' value={cId} onChange={(e) => {setcId(e.target.value)}}/>
         <button className='bg-amber-500 p-3 text-white font-bold rounded-md' onClick={() => getWinner(cId)}>
            Get Results
         </button>
          </div>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-3">
   
   {(showresult)&&(oneWinner.length > 1)?<p className='text-2xl font-bold text-white'>There is A tie Between <p className='text-amber-500'>{oneWinner.join(", ")} </p></p>:
   <p className='text-2xl text-white font-bold text-center'>The Election Winner is <p className='text-amber-500'>{oneWinner}</p></p>
   } 
   { (showresult)&&<table class="w-full text-sm text-left rtl:text-right text-gray-400">
        <thead class="text-xs  uppercase bg-gray-700 text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                   S.No
                </th>
                <th scope="col" class="px-6 py-3">
                    Candidate
                </th>
                <th scope="col" class="px-6 py-3">
                    Votes
                </th>
            </tr>
        </thead>
        <tbody>
            {options.map((opt,index) =>
             <tr class=" bg-gray-800 border-gray-700  hover:bg-gray-600">
             <th scope="row" class="px-6 py-4 font-medium  whitespace-nowrap text-white">
                 {++index}
             </th>
             <td class="px-6 py-4">
                 {opt.option}
             </td>
             <td class="px-6 py-4">
                {opt.votes.toString()}
             </td>
            
         </tr>
            )}
           
        
        </tbody>
    </table>}
</div>
          <ToastContainer/>
    </div>
  )
}

export default Winner
