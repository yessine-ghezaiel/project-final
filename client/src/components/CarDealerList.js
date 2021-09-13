import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCarDealer } from "../redux/actions/carDealerActions";
import { getCarDealerCount } from "../redux/actions/carDealerActions";
import CarDealer from "./CarDealer";
import { useHistory } from "react-router-dom";
import { Button} from "@material-ui/core";

import "./cardealerlist.css";
import { Pagination } from "@material-ui/lab";
const CarDealerList = ({ postList }) => {
  const history = useHistory()
  

  const auth = useSelector(state => state.auth)
  const cardealerList = useSelector((state) => state.cardealers.cardealerList);
  const count = useSelector((state) => state.cardealers.count);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const limit=6
  useEffect(() => {
    dispatch(getCarDealerCount());
    dispatch(getCarDealer(page, limit));
  }, []);
  const handlePageChange = (e, p) => {
    setPage(p)
    dispatch(getCarDealer(p, limit))
}
  
  

  return (
    <div style={{ width: "100%"}}>
      <div style={{textAlign:'center',width: '100%', fontSize:25,marginTop:'5%'}}>
          Cardealer List
          <div>

      {auth.isAuth &&(
            
            auth.user.role ==='admin' ? <> <Button style={{backgroundColor:'lightgreen', color:'black' }} onClick={()=>history.push(`/addcardealer`)}>Add New Cardealer</Button>   </> 
            :
            null
        )}
          </div>
      </div>
    
      <div style={{ marginLeft: "20%", marginTop: '5%' }}>
          <div style={{display:'flex',flexWrap: 'wrap',flexDirection:'row', paddingLeft:'5%' }}>

        {cardealerList.length && cardealerList.map((cardealer, index) => (<CarDealer  style={{paddingRight:'5%'}} key={index} cardealer={cardealer}></CarDealer>)).reverse()}
          </div>
        <Pagination style={{display: 'grid',placeItems: 'center'}} count={Math.ceil(count / limit)} onChange={handlePageChange} />
        {/* <LimitSelector setLimit={setLimit} /> */}
      </div>
    </div>
  );
};

export default CarDealerList;
