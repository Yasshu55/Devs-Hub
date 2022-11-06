import React,{useState,useEffect} from 'react'
import {Link,Redirect} from 'react-router-dom'
import axios from 'axios'


function Myprofile() {
    const [data,setData] = useState(null);
    const [review,setReview] = useState([]);

    useEffect(() =>{
      axios.get("http://localhost:5000/myprofile",{
          headers:{
            "x-token": localStorage.getItem('token')
          }
      }).then(res => setData(res.data))
      
      axios.get("http://localhost:5000/myreview",{
          headers:{
            "x-token": localStorage.getItem('token')
          }
      }).then(res => setReview(res.data))
    },[])
  
    if(!localStorage.getItem('token')){
      return <Redirect to="/login"></Redirect>
    }

  return (
    <div>
        <nav className="navbar bg-dark">
     <h1>
       <Link to='/'><i className="fas fa-code"></i>Devs Hub</Link>
     </h1>
     <ul>
         <li><Link to='/myprofile'>My profile</Link></li>
         <li><Link to='/login'>Logout</Link></li>
     </ul>
    </nav>

    {data && 

        <section className='container'>
        <Link to="/dashboard">Back to Profiles</Link>

        <div>
           <img className='round-img'
             src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
             alt="failed to load profile img" /> 

            <h1>{data.fullname}</h1>
            <p>{data.email}</p>
            <p>India</p>
        </div>    

        <div>
            <h2>
                <i>Reviews and Ratings</i>
            </h2>
        </div>

        <div>
            {review ?
             review.map(review =>
                <div>
            <h4> <Link to='#'>{review.taskprovider}</Link></h4>
            <p>
                    {review.rating}/5
            </p>
            </div>) : <p>No review added yet</p>}


        </div>


        </section>
    }

  

    </div>
  )
}

export default Myprofile