import React from 'react'
import {Link} from "react-router-dom";
import pokedex from "../assets/pokedex.png"
import { Navbar, Container } from 'react-bootstrap';
import "./navbar.css"

export const NavBar = () => {
  return (
    <div className='container'>
      <Navbar className="bg-body-tertiary">
        <Container className = "navbarContainer">
          <Navbar.Brand href="/">
            <img
              alt=""
              src={pokedex}
              width="30"
              height="30"
              className="d-inline-block align-top" 
            />{' '}
            <div className = "brandName">
              PokéDex
            </div>
            <Link to="/guesser">GUESSER</Link>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  )
}
