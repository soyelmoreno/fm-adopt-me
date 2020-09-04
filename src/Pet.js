import React from "react";
import { Link } from "@reach/router";

export default function Pet({ name, animal, breed, media, location, id }) {
  let hero = "http://placecorgi.com/300/300";
  if (media.length) {
    hero = media[0].small;
  }

  // In JSX, anything inside curly braces is a Javascript expression
  return (
    <Link to={`/details/${id}`} className="pet">
      <div className="image-container">
        <img src={hero} alt={name} />
      </div>
      <div className="info">
        <h1>{name}</h1>
        {/* Okay but can I just add a comment? Yep. */}
        <h2>{`${animal} - ${breed} - ${location}`}</h2>
      </div>
    </Link>
  );
}
