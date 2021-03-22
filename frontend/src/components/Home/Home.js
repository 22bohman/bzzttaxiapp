import React, {useState, useEffect} from 'react';
import './Home.css';
import BookingGrid from "./BookingGrid/BookingGrid";
import BookingManager from "./BookingManager/BookingManager";
import EstimatedRideGrid from "./EstimatedRideGrid/EstimatedRideGrid";
import axios from "axios";


const Home = () => {

    const [estimatedRideList, setEstimatedRideList] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const apiKey = '';

    const statusHandler = async (item) => {
    
        const postData = {
            reference: item.reference,
        };

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': apiKey
        }

        try {

        const result = await  axios.post("https://test.bzzt.se/api/external/ride_status", postData, {
            headers: headers
        })

        let newlist = bookings.map(p => {
            if(p.reference == item.reference) {
                p.status = result.data.status;
            }
        });

        setBookings(prevState => ([...prevState, newlist]))

        } catch (error) {
            alert(error.message || 'Something went wrong!');
        }

    }

    useEffect(() => {

        let timer = setInterval(() => {

            if(bookings.length >= 1) {

                bookings.map(item => {

                    if(item.reference) {
                        statusHandler(item);      
                    }
                   
                });

                let updatedList = bookings.filter(p => {
                    return p;
                });

                setBookings(prevState => ([...prevState, updatedList]))
            }

        }, 15000);
        return () => clearInterval(timer); // cleanup the timer

    }, [bookings]);


    const estimateTravelHandler = async (toLatitude, toLongitude, fromLatitude, fromLongitude) => {

        const id = getRandomId(1, 100);

        if(validateInput(toLatitude, toLongitude, fromLatitude, fromLongitude)){
        
        const postData = {
            from: {
                latitude: +fromLatitude,
                longitude: +fromLongitude
            },
            to: {
                latitude: +toLatitude,
                longitude: +toLongitude
                }
            }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': apiKey
        }

        try {

        const result = await  axios.post("https://test.bzzt.se/api/external/time_estimate", postData, {
            headers: headers
        })

        const estimateData = {
            id: id.toString(),
            duration: result.data.duration,
            toLatitude: +toLatitude,
            toLongitude: +toLongitude,
            fromLatitude: +fromLatitude,
            fromLongitude: +fromLongitude
       }

    setEstimatedRideList(prevState => ([...prevState, estimateData]))

    } catch (error) {
        alert(error.message || 'Something went wrong!');
            }
        }
    }

    const validateInput = (toLatitude, toLongitude, fromLatitude, fromLongitude) => {
        if(toLatitude && toLongitude && fromLatitude && fromLongitude){
            return true;
        }
        else {
            return false;
        }
    }


    const bookTravel = async (item) => {

        const postData = {
            "type": "delivery",
            "from": {
            "latitude": item.fromLatitude,
            "longitude": item.fromLongitude
            },
            "to": {
            "latitude": item.toLatitude,
            "longitude": item.toLongitude
            },
            "metadata": {
            "BillingReference": "reference-123"
            }
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': apiKey
        }

        try {

        const result = await  axios.post("https://test.bzzt.se/api/external/book_ride", postData, {
            headers: headers
        })

        const booking = {
            id: item.id,
            reference: result.data.reference,
            status: "",
            duration: item.duration,
            toLatitude: item.toLatitude,
            toLongitude: item.toLongitude,
            fromLatitude: item.fromLatitude,
            fromLongitude: item.fromLongitude
        };

        addBooking(booking);

        } catch (error) {
            alert(error.message || 'Something went wrong!');
        }
        
    }

    const addBooking = (item) => {

        setBookings(prevState => ([...prevState, item]))

        const idToRemove= item.id;

        const updatedList = estimatedRideList.filter(function(element) {
                return element.id !== idToRemove;
            });

        setEstimatedRideList(updatedList);
    }

    const removeBooking = (id) => {
        const updatedList = bookings.filter(function(element) {
            return element.id !== id;
        });

        setBookings(updatedList);
        removeBookingFromDatabase(id);
    }

    const removeBookingFromDatabase = async (id) => {

        const postData = {
            reference: id
          }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': apiKey
        }

        try {

        const result = await  axios.post("https://test.bzzt.se/api/external/cancel_ride", postData, {
            headers: headers
        })

        } catch (error) {
            alert(error.message || 'Something went wrong!');
        }
    }

    function getRandomId(bottom, top) {
        return Math.floor((Math.random()*100) + 1);
    }


    return (
        <React.Fragment>
            <main>
                <div className={"homeContainer"}>
                    <div className={"bookingContainer"}>
                        <BookingManager estimateTravelHandler={estimateTravelHandler} />
                        <EstimatedRideGrid items={estimatedRideList} bookTravel={bookTravel} />
                    </div>
                    <BookingGrid isLoading={isLoading} items={bookings} removeBooking={removeBooking} />
                </div>
            </main>
        </React.Fragment>
        )
}


export default Home;
