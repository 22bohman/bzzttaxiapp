import React from 'react';

import './EstimatedRideGrid.css';

const EstimatedRideGrid = props => {

    let content;
    if (!props.items || props.items.length === 0) {
        content = <p>Could not find any request?</p>;
    } else {
        content = (
            <ul className="bookingList">
                {props.items.map(p => (
                        <div className={"bookingItems"}>
                            <p className={"bookingItem"}><b>Id:</b> {p.id}</p>
                            <p className={"bookingItem"}><b>Estimate:</b>  {p.duration}</p>
                            <button className={"bookingButton"} onClick={() => {props.bookTravel(p)}}>Book</button>
                        </div>
                ))}
            </ul>
        );
    }

    return <section id="bookings">{content}</section>;
};


export default EstimatedRideGrid;