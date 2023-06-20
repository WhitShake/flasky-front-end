import React from 'react';
import PropTypes from 'prop-types';

const Cat = (props) => {
    return (
        <div>
            <h3>Name: {props.name}</h3>
            <h3>Caretaker: {props.caretaker}</h3>
            <h3>Color: {props.color}</h3>
            <h3>Personality: {props.personality}</h3>
            <button>Add Cat</button>
        </div>
    );
}
/*When creating the propTypes attribute we use camel casing, but when referring to the package below this we us caps*/
Cat.propTypes = {
    name: PropTypes.string.isRequired,
    caretaker: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    personality: PropTypes.string.isRequired,
};

export default Cat;