import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const src = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543336919361&di=1b1665e6734322d858ff95a83c329ead&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F9f2f070828381f30bab0055ca3014c086f06f09e.jpg"
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {display: {}, real: {}}
    this.handleImageLoaded = this.handleImageLoaded.bind(this);
  }
  handleImageLoaded(e) {
    console.log('loaded: ')
    // let img = e.target 
    // const width = img.offsetWidth, height = img.offsetHeight
    let ctx = this.refs.canvas//.getContext('2d')
    
    ctx.width = e.target.offsetWidth
    ctx.height = e.target.offsetHeight
    ctx.getContext('2d').fillRect(0,0, 100, 100);
    console.log('nat ', e.target.offsetTop, e.target.offsetLeft)
    console.log('nat ', e.target.naturalWidth, e.target.naturalHeight)
    console.log('dis ', e.target.offsetWidth, e.target.offsetHeight)
    this.setState({
      display: { width: e.target.offsetWidth, height: e.target.offsetHeight},
      real : {width: e.target.naturalWidth, height: e.target.naturalHeight},
    })
    console.log(this.state)
  }
  componentDidMount() {
    console.log('did mount')
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <canvas ref="canvas"></canvas>
        <img src={src} className="App-logo" alt="logo" display="none"
          onLoad={this.handleImageLoaded}
          />
        </header>
      </div>
    );
  }
}

export default App;
