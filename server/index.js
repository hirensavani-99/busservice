const express = require("express")
const bodyParser = require('body-parser')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid');

const app = express()

app.use(cors())

const port = 8000;

app.use(bodyParser.json())

let users = [
    {
        userId: 1,
        name: "Hiren",
        email: "hiren@savani.com",
        password: "12345678",
    },
    {
        userId: 2,
        name: "Ankit",
        email: "ankit@patel.com",
        password: "12345678",
    }
]

let busArray = [
    {
        root_Id: 1,
        agencyName: 'Jay travels',
        busType: ' A/C Sleeper',
        travelSchedule: [
            {
                destination: "delhi",
                time: "10:30:00 AM",
                pickup: 'rajiv chowk'
            },
            {
                destination: "surat",
                time: "4:00:00 PM",
                pickup: 'kamrej'
            },
            {
                destination: "mumbai",
                time: "7:00:00 PM",
                pickup: 'om street'
            },
            {
                destination: "hyderabad",
                time: "11:50:00 PM",
                pickup: 'gandhi bajar'
            }
        ],
        date: "2022-10-06",
        rating: 3.7,
        ratedBy: 190,
        price: 1700,
        seats_Available: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        facility: ['water', 'meal', 'wifi', 'pillow', 'blankets', 'chargingpoints', 'readinglights', 'EContactNumber', 'Tracking']
    },
    {
        root_Id: 2,
        agencyName: 'Gujrat travels',
        busType: ' A/C Sleeper',
        travelSchedule: [
            {
                destination: "ajmer",
                time: "4:30:00 am",
                pickup: 'gandhi bajar'
            },
            {
                destination: "surat",
                time: "7:00:00 am",
                pickup: 'shanti Hospital'
            },
            {
                destination: "mumbai",
                time: "10:00:00 am",
                pickup: 'milan chowk'
            },
            {
                destination: "goa",
                time: "12:40:00 am",
                pickup: 'vatika'
            }
        ],
        date: "2022-11-06",
        rating: 4.7,
        ratedBy: 190,
        price: 170,
        seats_Available: [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0],
        facility: ['water', 'meal', 'wifi', 'pillow', 'blankets', 'chargingpoints', 'readinglights', 'EContactNumber', 'Tracking']
    }
]

app.get("/getAllBuses", (req, res) => {
    res.status(200).send(busArray)
})

app.post("/getsortedBus", (req, res) => {
    const data = req.body;
    console.log(data);
    let sortedByDate = busArray.filter(bus => new Date(bus.date) >= new Date(data.date))

    let sortedByPlace = []

    for (let bus of sortedByDate) {
        let checker = [false, false]
        for (let place of bus.travelSchedule) {
            if (place.destination === data.from) {
                checker[0] = true
            }
            if (place.destination === data.to && checker[0]) {
                sortedByPlace.push(bus)
                console.log('x');
            }

        }
    }

    return res.status(200).send(sortedByPlace)

})
app.put("/ticketBooking/:id", (req, res) => {
    let id = req.params.id;
    let data = req.body;
    ;

    const bus = busArray.filter(bus => bus.root_Id == id)

    if (bus.length !== 0) {
        bus[0].seats_Available = data.seats_Available

        res.status(200).send(bus)
    } else {
        res.status(404).send("we are unable to find this bus")
    }
})

app.post("/user/login", (req, res) => {

    let credential = req.body;
    let person = users.filter(user => user.email.toLowerCase() === credential.email.toLowerCase() && user.password.toLowerCase() === credential.password.toLowerCase())

    if (person.length !== 0) {

        return res.status(200).send(person[0])
    }
    else {
        return res.status(400).send("user already exist with this name")
    }
})

app.post("/user/register", (req, res) => {
    console.log(req.body);
    let credential = req.body;
    let person = users.filter(user => user.email.toLowerCase() === credential.email.toLowerCase())

    if (person.length !== 0) {
        return res.status(400).send("person already exist")
    }
    else {
        const { v4: uuidv4 } = require('uuid');

        credential.userId = uuidv4();

        users.push(credential)
        console.log(users);
        return res.status(200).send(users[users.length - 1])
    }
})

app.listen(port, () => {
    console.log(`server is up to port :${port}`);
})