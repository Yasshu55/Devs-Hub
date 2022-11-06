import axios from 'axios';
import React,{useState} from 'react'
import { Link } from 'react-router-dom'


const Indprofile = ({match}) => {
  const [rating,setRating] = useState(null);
  const [taskprovider,setTaskprovider] = useState(null);


  const submitHandler = (e) => {
    axios.get("http://localhost:5000/myprofile",{
      headers: {
        'x-token' : localStorage.getItem('token')
      }
    }).then(res => setTaskprovider(res.data.fullname))

    let review = {
      taskprovider,
      taskworker: match.params.id,
      rating
    }

    axios.post("http://localhost:5000/addreview",review,{
      headers: {
        'x-token' : localStorage.getItem('token')
      }
    }).then(res => alert(res.data))
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

        <section className='container'>
        <Link to="/myprofile" > Back to Profiles</Link>

        <div>
           <img className='round-img'
             src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
             alt="failed to load profile img" /> 

            <h1>{match.params.fullname}</h1>
            <p>{match.params.email}</p>
            <p>India</p>
        </div>    
      <h4>Enter your reviews</h4>
      <form onSubmit={submitHandler} className='form' autoComplete='off' >
          <div className='form-group'>
            <input
             type="text"
             placeholder='Enter your rating out of 5' 
             name='rating'
             onChange={ e => setRating(e.target.value)}
             required
             />
          </div>
         <input type="submit" className='btn btn-primary' value="Add rating" /> 
      </form>

        </section>

        {/* add reviews */}
    
    </div>
  )
}

export default Indprofile