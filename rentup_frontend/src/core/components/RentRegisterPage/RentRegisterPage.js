import Page from "../common/Page"
import classes from "./RentRegisterPage.module.css"
import RecentCard from "../HomePage/Recent/RecentCard";
import LandlordCard from "../HomePage/landlord/LandlordCard"
import Back from "../common/Back/Back"
import {getRoomByRoomId} from "../../../api/RoomApi"
import {createRentRequest} from "../../../api/RentRequestApi"
import { useState, useEffect, useContext, useRef } from "react"
import AuthContext from '../../../store/auth-context';
import { useParams } from 'react-router-dom';
import img from "../../../assets/img/backgroundPost.jpg"
import { useHistory } from "react-router-dom";


const RentRegisterPage = () => {
    const history = useHistory()
    
    const params = useParams()

    const id = params.id
    
    const authCtx = useContext(AuthContext)
    
    const [post, setPost] = useState({})
    const [landlord, setLandlord] = useState({})
    const messageInputRef = useRef()
    
    useEffect(() => {
        getRoomByRoomId(id)
        .then((data) => {
            setPost({
                room_id: data.id,
                room_name: data.name,
                cover: data.image,
                category: data.category.name,
                city: data.house.city,
                district: data.house.district,
                ward: data.house.ward,
                totalPrice: data.totalPrice
            })
            setLandlord({
                cover: data.house.landlord.image,
                name: data.house.landlord.username,
                address: data.house.landlord.city + ' - ' + data.house.landlord.district + ' - ' + data.house.landlord.ward,
                phone: data.house.landlord.phone,
                linkfb: data.house.landlord.linkfb,
                linkin: data.house.landlord.linkin,
                linktw: data.house.landlord.linktw,
                linkli: data.house.landlord.linkli,
            })
        })
        .catch((err) => {
                alert(err.message);
        });
    }, [])
    
    const sendRequest = () => {
        const data = {
            room: id,
            message: messageInputRef.current.value,
        }
        
        createRentRequest(data, authCtx.token)
        .then(data => {
            history.replace("/manage/your_request")
        })
        .catch((err) => {
            alert(err.message);
        });
    }
    
    return (
        <Page>
            <section>
                <Back name='Rent Register' title='Your Rent Register' cover={img}/>
                <section className={`${classes.recent} ${classes.padding}`}>
                    <div className={classes.container}>
                        <div className={`${classes.grid1} ${classes.mtop}`}>
                            <div className={`${classes.shadow} ${classes.rentRequestCard}`} key={id}>
                                <div className={classes.rentRequestCard_info}>
                                    <RecentCard item={post}/>
                                    <LandlordCard item={landlord}/>
                                </div>
                                <div className={classes.rentRequestCard_message}>
                                    <h2>Message:</h2>
                                    <textarea type="text" ref={messageInputRef}/>
                                </div>
                                <div className={`${classes.rentRequestCard_action}`}>
                                    <button onClick={sendRequest}>Send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </Page>
    )
}

export default RentRegisterPage