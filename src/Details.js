import React from 'react';
import pet from '@frontendmasters/pet';

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

  state = {loading: true};

  // Similar to useEffect. Called after the first rendering is completed, but doesn't run again after that.
  componentDidMount() {
    // Should use an arrow function so that 'this' is what you expect. If you use a regular anonymous
    // function() {} then 'this' will be the global object, so you'd need to do self = this; first.
    pet.animal(this.props.id).then(({animal}) => {
      // This is a shallow merge. Override at the top level only.
      // e.g. Object.assign(oldState, newState)
      this.setState({
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

  // Must have a render method
  render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>;
    }

    const {animal, breed, location, description, name} = this.state;

    return (
      <div className="details">
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <button>Adopt {name}</button>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default Details;
