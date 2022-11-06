import React from 'react'
import {Link} from 'react-router-dom'

function Home() {
  return (
    <div>
    <nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <h3>
        <Link to='/'><i className="fas fa-code "></i>Devs Hub</Link>
    </h3>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">

      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item"><Link to='/register' class="nav-item nav-link">Register</Link></li>
            <li class="nav-item"><Link to='/login' class="nav-item nav-link">Login</Link></li>
      </ul>
    </div>
  </div>
</nav>
        <section className='landing'>
            <div className='dark-overlay'>
                <div className='landing-inner'>
                    <h1 className='x-large'>Devs Hub</h1>
                    <p className='lead'>
                        Create a developer profile/portfolio, share posts and get help from other developers
                    </p>
                    <div className='buttons'>
                        <Link to="/register" className="btn btn-primary">Sign Up</Link>
                        <Link to="/login" className="btn btn-light">Login</Link>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Home