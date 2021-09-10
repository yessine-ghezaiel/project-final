import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button ,Card,ListGroup, ListGroupItem} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, useHistory} from 'react-router-dom'
import './cardealerdetails.css'
import { deletecardealer } from '../redux/actions/carDealerActions';
const CardealerDetails = ({match}) => {
    const cardealerList = useSelector((state) => state.cardealers.cardealerList);
    const cardealer= cardealerList.find((a)=>a._id == match.params._id) 
    const history = useHistory()
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const deletecar = (e) => {
        
        
        dispatch(deletecardealer(cardealer._id))
        
        history.push(`/cardealerlist`)
      }
    




    return (

        <div className="App arriere">
            <div >
                <Card  style={{ width: '35rem',marginTop:'80px' }}>
                <Card.Body>
                        <Link  to='/cardealerlist'> <Button variant="danger">Return to Cardealer list</Button> </Link>
                    </Card.Body>
                    <Card.Img style={{width:'150px', height:'100px', marginLeft:' auto',marginRight: 'auto', marginTop:'50px'}} src={cardealer.image.url || cardealer.image} />
                    <Card.Body>
                        <Card.Title style={{fontSize:'30px'}}>{cardealer.title}</Card.Title>
                        <Card.Text>{cardealer.description}</Card.Text>
                        <Card.Text>Email:<Card.Text></Card.Text>
                             {cardealer.email}</Card.Text>
                        <Card.Text>Phone Number: <Card.Text></Card.Text> {cardealer.phoneNumber}</Card.Text>
                        <Card.Text>Adresse: <Card.Text></Card.Text> {cardealer.adresse}</Card.Text>
                        <iframe src={cardealer.src_maps} style={{border:0,width:'30rem', height:'300px' }} ></iframe>
                    </Card.Body>
                        {/* <ListGroup className="list-group-flush">
                        <ListGroupItem>Adresse city: {cardealer.address.city}</ListGroupItem>
                        <ListGroupItem>Adresse Street: {cardealer.address.street}</ListGroupItem>
                        <ListGroupItem>Adresse Suite: {cardealer.address.suite}</ListGroupItem>
                    </ListGroup> */}
                    {auth.isAuth &&(
            
            auth.user.role == 'admin' ? 
            <>  <Button onClick={()=>deletecar()} variant="danger">Delete</Button>  </> 
            :
            null
        )}
                    
                </Card>
            </div>
        </div>


        
    )
}

export default CardealerDetails




