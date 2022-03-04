import logo from './logo.svg';
import './App.css';
import { useState ,useEffect} from 'react';
import Loader from 'react-loader-advanced';
import { ethers } from "ethers";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Route, Routes,useNavigate  } from 'react-router-dom';
import Mainpage from './mainpage';
import axios from 'axios';
import contract from './MegaPrimatesToken.json'

const BigNumber = require('bignumber.js');

const contractAddress = "0xc61BF058b7D69f2a7b898DA87aC12562f02027e0";
const abi = contract.abi;

const spinner = <span><CircularProgress style={{'color': 'yellow'}}/></span>;

const { ethereum } = window;

function getToken() {
  const tokenString = localStorage.getItem('token');
  let data = JSON.parse(tokenString);
  let now = new Date();
  let expiration = new Date(data.timestamp);
  expiration.setMinutes(expiration.getMinutes() + 120);
  if(now.getTime() > expiration.getTime()){
   let userToken = localStorage.setItem('token', JSON.stringify({timestamp: new Date(),content:false}));
    return userToken
  }
  const userToken = JSON.parse(tokenString);
  console.log(userToken)
  return userToken
}

function App() {
  let token
  const navigate = useNavigate();
  const [status , setStatus]=useState('CONNECT WALLET')
  const [loading,setload]=useState(false)
  const [account,setCurrentAccount]=useState()
  const [show,setshow]=useState(false)
  
  useEffect(()=>{
    checkWalletIsConnected()
    token=getToken()
    
    if(token.contect) {
      console.log('aaaa')
      setshow(true)
      navigate('./mainpage')
    }else{
      setshow(false)
      navigate('../')
      console.log('false')
    }
  },[])

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      setStatus("DOWNLOAD METAMASK");
    }else
    {
        setload(true)
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' }).catch((err)=>{if(err) setload(false)});
        setCurrentAccount(accounts[0]);
        setStatus("login")
        setload(false)
    }
  }

  const checkWalletIsConnected = async () => {
    if (!ethereum) {
      setStatus("DOWNLOAD METAMASK");
      return;
    } else {
        setStatus("CONNECT WALLET");
        const accounts = await ethereum.request({ method: 'eth_accounts' }).then().catch((err)=>{});
        if (accounts.length !== 0) {
          setStatus("login")
          const account = accounts[0];
          setCurrentAccount(account);
        } else {
          connectWalletHandler()
        }
      
    }
  }
  
  
  const login=async ()=>{
    let provider = new ethers.providers.Web3Provider(ethereum);
    let signer = provider.getSigner();
    let nftContract = new ethers.Contract(contractAddress, abi,provider);
    let str;
    let count = await nftContract.balanceOf(account).then(result=>str=BigNumber(result._hex).toString());
    console.log(str)

    const hash = await ethers.utils.keccak256(account+str)
    let signature = await signer.signMessage(ethers.utils.arrayify(hash))
    console.log(signature)
    // let token=await axios.post("https://mysterious-reaches-44453.herokuapp.com/login",{
      let token=await axios.post("https://warm-woodland-46957.herokuapp.com/login",{
                  signature :`${signature}`,
                  address: `${account}`,
                  count:`${str}`
               },{
                  headers: {'Content-Type': 'application/json'}
              })
              console.log(token.request.response)
              setshow(token.request.response)
    if(token.request.response) {
      navigate('./mainpage')
      localStorage.setItem('token', JSON.stringify({timestamp: new Date(),content:token.request.response}));
      // data = JSON.parse(data);
      // let now = new Date();
      // let expiration = new Date(data.timestamp);
      // expiration.setMinutes(expiration.getMinutes() + 30);
    }
  }
  const click=()=>{
    if(status=="login") login()
    else if (status=="DOWNLOAD METAMASK") window.location.href='https://metamask.io/download.html'
    else connectWalletHandler()
  }

  

  return (
    <Loader  show={loading} message={spinner}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <button onClick={click}>{status}</button>
                <Routes>
                  <Route exact  path="/mainpage" element={<Mainpage show={show}/>}>
                  </Route>
                </Routes>
        </header>
      </div>
    </Loader>
  );
}

export default App;
