import React,{useState,useEffect} from 'react'
import {Link, Redirect} from "react-router-dom"
import axios from 'axios'

function Dashboard() {
  
  const [data,setData] = useState([]);

  useEffect(() =>{
    axios.get("http://localhost:5000/allprofiles",{
        headers:{
          "x-token": localStorage.getItem('token')
        }
    }).then(res => setData(res.data))
  },[])

  if(!localStorage.getItem('token')){
    return <Redirect to="/login"></Redirect>
  }
  return (
    <div>


    <div className='profile bg-light' >
    {data.length>=1 ?           
           data.map(profile =>
           <div>
           <img className='round-img'
             src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
             alt="failed to load profile img" /> 

            <div>
              <h2>{profile.fullname}</h2>
              <p>{profile.email}</p>
              <p>India</p>
              <Link to={`/indprofile/ ${profile.fullname}/${profile.email}/${profile.skill}/${profile._id}`} className="btn btn-primary">View Profile</Link>
            </div>
            <ul>
            {profile.skills.split(",").map(skill =>
              <li className="text-primary">
                <i className="fas fa-check"></i> {skill}
              </li>
            )}
            </ul>
           </div>
            )
          : null}
    </div>
  </div>
  )
}

export default Dashboard