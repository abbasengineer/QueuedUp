import React, { Component } from "react";
import { render } from "react-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";


export default class Snippet extends Component {
render() {
  const {
    classes,
    post: { username, content, postID, imageURL },
    user: { isAuth, credentials },
  } = this.props;
   /*var mySubString = content.substring(
      content.lastIndexOf("``` "), 
      content.lastIndexOf("```")
  );*/
  var contentArray = content.split("```")
    
  //var codeSnip = mySubString.slice(3)
  //console.log(codeSnip)
  if(contentArray.length > 1){
    console.log(contentArray)
  }
 return (
      <pre>
        <code>
          
        </code>
      </pre>
  )
 }
}