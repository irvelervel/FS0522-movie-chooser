import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Component } from 'react'
import MovieCard from './components/MovieCard'
import { Col, Container, Row } from 'react-bootstrap'
import MovieDropdown from './components/MovieDropdown'

class App extends Component {
  state = {
    movieTitle: 'Iron Man',
  }

  changeMovieTitle = (newSelectOption) => {
    this.setState({
      movieTitle: newSelectOption,
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* we still need MovieDropdown to get access to movieTitle from the state
          both in read access and for changing its value */}
          <MovieDropdown
            // this is for reading the value from the state
            movieTitleProp={this.state.movieTitle}
            // this is for changing the value in the state
            changeMovieTitleProp={this.changeMovieTitle}
          />
          {/* MovieCard will go here! */}
          <Container>
            <Row className="justify-content-center mt-3">
              <Col xs={12} md={6} className="text-dark">
                <MovieCard movieTitle={this.state.movieTitle} />
                {/* MovieCard gets from App.js the value of movieTitle
                from the state object in any given moment */}
              </Col>
            </Row>
          </Container>
        </header>
      </div>
    )
  }
}

export default App
