import React, { Component } from "react";
import { render } from "react-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";


export default class Snippet extends Component {
render() {
 return (

     <Button className="code_title">
         CODE SNIPPET
        <code>
        <TextField
                /* 
                  fullWidth*/
                />
        </code>
        </Button>
  )
 }
}