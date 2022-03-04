import React,{useEffect,useState} from 'react';
import { useNavigate  } from 'react-router-dom';
import Iframe from 'react-iframe'


export default function Mainpage({show}) {
    const navigate = useNavigate();
    const [firstname ,setfirstname]=useState()
    const [lastname ,setlastname]=useState()
    const [email,setemail]=useState()
    const [phone,setphone]=useState()
    const [coutrycode,setcoutrycode]=useState()
    const [country,setcountry]=useState()
    const [city,setcity]=useState()
    const [zip,setzip]=useState()

    useEffect(()=>{
        if(!show) {navigate('../');console.log(show)}
    },[])
    const submit=()=>{
      if(firstname==null||lastname==null||email==null||phone==null||coutrycode==null||country==null||city==null||zip==null) alert("fill all info")
      else{
        console.log("aa")
        fetch('https://testtesttest111a.myshopify.com/admin/api/2022-01/customers.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        console.log(response)
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
      });
      }
    }

  return(
    <div>
        <h2>Mainpage</h2>
        {/* <iframe src="https://translate.google.com/"></iframe> */}
        <Iframe url="https://megaprimates.myshopify.com/account/register"
        width="450px"
        height="450px"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"/>
        {/* <div>
          <label>
            First Name
          </label>
          <input value={firstname} onChange={e=>setfirstname(e.target.value)}></input>
          <label>
            Last Name
          </label>
          <input value={lastname} onChange={e=>setlastname(e.target.value)}></input>
        </div>
        <div>
          <label>
            Email
          </label>
          <input value={email} onChange={e=>setemail(e.target.value)}></input>
        </div>
        <div>
          <label>
            Country
          </label>
          <input value={country} onChange={e=>setcountry(e.target.value)}></input>
          <label>
            city
          </label>
          <input value={city} onChange={e=>setcity(e.target.value)}></input>
          <label>
            zip
          </label>
          <input value={zip} onChange={e=>setzip(e.target.value)}></input>
        </div>
        <div>
          <label>
          Coutrycode
          </label>
          <input value={coutrycode} onChange={e=>setcoutrycode(e.target.value)}></input>
          <label>
            Phone Number
          </label>
          <input value={phone} onChange={e=>setphone(e.target.value)}></input>
        </div>
        <button onClick={submit}>SUBMIT</button> */}
    </div>
    
  );
}