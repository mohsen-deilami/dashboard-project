/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import './Sidebar.css'
import {MdProductionQuantityLimits} from 'react-icons/md'
import {HiOutlineHome} from  'react-icons/hi'
import {BiCommentDetail} from 'react-icons/bi'
import {FiUsers} from 'react-icons/fi'
import {BsBagCheck} from 'react-icons/bs'
import {CiBadgeDollar} from 'react-icons/ci'
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className='sidebar'>
        <div className="sidebar-title">Wellcom To Dashboard</div>
        <ul className="sidebar-links">
           
                <NavLink to='/'>
                    <HiOutlineHome className='sidebar-icon'/>
                    Home
                    </NavLink>
                   
            <li >
                <NavLink to='products'>
                    <MdProductionQuantityLimits className='sidebar-icon'/>
                    Products
                </NavLink>
                </li>
            <li>
            <NavLink to='comments'>
                    <BiCommentDetail className='sidebar-icon' />
                    Comments
                </NavLink>
                </li>
            <li>
                <NavLink to='users'>
                    <FiUsers className='sidebar-icon'/>
                    Users
                </NavLink>
                </li>
            <li>
                <NavLink to='orders'>
                <BsBagCheck className="sidebar-icon" />
                    Orders
                </NavLink>
                </li>
            <li>
                <NavLink to='rabat' >
                    <CiBadgeDollar className="sidebar-icon"/>
                    Rabat
                </NavLink>
                </li>
        </ul>
      
    </div>
  )
}
