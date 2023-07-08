import React from 'react';
import PropTypes from 'prop-types';
// Takes the instances passed from CatList and puts them in html elements to be rendered
const Cat = (props) => {
    // const [petCount, setPetCount] = useState(0);
    // const increasePets = () => {
    //     setPetCount((petCount) => petCount + 1);
    // };

    // handler for our button
    const petCatWithId = (id) => {
        props.petCat(props.id);
    }
    
    return (
        <li>
            <h3>Name: {props.name}</h3>
            <h3>Id: {props.id}</h3>
            {/* <h3>Caretaker: {props.caretaker}</h3> */}
            <h3>Color: {props.color}</h3>
            <h3>Personality: {props.personality}</h3>
            <h3>Pet Count: {props.petCount}</h3>
            {/* Anon function V makes the function wait until button is clicked to run 
            function. Otherwise function runs for all cats at page load */}
            {/* <button onClick={() => props.onPetCat(props.id)}>Pet Cat</button> */}
            <button onClick={petCatWithId}>Pet Cat</button>
        </li>
    );
};

/*When creating the propTypes attribute we use camel casing (propTypes), but when referring to the package below this we use caps*/
// Returns something to us when there's missing data, tells us what's expected
Cat.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    // caretaker: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    personality: PropTypes.string.isRequired,
    petCount: PropTypes.number.isRequired,
    // onPetCat: PropTypes.func.isRequired,
    petCat: PropTypes.func.isRequired
};

export default Cat; 