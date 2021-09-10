import './App.css';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import Register from './pages/Register';
import Profile from './pages/Profile';
import PrivateRoute from './privateRoutes/PrivateRoute'
import LoadingComponent from './components/LoadingComponent';
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AddCardealer from './components/AddCardealer';
import CarDealerList from './components/CarDealerList';

import CardealerDetails from './components/CardealerDetails';
import UpdateCardealer from './components/UpdateCardealer';
import AdminRoute from './privateRoutes/AdminRoute';
import PostDetail from './components/PostDetail';
import PostList from './components/PostList';

function App() {
  return (
    < >
      <BrowserRouter>
        <Navbar></Navbar>
        <LoadingComponent>  </LoadingComponent>
          <Switch>
            <Route exact path='/' component={Home} />
            
            <Route exact path='/posts' component={PostList} />
            <Route path="/login" component={LoginPage} />
            <Route exact path='/addcardealer' component={AddCardealer}/>
            <Route exact path="/register" component= {Register} />
            <Route path="/cardealerlist" component= {CarDealerList} />
            {/* <Route exact path="/details" component= {PostDetail} /> */}
            <PrivateRoute path='/profile' component ={Profile}></PrivateRoute>
            {/* <AdminRoute path="/profile" component ={Profile}></AdminRoute> */}
            <Route exact  path='/cardealer/:_id' render={(props)=><CardealerDetails {...props}  ></CardealerDetails>}></Route>
            <Route exact  path='/posts/:_id' render={(props)=><PostDetail {...props}  ></PostDetail>}></Route>

            <Route exact  path='/updatecardealer/:_id' render={(props)=><UpdateCardealer {...props}  ></UpdateCardealer>}></Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
