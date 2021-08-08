import React from "react";
import axios from 'axios';

export default class ListadoPeliculaAnime extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      lista: [],
      idioma: []
    }
    this.search = '';
  }
  getList(tipo, clase, start, end){
    this.ipPc = window.location.hostname;
    if(this.props.search != null){
      this.search = '?s='+this.props.search;
      axios.get('https://muchviewapi.herokuapp.com/search/'+this.props.search+'/'+tipo+'/'+clase+'/'+start+'/'+end)
      .then(res => { 
        if(res.data.length === 0){
          document.getElementsByClassName('navigation')[2].innerHTML = '<div>No hay resultados para '+this.props.search+'</span></div>';
        }
        this.setState({lista: res.data});
      });  
    }else{
      axios.get('https://muchviewapi.herokuapp.com/getVideoByTypeClassApi/'+tipo+'/'+clase+'/'+start+'/'+end+'/True')
      .then(res => { 
        this.setState({lista: res.data});
      });
    }
  }
  componentDidMount(){
    this.getList('Pelicula', 'Anime', 0, 12);
  }
  createList(title){
    return(
      <div id="content" style={{"marginLeft": "50px"}}>
        <div id="left-content">
          <div className="content-box">
            <div className="home-title dark-blue">
              <h3><i className="latest-icon"></i>{title}</h3>
              <h3 className="ver-todo"><a href={"/PeliculaAnime"+this.search}>Ver Todo</a></h3>
            </div>
            {this.state.lista.map((x, i) => 
              <div key={i} className="portada-box">
                <h2 className="portada-title">
                  <a title={x.Titulo} href={"/Video?id="+x.Id+"&cap=1"} rel="bookmark">
                    {x.Titulo} 
                    {x.Idioma.map((idi, u) => {
                      return (
                        idi.toLowerCase() === 'latino' ? <img key={u} title="Latino" alt="pelicula anime" style={{"paddingRight":"3px"}} src={require("../images/Latino.png").default}/> : 
                        idi.toLowerCase() === 'subtitulado' ? <img key={u} title="Subtitulado" alt="pelicula anime" style={{"paddingRight":"3px"}} src={require("../images/Subtitulado.png").default}/> : 
                        <img key={u} title={idi} alt="pelicula anime" style={{"paddingRight":"3px"}} src={require("../images/Desconocido.png").default}/>
                      )
                    })}
                    </a>
                </h2>
                <a title={x.Titulo} href={"/Video?id="+x.Id+"&cap=1"} rel="nofollow">
                  <img className="img" src={`${process.env.PUBLIC_URL}/`+x.Imagen} alt={x.Titulo}/>
                </a>
              </div>
            )}
            <div className="navigation"></div>
          </div>
        </div>
      </div>
    )
  }
  render(){
    let serieAnime = this.createList('Peliculas Anime');
    return(
      <div id="container">
        {serieAnime}
      </div>
    )
  }
}