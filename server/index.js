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
        isAdmin: true
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


//get all bus 
app.get("/getAllBuses", (req, res) => {
    res.status(200).send(busArray)
})
//filtered bus 
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

//book ticket 
app.put("/ticketBooking/:id", (req, res) => {
    let id = req.params.id;
    let data = req.body;


    const bus = busArray.filter(bus => bus.root_Id == id)

    if (bus.length !== 0) {
        bus[0].seats_Available = data.seats_Available

        res.status(200).send(bus)
    } else {
        res.status(404).send("we are unable to find this bus")
    }
})

//user login
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

//login
app.post("/admin/login", (req, res) => {

    let credential = req.body;
    let person = users.filter(user => user.email.toLowerCase() === credential.email.toLowerCase() && user.password.toLowerCase() === credential.password.toLowerCase() && user.isAdmin)

    if (person.length !== 0) {

        return res.status(200).send(person[0])
    }
    else {
        return res.status(400).send("user already exist with this name")
    }
})

//register 
app.post("/user/register", (req, res) => {
    console.log(req.body);
    let credential = req.body;
    let person = users.filter(user => user.email.toLowerCase() === credential.email.toLowerCase())

    if (person.length !== 0) {
        return res.status(400).send("person already exist")
    }
    else {


        credential.userId = uuidv4();

        users.push(credential)
        console.log(users);
        return res.status(200).send(users[users.length - 1])
    }
})



//admin section 
//get all bus by admin
app.get("/admin/getAllBusses", (req, res) => {
    res.status(200).send(busArray)
})


//delete bus 
app.delete('/admin/bus/delete/:id', async (req, res) => {
    let _id = req.params.id

    try {
        busArray = busArray.filter(bus => bus.root_Id != _id)


        res.status(200).send(busArray)
    } catch (e) {
        console.log(e);
    }
})

//edit bus 
app.put('/admin/busSave/:id', async (req, res) => {
    const id = req.params.id;
    let updateBus = req.body;

    console.log(req.body);
    for (let bus of busArray) {

        if (bus.root_Id == id) {

            for (let data in updateBus) {
                if (bus[data]) {
                    bus[data] = updateBus[data]

                }
            }
            return res.status(201).send(busArray)
        }
    }
})


//dd new bus 
app.post("/admin/addBus", (req, res) => {

    const data = req.body
    data.root_Id = uuidv4();
    data.rating = Math.floor(Math.random() * 10);;
    data.ratedBy = Math.floor(Math.random() * 1000) - 5;
    data.seats_Available = Array(30).fill(0, 0, 30)
    data.facility = ['water', 'meal', 'wifi', 'pillow', 'blankets', 'chargingpoints', 'readinglights', 'EContactNumber', 'Tracking']

    try {

        busArray.push(data)
        res.status(201).send(busArray)

        console.log(busArray);
    } catch (e) {
        res.status(400).send('unable to create a student')
    }


})

app.listen(port, () => {
    console.log(`server is up to port :${port}`);
})