import React, { useEffect, useState } from 'react'
import './tooltip.css';

const Bar = ({name,target,consumed,color})=>{
  const [width,setWidth] = useState(null);

  useEffect(()=>{
    const w = (consumed/target)*100;
    setWidth(w);
  },[])

  return(
    <div className='bar_container'>
            <div className='bar_title'>
                <div className='bar_title_text'>{name}</div>
                <span>{`${target}g`}</span>
            </div>
            <div className='bar'>
                <div style={{width:`${width}%`,backgroundColor:color}} className='bar_inner'></div>
                <span style={{color:color}}>{`${consumed}g`}</span>
            </div>
        </div>
  )
}

const ToolTip = ({data}) => {
  console.log(data)
  return (
    <div className='tooltip'>
        <div className="cap"></div>
        {data && data.map((item)=><Bar key={item.name} name={item.name} target={item.target} consumed={item.consumed} color={item.color}/>)
      }
    </div>
  )
}

export default ToolTip