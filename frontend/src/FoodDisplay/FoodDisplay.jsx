import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../context/StoreContext.jsx'
import FoodItem from '../components/FoodItem/FoodItem.jsx'
const FoodDisplay = ({category}) => {

    const {food_list} = useContext(StoreContext);

  return (
    <div className='food-display' id='food-display'>
        <h2>Top dishes near you</h2>
        <div className='food-display-list'>
            {food_list.map((item, index) => {
              if(category === "All" || item.category === category){ 
              return <FoodItem key={index} id={item._id} name={item.name} price={item.price} description={item.description} image={item.image}/>
              }
            })}
        </div>
    </div>
  )
}

export default FoodDisplay