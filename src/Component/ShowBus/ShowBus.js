//bus container 

import React from 'react'
import { useSelector } from 'react-redux';
//component 
import Bus from './Bus/Bus';
//style
import classes from './showBus.module.css'

export default function ShowBus() {

    const busData = useSelector(state => state.handleBus)
    


    return (
        <>
            {busData.searchedInput.length !== 0 && <div className={classes.title}>
                <h3 className={classes.from}>{busData.searchedInput[0][0].from}</h3>
                <h3 className={classes.to}>{busData.searchedInput[0][0].to}</h3>
            </div>}
            <div className={classes.root}>

                <div>
                    {busData.buses.length !== 0 && busData.buses.map(bus => <Bus className={classes.busContainer} key={bus.root_Id} busService={bus} searched={busData.searchedInput} />)}
                </div>

                {busData.buses.length === 0 && <h1>WE are sorry , our service is not available in serched route or serched Date</h1>}

            </div>
        </>

    )
}
