import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { deleteHouse } from '../../../../api/HouseApi';
import AuthContext from '../../../../store/auth-context';
import classes from "./HouseCard.module.css";
import Popup from "../../common/Popup/Popup"

const HouseCard = props => {
    const authCtx = useContext(AuthContext)
    
    const [popup, setPopup] = useState(false)
    
    const deleteHandler = () => {
        deleteHouse(props.item.id, authCtx.token)
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
        <div className={`${classes.shadow} ${classes.houseCard}`} key={props.item.index}>
            <div className={classes.img}>
                <img src={props.item.cover} alt='' />
            </div>
            <div className={classes.text}>
                <h4>{props.item.category}</h4>
                <p>
                    <i className='fa fa-location-dot'></i> {props.item.location}
                </p>
            </div>
            <div className={`${classes.button} ${classes.flex}`}>
                <Link to={`/manage/house/${props.item.id}/view`} className={classes.viewhouse}>view</Link>
            </div>
            <div className={`${classes.button} ${classes.flex}`}>
                <Link to={`/manage/house/${props.item.id}/edit`} className={classes.edithouse}>Edit</Link>
            </div>
            <div className={`${classes.button} ${classes.flex}`}>
                <Link to={`/manage/house/${props.item.id}/add-room`} className={classes.addroom}>Add Room</Link>
            </div>
            <div className={`${classes.button} ${classes.flex}`}>
                <Link className={classes.deletehouse} onClick={deleteHandler}>Delete</Link>
            </div>
            <Popup trigger={popup}>
                <h3>Delete House successfully</h3>
                <p>Your house has been deleted</p>
                <button type="button" onClick={reloadPage}>Ok</button>
            </Popup>
        </div>
    )
}

export default HouseCard