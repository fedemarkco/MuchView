import React from "react";
import axios from 'axios';
import Footer from './Footer'
import Header from './Header'

export default class Video extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      info: '',
      heightSidebar: 0,
      idioma: [],
	    idiomaSeleccionado: '',
      tipo: '',
      opt: 'Latino',
      totalCapitulos: 0,
      iframe: '',
      episodios: '',
      disp: 1,
      listadoGenero: [],
      capituloExiste: 0
    }
    this.getInfo = this.getInfo.bind(this);
    this.searchParams = new URLSearchParams(window.location.search);
    axios.get('http://'+window.location.hostname+':5000/capExists/'+this.searchParams.get('id')+'/'+this.searchParams.get('cap'))
    .then(res => {
      if(res.data){
        this.setState({capituloExiste: 1});
      }else{
        document.getElementById('option-1').innerHTML = '<div style="color:white; margin-left: 40%; margin-top: 200px; font-family: Arial;">No se encuentra disponible</div>';
      }
    });
  }
  updateIframe(){
    if(this.state.capituloExiste == 1){
      let iidio = this.state.idiomaSeleccionado;
      this.setState({opt: iidio});
      this.setState({iframe: "opciones.html?id="+this.searchParams.get('id')+"&cap="+
                    this.searchParams.get('cap')+"&idioma="+iidio+"&status=ok"});
    }
  }
  getInfo(){
    const ipPc = window.location.hostname;
    axios.get('http://'+ipPc+':5000/getGeneroByIdApi/'+this.searchParams.get('id'))
    .then(res => {
      this.setState({listadoGenero: res.data});
    });
    axios.get('http://'+ipPc+':5000/getInfo/'+this.searchParams.get('id'))
    .then(res => {
      const info = res.data;
      this.setState({tipo: info.Tipo})
      this.setState({totalCapitulos: info.Capitulos})
      this.setState({idioma: info.Idioma});
      this.setState({opt: this.state.idioma[0]});
      this.setState({idiomaSeleccionado: this.state.idioma[0]});
      this.setState({info: info});
      this.updateIframe();
      
    })
  }
  seleccionarIdioma = (e) => {
    e.preventDefault();
    this.setState({idiomaSeleccionado: e.currentTarget.textContent});
    this.setState({iframe: ''});
  }
  updateSize(){
    let ref = this.refs.myImgContainer;
    this.setState({heightSidebar: ref.clientHeight})
  }
  componentDidMount(){
    this.getInfo();
    this.setState({disp: 1});
  }
  componentDidUpdate(){
    let ref = this.refs.myImgContainer;
    if(this.state.heightSidebar != ref.clientHeight){
      this.setState({heightSidebar: ref.clientHeight})
    }
    if(this.state.capituloExiste == 1){
      if(this.state.iframe == '' && this.state.idioma.length != 0){
        let iidio = this.state.idiomaSeleccionado;
        this.setState({iframe: "opciones.html?id="+this.searchParams.get('id')+"&cap="+
                      this.searchParams.get('cap')+"&idioma="+iidio+"&status=ok"});
        this.updateIframe();
      }
    }
  }
  irAlCapitulo = (e) => {
    e.preventDefault();
    const id = this.searchParams.get('id');
    const re = /\d+/;
    const cap = re.exec(e.currentTarget.textContent)[0]
    window.location.href = window.location.origin+"/Video?id="+id+"&cap="+cap
  }
  mostrarInfo = (e) => {
    if(e.currentTarget.textContent == 'Episodios'){
      e.preventDefault();
      this.setState({disp: 0});
    }else{
      if(e.currentTarget.textContent == 'Información'){
        e.preventDefault();
        this.setState({disp: 1});
      }else{
        if(e.currentTarget.textContent == ' lista de episodios'){
          this.setState({disp: 0});
        }
      }
    }
  }
  returnDivCap(id, cap){
    let ini = '';
    let fin = '';
    if(cap == 1){
      ini = <a className="nonex"><i className="icon-chevron-left"></i> <span>episodio anterior</span></a>
    }else{
      ini = <a href={"Video?id="+id+"&cap="+(cap-1)}><i className="icon-chevron-left"></i> <span>episodio anterior</span></a>
    }
    if(cap == this.state.info.Capitulos){
      fin = <a className="nonex"><span>siguiente episodio</span> <i className="icon-chevron-right"></i></a>
    }else{
      fin = <a href={"Video?id="+id+"&cap="+(parseInt(cap)+1)}><span>siguiente episodio</span> <i className="icon-chevron-right"></i></a>
    }
    return (
      <div className="pag_episodes">
        <div className="item">
          {ini}
        </div>
        <div className="item">
          <a href="#episodios" onClick={this.mostrarInfo}><i className="icon-bars"></i> <span className="lista">lista de episodios</span></a>
        </div>
        <div className="item">
          {fin}
        </div>
      </div>
    )
  }
  returnListaEpisodios(id, cap){
    axios.get('http://'+window.location.hostname+':5000/getEpisodesApi/'+this.searchParams.get('id'))
    .then(res => {
      this.lista1 = [];
      this.lista2 = [];
      for(var i=1; i<=cap; i++){
        if(i % 5 != 0){
          this.lista2.push(<div key={i} className='cell' onClick={this.irAlCapitulo}>Capítulo {res.data[i-1]}</div>)
        }else{
          this.lista2.push(<div key={i} className='cell' onClick={this.irAlCapitulo}>Capítulo {res.data[i-1]}</div>)
          this.lista1.push(<div key={i+1} className="table"><div className="row">{this.lista2}</div></div>)
          this.lista2 = [];
        }
      }
      if(this.lista2.length % 5 != 0){
        for(var i=1; i<=cap; i++){
          this.lista2.push(<div key={cap+2+i} className='cell' id='ocultarCap'></div>)
          if(this.lista2.length % 5 == 0){
            break;
          }
        }
      }
      this.lista1.push(<div key={cap+8} className="table"><div className="row">{this.lista2}</div></div>) 
    });
    return (
      <div id="episodios" className={this.state.disp === 0 ? 'sbox' : 'ocultarInfo'}>
        <div className='table'>
          {this.lista1}
        </div>
      </div>
    )
  }
  putLanguage(){
    let idioma = this.state.idioma;
    return(
      idioma.map((idi, i) => {
        return (
          idi.toLowerCase() == 'latino' ? 
            (<li key={i}>
              <a className={this.state.opt === idi ? 'options selected' : 'options noselected'} href="" onClick={this.seleccionarIdioma}>
                <b className="icon-play_arrow"></b>{idi} 
                <span className="dt_flag">                
                  <img title="Latino" alt="video" style={{"paddingRight":"3px"}} src={require("../images/Latino.png")}/>
                </span>
              </a>
            </li>)
            : idi.toLowerCase() == 'subtitulado' ? 
              (<li key={i}>
                <a className={this.state.opt === idi ? 'options selected' : 'options noselected'} href="" onClick={this.seleccionarIdioma}>
                  <b className="icon-play_arrow"></b>{idi} 
                  <span className="dt_flag">                
                    <img title="Subtitulado" alt="video" style={{"paddingRight":"3px"}} src={require("../images/Subtitulado.png")}/>
                  </span>
                </a>
              </li>)
              : (<li key={i}>
                  <a className={this.state.opt === idi ? 'options selected' : 'options noselected'} href="" onClick={this.seleccionarIdioma}>
                    <b className="icon-play_arrow"></b>{idi} 
                    <span className="dt_flag">                
                      <img title={idi} alt="video" style={{"paddingRight":"3px"}} src={require("../images/Desconocido.png")}/>
                    </span>
                  </a>
                </li>)
        )
      })
    )
  }
  render(){
    const {info} = this.state;
    let heightSidebar = this.state.heightSidebar;
    let genero = '';
    let listadoGenero = '';
    let idioma = '';
    let capitulos = '';
    let tipo = '';
    let temporada = '';
    let caps = '';
    let tab1 = '';
    let tab2 = '';
    let mostrarEpisodios = '';
    if(this.state.info.Genero){
      if(info.Clase == 'Anime'){
        if(info.Tipo != 'Pelicula'){
          genero = this.state.info.Genero.map((gen, i) =>
            <a key={i} href={"SerieAnime?pag=0&gen="+gen.replace('&', '%26')}>{gen}</a>
          );
          listadoGenero = this.state.listadoGenero.map((gen, i) =>
            <li key={i}><a href={"SerieAnime?pag=0&gen="+gen.replace('&', '%26')}>{gen}</a></li>
          );
          document.getElementById("fsearch").setAttribute("action", "SerieAnime");
        }else{
          genero = this.state.info.Genero.map((gen, i) =>
            <a key={i} href={"PeliculaAnime?pag=0&gen="+gen.replace('&', '%26')}>{gen}</a>
          );
          listadoGenero = this.state.listadoGenero.map((gen, i) =>
            <li key={i}><a href={"PeliculaAnime?pag=0&gen="+gen.replace('&', '%26')}>{gen}</a></li>
          );
          document.getElementById("fsearch").setAttribute("action", "PeliculaAnime");
        }
      }
      if(info.Clase == 'Hollywood'){
        if(info.Tipo != 'Pelicula'){
          genero = this.state.info.Genero.map((gen, i) =>
            <a key={i} href={"SerieHollywood?pag=0&gen="+gen.replace('&', '%26')}>{gen}</a>
          );
          listadoGenero = this.state.listadoGenero.map((gen, i) =>
            <li key={i}><a href={"SerieHollywood?pag=0&gen="+gen.replace('&', '%26')}>{gen}</a></li>
          );
          document.getElementById("fsearch").setAttribute("action", "SerieHollywood");
        }else{
          genero = this.state.info.Genero.map((gen, i) =>
            <a key={i} href={"PeliculaHollywood?pag=0&gen="+gen.replace('&', '%26')}>{gen}</a>
          );
          listadoGenero = this.state.listadoGenero.map((gen, i) =>
            <li key={i}><a href={"PeliculaHollywood?pag=0&gen="+gen.replace('&', '%26')}>{gen}</a></li>
          );
          document.getElementById("fsearch").setAttribute("action", "PeliculaHollywood");
        }
      }
      if(info.Clase == 'Dorama'){
        if(info.Tipo != 'Pelicula'){
          genero = this.state.info.Genero.map((gen, i) =>
            <a key={i} href={"SerieDorama?pag=0&gen="+gen.replace('&', '%26')}>{gen}</a>
          );
          listadoGenero = this.state.listadoGenero.map((gen, i) =>
            <li key={i}><a href={"SerieDorama?pag=0&gen="+gen.replace('&', '%26')}>{gen}</a></li>
          );
          document.getElementById("fsearch").setAttribute("action", "SerieDorama");
        }
      }
      if(info.Clase == 'Asiatica'){
        if(info.Tipo == 'Pelicula'){
          genero = this.state.info.Genero.map((gen, i) =>
            <a key={i} href={"PeliculaAsiatica?pag=0&gen="+gen.replace('&', '%26')}>{gen}</a>
          );
          listadoGenero = this.state.listadoGenero.map((gen, i) =>
            <li key={i}><a href={"PeliculaAsiatica?pag=0&gen="+gen.replace('&', '%26')}>{gen}</a></li>
          );
          document.getElementById("fsearch").setAttribute("action", "PeliculaAsiatica");
        }
      }
    }
    if(info.Capitulos != ''){
      tipo = <div className="datc" style={{'width': '650px'}}>Tipo: {info.Tipo}</div>
    }
    if(info.Temporada != ''){
      temporada = <div className="datc" style={{'width': '650px'}}>Temporada: {info.Temporada}</div>
    }
    if(info.Capitulos != '' && info.Tipo != 'Pelicula'){
      caps = <div className="datc" style={{'width': '650px'}}>Capitulos: {info.Capitulos}</div>
      caps = <div className="datc" style={{'width': '650px'}}>Estado: {info.Estado}</div>
    }
    if(info.Tipo != 'Pelicula'){
      tab1 = <li><a onClick={this.mostrarInfo} className={this.state.disp === 1 ? 'selected' : 'noselected'}>Información</a></li>
      tab2 = <li><a onClick={this.mostrarInfo} className={this.state.disp === 0 ? 'selected' : 'noselected'} name="episodios">Episodios</a></li>
    }
    if(info.Tipo == 'Pelicula'){
      tab1 = <li><a onClick={this.mostrarInfo} className={this.state.disp === 1 ? 'selected' : 'noselected'}>Información</a></li>
    }
    idioma = this.putLanguage();
    if(this.state.tipo != 'Pelicula'){
      if(this.state.totalCapitulos >= 1){
        capitulos = this.returnDivCap(this.searchParams.get('id'), this.searchParams.get('cap'));
        mostrarEpisodios = this.returnListaEpisodios(this.searchParams.get('id'), this.state.totalCapitulos);
      }
    }
    return(
      <div id="dt_contenedor">
        <Header/>
        <div id="single" className="dtsingle" style={{'margin': '0 auto', 'backgroundColor': '#191919', 'width': '1200px'}}>
          <div id="edit_link"></div>
            <div className="content" id="content" ref="myImgContainer" style={{'width': '861px'}}>
            <div id="playex" className="player_sist " style={{'width': '860px'}}>
              <div className="playex">
                <div id="option-1" className="play-box-iframe fixidtab">
                  <iframe className="metaframe rptss" src={this.state.iframe} frameBorder="0" title={info.Titulo} scrolling="no" allowFullScreen></iframe>
                </div>
              </div>
              <div className="control">
                <nav className="player">
                  <ul className="options">
                    <li>
                      <a className="sources"><i className="icon-menu listsormenu"></i> <b>Idiomas</b></a>
                      <ul className="idTabs sourceslist">
                        {idioma}
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
              {capitulos}
            </div>
            <div className="sheader">
              <div className="poster">
                <img ref="image" alt="video" onLoad={() => this.updateSize()} src={info.Imagen}/>
              </div>
              <div className="data" style={{'position': 'absolute'}}>
                <h1>{info.Titulo}</h1>
                <div className="starstruck-ptype">
                  <div itemScope className="starstruck-wrap" itemProp="aggregateRating" style={{'width': '650px'}}>
                    <div className="sgeneros">
                      {genero}
                    </div>
                  </div>
                </div>
                {tipo}
                {temporada}
                {caps}
              </div>
            </div>
            <div className="single_tabs">
              <div className="user_control"></div>
              <ul id="section" className="smenu idTabs">
                {tab1}
                {tab2}
              </ul>
            </div>
            <div id="info" className={this.state.disp === 1 ? 'sbox' : 'ocultarInfo'}>
              <h2>Sinopsis</h2>
              <div itemProp="description">
                <p> {info.Sinopsis} </p>
                <div className='code-block code-block-1' style={{'margin': '8px 0', 'clear': 'both'}}>
                </div>
              </div>
            </div>
            {mostrarEpisodios}
          </div>
          <div className="sidebar scrolling " style={{'height': `${heightSidebar}px`}}>
            <div className="dt_mainmeta">
              <nav className="genres">
                <h2>Géneros</h2>
                <ul className="genres scrolling" id="style-15">
                  {listadoGenero}
                </ul>
              </nav>
            </div>
          </div>
          <Footer/>
        </div>
      </div>
    )
  }
}

