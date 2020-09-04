import React from 'react';

class Carousel extends React.Component {
  state = {
    photos: [], // An array of all the currently available images as strings
    active: 0 // The current image we are showing
  };

  // Photos are going to be passed in from the parent (the Details page) into the Carousel.
  // Will be a large object with lots of photos of different sizes (small, medium, large, and full),
  // so we want to weed out just the sizes we need.
  // Use this special React method getDerivedStateFromProps(), which *must* be static.
  // Will take in a set of properties, does some filtering on them, and passes a new set of
  // state to the component. So the component will never see 'media'. It's gonna use 'photos'
  // which is kept in state object. So use this if you have any sort of derived state.
  static getDerivedStateFromProps({media}) {
    let photos = ['http://placecorgi.com/600/600']; // Default if no photos available
    if (media.length) {
      photos = media.map(({large}) => large); // Otherwise grab the large photo
    }
    // Return whatever object we want to be returned into the state
    return {photos};
  }

  // Whenever you are passing functions down into children, or, whenever you're doing event listeners,
  // use an arrow function. Otherwise, you have to handle 'this' very carefully (must bind the correct
  // 'this' to your function).
  handleIndexClick = (event) => {
    this.setState({
      active: +event.target.dataset.index // coerce to number
    });
  };

  render() {
    const {photos, active} = this.state;
    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            // eslint-disable-next-line
            <img
              key={photo}
              onClick={this.handleIndexClick}
              // Need this for accessibility: onKeyUp={this.handleIndexClick}
              data-index={index}
              src={photo}
              className={index === active ? 'active' : ''}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
