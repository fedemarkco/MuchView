import React from "react";
import Header from "./Header"
import Footer from "./Footer"
import axios from 'axios';

export default class PeliculaAnime extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      lista: [],
      listadoGenero: [],
      listadoIdioma: [],
      idioma: []
    }
    if(this.getQueryVariable('pag')){
      this.pag = this.getQueryVariable('pag');
    }else{
      this.pag = 0;
    }
    this.params = 'PeliculaAnime?pag=';
    this.gen = '';
    if(this.getQueryVariable('gen')){
      this.gen = '&gen='+this.getQueryVariable('gen');
    }
    this.idioma = '';
    if(this.getQueryVariable('idioma')){
      this.idioma = '&idioma='+this.getQueryVariable('idioma');
    }
    this.search = '';
    if(this.getQueryVariable('s')){
      this.search = '&s='+this.getQueryVariable('s');
    }
  }
  getQueryVariable(variable){
    var u = window.location.href;    
    var query = u.substring(u.indexOf('?')+1)
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
      var pair = vars[i].split("=");
      if(pair[0] == variable){
        return pair[1];
      }
    }
    return(false);
  }
  getList(tipo, clase, start, end){
    this.ipPc = window.location.hostname;
    if(this.getQueryVariable('s')){
      axios.get('https://muchviewapi.herokuapp.com/search/'+this.getQueryVariable('s')+'/'+tipo+'/'+clase+'/'+start+'/'+end)
      .then(res => { 
        if(res.data.length == 0){
          document.getElementsByClassName('navigation')[0].innerHTML = '<div>No hay resultados para '+this.getQueryVariable('s')+'</span></div>';
        }
        this.setState({lista: res.data});
      });  
    }else{
      if(this.getQueryVariable('gen')){
        axios.get('https://muchviewapi.herokuapp.com/getVideoByTypeClassGenreApi/'+tipo+'/'+clase+'/'+this.getQueryVariable('gen')+'/'+start+'/'+end)
        .then(res => { 
          this.setState({lista: res.data});
        });
      }else{
        if(this.getQueryVariable('idioma')){
          axios.get('https://muchviewapi.herokuapp.com/getVideoByTypeClassLanguageApi/'+tipo+'/'+clase+'/'+this.getQueryVariable('idioma')+'/'+start+'/'+end)
          .then(res => { 
            this.setState({lista: res.data});
          });
        }else{
          axios.get('https://muchviewapi.herokuapp.com/getVideoByTypeClassApi/'+tipo+'/'+clase+'/'+start+'/'+end)
          .then(res => { 
            this.setState({lista: res.data});
          });
        }
      }
    }
    axios.get('https://muchviewapi.herokuapp.com/getGeneroByTypeClassApi/Anime/Pelicula')
    .then(res => {
      this.setState({listadoGenero: res.data});
    }); 
    axios.get('https://muchviewapi.herokuapp.com/getLanguagesByTypeClass/Anime/Pelicula')
    .then(res => {
      this.setState({listadoIdioma: res.data});
    });
  }
  componentDidMount() {
    this.getList('Pelicula', 'Anime', this.pag*18, (this.pag*18)+18);
  }
  createList(title){
    return(
      <div id="content" style={{"marginLeft": "50px"}}>
        <div id="left-content">
          <div className="content-box">
            <div className="home-title dark-blue">
              <h3><i className="latest-icon"></i>{title}</h3>
                <div className="letras-box">
                  <ul>
                    <li className="box-link lt"><a href="#letrasint">Género ↓</a></li>
                    <li className="box-link id"><a href="#letrasint">Idioma ↓</a></li>
                  </ul>
                </div>
                <div className="genre-list" style={{"display": "none"}}>
                  <ul>
                    {this.state.listadoGenero.map((x, i) => 
                      <li key={i}><a href={this.params+'0&gen='+x.replace('&', '%26')} title={x}>{x}</a></li>
                    )}
                  </ul>
                </div>
                <div className="language-list" style={{"display": "none"}}>
                  <ul>
                    {this.state.listadoIdioma.map((x, i) => 
                      <li key={i}><a href={this.params+'0&idioma='+x} title={x}>{x}</a></li>
                    )}
                  </ul>
                </div>
            </div>
            {this.state.lista.map((x, i) => 
              <div key={i} className="portada-box">
                <h2 className="portada-title">
                  <a title={x.Titulo} href={"/Video?id="+x.Id+"&cap=1"} rel="bookmark">
                    {x.Titulo} 
                    {x.Idioma.map((idi, u) => {
                      return (
                        idi.toLowerCase() == 'latino' ? <img title="Latino" alt="pelicula asiatica" style={{"paddingRight":"3px"}} src={require("../images/Latino.png").default}/> : 
                        idi.toLowerCase() == 'subtitulado' ? <img title="Subtitulado" alt="pelicula asiatica" style={{"paddingRight":"3px"}} src={require("../images/Subtitulado.png").default}/> : 
                        <img title={idi} alt="pelicula asiatica" style={{"paddingRight":"3px"}} src={require("../images/Desconocido.png").default}/>
                      )
                    })}
                    </a>
                </h2>
                <a title={x.Titulo} href={"/Video?id="+x.Id+"&cap=1"} rel="nofollow">
                  <img className="img" src={`${process.env.PUBLIC_URL}/`+x.Imagen} alt={x.Titulo}/>
                </a>
              </div>
            )}
            <div className="navigation">
              {this.pag == 0 ? '' : <a className="text nav-prev" href={this.params+(parseInt(this.pag)-1)+this.search+this.gen+this.idioma}>&laquo; Resultados Anteriores</a>}
              {this.state.lista.length == 18 ? <a className="text nav-prev" href={this.params+(parseInt(this.pag)+1)+this.search+this.gen+this.idioma}>Resultados Siguientes &raquo;</a> : ''}
            </div>
          </div>
        </div>
      </div>
    )
  }
  render(){
    let peliculaAnime = this.createList('Peliculas Anime');
    return(
      <div id="dt_contenedor">
        <Header/>
        <div id="single" className="dtsingle" style={{'margin': '0 auto', 'backgroundColor': '#191919', 'width': '1200px'}}>
          <div id="edit_link"></div>
          <div className="content" id="content" ref="myImgContainer" style={{'width': '1200px'}}>
            <div id="info" className="sbox">
              <div itemProp="description">
                <div id="container">
                  {peliculaAnime}
                </div>
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