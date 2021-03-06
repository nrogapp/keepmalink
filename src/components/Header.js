import React from 'react'
import { NavLink } from 'react-router-dom'

import { auth } from '../firebase'

import AuthUserContext from './AuthUserContext'

import * as routes from '../constants/routes'

class Header extends React.Component {
  state = {
    isActive: false
  }

  toggleNav = () => {
    this.setState(prevState => ({
      isActive: !prevState.isActive
    }))
  }

  handleSignOut = () => {
    auth.signOut()
  }

  renderNavBarEndNonAuth() {
    return (
      <div className="navbar-item">
        <NavLink exact to={routes.LANDING} activeClassName="is-active" className="navbar-item">Landing</NavLink>
        <NavLink to={routes.SIGN_IN} activeClassName="is-active" className="navbar-item">Sign In</NavLink>
        <NavLink to={routes.SIGN_UP} className="button is-info is-outlined is-hovered">Sign up</NavLink>
      </div>
    )
  }

  renderNavBarEndAuth() {
    return (
      <div className="navbar-item">
        <NavLink exact to={routes.LANDING} activeClassName="is-active" className="navbar-item">Landing</NavLink>
        <NavLink to={routes.HOME} activeClassName="is-active" className="navbar-item">Home</NavLink>
        <NavLink to={routes.ACCOUNT} activeClassName="is-active" className="navbar-item">Account</NavLink>
        <button type="button" className="button is-danger is-outlined is-hovered" onClick={this.handleSignOut}>Sign Out</button>
      </div>
    )
  }

  render() {
    return (
      <div className="header">
        <nav className="navbar has-shadow is-fixed-top">
          <div className="container">
            <div className="navbar-brand">
              <a className="navbar-item" href="/">
                <strong>K</strong>eepMaLink
              </a>
              <div
                className="navbar-burger burger"
                data-target="mainNav"
                onClick={this.toggleNav}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <div
              className={this.state.isActive ? 'navbar-menu is-active' : 'navbar-menu'}
              id="mainNav"
            >
              <div className="navbar-end">
                <AuthUserContext.Consumer>
                  {authUser => authUser
                    ? this.renderNavBarEndAuth()
                    : this.renderNavBarEndNonAuth()
                  }
                </AuthUserContext.Consumer>
              </div>
            </div>
          </div>
        </nav>
      </div >
    )
  }
}

export default Header
