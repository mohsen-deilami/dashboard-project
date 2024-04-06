import React from 'react'
import './Chart.css'
import {ResponsiveContainer , LineChart, Line ,CartesianGrid , XAxis , Tooltip ,YAxis} from 'recharts';

export default function Chart({ title , data , dataKeyy,datakeyx ,dataKeyy2, grid}) {
  return  (
   
   
    <div className='myClass'>
        {console.log(data)}
    <h3 className='chart__title'>{title}</h3>
    <ResponsiveContainer width='100%' aspect={5}>
    <LineChart data={data}>
      <XAxis dataKey={datakeyx} stroke='#5550bd'/>
      
    <Line type="monotone" dataKey={dataKeyy2} stroke='#5550bd'/>
      <YAxis/>   
    <Line type="monotone" dataKey={dataKeyy} stroke='#5550bd'/>
   
    <Tooltip/>
     {grid && <CartesianGrid stroke='#e0dfdf' strokeDasharray="10"/>} 
    </LineChart>
    </ResponsiveContainer>
    
  </div>
   
  )
}
