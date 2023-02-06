// MovieCard will be a Class Component as well
// because we need a state object to store the data from OMBDapi

// CHAIN OF EVENTS
// 1) first render() invocation, LOADING appears...
// 2) componentDidMount() gets invoked
// 3) componentDidMount() fetches the data, sets the state with it
// 4) because a setState happened, render() fires AGAIN
// 5) the LOADING message is removed from the DOM, the Card appears...!
// 6) a selection of a new movie from the dropdown makes MovieCard receive a new prop
// 7) a change in the movieTitle prop will trigger componentDidUpdate, just like
// every setState does!
// 8) componentDidUpdate listens JUST for a change in the movieTitle prop thanks
// to the if statement using its arguments, prevProps (the previous props object)
// and prevState (the previous state object, which we're not using here)
// 9) the if statement in componentDidUpdate takes care of fetching new data
// every time a new movie is selected, paying attention at NOT fetching data
// after the function's setState, which is also triggering an update!

import { Component } from 'react'
import { Card } from 'react-bootstrap'

class MovieCard extends Component {
  state = {
    // this state object will hold the data coming from OMBD Api
    movieInfo: null, // eventually movieInfo will become an object
  }

  componentDidMount = () => {
    // this is going to be automatically called AFTER the initial render()
    // invocation!
    this.fetchMovieData()
  }

  fetchMovieData = async () => {
    // let's make the network call for retrieving the movie poster, data etc.
    // http://www.omdbapi.com/?apikey=24ad60e9&s= <-- this gives us back an array of results
    try {
      let response = await fetch(
        'http://www.omdbapi.com/?apikey=24ad60e9&s=' + this.props.movieTitle
      )
      // response now it the Response object from our fetch call!
      // response can have an "ok" property true/false
      if (response.ok) {
        // "ok" can be true/false
        // let's convert the body of this response into something useful
        let searchResults = await response.json()
        console.log('RESULTS OBJECT', searchResults)
        let arrayOfResults = searchResults.Search
        console.log('RESULTS ARRAY', arrayOfResults)
        // let's take the first element of this array to fill our card!
        this.setState({
          movieInfo: arrayOfResults[0], // <-- the first object in the array!
        })
      } else {
        // error came
        console.log('error fetching the array of results')
      }
    } catch (error) {
      console.log('generic error', error)
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    // what is componentDidUpdate?
    // it's a lifecycle method taking care of the UPDATING PHASE of the component
    // it will get invoked AGAIN every time there's a change in the state or in the props
    console.log('MOVIECARD COMPONENT UPDATED!')
    console.log('PREVIOUS PROPS', prevProps)
    console.log('CURRENT PROPS', this.props)
    // componentDidUpdate DOESN'T fire initially

    // what do we want?
    // we'd like to get a new invocation of this.fetchMovieData() when the title changes!
    // so, when the PROPS do change

    // we also need though to NOT invoke this.fetchMovieData() when the STATE does change
    // with componentDidUpdate we have much more CONTROL on WHAT got the update!

    // this control comes from the 2 arguments of componentDidUpdate:
    // prevProps <-- an object with the content of the props an istante before the update
    // prevState <-- an object with the content of the state an istante before the update

    if (prevProps.movieTitle !== this.props.movieTitle) {
      console.log('THE UPDATE WAS BECAUSE OF A NEW MOVIE TITLE!')
      this.fetchMovieData()
      // after this we'll get a setState!
    }

    // EVERY componentDidUpdate you'll write in your life NEEDS a condition!
    // otherwise you're entering an infinite loop :( or you don't need
    // componentDidUpdate at all!
  }

  render() {
    // this.fetchMovieData()
    // render() gets invoked every time there's a change in the STATE or in the PROPS
    // we'd like to get a new fetchMovieData() when the props change! :)
    // we also DON'T WANT to re call fetchMovieData() when the STATE changes :(

    return (
      <>
        {this.state.movieInfo ? (
          <Card>
            <Card.Img variant="top" src={this.state.movieInfo.Poster} />
            <Card.Body>
              <Card.Title>{this.state.movieInfo.Title}</Card.Title>
              <Card.Text>
                {this.state.movieInfo.Year} - {this.state.movieInfo.imdbID}
              </Card.Text>
            </Card.Body>
          </Card>
        ) : (
          <div className="text-light">LOADING...</div>
        )}
      </>
    )
  }
}

export default MovieCard
