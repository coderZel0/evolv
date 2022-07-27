import React, { useEffect,useState } from 'react';
import './container.css';
import avatar from '../../assets/image 22.png';
import {ReactComponent as Usercheck} from '../../assets/usercheck.svg';
import {ReactComponent as EventIcon} from '../../assets/event.svg';
import {TbCalendarTime} from 'react-icons/tb';
import {FaCalendarClock} from 'react-icons/fa';
import {ReactComponent as Positive} from '../../assets/positive.svg';
import {ReactComponent as Negative} from '../../assets/negative.svg';
import {ReactComponent as Notification} from '../../assets/Vector (3).svg';
import {ReactComponent as Option} from '../../assets/Vector (2).svg';
import {ReactComponent as Exclamation} from '../../assets/exclamation.svg';
import {CircularProgressbarWithChildren,buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {PieChart} from 'react-minimal-pie-chart';
import ToolTip from '../tooltip/ToolTip';
import { Link } from 'react-router-dom';

const Wrapper = ({open,controls,children,type,updateData,feedback,id})=>{
    return <>
        <div className="wrapper">
            <div style={!open?{flex:0}:null} className='wrapper_inner_left'>
                {children && children}
                {controls && <div className='controls'>
                    <div onClick={()=>updateData(type,"add")} className='increment'><Positive/></div>
                    <div onClick={()=>updateData(type,"decrease")} className='decrement'><Negative/></div>
                </div>}
            </div>
            
            <div style={(!open)?{visibility:"hidden",pointerEvents:"none",display:"none"}:null} className='wrapper_inner_right'>
                
                <Link style={feedback?{pointerEvents:"none"}:null} to={`/${id+"/"+type}`}>
                    <div style={feedback?{backgroundColor:"#CC3838"}:null} className="option">
                        {!feedback?<Option/>:<Exclamation/>}
                    </div>
                </Link>
            </div>
           
            
        </div>
    </>
}



const UserRow = ({data})=>{
    const {userName,email,
        steps,performedDate,scheduledDate,
        calorieIntake,calorieTarget,proteinConsumed,
        proteinTarget,carbConsumed,carbTarget,fatConsumed,fatTarget,feedback
    } = data;
    const [userState,setState] = useState({stepsTarget:steps.target,stepsWalked:steps.walked,calorieIntake,calorieTarget});

    const [calorie,setCalorie] = useState({});
    const [userDates,setDate] = useState({performedDate:'',scheduledDate:''})
    const [scheduled , setScheduled] = useState(false);
    const [showtool,setShow] = useState(false);

    const [nutritionState,setNutrition] = useState([{name:"protein",consumed:proteinConsumed,target:proteinTarget
                                                    ,color:"#03C7FC"
                                        },{
                                            name:"fat",
                                            consumed:fatConsumed,
                                            target:fatTarget,
                                            color:"#F5C90F"
                                        },
                                    {
                                        name:"carb",
                                        consumed:carbConsumed,
                                        target:carbTarget,
                                        color:"#F45C84"
                                    }])


    const updateData = (type,action)=>{
       
        if(action==="add"){
            if(type==="steps"){
                const new_target = userState.stepsTarget+500;
                setState({...userState,stepsTarget:new_target});
            }
            else if(type==="nutrition"){
                const new_target = userState.calorieTarget+100;
                setState({...userState,calorieTarget:new_target});
            }
        }
        else if(action==="decrease"){
            if(type==="steps"){
                const new_target = userState.stepsTarget-500;
                setState({...userState,stepsTarget:new_target});
            }
            else if(type==="nutrition"){
                const new_target = userState.calorieTarget-100;
                setState({...userState,calorieTarget:new_target});
            
            }
        }
        
    }

    const showTool = ()=>{

    }

    useEffect(()=>{
       
        //set values for pie chart
        const fat = (fatConsumed/210)*100;
        const pro = (proteinConsumed/210)*100;
        const carb = (carbConsumed/210)*100;
        setCalorie({fat,pro,carb})
        //

        const date = performedDate.toString().split(" ");
        const pdate = date[2]+" "+date[1];
        const Sdate = scheduledDate.toString().split(" ");
        const sdate = Sdate[2]+" "+Sdate[1];

        setDate({performedDate:pdate,scheduledDate:sdate});
    
    // check if today is scheduled day
    if(new Date().getDate() == scheduledDate.getDate()){ //toString and toDateString are not giving correct results
                                                        //i didn't have time so i went with this cheap method of comparisn
        setScheduled(true)    
    }
    
        
    },[data])

    return <>
        <div className="container">
            <div className="inner_container">
                <div className="user">
                    <div className="avatar">
                        <img src={avatar} alt=""/>
                    </div>
                    <div className="user_details">
                        <span className="username">{userName}</span>
                        <span className="email">{email}</span>
                    </div>
                </div>
                <div className="work_details_container">
                    <div className="steps_detail">
                        <Wrapper updateData={updateData} type={"steps"} open={false} controls={true}>
                            <div style={{width:60,height:60}} className='progress_outer'>
                                <CircularProgressbarWithChildren  strokeWidth={10}  value={(steps.walked/userState.stepsTarget)*100} styles={buildStyles(
                                    {strokeLinecap: 'butt',
                                    pathTransitionDuration: 0.5,
                                    pathColor: "#7FD18C",
                                    trailColor: '#FFFFFF',
                                    
                                    })}>

                                        <div className='steps_walked'>
                                            <div className='steps_num'>{steps.walked}</div>
                                            <span>walked</span>
                                        </div>
                                    </CircularProgressbarWithChildren>
                            </div>
                            <div className='steps_target'>
                                <div className='target_num'>{`${userState.stepsTarget/1000}K`}</div>
                                <span>target</span>
                            </div>
                        </Wrapper>
                    </div>
                    <div className="workout_detail">
                        <Wrapper id={data.userId} type={"workout"} feedback={feedback} updateData={updateData} open={true}>
                            <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                                <div className='usercheck' style={{marginBottom:"4px"}}>
                                    <Usercheck/>
                                    <span>{userDates.performedDate}</span>
                                </div>
                                <div className='userevent' style={scheduled?{marginTop:"4px",backgroundColor:"#CC3838"}:{marginTop:"4px"}}>
                                        <TbCalendarTime style={{border:"#FFFFFF",width:"22px",height:"22px"}} stroke="#FFFFFF" fill={"rgba(0,0,0,0)"}/>
                                        <span style={{marginLeft:"11.25px"}}>{userDates.scheduledDate}</span>
                                </div>
                            </div>
                            
                        </Wrapper>
                    </div>
                    <div className="nutrition_detail">
                        <Wrapper id={data.userId} type={"nutrition"} updateData={updateData} open={true} controls={true}>
                            <div  onMouseOver={()=>setShow(true)} onMouseOut={()=>setShow(false)} className='pie_container' style={{width:60,height:60}}>
                                <PieChart
                                lineWidth={30}
                               
                                data={[
                                    { title: 'fat', value: calorie.fat, color: '#F5C90F'},
                                    { title: 'protien', value:calorie.pro, color: '#03C7FC' },
                                    { title: 'carbs', value:calorie.carb , color: '#F45C84' },
                                ]}
                                />

                                <div className=' calouries'>
                                    <div className='calories_num'>{calorieIntake}</div>
                                    <span>calories</span>
                                </div>
                                {showtool && <div className='dropdowntool'>
                                    <ToolTip data={nutritionState}/>
                                </div>}
                            </div>
                            <div className='nutrition_target'>
                                <div className='target_num'>{`${userState.calorieTarget/1000}K`}</div>
                                <span>target</span>
                            </div>
                        </Wrapper>
                    </div>
                </div>
                <div className='notification_container'>
                    <div className="notify_icon">
                        <Notification/>
                    </div>
                </div>
            </div>
        </div>
    
    </>
}


export default UserRow;