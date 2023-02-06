// import { Form } from 'react-bootstrap'
// this is a valid and straightforward way of importing Form from react-bootstrap
import Form from 'react-bootstrap/Form'
// this import also prevents the whole react-bootstrap library to be added to
// this component

const MovieDropdown = ({ movieTitleProp, changeMovieTitleProp }) => {
  return (
    <Form.Group className="mt-3">
      <Form.Label>Select your Superhero!</Form.Label>
      <Form.Control
        as="select"
        value={movieTitleProp}
        onChange={(e) => changeMovieTitleProp(e.target.value)}
      >
        <option>Iron Man</option>
        <option>The Hulk</option>
        <option>Black Widow</option>
        <option>Doctor Strange</option>
        <option>Captain America</option>
      </Form.Control>
    </Form.Group>
  )
}

export default MovieDropdown
