import React, { Component } from 'react'
import  AppBar  from '@material-ui/core/AppBar'
import  ToolBar  from '@material-ui/core/ToolBar'
import  Button  from '@material-ui/core/Button'
import styled from 'styled-components'
const Title = styled.h1`
  font-size: 50px;
  text-align: center;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

/*const Wrapper = styled.div `
flex-direction: column;
  align-items: center;
  justify-content: center;
`*/


export class Navbar extends Component {
    render() {
        return (
            <AppBar>
                <ToolBar style={{display: 'flex', justifyContent: 'center'}}>
                    <Button color='inherit' >Dashboard</Button>
                    <Button color='inherit' >Login</Button>
                    <Button color='inherit' >Signup</Button>
                    <img style={{display: 'flex' }} src="QU7.png" alt='logo' height= "85" width= "85"/>
                    <Title>Queued Up</Title>
                    
                </ToolBar>
            </AppBar>
        )
    }
}

export default Navbar
