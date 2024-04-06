import React from 'react'
import './Header.css'
import {AiOutlineBell} from 'react-icons/ai'
import {BsBrightnessHigh} from 'react-icons/bs'

export default function Header() {
  return (
    <div className='header'>
        <div className="header-profile">
            <img src="./img/profile.jpg" alt="" className='header-profile-img'/>
            <div>
                <h1 className='header-profile-title'>Mohsen Deilami</h1>
                <h2 className='header-profile-describe'>Front-End Deweloper</h2>
            </div>
        </div>

        <div className="header-left">
            <button className='header-left-icon'><AiOutlineBell/></button>
            <button className='header-left-icon'><BsBrightnessHigh/></button>
            <div className="search-box">
                <input type="text" placeholder='Search...'className='search-box-input' />
                <button className='btn search-box-btn'>Search</button>
            </div>
        </div>
      
    </div>
  )
}
