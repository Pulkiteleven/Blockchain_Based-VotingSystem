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

import Button from '@mui/material/Button';
import { ArrowDropDown, ExpandMoreOutlined } from '@mui/icons-material';

const Election = () => {
    const userId = useContext(userIdContext);
    const navigate = useNavigate();

    const [electionname,setElectionName] = useState(null);
    const [options,setOption] = useState(null);

    const [cId,setcId] = useState(0);
    const [uid, setuid] = useState(null);

    async function MakeElection(){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract (
        contractAddress, contractAbi, signer
      );
      try{
        const cos = options.split(",");
      const tx = await contractInstance.createCampaign(electionname,cos);
      await tx.wait();
      Toaster("Election Created Successfully");
      setElectionName(null);
      setOption(null);
      }
      catch(e){
        if (e.data && contract) {
            const decodedError = contract.interface.parseError(e.data);
            console.log(`Transaction failed: ${decodedError?.name}`);
          } else {
            console.log(`Error in widthrawContract:`, e.error.data.message);
            ToasterError(e.error.data.message);
          }
      
    }
    }

    async function StartElection(){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract (
        contractAddress, contractAbi, signer
      );
      try{
      const tx = await contractInstance.activateCampaign(cId);
      await tx.wait();
      Toaster("Election Started");
      setcId(null);
      }
      catch(e){
        console.log(e);
        if (e.data && contract) {
            
            const decodedError = contract.interface.parseError(e.data);
            console.log(`Transaction failed: ${decodedError?.name}`);
          } else {
            console.log(`Error in widthrawContract:`, e.error.data.message);
            ToasterError(e.error.data.message);
          }
      
    }
    }

    async function EndElection(){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract (
        contractAddress, contractAbi, signer
      );
      try{
      const tx = await contractInstance.endCampaign(cId);
      await tx.wait();
      Toaster("Election Ended");
      setcId(null);
      }
      catch(e){
        if (e.data && contract) {
            const decodedError = contract.interface.parseError(e.data);
            console.log(`Transaction failed: ${decodedError?.name}`);
          } else {
            console.log(`Error in widthrawContract:`, e.error.data.message);
            ToasterError(e.error.data.message);
          }
      
    }
    }

    async function AddVoter(){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract (
        contractAddress, contractAbi, signer
      );
      console.log(uid,cId);
      try{
      const tx = await contractInstance.addVoters(uid,cId);
      await tx.wait();
      Toaster("Voter Added");
      setcId(null);
      setuid(null);
      }
      catch(e){
        console.log(e);
        // if (e.data && contract) {
        //     const decodedError = contract.interface.parseError(e.data);
        //     console.log(`Transaction failed: ${decodedError?.name}`);
        //   } else {
        //     console.log(`Error in widthrawContract:`, e.error.data.message);
        //     ToasterError(e.error.data.message);
        //   }
      
    }
    }
  


  return (
    <div className='flex justify-center flex-col items-center h-screen bg-slate-700 overflow-auto'>
      <p className='text-4xl text-amber-400 font-bold'>Hello Officer</p>
      <p className='text-1xl text-white'>{userId.uid}</p>

    
    
      <div className='bg-slate-700 w-100'>
      <Accordion className='bg-slate-700' style={
        {
            width:600,
            backgroundColor: 'transparent', // Change this color to your desired color
          }
      }>
        <AccordionSummary
          expandIcon={<ExpandMoreOutlined/>}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <p className='text-white font-bold'>New Election</p>
        </AccordionSummary>
        <AccordionDetails>
        <input type="text" class="block w-[100%] p-4 text-white border border-slate-900 rounded-lg bg-slate-800 text-base
         focus:ring-amber-500 focus:border-amber-500 h-15
          " placeholder='Election Name' value={electionname} onChange={(e) => {setElectionName(e.target.value)}}/>

        <input type="text" class="block w-[100%] p-4 text-white border border-slate-900 rounded-lg bg-slate-800 text-base
         focus:ring-amber-500 focus:border-amber-500 h-15 mt-2" 
         placeholder='Enter Options Seperated By coma(,)'   value={options} onChange={(e) => {setOption(e.target.value)}}/>

         <button className='w-[100%] h-12  bg-amber-600 hover:bg-amber-400 text-white rounded-lg font-bold mt-3' onClick={() => {MakeElection()}}>
          CREATE ELECTION</button>
        </AccordionDetails>
      </Accordion>

      <Accordion className='bg-slate-700' style={
        {
            width:600,
            backgroundColor: 'transparent', // Change this color to your desired color
          }
      }>
        <AccordionSummary
          expandIcon={<ExpandMoreOutlined/>}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <p className='text-white font-bold'>Start Election</p>
        </AccordionSummary>
        <AccordionDetails>
        <input type="number" class="block w-[100%] p-4 text-white border border-slate-900 rounded-lg bg-slate-800 text-base
         focus:ring-amber-500 focus:border-amber-500 h-15
          " placeholder='Election Id' value={cId} onChange={(e) => {setcId(e.target.value)}}/>


         <button className='w-[100%] h-12 p bg-amber-600 hover:bg-amber-400 text-white rounded-md font-bold mt-3' onClick={() => {StartElection()}}>START ELECTION</button>
        </AccordionDetails>
      </Accordion>

      <Accordion className='bg-slate-700' style={
        {
            width:600,
            backgroundColor: 'transparent', // Change this color to your desired color
          }
      }>
        <AccordionSummary
          expandIcon={<ExpandMoreOutlined/>}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <p className='text-white font-bold'>End Election</p>
        </AccordionSummary>
        <AccordionDetails>
        <input type="number" class="block w-[100%] p-4 text-white border border-slate-900 rounded-lg bg-slate-800 text-base
         focus:ring-amber-500 focus:border-amber-500 h-15
          " placeholder='Election Id' value={cId} onChange={(e) => {setcId(e.target.value)}}/>


         <button className='w-[100%] h-12 bg-amber-600 hover:bg-amber-400 text-white rounded-md font-bold mt-3' onClick={() => EndElection()}>END ELECTION</button>
        </AccordionDetails>
      </Accordion>
     
      <Accordion className='bg-slate-700' style={
        {
            width:600,
            backgroundColor: 'transparent', // Change this color to your desired color
          }
      }>
        <AccordionSummary
          expandIcon={<ExpandMoreOutlined/>}
          aria-controls="panel4-content"
          id="panel4-header"
        >
          <p className='text-white font-bold'>Add Voter</p>
        </AccordionSummary>
        <AccordionDetails>
        <input type="number" class="block w-[100%] p-4 text-white border border-slate-900 rounded-lg bg-slate-800 text-base
         focus:ring-amber-500 focus:border-amber-500 h-15
          " placeholder='Election Id' value={cId} onChange={(e) => {setcId(e.target.value)}}/>

        <input type="text" class="block w-[100%] p-4 text-white border border-slate-900 rounded-lg bg-slate-800 text-base
         focus:ring-amber-500 focus:border-amber-500 h-15 mt-2
          " placeholder='User Id Id' value={uid} onChange={(e) => {setuid(e.target.value)}}/>


         <button className='w-[100%] h-12 bg-amber-600 hover:bg-amber-400 text-white rounded-md font-bold mt-3' 
         onClick={() => {AddVoter()}}>ADD VOTER</button>
        </AccordionDetails>
      </Accordion>
        
      <Link to="/AllElection"><button className='h-15 p-5 mt-3 rounded-md w-[100%] text-white font-bold bg-amber-500'> SEE ALL ELECTION</button></Link>

     
     
    
    


    </div>
    <ToastContainer/>
    </div>
  )
}



export default Election











