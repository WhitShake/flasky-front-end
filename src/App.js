import { useState } from 'react';
import './App.css';
import CatList from './components/CatList';

const DATA = [
  {
    id: 1,
    name: "Ubik",
    caretaker: "Maria",
    color:"grey",
    personality: "wild child",
    petCount: 0,
  },
  {
    id: 2,
    name: "Fred",
    caretaker: "Whitney",
    color: "White and Black",
    personality: "cantankerous",
    petCount: 4,
  },
  {
    id: 3,
    name: "Binx",
    caretaker: "Susan",
    color: "tuxedo",
    personality: "feral",
    petCount: 2,
  },
];

function App() {

  const [catData, setCatData] = useState(DATA);

  // This id comes from the id passed in <button onClick={() => props.onPetCat(props.id)}>
  // in Cat.js which corresponds to the button clicked on the rendered page
  // each button is tied to one cat and the button that's clicked determines
  // which id is passed to the onClick function!! :D
  const petCat = (id) => {
    // calling setCatData will trigger the re-render
    setCatData(() => catData.map((cat) => {
      if (cat.id === id) {
        // ... cat makes a copy of the cat object that matches the id
        // cat.petCount + 1 updates the number of pets
        return { ... cat, petCount: cat.petCount + 1};
      } else {
        return cat;
      }
    }));
  };

  // reduce - 
  const calcTotalPets = (catData) => {
    let initial_val = 0;
    return catData.reduce((total, cat) => {
      return total + cat.petCount;
    }, initial_val);
  }

  const totalPetTally = calcTotalPets(catData);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Flasky</h1> 
        <h2>Total Number of Pets Across all Kitties: {totalPetTally}</h2>
      </header>
      <main>
        <CatList 
        catData={catData}
        onPetCat={petCat}
        />
      </main>
    </div>
  );
}

export default App;
