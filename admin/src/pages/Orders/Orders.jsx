import React from 'react'
import './Orders.css'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { assets } from "../../assets/assets"
const Orders = ({ url }) => {

  const [orders, setOrders] = useState([])
  const fetchAllOrders = async () => {
    const response = await axios.get(url + '/api/order/list');
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data)
    }
    else {
      toast.error("Error")
    }
  }

  const statusHandler = async(event, orderId) =>{
    const response = await axios.post(url+"/api/order/status",{
      orderId,
      status:event.target.value
    })
    if(response.data.success)
    {
      await fetchAllOrders()
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [])

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className='order-item'>
            {/* Icon */}
            <img src={assets.parcel_icon} alt="parcel" />

            {/* Items list */}
            <p className="order-item-food">
              {order.items.map((item) => `${item.name} x ${item.quantity}`).join(", ")}
            </p>

            {/* Customer Info */}
            <div className="order-item-customer">
              <p className="customer-name">{order.address.firstName} {order.address.lastName}</p>
              <p>{order.address.street}</p>
              <p>{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
              <p>{order.address.phone}</p>
            </div>

            {/* Total Items & Amount */}
            <div className="order-item-summary">
              <p>Items: {order.items.reduce((sum, item) => sum + item.quantity, 0)}</p>
              <p>${order.amount}</p>
            </div>

            {/* Status Dropdown */}
            <select className="order-item-select" onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>



        ))}
      </div>
    </div>
  )
}

export default Orders