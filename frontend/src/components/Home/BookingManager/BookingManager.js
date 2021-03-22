import React, { useState } from 'react';
import './BookingManager.css';
import Input from "./Input/Input";
import Button from "./Button/Button";

const BookingManager = props => {
    const [toLatitude, setToLatitude] = useState('');
    const [toLongitude, setToLongitude] = useState('');
    const [fromLatitude, setFromLatitude] = useState('');
    const [fromLongitude, setFromLongitude] = useState('');


    const toLatitudeChangeHandler = event => {
        setToLatitude(event.target.value);
    };

    const toLongitudeChangeHandler = event => {
        setToLongitude(event.target.value);
    };

    const fromLatitudeChangeHandler = event => {
        setFromLatitude(event.target.value);
    };

    const fromLongitudeChangeHandler = event => {
        setFromLongitude(event.target.value);
    };

    const submitBookingHandler = event => {
        event.preventDefault();
        props.estimateTravelHandler(toLatitude, toLongitude, fromLatitude, fromLongitude);
        setToLatitude('')
        setToLongitude('');
        setFromLatitude('');
        setFromLongitude('');
    };

    return (
        <section className="newBooking">
            <h2 className={"headerText"}>Booking</h2>
            <form onSubmit={submitBookingHandler}>
                <p className={"fromText"}>From</p>
                <div className={"fromContainer"}>
                    <Input
                        id={"toLatitude"}
                        type="text"
                        label="Latitude"
                        value={toLatitude}
                        onChange={toLatitudeChangeHandler}
                    />
                    <Input
                        id={"toLongitude"}
                        label="Longitude"
                        type="text"
                        value={toLongitude}
                        onChange={toLongitudeChangeHandler}
                    />
                </div>

                <p className={"toText"}>To</p>
                <div className={"toContainer"}>
                    <Input
                        className={"fromLatitude"}
                        label="Latitude"
                        type="text"
                        value={fromLatitude}
                        onChange={fromLatitudeChangeHandler}
                    />
                    <Input
                        id={"fromLongitude"}
                        label="Longitude"
                        type="text"
                        value={fromLongitude}
                        onChange={fromLongitudeChangeHandler}
                    />
                </div>
                <Button type="submit">Save</Button>
            </form>
        </section>
    );
};


export default BookingManager;