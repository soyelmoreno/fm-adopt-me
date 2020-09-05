// This is mostly code from reactjs.org/docs/error-boundaries.html
// This is an advanced React use case, you may never need to use it.

import React, {Component} from 'react';
import {Link, Redirect} from '@reach/router';

// ErrorBoundary cannot be done with hooks. Need class components.
// React doc: "Error boundaries are React components that catch JavaScript errors anywhere in their
// child component tree, log those errors, and display a fallback UI instead of the component tree
// that crashed. Error boundaries catch errors during rendering, in lifecycle methods, and in
// constructors of the whole tree below them. For example, if API has malformed data, or there is
// some error in any child component, we can catch them and handle the error.
// We are gonna wrap Details in this thing, so if there is an error from the
// API then the application does not crash.
class ErrorBoundary extends Component {
  state = {hasError: false, redirect: false};

  // To become an error boundary, a class component must define either `static getDerivedStateFromError()`
  // or `componentDidCatch()` or both. Use static getDerivedStateFromError() to render a fallback UI
  // after an error has been thrown. Use componentDidCatch() to log error information.

  // This is a special React method. Gets called whenever there is an error inside of it.
  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return {hasError: true};
  }

  // This is also a special React lifecycle method.
  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service. Here, we'll just log it out.
    console.error('ErrorBoundary caught an error', error, info);
  }

  // Another React lifecycle method. Will be run every time after the component gets new
  // state or new props.
  componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => this.setState({redirect: true}), 5000);
    }
  }

  // Error boundaries work like a JavaScript catch {} block, but for components.
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    if (this.state.hasError) {
      return (
        <h1>
          There was an error with this listing. <Link to="/">Click here</Link>{' '}
          to go back to the home page or wait five seconds.
        </h1>
      );
    }

    // If no error, just pass through all the stuff that is coming through.
    return this.props.children; // children is whatever is contained inside the component
  }
}

export default ErrorBoundary;
