import classes from "./RoomCard.module.css"
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { deleteRoom, postRoom } from '../../../../api/RoomApi';
import AuthContext from '../../../../store/auth-context';
import Popup from "../../common/Popup/Popup"

const RoomCard = props => {
    const authCtx = useContext(AuthContext)
    
    const [popup, setPopup] = useState(false)
    
    const deleteHandler = () => {
        deleteRoom(props.item.id, authCtx.token)
        .then((data) => {
            setPopup(true)
        })
        .catch((err) => {
            alert(err.message);
        });
    }
    
    const postHandler = () => {
        postRoom(props.item.id, authCtx.token)
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
        <div className={`${classes.shadow} ${classes.roomCard}`} key={props.item.index}>
            <div className={classes.img}>
                <img src={props.item.cover} alt='' />
            </div>
            <div className={classes.text}>
                <div className={`${classes.category} ${classes.flex}`}>
                    <span style={{ background: "#ff98001a", color: "#ff9800" }}>{props.item.active ? "active" : "inactive"}</span>
                </div>
                <h4>{props.item.category}</h4>
                <p>
                    <i class="fa fa-info"></i> Info: {props.item.detail}
                </p>
                <p>
                    <i class="fa fa-chart-area"></i> Area: {props.item.area} m^2
                </p>
                <p>
                    <i class="fa fa-money-check"></i> Rent price: {props.item.rent_price}đ / month
                </p>
                <p>
                    <i class="fa fa-money-check"></i> Water price: {props.item.water_price}đ / month
                </p>
                <p>
                    <i class="fa fa-money-check"></i> Electricity price: {props.item.electricity_price}đ / month
                </p>
                <p>
                    <i class="fa fa-money-check"></i> Services price: {props.item.service_price}đ / month
                </p>
                <p>
                    <i class="fa fa-money-check"></i> Total price: {props.item.totalPrice}đ / month
                </p>
            </div>
            <div className={`${classes.button} ${classes.flex}`}>
                <button className={classes.postRoom} onClick={postHandler} disabled={props.item.active}>Post</button>
            </div>
            <div className={`${classes.button} ${classes.flex}`}>
                <Link className={classes.editRoom} to={`/room/${props.item.id}/edit`}>Edit</Link>
            </div>
            <div className={`${classes.button} ${classes.flex}`}>
                <button className={classes.btn3} onClick={deleteHandler}>Delete</button>
            </div>
            <Popup trigger={popup}>
                <h3>Successfully</h3>
                <p>Your room has been updated.</p>
                <button type="button" onClick={reloadPage}>Ok</button>
            </Popup>
        </div>
    )
}

export default RoomCard