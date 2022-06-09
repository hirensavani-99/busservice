import React, { useRef, useState } from 'react'

import axios from 'axios'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { searchedBus, searchedByCostumer } from '../../../redux/action/index'


import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import LocationCityIcon from '@mui/icons-material/LocationCity';


import classes from './BusSearch.module.css'

const cities = [
    "Delhi",
    "Mumbai",
    "Kolkata",
    "Bangalore",
    "Chennai",
    "Hyderabad",
    "Pune",
    "Ahmedabad",
    "Surat",
    "Lucknow",
    "Jaipur",
    "Cawnpore",
    "Mirzapur",
    "Nagpur",
    "Ghaziabad",
    "Indore",
    "Vadodara",
    "Vishakhapatnam",
    "Bhopal",
    "Chinchvad",
    "Patna",
    "Ludhiana",
    "agra",
    "Kalyan",
    "Madurai",
    "Jamshedpur",
    "Nasik",
    "Faridabad",
    "Aurangabad",
    "Rajkot",
    "Meerut",
    "Jabalpur",
    "Thane"
]

export default function BusSearch() {

    const [cityName, setCityName] = useState([])
    const [field, setfield] = useState("From")

    let fromInputRef = useRef("")
    let toInputRef = useRef("")
    let dateInputRef = useRef("")

    const dispatch = useDispatch()

    const navigate = useNavigate()

    //handle search for bus 
    const handleSearch = async (e) => {
        e.preventDefault()
        let enteredFrom = fromInputRef.current.value;
        let enteredTo = toInputRef.current.value;
        let enteredDate = dateInputRef.current.value;

        if (enteredDate.trim() && enteredFrom.trim() && enteredTo.trim()) {
            let body = {
                from: enteredFrom.toLowerCase(),
                to: enteredTo.toLowerCase(),
                date: enteredDate
            }
            dispatch(searchedByCostumer(body))

            const response = await axios.post('http://localhost:8000/getsortedBus', body)

            //need to work for routing will store data in redux 
            dispatch(searchedBus(response.data))
            navigate("/relatedBus")


        }
    }

    //exchange values for city 
    const handleLocation = (e) => {
        e.preventDefault()
        let temp = fromInputRef.current.value;
        fromInputRef.current.value = toInputRef.current.value
        toInputRef.current.value = temp
    }

    const handleChange = (e) => {

        let filteredCities = []
        const searchedInput = e.target.value.toLowerCase(); // convert value in lowercase 
        if (searchedInput.trim() !== '') {  // check value is not empty 
            let searchLength = searchedInput.length;   // geting the length of searched text 


            for (let city of cities) {    // mapping book 

                for (let word in city) {  // mapping word 

                    if (city[word].toLowerCase() === searchedInput[0]) {  // try to match first character of searched word 
                        let subString = city.substring(word, parseInt(word) + parseInt(searchLength)) // take out equal length of string 

                        if (subString.toLowerCase() === searchedInput) {

                            !filteredCities.includes(city) && filteredCities.push(city)

                        }
                    }
                }

            }
        }
        setCityName(filteredCities);
    }

    const handleClick = (key) => {
        console.log(key);
        if (field === "From") {
            fromInputRef.current.value = key;
            setCityName([])
        }
        else if (field === 'To') {
            toInputRef.current.value = key;
            setCityName([])
        }
    }

    return (
        <div className={classes.container}>

            <div className={classes.container1}>
                <LocationCityIcon fontSize="large" />
                <input type="text" placeholder="From.." required className={classes.inputField} ref={fromInputRef} onChange={handleChange} onKeyDown={() => setfield("From")} />
                {cityName.length !== 0 && field === "From" && <div className={classes.listContainer}>
                    {cityName.map(city => <p key={city} onClick={() => handleClick(city)}>{city}</p>)}
                </div>}

            </div>





            <div className={classes.container1}>
                <CompareArrowsIcon onClick={handleLocation} className={classes.arrowicon} fontSize="large" />
                <LocationCityIcon fontSize="large" />
                <input type="text" placeholder="To.." required className={classes.inputField} ref={toInputRef} onChange={handleChange} onKeyDown={() => setfield("To")} />
                {cityName.length !== 0 && field === "To" && <div className={classes.listContainer}>
                    {cityName.map(city => <p key={city} onClick={() => handleClick(city)}>{city}</p>)}
                </div>}
            </div>
            <input type="date" placeholder="To.." required className={classes.inputField} ref={dateInputRef} />


            <button className={classes.btn1} onClick={handleSearch}>Search {< ArrowForwardIcon fontSize="large" />}</button>
        </div>
    )
}
