import React, { Component } from 'react';
import { connect} from 'react-redux';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component {

  state = {
    purchasing: false,
    loading: false,
    error: false
  }

  updatePurchaseState( ingredients ) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      })
      .reduce( (sum, el) => {
        return sum + el;
      },0)
      return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }
  
  purchaseContinueHandler = () => {
    this.props.history.push('/checkout')
  }

  render() {
    const disabledInfo  = {
      ...this.props.ings
    };

    for ( let key in disabledInfo ) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
          <OrderSummary 
          ingredients={this.props.ings}
          price={this.props.price}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler
          } />
        </Modal>
        <Burger ingredients={this.props.ings}  />
        <BuildControls
         ingredientAdded={this.props.onIngredientAdded}
         ingredientRemoved={this.props.onIngredientRemoved}
         disabled={disabledInfo}
         price={this.props.price}
         purchasable={this.updatePurchaseState(this.props.ings)}
         ordered={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);