import React, { useEffect, useState } from 'react'
import axios from "axios"
import "./Email.css";

function Emails() {
  const [email,setEmails] = useState([]);
  
  useEffect(()=>{
    getEmails();
  },[])
  const getEmails = async () =>{
    await axios.get(`http://localhost:2000/api/emails`)
    .then(res =>{
      setEmails(res.data);
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  return (
      <>
     <div className='email_table'>
        <table className='styled-table-email'>
        <thead>
          <tr>
            <th style={{textalign: "center"}}>Email</th>
          </tr>
        </thead>
        <tbody>
        {email && email.map((item,index)=>{
            return(
              <tr key={index}>
                <td>{item.email}</td>
              </tr>
            )
          })}
        </tbody>
        </table>
    </div>
    </>
  )
}

export default Emails;