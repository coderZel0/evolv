import React, { useEffect, useState } from 'react';
import './App.css';
import DashBoard from './components/DashBoard/DashBaord';
import {data} from './data';
import {BrowserRouter as Router} from 'react-router-dom'
import { Route,Routes } from 'react-router-dom';

function App() {
  const [userData,setData] = useState([]);

  useEffect(()=>{
    console.log(data)
    setData(data);
  },[])

  return (
    <Router>
    <div className="App">
      
        <Routes>
          <Route exact path="/" element={<DashBoard userData={userData}/>} />
        </Routes>
      
    </div>
    </Router>
  );
}

export default App;
