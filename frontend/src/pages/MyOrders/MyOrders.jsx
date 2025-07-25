import React from 'react'
import './MyOrders.css'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext.jsx'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { assets } from '../../assets/assets.js'

const MyOrders = () => {

    const { url, token } = useContext(StoreContext)
    const [data, setData] = useState([]);
    const fetchOrders = async () => {
        const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } })
        setData(response.data.data);
    }

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token])

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {
                    data.map((order, index) => {
                        return (
                            <div key={index} className='my-orders-order'>
                                <img src={assets.parcel_icon} alt="" />
                                <p>{order.items
                                    .map((item) => `${item.name} x ${item.quantity}`)
                                    .join(', ')}</p>
                                <p>${order.amount}.00</p>
                                <p>Items: {order.items.length}</p>
                                <p><span>&#x25cf;</span><b>{order.status}</b></p>
                                <button onClick={fetchOrders}>Track Order</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MyOrders