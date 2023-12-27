import React from 'react';

const StockDetail = ({ stock }) => {
  if (!stock) {
    return <div>No se ha seleccionado ninguna acción</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Detalles de la Acción</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{stock.name}</h5>
          <p className="card-text">Símbolo: {stock.symbol}</p>
          <p className="card-text">Fecha de Venta: {stock.saleDate}</p>
          <p className="card-text">Precio por Acción: {stock.price}</p>
          <p className="card-text">Cantidad: {stock.quantity}</p>
          <p className="card-text">Costo Total: {stock.totalCost}</p>
          {/* Otros detalles de la acción */}
        </div>
      </div>
    </div>
  );
};

export default StockDetail;