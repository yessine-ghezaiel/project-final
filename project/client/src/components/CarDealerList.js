import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletecardealer, getCarDealer } from "../redux/actions/carDealerActions";
import { getCarDealerCount } from "../redux/actions/carDealerActions";
import CarDealer from "./CarDealer";
import { useHistory } from "react-router-dom";
import {
  ListItem,
  Divider,
  List,
  ListItemIcon,
  ListItemText,
  Button,
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";

import "./cardealerlist.css";
import LimitSelector from "./LimitSelector";
import { Pagination } from "@material-ui/lab";
const CarDealerList = ({ postList }) => {
  const history = useHistory()
  

  const auth = useSelector(state => state.auth)
  const cardealerList = useSelector((state) => state.cardealers.cardealerList);
  console.log(cardealerList);
  const count = useSelector((state) => state.cardealers.count);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  useEffect(() => {
    dispatch(getCarDealerCount());
    dispatch(getCarDealer(page, limit));
  }, []);
  const handlePageChange = (e, p) => {
    setPage(p)
    dispatch(getCarDealer(p, limit))
}
  
  // const handlePageChange = (e, p) => {
  //     setPage(p)
  //     dispatch(getCarDealer(p, limit))
  // }

  return (
    <div style={{ width: "100%"}}>
      <div style={{textAlign:'center',width: '100%', fontSize:25,marginTop:'5%'}}>
          Cardealer List
          <div>

      {auth.isAuth &&(
            
            auth.user.role =='admin' ? <> <Button style={{backgroundColor:'lightgreen', color:'black' }} onClick={()=>history.push(`/addcardealer`)}>Add New Cardealer</Button>   </> 
            :
            null
        )}
          </div>
      </div>
      {/* <div style={{  width: "20%", marginTop: '2%' }}>
        
        <List >
          <ListItem button style={{ backgroundColor: "black" }}>
            <ListItemIcon> </ListItemIcon>
            <ListItemText style={{ color: "white" }}>
                Filter by region
            </ListItemText>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <Checkbox />
            </ListItemIcon>
            <ListItemText> Tunis </ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Checkbox />
            </ListItemIcon>
            <ListItemText> Nabeul </ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Checkbox />
            </ListItemIcon>
            <ListItemText> Sfax </ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Checkbox />
            </ListItemIcon>
            <ListItemText> Sousse </ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Checkbox />
            </ListItemIcon>
            <ListItemText> Bizerte </ListItemText>
          </ListItem>
        </List>
        
      </div>
       */}
      <div style={{ marginLeft: "20%", marginTop: '5%' }}>
          <div style={{display:'flex',flexWrap: 'wrap',flexDirection:'row', paddingLeft:'5%' }}>

        {cardealerList.length && cardealerList.map((cardealer, index) => (<CarDealer  style={{paddingRight:'5%'}} key={index} cardealer={cardealer}></CarDealer>)).reverse()}
          </div>
        <Pagination style={{display: 'grid',placeItems: 'center'}} count={Math.ceil(count / limit)} onChange={handlePageChange} />
        {/* <LimitSelector setLimit={setLimit} /> */}
      </div>
    </div>

    // <div style={{ width:'100%',marginTop:'0px'}}>

    //     <div style={{width:'20%'}>

    //         <div style={{  marginTop:'10px', position:'fixed' ,height:'100%'}} >

    // <List >
    //     <ListItem button  style={{backgroundColor:'black'}}>
    //         <ListItemIcon> </ListItemIcon>
    //         <ListItemText style={{color:'white'}} > Filter by region </ListItemText>
    //     </ListItem>
    // </List>
    // <Divider />
    // <List >
    //     <ListItem button >
    //         <ListItemIcon><Checkbox /> </ListItemIcon>
    //         <ListItemText > Tunis </ListItemText>
    //     </ListItem>
    //     <ListItem button >
    //         <ListItemIcon><Checkbox /> </ListItemIcon>
    //         <ListItemText > Nabeul </ListItemText>
    //     </ListItem>
    //     <ListItem button >
    //         <ListItemIcon><Checkbox /> </ListItemIcon>
    //         <ListItemText > Sfax </ListItemText>
    //     </ListItem>
    //     <ListItem button >
    //         <ListItemIcon><Checkbox /> </ListItemIcon>
    //         <ListItemText > Sousse </ListItemText>
    //     </ListItem>
    //     <ListItem button >
    //         <ListItemIcon><Checkbox  /> </ListItemIcon>
    //         <ListItemText > Bizerte </ListItemText>
    //     </ListItem>
    // </List>
    //         </div>
    //     </div>

    //     <div style={{ marginLeft:'20%',marginTop:'50px'}}>

    //         <div style={{}}>
    //             hello
    //         </div>
    //         <div >
    //             {cardealerList.length && cardealerList.map((cardealer, index) => <CarDealer key={index} cardealer={cardealer}></CarDealer>).reverse()}
    //         </div>
    //     </div>

    // </div>
  );
};

export default CarDealerList;
