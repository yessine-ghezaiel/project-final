import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddPost from '../components/AddPost'
import PostList from '../components/PostList'
import { getPost, getPostCount } from '../redux/actions/postActions'
import { Pagination } from '@material-ui/lab'
import LimitSelector from '../components/LimitSelector'
import back from './bg.jpg'
import './home.css'
import Button from '@material-ui/core/Button';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'


// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       main: "#46AD8D",
//       contrastText: "#fff" //button text white instead of black
//     },
//     background: {
//       default: "#394764"
//     }
//   }
// });

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