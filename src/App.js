import React from "react";
import { render } from "react-dom";
import Pet from "./Pet";

// We create a component which is just a function that returns the result
// of React.createElement().
const App = () => {
  return React.createElement(
    "div",
    {
      id: "something-important",
    },
    [
      React.createElement("h1", {}, "Adopt Me!"),
      React.createElement(Pet, {
        name: "Alex",
        animal: "Dog",
        breed: "Golden Lab mix",
      }),
      React.createElement(Pet, {
        name: "Puddin",
        animal: "Cat",
        breed: "Tabby",
      }),
      React.createElement(Pet, {
        name: "Zoe",
        animal: "Dog",
        breed: "Weiner dog",
      }),
    ]
  );
};
// A component is just something that returns markup. A rubber stamp.
// When you call it it creates an element, and you can stamp out as many
// as you want.

// So now let's render this to the DOM
// createElement:
// first: what kind of tag is it. Either takes a composite component that you
// wrote or a string with the tag name of the element you want to create.
// second: all the attributes you want to give the component, the child element. Can omit.
// third: the children. Can be single or an array. Can omit.

// When you say .render() and give it an element, it blows away existing contents,
// replaces it with what you are creating.
render(React.createElement(App), document.getElementById("root"));
