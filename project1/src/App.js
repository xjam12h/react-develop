import './App.css';
import Encode from 'encoding-japanese';
import React, { Component } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { Button } from 'react-bootstrap'
import CSVReader from 'react-csv-reader'
import CSVReadable from "csv-reader";
import { string } from 'postcss-selector-parser';

const Box = styled.input`
  width: 320px;
  height: 40px;
  border: 1px solid #4c9aff;
  box-shadow: 0 1px 2px rgba(0,0,0,0.2)inset;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
`

const Btn = styled(Button)`
  position: relative;
  width: 60px;
  height:40px;
  background: #3d8bcd;
  color: #FFF;
  font-weight:bold;
  border-radius: 12px;
  margin-left: 15px;
  margin-right: 15px;
  cursor: pointer;
`


class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleForce = this.handleForce.bind(this);
    this.getTextFile = this.getTextFile.bind(this);

  }
  handleForce = (data, filename) => {
    console.log(data);
    var aaa = data[1][1];
    console.log(aaa);
    console.log(Encode.detect(aaa));
    console.log(Encode.convert(aaa, 'UNICODE]'));


  }
  getTextFile = (e) => {
    var i, j;
    console.log(e);
    var file = e.target.files[0]; //ファイル内容を読み出し
    console.log(file);
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function (e) {
      console.log(reader.result);
      var tmp = reader.result.split(/\r\n|\n|\r/);
      console.log(tmp);
      var csvarray = new Array();
      for (i = 0; i < tmp.length; i++) {
        csvarray[i] = tmp[i].split(',');
      }
      console.log(csvarray);
      console.log(Encode.detect(csvarray[1][0]));
      var data = [];

      // for (i = 0; i < csvarray.length; i++) {
      //   for (j = 0; j < csvarray[i].length; j++) {
      //     data[i][j] = Encode.convert(csvarray[i][j], 'UNICODE');
      //   }
      // }
      // console.log(csvarray[1][0]);


    }
  }
  render() {
    let a = 'VÑ';
    let enc = Encode.detect(a);
    console.log(enc);
    console.log(Encode.convert(a, 'UNICODE'));
    return (
      <div>
        <h1>
          test
        </h1>

        <CSVReader
          onFileLoaded={this.handleForce}
        />


        <hr></hr>

        <form name="myform">
          <input type="file" onChange={(e) => { this.getTextFile(e) }} />
        </form>
      </div>
    );
  }
}

export default App;


/*

*/