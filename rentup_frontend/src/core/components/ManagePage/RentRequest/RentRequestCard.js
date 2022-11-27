import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { confirm_rent_request, reject_rent_request } from '../../../../api/RentRequestApi';
import AuthContext from '../../../../store/auth-context';
import classes from "./RentRequestCard.module.css";
import RecentCard from "../../HomePage/Recent/RecentCard";
import LandlordCard from "../../HomePage/landlord/LandlordCard"
import Popup from "../../common/Popup/Popup";

const RentRequestCard = props => {
    const authCtx = useContext(AuthContext)
    
    const [popup, setPopup] = useState(false)
    
    const confirmRentRequest = () => {
        confirm_rent_request(props.item.id, authCtx.token)
        .then((data) => {
            setPopup(true)
        })
        .catch((err) => {
            alert(err.message);
        });
    }
    
    const rejectRentRequest = () => {
        reject_rent_request(props.item.id, authCtx.token)
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
                <LandlordCard item={props.item.tenant}/>
            </div>
            <div className={classes.rentRequestCard_message}>
                <h2>Message:</h2>
                <p>{props.item.message}</p>
            </div>
            <div className={`${classes.rentRequestCard_action}`}>
                <button className={classes.rentRequestCard_confirm} onClick={confirmRentRequest}>Confirm</button>
                <button onClick={rejectRentRequest}>Reject</button>
            </div>
            <Popup trigger={popup}>
                <h3>Successfully</h3>
                <p>Rent request has been updated.</p>
                <button type="button" onClick={reloadPage}>Ok</button>
            </Popup>
        </div>
    )
}
export default RentRequestCard