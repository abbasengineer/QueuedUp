import React, { Component } from "react";
import { render } from "react-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
const styles = (theme) => ({
code : {
  backgroundColor: "#eee",
  border: "1px solid #999",
  display: "block",
  padding: "20px",
}
});
export default class Snippet extends Component  {
render() {
  
   /*var mySubString = content.substring(
      content.lastIndexOf("``` "), 
      content.lastIndexOf("```")
  );*/
  let snippet = this.getOdds(this.props.content)


 return (
      <pre>
        <code className="card">
          {snippet}
        </code>
      </pre>
  )
 }

 getOdds = (array) => {
  let contentArray = this.props.content.split("```")
  let newArr = []
  let codeSnip = []
  //var codeSnip = mySubString.slice(3)
  //console.log(codeSnip)
  if(contentArray.length > 1){
    //console.log("YOOO array: ", contentArray)

    for (let i = 0; i < contentArray.length; i += 2) {
      newArr.push(contentArray[i]);
      contentArray[i+1] && codeSnip.push(contentArray[i + 1]);
      //console.log("new ARR : ", newArr)
      
  }
      console.log("ANOTHER:", codeSnip)
  }
  
  
 }
}