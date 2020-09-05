import React, {useEffect, useRef} from 'react';
import {createPortal} from 'react-dom';

const Modal = ({children}) => {
  // We're gonna create an element for the modal. But when we close the modal,
  // we need to destroy the modal's markup. But we want to always refer to the
  // same element across renders, rather than creating a new element every
  // single time.
  const elRef = useRef(null);
  if (!elRef.current) {
    const div = document.createElement('div');
    elRef.current = div;
  }

  // useEffect has a special feature: if you return a function, it is the
  // "clean-up" function. It will run this when it unmounts. Similar to
  // componentWillUnmount from hooks.
  useEffect(() => {
    const modalRoot = document.getElementById('modal');
    modalRoot.appendChild(elRef.current);

    // Only gonna run this function when the modalRoot gets closed
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  // Below is the createPortal method from React DOM. Normally, when you return an element from a
  // component's render method, it is mounted into the DOM as a child of the nearest parent node:
  /*
    render() {
      // React mounts a new div and renders the children into it
      return (
        <div>
          {this.props.children}
        </div>
      );
    }
  */

  // But when you return createPortal(), React does *not* create a new div as a child of the nearest
  // parent node. Instead it renders the children into `domNode`. `domNode` is any valid DOM node,
  // regardless of its location in the DOM. And you still have access to functions, properties, and
  // events from this React component
  /*
  render() {
    return ReactDOM.createPortal(
      this.props.children,
      domNode
    );
  }
  */

  return createPortal(<div>{children}</div>, elRef.current);
};

// Remember to trap focus inside the modal for accessibilty. Google "how to trap
// focus inside a modal".

export default Modal;
