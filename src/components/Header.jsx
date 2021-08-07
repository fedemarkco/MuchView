import React from "react";


export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      info: ''
    }
  }

  onClick(e){
    e.preventDefault();
  }

  render(){
    return(
      <header id="header" className="main" style={{opacity: 1}}>
        <div className="hbox">
          <div className="logo">
            <a href="/">
              <img alt="muchview" src="./Image/Otros/logo.png"/>
            </a>
          </div>
          <div className="head-main-nav">
            <div className="menu-inicio-container">
              <ul id="main_header" className="main-header">
                <li id="menu-item-17283" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-17283">
                  <a href="#" onClick={this.onClick}>Peliculas</a>
                  <ul className="sub-menu">
                    <li id="menu-item-17286" className="menu-item menu-item-type-taxonomy menu-item-object-dtquality current-episodes-ancestor current-menu-parent current-episodes-parent menu-item-17286">
                      <a href="PeliculaHollywood">Hollywood</a>
                    </li>
                    <li id="menu-item-28045" className="menu-item menu-item-type-taxonomy menu-item-object-dtquality menu-item-28045">
                      <a href="PeliculaAsiatica">Asiáticas</a>
                    </li>
                    <li id="menu-item-28045" className="menu-item menu-item-type-taxonomy menu-item-object-dtquality menu-item-28045">
                      <a href="PeliculaAnime">Anime</a>
                    </li>
                  </ul>
                </li>
                <li id="menu-item-17284" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-17284">
                  <a href="#" onClick={this.onClick}>Series</a>
                  <ul className="sub-menu">
                    <li id="menu-item-17286" className="menu-item menu-item-type-taxonomy menu-item-object-dtquality current-episodes-ancestor current-menu-parent current-episodes-parent menu-item-17286">
                      <a href="SerieHollywood">Hollywood</a>
                    </li>
                    <li id="menu-item-17286" className="menu-item menu-item-type-taxonomy menu-item-object-dtquality current-episodes-ancestor current-menu-parent current-episodes-parent menu-item-17286">
                      <a href="SerieAnime">Anime</a>
                    </li>
                    <li id="menu-item-28045" className="menu-item menu-item-type-taxonomy menu-item-object-dtquality menu-item-28045">
                      <a href="SerieDorama">Dorama</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div className="headitems ">
            <div id="advc-menu" className="search">
              <form id="fsearch">
                <input type="text" placeholder="Buscar..." name="s" id="s" autoComplete="off"/>
                <button className="search-button">
                  <span className="icon-search2"></span>
                </button>
              </form>
            </div>
            <div className="live-search"></div>
          </div>
        </div>
      </header>
    )
  }
}

