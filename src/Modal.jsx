// Modal.js
import React from 'react';

export default function Modal({ show, onClose, onSubmit, initial }) {
  const [name, setName] = React.useState(initial?.name || '');
  const [ingredients, setIngredients] = React.useState(
    initial?.ingredients.join('\n') || ''
  );
  const [directions, setDirections] = React.useState(
    initial?.directions.join('\n') || ''
  );

  if (!show) return null;

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      name,
      ingredients: ingredients.split('\n').map(i => i.trim()).filter(Boolean),
      directions: directions.split('\n').map(d => d.trim()).filter(Boolean)
    });
    onClose();
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{initial ? 'Edit Recipe' : 'Add Recipe'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Recipe name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <textarea
            rows="4"
            placeholder="Ingredients (one per line)"
            value={ingredients}
            onChange={e => setIngredients(e.target.value)}
            required
          />
          <textarea
            rows="4"
            placeholder="Directions (one per line)"
            value={directions}
            onChange={e => setDirections(e.target.value)}
            required
          />
          <div className="modal-actions">
            <button type="submit" className="save">Save</button>
            <button type="button" className="cancel" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
