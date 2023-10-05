import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import DragDropScreen from './components/DragDropScreen/DragDropScreen';
import Header from './components/Header/Header';

function App() {

  const [scale, setScale] = useState<number>(100);

  const handleZoomIn = () => {
    if (scale < 200) {
      setScale(scale + 10);
    }
  };

  const handleZoomOut = () => {
    if (scale > 10) {
      setScale(scale - 10);
    }
  };

  const moveRight = () => {
    const object = document.getElementById('draggableObject');
    if (object) {
      const currentPosition = object.getBoundingClientRect();
      const newPosition = currentPosition.left + 200;
      object.style.left = `${newPosition}px`;
    }
  };

  const moveLeft = () => {
    const object = document.getElementById('draggableObject');
    if (object) {
      const currentPosition = object.getBoundingClientRect();
      const newPosition = currentPosition.left - 200;
      object.style.left = `${newPosition}px`;
    }
  };

  const moveDown = () => {
    const object = document.getElementById('draggableObject');
    if (object) {
      const currentPosition = object.getBoundingClientRect();
      const newPosition = currentPosition.top + 200;
      object.style.top = `${newPosition}px`;
    }
  };

  const moveUp = () => {
    const object = document.getElementById('draggableObject');
    if (object) {
      const currentPosition = object.getBoundingClientRect();
      const newPosition = currentPosition.top - 200;
      object.style.top = `${newPosition}px`;
    }
  };
  return (
    <div className="App">
      <Header onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} scale={scale} setScale={setScale} />
      <div className='container'
      >
        <button onClick={moveRight} className="arrow-right"></button>
        <button onClick={moveLeft} className="arrow-left"></button>
        <button onClick={moveDown} className="arrow-bottom"></button>
        <button onClick={moveUp} className="arrow-top"></button>
        <DragDropScreen scale={scale} />
      </div>
    </div>
  );
}

export default App;
