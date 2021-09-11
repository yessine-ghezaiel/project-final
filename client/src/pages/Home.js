import React from 'react'
import './home.css'
import { Link } from 'react-router-dom'


function Home() {
    return (

    <div className='back'>

      <div id="container">
      

              <button class="click"> <Link style={{color:'white', textDecoration:'none'}} to='/cardealerlist'>Cardealer List</Link></button>
              <button class="click"><Link style={{color:'white', textDecoration:'none'}}  to='/posts'>Our Forum</Link></button> 
        
      </div>
    </div>

    );
  }
  export default Home