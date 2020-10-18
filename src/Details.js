import React from 'react';
import pet from '@frontendmasters/pet';
import {navigate} from '@reach/router';
import Modal from './Modal';
import Carousel from './Carousel';
import ErrorBoundary from './ErrorBoundary';
import ThemeContext from './ThemeContext';

// Class components. Can't use hooks with classes. useState will not function inside a class component.
class Details extends React.Component {
  /*
  // Set up the loading state
  constructor(props) {
    // Odd ritual that you have to do. Properties are passed in, and then you have to hand these
    // properties back up to React so React can keep track of them. So call the constructor on my
    // parent class which is React.Component.
    super(props);

    this.state = {
      loading: true
    };
  }
  */

  // With class properties (aka class fields) you can do this:
  state = {
    loading: true,
    showModal: false
  };

  // Similar to useEffect. Called after the first rendering is completed, but doesn't run again after that.
  componentDidMount() {
    // Should use an arrow function so that 'this' is what you expect. If you use a regular anonymous
    // function() {} then 'this' will be the global object, so you'd need to do self = this; first.
    pet.animal(this.props.id).then(({animal}) => {
      // This is a shallow merge. Override at the top level only.
      // e.g. Object.assign(oldState, newState)
      this.setState({
        url: animal.url,
        name: animal.name,
        animal: animal.type,
        location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
        description: animal.description,
        media: animal.photos,
        breed: animal.breeds.primary,
        loading: false
      });
    }, console.error);
  }

  // Toggle whether the modal is shown or not
  toggleModal = () => this.setState({showModal: !this.state.showModal});

  // Function to adopt the pet
  adopt = () => navigate(this.state.url); // Could have used a <Redirect />

  // Must have a render method
  render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>;
    }

    const {
      animal,
      breed,
      location,
      description,
      name,
      media,
      showModal
    } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          {/* Inside of Consumer we are provided a function. theme (destructured) is passed as an
          argument. Keep in mind that any function that returns markup is a React component. So
          we're just creating a smaller React component inside of the theme consumer which is
          reading that off of the context. */}
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                style={{backgroundColor: theme}}
                onClick={this.toggleModal}>
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {name}?</h1>
                <div className="buttons">
                  <button onClick={this.adopt}>Yes</button>
                  <button onClick={this.toggleModal}>No, I am a monster</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

// We can pass props through down to Details using the spread operator.
// Only do this when we don't care what is happening. Remember the whole
// point of React is that it forces you to be specific and verbose. But
// in this case ErrorBoundary doesn't care about every little thing in
// props, so the spread operator is a good choice here.

export default function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
