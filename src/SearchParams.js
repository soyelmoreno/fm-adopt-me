import React, {useState, useEffect, useContext} from 'react';
import pet, {ANIMALS} from '@frontendmasters/pet';
import useDropdown from './useDropdown';
import Results from './Results';
import ThemeContext from './ThemeContext';

// Render function. Will be run a bunch of times. Every time you
// interact with application. So make sure they don't have side effects.
const SearchParams = () => {
  /* These are hooks. All hooks begin with "use".
    Returns an array that you destructure.
    First variable holds current state.
    Second holds updater function.
    Pass in the initial/default value.*/
  /* Hooks never go inside conditional branch statements. Why? Because hooks
    keep track of order that you set things. So if called out of order,
    everything gets messed up.*/
  /* Need to install a new client library to make requests against an API. Cool
    trick that Parcel can do for you. If you import from a module that you
    haven't yet installed, Parcel will just go find it on the npm registry and
    install it for you (and it goes in package.json > "dependencies"). */
  const [location, setLocation] = useState('Seattle, WA');
  const [breeds, setBreeds] = useState([]);
  // Now let's use a custom hook.
  const [animal, AnimalDropdown] = useDropdown('Animal', 'dog', ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown('Breed', '', breeds);
  const [pets, setPets] = useState([]);
  const [theme, setTheme] = useContext(ThemeContext);

  // An async function is a function that is guaranteed to return a promise
  // that will resolve whenever the function completes. Here, we ignore it.
  // The "await" keyword is the new superpower: wait here, in this function,
  // until pet.animals() completes (which returns a promise also) and then
  // give me back the data. Rather than pet.animals().then().
  async function requestPets() {
    const {animals} = await pet.animals({
      location,
      breed,
      type: animal
    });

    setPets(animals || []);
  }

  // How to handle asynchronous code inside of React

  // useEffect is gonna take place of several life cycle hooks.
  // Disconnected from rendering. Schedules a function to run after the render happens
  // Render the first time, schedule useEffect to run, but then render before
  // anything inside useEffect runs. This mean you don't slowdown that first render,
  // so the user sees something immediately.
  // Second argument is an array of things that this depends on, i.e., only run
  // the function if these things change. Set to empty array to have it run only once.
  useEffect(() => {
    // Initialize
    setBreeds([]);
    setBreed(''); // Coming from useDropdown. Set breed back to default.
    // Go get breeds and populate the dropdowns
    pet.breeds(animal).then(({breeds: apiBreeds}) => {
      const breedStrings = apiBreeds.map(({name}) => name);
      setBreeds(breedStrings);
    }, console.error);
  }, [animal, setBreed, setBreeds]);

  return (
    <div className="search-params">
      <h1>{location}</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}>
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <label htmlFor="theme">
          Theme
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}>
            <option value="peru">Peru</option>
            <option value="darkblue">Dark Blue</option>
            <option value="mediumorchid">Medium Orchid</option>
            <option value="chartreuse">Chartreuse</option>
          </select>
        </label>
        <button style={{backgroundColor: theme}}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
