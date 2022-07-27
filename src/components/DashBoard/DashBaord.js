
import React from 'react';
import './maincontainer.css';

import UserRow from '../userrow/UserRow';

import {ReactComponent as Steps} from '../../assets/Vector.svg';
import {ReactComponent as Nutrition} from '../../assets/Vector (1).svg';
import {ReactComponent as Gym} from '../../assets/gym.svg';
import GymImage from '../../assets/gym.png';


const DashBoard = ({userData})=>{

    return <>
        <div className="outer_container">
            <div className="main_container">
                <div className="title steps">
                    <Steps/>
                    <span>Steps</span>
                </div>
                <div className="title workout">
                    <div style={{width:"20px",height:"20px"}}>
                       <Gym fill='#FFFFFF' />
                    </div>
                   
                    <span>workout</span>
                </div>
                <div className="title nutrition">
                    <Nutrition/>
                    <span>Nutrition</span>
                </div>
                <div className="containers">
                    {userData && userData.map((item)=><UserRow key={item.userId} data={item}/>)}
                </div>
                
            </div>
        </div> 
    
    </>
}


export default  DashBoard;

