import React from "react";

export default class Search extends React.Component {
  render(){
    const {info} = this.props;
    const ipPc = window.location.hostname;
    return(
      <div id="left-content">
        <div class="content-box">
          <div class="home-title dark-orange"><h3><i class="latest-icon"></i> Últimos Animes agregados</h3></div>
          <div class="portada-box">
            <h2 class="portada-title">
                <a title={info.Titulo} href="https://jkanime.net/cencoroll-connect/" rel="bookmark">{info.Titulo}</a>
            </h2>
            <a title={info.Titulo} href={'http://'+ipPc+':5000/Video?id='+info.Id} rel="nofollow">
              <img src={info.Imagen} alt={info.Titulo}/>
            </a>
          </div>
        </div>
      </div>
    )
  }
}

