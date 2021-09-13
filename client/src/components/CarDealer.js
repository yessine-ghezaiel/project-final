import React from 'react';
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from "react-router-dom";
import './cardealerlist.css'
import {  useSelector } from 'react-redux';
export default function CarDealer({ cardealer }) {
    const history = useHistory()
    

    const auth = useSelector(state => state.auth)
    return (

        <Card style={{ width: '18rem',marginRight:'2%', marginBottom:'2%' }} className=' d-flex'>
        <Card.Img variant="top" src={cardealer.image.url || cardealer.image } />
        <Card.Body className='flex-column'>
          <Card.Title>{cardealer.title}</Card.Title>
          <Card.Text>
          {cardealer.adresse}
          </Card.Text>
        </Card.Body>

          <Card.Footer>
          <Button onClick={()=>history.push(`/cardealer/${cardealer._id}`)} variant="primary">More Details</Button>
          {auth.isAuth &&(
            
              auth.user.role ==='admin' ? 
              <> <Button onClick={()=>history.push(`/updatecardealer/${cardealer._id}`)}>Edit</Button>   </> 
              :
              null
          )}
          
          
          
          </Card.Footer>
      </Card>






            // <Card >
            //     <CardActionArea>
            //         <CardContent>
            //             {console.log(cardealer)}
                        
            //             <Typography gutterBottom variant="h5" component="h2">
            //                 {cardealer.title}
            //             </Typography>
            //             <Typography variant="body2" color="textSecondary" component="p">
            //                 {cardealer.phoneNumber}
            //             </Typography>
            //             <Typography variant="body2" color="textSecondary" component="p">
            //                 {cardealer.email}
            //             </Typography>
            //             <Typography variant="body2" color="textSecondary" component="p">
            //                 {cardealer.localisation}
            //             </Typography>

            //             <Typography variant="body2" color="textSecondary" component="p">
            //                 {cardealer.description}
            //             </Typography>
            //             <img src={cardealer.image}></img>
                        
            //         </CardContent>
            //         {cardealer.image && <CardMedia
            //             component="img"
            //             alt="cardealer image"
            //             style={{ height: 250, width: 400 }}
            //             image={cardealer.image.url}
            //             title={'my title'}
            //         />}
            //     </CardActionArea>
            //     <CardActions>
            //         <Button size="small" color="primary">
            //             Share
            //         </Button>
            //         <Button size="small" color="primary">
            //             Learn More
            //         </Button>
            //     </CardActions>
            // </Card>
            
    
    
    );
}
