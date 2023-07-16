import { useState, useEffect } from 'react';
import './App.css';
import CatList from './components/CatList';
import NewCatForm from './components/NewCatForm';
import axios from "axios";

// const DATA = [
//   {
//     id: 1,
//     name: "Ubik",
//     caretaker: "Maria",
//     color:"grey",
//     personality: "wild child",
//     petCount: 0,
//   },
//   {
//     id: 2,
//     name: "Fred",
//     caretaker: "Whitney",
//     color: "White and Black",
//     personality: "cantankerous",
//     petCount: 0,
//   },
//   {
//     id: 3,
//     name: "Binx",
//     caretaker: "Susan",
//     color: "tuxedo",
//     personality: "feral",
//     petCount: 0,
//   },
// ];

const kBaseUrl = "http://127.0.0.1:8000";

// This function returns all the data, including the list of cats
// This makes it possible for other helper functions to pull out different parts from this return value
// For example we might want a list of all the personalities only, we could write a helper function to access that part of this returned data
const getAllCats = () => {
  return axios
    .get(`${kBaseUrl}/cats`)
    .then((response) => {
      console.log(response.data);
      // Changing original return statement to add .map and calling the convertFromApi function
      // within it to repackage the pet_count variable to camelcase to be appropriate for JS
      // return response.data;
      return response.data.map(convertFromApi);
    })
    .catch((error) => {
      console.log(error);
    });
};

const petCatApi = (id) => {
  return axios
    .patch(`${kBaseUrl}/cats/${id}/pet`)
    .then((response) => {
      return convertFromApi(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};


// Add caretaker back in to each of these consts when I add it back to cat and catlist
// This is repackaging pet_count as camelcase petCount
const convertFromApi = (apiCat) => {
  const { id, name, color, personality, pet_count } = apiCat;
  const newCat = { id, name, color, personality, petCount: pet_count };
  return newCat;
};

const App = () => {
  const [catData, setCatData] = useState([]);

  // This function accesses the list of cats from the data returned by getAllCats and sets it as the catData state
  // It's done in two steps like this to maintain single responsibility
  const calcTotalPets = (catData) => {
    let initial_val = 0;
    return catData.reduce((total, cat) => {
      return total + cat.petCount;
    }, initial_val);
  };

  const totalPetTally = calcTotalPets(catData);  
  
  const fetchCats = () => {
    getAllCats().then((cats) => {
      console.log(cats);
      setCatData(cats);
    });
  };

  useEffect(() => {
    fetchCats();
  }, []);


  const onHandleSubmit = (data) => {
    axios.post(`${kBaseUrl}/cats`, data)
      .then((response) => {
        setCatData((prevCats) => [convertFromApi(response.data), ...prevCats]);
      })
      .catch((e) => console.log(e));
  };
  // const onHandleSubmit = (data) => {
  //   axios.post(`${kBaseUrl}/cats`, data)
  //     .then((response) => {
  //       setCatData((prevCats) => [convertFromApi(response.data), ...prevCats]);
  //     })
  //     .catch((e) => console.log(e));
  // };

  const updateCat = (id) => {
    petCatApi(id)
      .then((updatedCat) => {
        setCatData((oldData) => {
          return oldData.map((cat) => {
            if (cat.id === id) {
              return updatedCat;
            }
            return cat;
          });
        });
      });
    };

  // This id comes from the id passed in <button onClick={() => props.onPetCat(props.id)}>
  // in Cat.js which corresponds to the button clicked on the rendered page
  // each button is tied to one cat and the button that's clicked determines
  // which id is passed to the onClick function!! :D
  // const petCat = (id) => {
  //   // calling setCatData will trigger the re-render
  //   setCatData(() => catData.map((cat) => {
  //     if (cat.id === id) {
  //       // ... cat makes a copy of the cat object that matches the id
  //       // cat.petCount + 1 updates the number of pets
  //       return { ...cat, petCount: cat.petCount + 1};
  //     } else {
  //       return cat;
  //     }
  //   }));
  // };

  // reduce - 

  return (
    <div className="App">
      <header className="App-header">
        <h1>Flasky</h1> 
        <h2>Total Number of Pets Across all Kitties: {totalPetTally}</h2>
      </header>
      <main>
        <NewCatForm
          onHandleSubmit={onHandleSubmit}
        />
        <CatList 
        catData={catData}
        // onPetCat={petCat}
        petCat={updateCat}
        />
      </main>
    </div>
  );
}

export default App;
