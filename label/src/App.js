import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {observer} from 'mobx-react';

import Data from './data'

const src = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543336919361&di=1b1665e6734322d858ff95a83c329ead&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F9f2f070828381f30bab0055ca3014c086f06f09e.jpg"


class App extends Component {
  constructor(props) {
    super(props);
    this.handleImageLoaded = this.handleImageLoaded.bind(this);
    this.CanvasMouseMoved = this.CanvasMouseMoved.bind(this);
  }
  handleImageLoaded(e) {
  }
  CanvasMouseMoved(x, y) {
    // console.log('moved ', x, y )
    // fired after anchor selected

    // ctx.closePath(); 
  }
  CanvasAnchorSelected(x, y) {

  }
  componentDidMount() {
    this.refs.canvas.onmousedown = e => {
      // hold
      console.log('offset: ', e.offsetX, ' ', e.offsetY)
      console.log('client: ', e.clientX, ' ', e.clientY)
      let left = parseInt(e.clientX -  this.refs.canvas.offsetLeft)
      let top = parseInt(e.offsetY - this.refs.canvas.offsetTop)
      Data.SelectAnchor(left, top)
      let p = Data.GetCurrentAnchor()
      let ctx = self.refs.canvas.getContext('2d')
      ctx.beginPath();
      console.log('p: ', p)
      ctx.rect(p.x, p.y,  1, 1);
      ctx.strokeStyle = "rgba(255, 0, 0, 0.5)";
      ctx.stroke();
    }
    this.refs.canvas.onmousemove = e => {
      return
      let p = Data.GetCurrentAnchor()
      if (!p) return
      console.log('p :',  p)
      // console.log('mouse move: ', e.clientX, ' ',  e.clientY)
      let cl = this.refs.canvas.offsetLeft
      let ct = this.refs.canvas.offsetTop
      let cw = this.refs.canvas.width
      let ch = this.refs.canvas.height
      let ctx = self.refs.canvas.getContext('2d')
      // console.log('mouse move: ', e.clientX - cl, ' ',  e.clientY - ct)
      ctx.clearRect(0,0, cw, ch);
      ctx.beginPath();
      ctx.lineWidth=3;
      let x = parseInt(e.clientX - cl)
      let y = parseInt(e.offsetY - ct)
      ctx.rect(p.x, p.y,  x - p.x, y - p.y);
      ctx.strokeStyle = "rgba(255, 0, 0, 0.5)";
      ctx.stroke();
    }
    this.refs.canvas.onmouseup = e => {
      Data.tl = null
    }
    console.log('did mount')
    var s = new Image();
    var self = this
    s.onload = e => {
      console.log(e.target.width)
      console.log(e.target.height)
      self.refs.canvas.width = e.target.width
      self.refs.canvas.height = e.target.height
      let ctx = self.refs.canvas.getContext('2d')
      console.log('ctx: width, height: ', self.refs.canvas.width, self.refs.canvas.height)
      console.log("offset", self.refs.canvas.offsetX)
      ctx.drawImage(s,0,0, self.refs.canvas.width, self.refs.canvas.height);
    }
    s.src = src
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <canvas className="App-logo" ref="canvas"></canvas>
        </header>
      </div>
    );
  }
}

export default observer(App);
