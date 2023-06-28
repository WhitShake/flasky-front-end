import React from "react";
import Cat from "./Cat";
import PropTypes from 'prop-types';

                /*({props})*/
const CatList = ({ catData, onPetCat }) => {
    // defining the function VVV
    const getCatListJSX = (cats) => { /*cats is a variable for catData, so calling cats is the same as calling catData */
        // VV basically "for cat in cats" aka for cat in catDATA list of objects, stored in App
        return cats.map((cat) => {
            // returns an instance of all the info for each cat
            return (
                // Passes each cat instance to Cat component
                <Cat 
                    id={cat.id}
                    name={cat.name}
                    caretaker={cat.caretaker}
                    color={cat.color}
                    personality={cat.personality}
                    key={cat.id}
                    petCount = {cat.petCount}
                    onPetCat={onPetCat}
                />
            );
        });
    };
    return (
        <div>
            <h2>Cat List Size: {catData.length}</h2>
            {/* Calling the function getCatListJSX(cats) - cats is the parameter, catData is the arg */}
            <ul>{getCatListJSX(catData)}</ul>
        </div>
    );
};

CatList.propTypes = {
    catData: PropTypes.arrayOf(
        PropTypes.shape(
            {
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            caretaker: PropTypes.string.isRequired,
            color: PropTypes.string.isRequired,
            personality: PropTypes.string.isRequired,
            petCount: PropTypes.number.isRequired,
            }
        )
    ).isRequired,
    onPetCat: PropTypes.func.isRequired,
};

export default CatList; 