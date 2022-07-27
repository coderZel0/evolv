import React, { useEffect, useState } from 'react';
import './App.css';
import DashBoard from './components/DashBoard/DashBaord';
import {data} from './data';

function App() {
  const [userData,setData] = useState([]);

  useEffect(()=>{
    console.log(data)
    setData(data);
  },[])

  return (
    <div className="App">
      {userData && <DashBoard userData={userData}/>}
    </div>
  );
}

export default App;
