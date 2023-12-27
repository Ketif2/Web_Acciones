import React from 'react';

const StockDetail = ({ stock }) => {
  return (
    <div>
      <h2>Detalle del Stock Seleccionado</h2>
      {stock && (
        <div>
          <p>Nombre: {stock.name}</p>
          <p>Fecha de Compra: {stock.saleDate}</p>
          <p>Precio: {stock.price}</p>
          <p>Cantidad: {stock.cantidad}</p>
          <p>Costo: {stock.costo}</p>
        </div>
      )}
    </div>
  );
};

export default StockDetail;
