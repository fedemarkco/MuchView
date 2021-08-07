import React from 'react';
import Main from '../components/Main'
import Video from '../components/Video'
import PeliculaHollywood from '../components/PeliculaHollywood'
import PeliculaAsiatica from '../components/PeliculaAsiatica'
import PeliculaAnime from '../components/PeliculaAnime'
import SerieAnime from '../components/SerieAnime';
import SerieDorama from '../components/SerieDorama';
import SerieHollywood from '../components/SerieHollywood';
import {
  BrowserRouter as Router,
  HashRouter,
  Route
} from "react-router-dom";

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      info: ''
    }
  }

  render(){
    return(
      <div>
        <Router>
          <HashRouter>
            <Route path="/Video">
              <Video/>
            </Route>
            <Route path="/PeliculaHollywood">
              <PeliculaHollywood/>
            </Route>
            <Route path="/PeliculaAsiatica">
              <PeliculaAsiatica/>
            </Route>
            <Route path="/PeliculaAnime">
              <PeliculaAnime/>
            </Route>
            <Route path="/SerieHollywood">
              <SerieHollywood/>
            </Route>
            <Route path="/SerieAnime">
              <SerieAnime/>
            </Route>
            <Route path="/SerieDorama">
              <SerieDorama/>
            </Route>
            <Route path="/">
              <Main/>
            </Route>
          </HashRouter>
        </Router>
      </div>
    )
  }
}