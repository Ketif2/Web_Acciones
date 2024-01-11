import React, { useEffect, useState } from 'react';
import StockList from './StockList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/StockList.css';
import StockForm from './StockForm';
import './CSS/app.css';

const NAVIGATION_EVENT = 'pushstate';

function navigate(href) {
  window.history.pushState({}, '', href);
  const navEvent = new Event(NAVIGATION_EVENT);
  window.dispatchEvent(navEvent);
}

function App() {
  const [route, setRoute] = useState(window.location.pathname);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [stocks, setStocks] = useState([]);

  const openModal = (selectedStock) => {
    setSelectedStock(selectedStock);
    setIsOpen(true);
  };

  useEffect(() => {
    const onLocationChange = () => {
      setRoute(window.location.pathname);
    };

    window.addEventListener(NAVIGATION_EVENT, onLocationChange);

    return () => {
      window.removeEventListener(NAVIGATION_EVENT, onLocationChange);
    };
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/actions')
      .then((response) => {
        if (!response.ok) {
          throw new Error('La red no está funcionando correctamente');
        }
        return response.json();
      })
      .then((data) => setStocks(data))
      .catch((error) => console.error('Error en el Fetching', error));
  }, []);

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedStock(null);
  };

  const addActions = () => {
    return <StockForm />;
  };
 const handleAddStock = (formData) => {
    fetch('http://localhost:3000/actions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Actualizar la interfaz después de agregar la acción de stock
        console.log('Stock agregado:', data);
        setStocks([...stocks, data]); // Actualizar el estado con los nuevos datos
        window.location.reload();
        setIsOpen(false); // Cerrar el formulario modal
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const home = () => {
    return (
      <div className="app">
        <h1 className='titleCenter'>Mis Acciones</h1>
        <br />
        <div className="detail-button-container">
          <button onClick={() => openModal(selectedStock)}>
            Agregar Acción
          </button>
          {isOpen && <StockForm isOpen={isOpen} onClose={handleCloseModal} onAddStock={handleAddStock}/>}
        </div>
        <StockList stocks={stocks} />
      </div>
    );
  };

  return (
    <main>
      {route === '/' && home()}
      {route === '/add' && addActions()}
    </main>
  );
}

export default App;
