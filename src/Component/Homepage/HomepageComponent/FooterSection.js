import React from 'react'

import classes from './HomepageComponent.module.css'

export default function FooterSection() {
    return (
        <div> <footer className={classes.pagefooter}>
            <div className="container">
                <div className="row">
                    <div className="col l6 s12">

                        <h5 className={classes.text}>Reach us</h5>
                        <p className={classes.text}>65, varachha 45-223, surat, india</p>
                        <p className={classes.text}>hiren99savani@gmail.com</p>
                    </div>
                    <div className="col l4 offset-l2 s12">
                        <h5 className={classes.text}>useFull links</h5>
                        <ul className={classes.ul}>
                            <li><a className={classes.text} href="/signin">Sign In</a></li>
                            <li><a className={classes.text} href="/signup">Sign Up</a></li>
                            <li><a className={classes.text} href="#!">Be Partner</a></li>

                        </ul>
                    </div>
                    <div className="col l4 offset-l2 s12">
                        <h5 className={classes.text}>our services</h5>
                        <p className={classes.para}>
                            bluebus is the world's largest online bus ticket booking service trusted by over 25 million happy customers globally. redBus offers bus ticket booking through its website,iOS and Android mobile apps for all major routes.</p>
                    </div>
                </div>
            </div>
        </footer></div>
    )
}
