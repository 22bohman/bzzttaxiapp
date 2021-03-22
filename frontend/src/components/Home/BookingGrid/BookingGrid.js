import React from 'react';
import './BookingGrid.css';
import BookingCard from "./BookingCard/BookingCard";

const BookingGrid = ({items, statusUpdate, isLoading, removeBooking }) => {

    return  isLoading ? (
        <h1>.....Loading</h1>
    ) : (
        <div className={"bookingGrid"}>
            <div className={"tableHeader"}>
                <p className={"headerItemId"}>Id</p>
                <p className={"headerItemStatus"}>Status</p>
                <p className={"headerItemEstimate"}>Estimate</p>
            </div>
            <div className="table">
                {items.map((item) => (
                    item.reference && <BookingCard item={item} removeBooking={removeBooking} />
                    ))}
            </div>
        </div>
    );
};


export default BookingGrid;