import React from 'react';

import classes from './Order.css';

const order = (props) => {
  const ingredients =  []

  for ( let ingredientName in props.ingredients) {
    ingredients.push(
      { name: ingredientName, 
        amount: props.ingredients[ingredientName]
      }
    )
  }

  const ingredientsOutput = ingredients.map( ig => {
    return <span
      style={{
        textTransform: 'capitalize', 
        display: 'inline-block', 
        margin: '0 8 px',
        padding: '5px'}} 
      key={ig.name}
      >{ig.name} ({ig.amount})</span>
  })

  return (
    <div className={classes.Order}>
    <p>Ingredients: {ingredientsOutput}</p>
    <p>Price: <strong>USD {parseFloat(props.price).toFixed(2)}</strong></p>
    </div>
  )
}

export default order;