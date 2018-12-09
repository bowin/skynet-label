import { decorate, observable } from "mobx"

class Point {
  constructor(x,y) {
    this.x = x
    this.y = y
  }
}

class Data {
  constructor() {
    this.tl = null
    this.AnchorSelected = false
  }
  SelectAnchor(x,y ) {
    this.tl = new Point(x,y)
  }
  GetCurrentAnchor() {
   return this.tl
  }
}
decorate(Data, {
    tl: observable,
    AnchorSelected: observable
})


export default new Data()