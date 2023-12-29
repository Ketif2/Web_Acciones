import React from 'react';
import './CSS/StockDetail.css';

const StockDetail = ({ stock, isOpen, onClose }) => {
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
            <p><strong>Fecha de Compra:</strong> {stock.saleDate}</p>
            <p><strong>Precio:</strong> $ {stock.price}</p>
            <p><strong>Cantidad:</strong> {stock.cantidad}</p>
            <p><strong>Costo:</strong> $ {stock.costo}</p>
          </div>
          <div className='detail-button-container'> 
            <button>
              Editar
            </button>
            <button >
              Eliminar
            </button>
          </div>
          </div>
        </div>
      )}
    </>
  );
};
export default StockDetail;