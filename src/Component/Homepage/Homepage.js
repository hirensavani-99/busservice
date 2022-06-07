import React from 'react'

import BusSearch from './BusSearch/BusSearch'

import classes from './Homepage.module.css'

export default function Homepage() {
    return (
        <div>
            <div className={classes.main_container}>
                <div className={classes.container}>
                    <BusSearch />
                </div>
            </div>
        </div >
    )
}
