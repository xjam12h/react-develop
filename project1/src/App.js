import './App.css';
import Encoding from 'encoding-japanese';
import React, { Component } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { Button } from 'react-bootstrap'
import CSVReader from 'react-csv-reader'
import CSVReadable from "csv-reader";
import { string } from 'postcss-selector-parser';
import Iconv from 'iconv-lite';
import csv from 'csv';


/* const Box = styled.input`
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
 */

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleForce = this.handleForce.bind(this);
    this.getTextFile = this.getTextFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleForce = (data, filename) => {
    console.log(data);
    var aaa = data[1][1];
    console.log(aaa);
    console.log(Encoding.detect(aaa));
    console.log(Encoding.convert(aaa, 'UNICODE]'));


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
      var csvArray = new Array();
      for (i = 0; i < tmp.length; i++) {
        csvArray[i] = tmp[i].split(',');
      }

      var encodeTest = csvArray[0][0];
      console.log(csvArray);
      console.log(Encoding.detect(encodeTest));
      var Data = [];

      var testdata = Encoding.convert(encodeTest, 'UNICODE', 'SJIS');
      console.log(testdata);

      // const uint8Array = new Uint8Array(csvarray);
      // console.log(uint8Array);
      // var detected = Encoding.detect(uint8Array);
      // console.log(detected);

      // for (i = 0; i < csvarray.length; i++) {
      //   for (j = 0; j < csvarray[i].length; j++) {
      //     data[i][j] = Encoding.convert(csvarray[i][j], 'UNICODE');
      //   }
      // }
      // console.log(csvarray[1][0]);


    }
  }

  handleChange = (e) => {
    var i;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function (e) {
      const codes = new Uint8Array(e.target.result);
      console.log(codes);
      const detectedEncoding = Encoding.detect(codes);
      console.log("Encoding.detect : " + detectedEncoding);
      try {
        const rawResult = String.fromCharCode.apply(null, codes);
        console.log('rawResult: ' + rawResult);

        const unicodeString = Encoding.convert(codes, {
          to: 'unicode',
          from: detectedEncoding,
          type: 'string'
        });
        console.log('unicodeString: ' + unicodeString);
        const splitString = unicodeString.split(/\r\n|\n|\r/);
        console.log(splitString);
        var data = [];
        for (i = 0; i < splitString.length; i++) {
          data[i] = splitString[i].split(',');
        }
        console.log(data);

      } catch (e) {
        // Uncaught RangeError: Maximum call stack size exceeded
        alert('ファイルサイズが大きすぎます');

      }
    }

  }

  render() {
    let a = 'VÑ';
    let enc = Encoding.detect(a);
    console.log(enc);
    console.log(Encoding.convert(a, 'UNICODE'));
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
        <hr></hr>
        <input type="file" onChange={(e) => { this.handleChange(e) }} />
      </div>
    );
  }
}

export default App;


/*

*/