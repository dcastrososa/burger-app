import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux'; 
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

  state = {
    showSideDrawer: false 
  }

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false})
  }

  sideDrawerToggleHandler = () => {
    this.setState( ( prevState ) => {
      return { showSideDrawer: !prevState.showSideDrawer }
    } )
  }

  render() {
    return (
      <Aux>
        <SideDrawer 
          closed={this.sideDrawerClosedHandler}
          open={this.state.showSideDrawer} />
        <Toolbar
          isAuth={this.props.isAuthenticated} 
          drawerToggleClicked={this.sideDrawerToggleHandler} />
        <main className={classes.Content} >
          {this.props.children}
        </main>
      </Aux>
    )
  }
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null 
  }
}

export default connect(mapStateToProps)(Layout);