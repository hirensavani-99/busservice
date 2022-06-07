import React from 'react'

import { useSelector } from 'react-redux';

import Bus from './Bus/Bus';
import SeatSelection from './SeatSelection/SeatSelection';



import classes from './showBus.module.css'

export default function ShowBus() {

    const busData = useSelector(state => state.handleBus)
    console.log(busData)

    return (
        <div className={classes.root}>
            <div>
                {busData.buses.length !== 0 && busData.buses.map(bus => <Bus className={classes.busContainer} key={bus.root_Id} busService={bus} searched={busData.searchedInput} />)}
            </div>

            {busData.buses.length === 0 && <h1>WE are sorry , our service is not available in serched route or serched Date</h1>}
            
        </div>
    )
}
