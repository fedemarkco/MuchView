import React from "react";
import Header from "./Header"
import Footer from "./Footer"
import ListadoSerieAnime from "./ListadoSerieAnime"
import ListadoPeliculaAnime from "./ListadoPeliculaAnime"
import ListadoPeliculaHollywood from "./ListadoPeliculaHollywood"
import ListadoPeliculaAsiatica from "./ListadoPeliculaAsiatica"
import ListadoSerieDorama from "./ListadoSerieDorama"
import ListadoSerieHollywood from "./ListadoSerieHollywood"

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.search = new URLSearchParams(window.location.search).get('s');
  }
  
  render(){
    console.log(this.search);
    return(
      <div id="dt_contenedor">
        <Header/>
        <div id="single" className="dtsingle" style={{'margin': '0 auto', 'backgroundColor': '#191919', 'width': '1200px'}}>
          <div id="edit_link"></div>
          <div className="content" id="content" ref="myImgContainer" style={{'width': '1200px'}}>
            <div id="info" className="sbox">
              <div itemProp="description">
                <ListadoPeliculaHollywood search={this.search}/>
                <ListadoPeliculaAsiatica search={this.search}/>
                <ListadoPeliculaAnime search={this.search}/>
                <ListadoSerieHollywood search={this.search}/>
                <ListadoSerieAnime search={this.search}/>
                <ListadoSerieDorama search={this.search}/>
                <div className='code-block code-block-1' style={{'margin': '8px 0', 'clear': 'both'}}></div>
              </div>
            </div>
          </div>
          <Footer/>
        </div>
      </div>
    )
  }
}