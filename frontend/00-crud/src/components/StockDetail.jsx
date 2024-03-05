import React from 'react';
import './CSS/StockDetail.css';
import StockDelete from './StockDelete';
import StockForm from './StockForm';

const StockDetail = ({ stock, isOpen, onClose }) => {
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const handleEditClick = () => {
    setIsFormOpen(true);
  };
  const handleCloseModal = () => {  
    setIsFormOpen(false);
  };
  const handleUpdateStock = (formData) => {
    fetch(`http://localhost:3000/actions/${formData.id}`, {
      method: 'PUT',
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
        console.log('Stock Actualizado:', data); // Actualizar el estado con los nuevos datos
        window.location.reload();
        setIsOpen(false); // Cerrar el formulario modal
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  
  return (
    <>
      {isOpen && (
        <div className='modal-overlay'>
          <div className='modal-detail'>
            <span className='close' onClick={onClose}>
              &times;
            </span>
            <h2>Detalles de la acción</h2>
          
          <div className="modal-body">
            <p><strong>Nombre:</strong> {stock.name}</p>
            <p><strong>Fecha de Compra:</strong> {stock.formattedSaleDate}</p>
            <p><strong>Precio:</strong> $ {stock.price}</p>
            <p><strong>Cantidad:</strong> {stock.cantidad}</p>
            <p><strong>Costo:</strong> $ {stock.costo}</p>

          </div>
          <div className='detail-button-container'> 
            <button onClick={handleEditClick}>
              Editar
            </button>
            {isOpen && 
            <StockForm 
            isOpen={isFormOpen} 
            onClose={handleCloseModal}
            onAddStock={handleUpdateStock}
            datosIniciales={stock}/>}
            <StockDelete id= {stock.id}/>
          </div>
          </div>
        </div>
      )}
    </>
  );
};
export default StockDetail;