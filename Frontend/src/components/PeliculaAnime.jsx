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
    this.searchParams = new URLSearchParams(window.location.search);
    if(this.searchParams.get('pag')){
      this.pag = this.searchParams.get('pag');
    }else{
      this.pag = 0;
    }
    this.params = 'PeliculaAnime?pag=';
    this.gen = '';
    if(this.searchParams.get('gen')){
      this.gen = '&gen='+this.searchParams.get('gen');
    }
    this.idioma = '';
    if(this.searchParams.get('idioma')){
      this.idioma = '&idioma='+this.searchParams.get('idioma');
    }
    this.search = '';
    if(this.searchParams.get('s')){
      this.search = '&s='+this.searchParams.get('s');
    }
  }
  getList(tipo, clase, start, end){
    this.ipPc = window.location.hostname;
    if(this.searchParams.get('s')){
      axios.get('http://'+this.ipPc+':5000/search/'+this.searchParams.get('s')+'/'+tipo+'/'+clase+'/'+start+'/'+end)
      .then(res => { 
        if(res.data.length == 0){
          document.getElementsByClassName('navigation')[0].innerHTML = '<div>No hay resultados para '+this.searchParams.get('s')+'</span></div>';
        }
        this.setState({lista: res.data});
      });  
    }else{
      if(this.searchParams.get('gen')){
        axios.get('http://'+this.ipPc+':5000/getVideoByTypeClassGenreApi/'+tipo+'/'+clase+'/'+this.searchParams.get('gen')+'/'+start+'/'+end)
        .then(res => { 
          this.setState({lista: res.data});
        });
      }else{
        if(this.searchParams.get('idioma')){
          axios.get('http://'+this.ipPc+':5000/getVideoByTypeClassLanguageApi/'+tipo+'/'+clase+'/'+this.searchParams.get('idioma')+'/'+start+'/'+end)
          .then(res => { 
            this.setState({lista: res.data});
          });
        }else{
          axios.get('http://'+this.ipPc+':5000/getVideoByTypeClassApi/'+tipo+'/'+clase+'/'+start+'/'+end)
          .then(res => { 
            this.setState({lista: res.data});
          });
        }
      }
    }
    axios.get('http://'+this.ipPc+':5000/getGeneroByTypeClassApi/Anime/Pelicula')
    .then(res => {
      this.setState({listadoGenero: res.data});
    }); 
    axios.get('http://'+this.ipPc+':5000/getLanguagesByTypeClass/Anime/Pelicula')
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
                    <li className="box-link lt"><a href="#letrasint">G??nero ???</a></li>
                    <li className="box-link id"><a href="#letrasint">Idioma ???</a></li>
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
                  <a title={x.Titulo} href={"http://"+this.ipPc+":3000/Video?id="+x.Id+"&cap=1"} rel="bookmark">
                    {x.Titulo}??
                    {x.Idioma.map((idi, u) => {
                      return (
                        idi.toLowerCase() == 'latino' ? <img title="Latino" alt="pelicula asiatica" style={{"paddingRight":"3px"}} src={require("../images/Latino.png")}/> : 
                        idi.toLowerCase() == 'subtitulado' ? <img title="Subtitulado" alt="pelicula asiatica" style={{"paddingRight":"3px"}} src={require("../images/Subtitulado.png")}/> : 
                        <img title={idi} alt="pelicula asiatica" style={{"paddingRight":"3px"}} src={require("../images/Desconocido.png")}/>
                      )
                    })}
                    </a>
                </h2>
                <a title={x.Titulo} href={"http://"+this.ipPc+":3000/Video?id="+x.Id+"&cap=1"} rel="nofollow">
                  <img className="img" src={`${process.env.PUBLIC_URL}`+x.Imagen} alt={x.Titulo}/>
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