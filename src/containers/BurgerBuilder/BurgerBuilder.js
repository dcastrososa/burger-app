import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler//withErrorHandler'
import axios from '../../axios-order';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 0,
    purchasable: false,
    purchasing: false,
    loading: false 
  }

  updatePurchaseState( ingredients ) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      })
      .reduce( (sum, el) => {
        return sum + el;
      },0)
      this.setState({purchasable: sum > 0})
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updateCount = oldCount + 1; 
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updateCount;
    const priceAddition = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } )
    this.updatePurchaseState( updatedIngredients )
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if ( oldCount <= 0 ) {
      return;
    }
    const updateCount = oldCount - 1; 
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updateCount;
    const priceDeduction = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } )
    this.updatePurchaseState( updatedIngredients )
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinued = () => {
    // this.setState({loading: true})
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: 'Daniel Castro',
    //     address: {
    //       street: 'Teststreet 1',
    //       zipCode: '34343',
    //       country: 'Venezuela'
    //     },
    //     email: 'castrodaniel244@gmail.com'
    //   },
    //   deliveryMethod: 'fastest'
    // }
    // axios.post('/orders.json', order)
    //   .then(response => {
    //     this.setState({loading: false, purchasing: false})
    //   })
    //   .catch(response => {
    //     this.setState({loading: false, purchasing: false})
    //   })
    const queryParams = [];
    for (let i in this.state.ingredients){
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    }
    console.log(queryParams)
    const queryString = queryParams.join('&')
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    })
  }

  render() {
    const disabledInfo  = {
      ...this.state.ingredients
    };

    for ( let key in disabledInfo ) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = <OrderSummary 
      ingredients={this.state.ingredients}
      price={this.state.totalPrice}
      purchaseCanceled={this.purchaseCanceled}
      purchaseContinued={this.purchaseContinued} />
    if (this.state.loading) {
      orderSummary = <Spinner/>
    }
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
          {orderSummary}    
        </Modal>
        <Burger ingredients={this.state.ingredients}  />
        <BuildControls
         ingredientAdded={this.addIngredientHandler}
         ingredientRemoved={this.removeIngredientHandler}
         disabled={disabledInfo}
         price={this.state.totalPrice}
         purchasable={this.state.purchasable}
         ordered={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;