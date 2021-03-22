import React, {useEffect} from 'react';
import './BookingCard.css';

const BookingCard = (props) => {

    return (
        <>
            <div className="bookingCard">
                <p className="bookingId">{props.item.reference}</p>
                <p className="bookingEstimate"> {props.item?.status} </p>
                <p className="bookingName">{props.item.duration}</p>
           
                <button className={"delete"} onClick={() => {props.removeBooking(props.item.reference)}}>Delete</button>
            </div>
        </>
    );
};


export default BookingCard;