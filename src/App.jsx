import React, { useState, useEffect } from 'react';
import Modal from './Modal';

const storageKey = '_my_recipes';
const starterRecipes = [
  {
    name: "Chocolate Cake",
    ingredients: ["2 cups flour", "1 cup sugar", "1 cup cocoa powder", "2 eggs", "1 cup milk"],
    directions: [
      "Preheat oven to 350°F (175°C).",
      "Mix dry ingredients together.",
      "Add eggs and milk; stir until smooth.",
      "Pour into greased pan and bake 30-35 min."
    ]
  },
  {
    name: "Guacamole",
    ingredients: ["2 avocados", "1 lime", "1/2 onion", "Salt", "Cilantro"],
    directions: [
      "Mash avocados in a bowl.",
      "Add lime juice and chopped onion.",
      "Mix in salt and cilantro to taste."
    ]
  },
  {
    name: "Pancakes",
    ingredients: ["1 cup flour", "1 cup milk", "1 egg", "2 tbsp sugar", "1 tsp baking powder"],
    directions: [
      "Mix all ingredients until smooth.",
      "Heat pan and pour batter to form pancakes.",
      "Cook until bubbles appear, flip and cook other side."
    ]
  },
  {
    name: "Caprese Salad",
    ingredients: ["Tomatoes", "Mozzarella cheese", "Basil leaves", "Olive oil", "Salt & pepper"],
    directions: [
      "Slice tomatoes and mozzarella.",
      "Layer on plate with basil leaves.",
      "Drizzle with olive oil, season with salt & pepper."
    ]
  }
];

export default function App() {
  const [recipes, setRecipes] = useState(() => {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    return saved && saved.length ? saved : starterRecipes;
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(null);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(recipes));
  }, [recipes]);

  function addRecipe(data) {
    setRecipes([...recipes, data]);
    setSelectedIndex(recipes.length);
  }

  function editRecipe(data) {
    const updated = [...recipes];
    updated[selectedIndex] = data;
    setRecipes(updated);
  }

  function deleteRecipe() {
    if (!window.confirm('Delete this recipe?')) return;
    const updated = recipes.filter((_, idx) => idx !== selectedIndex);
    setRecipes(updated);
    setSelectedIndex(0);
  }

  return (
    <div>
      <h1>My Recipe Box</h1>
      <div className="app-container">
        <div className="recipe-list">
          <h2>Recipes</h2>
          {recipes.map((r, idx) => (
            <div
              key={idx}
              className="recipe-card-name"
              style={{ background: idx === selectedIndex ? '#ffe4e1' : 'transparent' }}
              onClick={() => setSelectedIndex(idx)}
            >
              {r.name}
            </div>
          ))}
          <button className="add" onClick={() => { setShowModal(true); setEditMode(null); }}>
            <i className="fa fa-plus"></i> Add
          </button>
        </div>
        <div className="recipe-details">
          {recipes[selectedIndex] ? (
            <>
              <h2>{recipes[selectedIndex].name}</h2>
              <h3>Ingredients:</h3>
              <ul>{recipes[selectedIndex].ingredients.map((ing, i) => <li key={i}>{ing}</li>)}</ul>
              <h3>Directions:</h3>
              <ol>{recipes[selectedIndex].directions.map((dir, i) => <li key={i}>{dir}</li>)}</ol>
              <button className="edit" onClick={() => { setShowModal(true); setEditMode(recipes[selectedIndex]); }}>
                <i className="fa fa-pencil-alt"></i> Edit
              </button>
              <button className="delete" onClick={deleteRecipe}>
                <i className="fa fa-trash"></i> Delete
              </button>
            </>
          ) : <p>No recipe selected</p>}
        </div>
      </div>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={editMode ? editRecipe : addRecipe}
        initial={editMode}
      />
    </div>
  );
}
