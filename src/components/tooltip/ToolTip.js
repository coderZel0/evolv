import React from 'react'
import './tooltip.css';

const ToolTip = (data) => {
  return (
    <div className='tooltip'>
        <div className="cap"></div>
        <div className='bar_container'>
            <div className='bar_title'>
                <div className='bar_title_text'>protein</div>
                <span>70g</span>
            </div>
            <div className='bar'>
                <div className='bar_inner'></div>
                <span>30g</span>
            </div>
        </div>
    </div>
  )
}

export default ToolTip