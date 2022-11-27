import { useContext, useState } from "react";
import { cancel_rent_request } from '../../../../api/RentRequestApi';
import AuthContext from '../../../../store/auth-context';
import classes from "./YourRequestCard.module.css";
import RecentCard from "../../HomePage/Recent/RecentCard";
import LandlordCard from "../../HomePage/landlord/LandlordCard"
import Popup from "../../common/Popup/Popup"

const YourRequestCard = props => {
    const authCtx = useContext(AuthContext)
    
    const [popup, setPopup] = useState(false)
    
    const cancelRentRequest = () => {
        cancel_rent_request(props.item.id, authCtx.token)
        .then((data) => {
           setPopup(true)
        })
        .catch((err) => {
            alert(err.message);
        });
    }
    
    const reloadPage = () => {
        window.location.reload();
    }
    
    return (
        <div className={`${classes.shadow} ${classes.rentRequestCard}`} key={props.item.index}>
            <div className={classes.rentRequestCard_info}>
                <RecentCard item={props.item.room}/>
                <LandlordCard item={props.item.landlord}/>
            </div>
            <div className={classes.rentRequestCard_message}>
                <h2>Message:</h2>
                <p>{props.item.message}</p>
            </div>
            <div className={`${classes.rentRequestCard_action}`}>
                <button onClick={cancelRentRequest}>Cancel</button>
            </div>
            <Popup trigger={popup}>
                <h3>Cancel request successfully</h3>
                <p>Your request has been cancelled</p>
                <button type="button" onClick={reloadPage}>Ok</button>
            </Popup>
        </div>
    )
}
export default YourRequestCard