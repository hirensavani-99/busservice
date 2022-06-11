//This component will show all the available buses admin can perform CRUD operation from here on perticular bus 
//------------------------------------------------------------------------------------

import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

//style
import Table from 'react-bootstrap/Table'
import { Button } from 'react-bootstrap'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import classes from './admin.module.css'

export default function Admin(props) {


    const [data, setData] = useState([])
    const [field, setField] = useState(false)  //true -> input field  and false -> label
    const [id, setId] = useState('')

    const agencyNameInputRef = useRef('')
    const dateInputRef = useRef('')
    const priceInputRef = useRef('')
    const seatInputRef = useRef('')

    useEffect(() => {

        //getting data from backend
        const getData = async () => {
            const res = await axios.get('http://localhost:8000/admin/getAllBusses')
            await setData(res.data)
            console.log(res.data);
        }
        getData()
    }, [])


    //delete bus 
    const handleDelete = async (id) => {
        const res = await axios.delete("http://localhost:8000/admin/bus/delete/" + id)
        await setData(res.data)
    }

    //edit bus
    const handlerEdit = (id) => {
        setField(!field)    // reversing fied
        setId(id)
    }

    //after editing saving bus 
    const handleSave = async (e) => {
        e.preventDefault()
        setField(!field)

        //get current value 
        const agencyName = agencyNameInputRef.current.value;
        const date = dateInputRef.current.value;
        const price = priceInputRef.current.value;
        const seats_Available = seatInputRef.current.value;

        const fieldArray = [agencyName, date, price, seats_Available]
        const fieldArray2 = ["agencyName", "date", "price", "seats_Available"]
        const data = {}

        //iterating throw arrays and creating objects for backend 
        for (let field in fieldArray) {

            if (fieldArray[field].trim() !== '') {
                data[fieldArray2[field]] = fieldArray[field]

            }

        }

        try {
            //put operation 
            const response = await axios.put('http://localhost:8000/admin/busSave/' + id, data)

            if (response.status === 201) {
                toast.success("busData edited successfully")
                await setData(response.data)
            }
        } catch (e) {
            toast.error(e.message)
        }



    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>root_id</th>
                        <th>agencyName</th>
                        <th>date</th>
                        <th>price</th>
                        <th>seats_Available</th>
                    </tr>
                </thead>
                <tbody>
                    {

                        data.map(bus => (

                            <tr key={bus.root_Id}>

                                <td>{bus.root_Id}</td>
                                {/*show either input or td according to state */}
                                {field && id == bus.root_Id ? <td><input placeholder={bus.agencyName} type="text" ref={agencyNameInputRef} /></td> : <td>{bus.agencyName}</td>}
                                {field && id == bus.root_Id ? <td><input placeholder={bus.date} type="date" ref={dateInputRef} /></td> : <td>{bus.date}</td>}
                                {field && id == bus.root_Id ? <td><input placeholder={bus.price} ref={priceInputRef} /></td> : <td>{bus.price}</td>}
                                {field && id == bus.root_Id ? <td><input placeholder={bus.busType} ref={seatInputRef} /></td> : <td>{bus.busType}</td>}

                                <td><EditIcon onClick={() => handlerEdit(bus.root_Id)} /></td> {/* edit button*/}
                                <td ><DeleteIcon onClick={() => handleDelete(bus.root_Id)} /></td> {/* delete button*/}
                            </tr>
                        ))

                    }
                </tbody>
            </Table>


            <Button variant="primary" onClick={handleSave} disabled={!field}>
                Save Editing       
            </Button>


        </>

    )
}
