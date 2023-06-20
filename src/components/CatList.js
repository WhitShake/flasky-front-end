import React from "react";
import Cat from "./Cat";
import PropTypes from 'prop-types';
                /*({props})*/
const CatList = ({ catData }) => {
    const getCatListJSX = (cats) => { /*cats is a variable for catData, so calling cats is the same as calling catData */
        return cats.map((cat, i) => {
            return (
            <Cat 
                name={cat.name}
                caretaker={cat.caretaker}
                color={cat.color}
                personality={cat.personality}
                key={i}
            />
        );
        });
    };
    return (
        <div>
            <h2>Cat List Size: {catData.length}</h2>
            <ul>{getCatListJSX(catData)}</ul>
        </div>
    );
};

CatList.propTypes = {
    catData: PropTypes.arrayOf(
        PropTypes.shape(
            {
            name: PropTypes.string.isRequired,
            caretaker: PropTypes.string.isRequired,
            color: PropTypes.string.isRequired,
            personality: PropTypes.string.isRequired
            }
        )
    ).isRequired,
};

export default CatList;