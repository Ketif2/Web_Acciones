import React from 'react';
import './CSS/StockList.css';

const StockList = ({ stocks }) => {
  return (
    <div class='stock-list stock-table-container'>
      <table className="stock-table">
        <thead>
          <tr>
            <th>Nombre de la acción</th>
            <th>Fecha de Compra</th>
            <th>Precio de compra por acción</th>
            <th>Cantidad de acciones</th>
            <th>Costo total por Compra</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock, index) => (
            <tr key={index}>
              <td>{stock.name}</td>
              <td>{stock.saleDate}</td>
              <td>{stock.price}</td>
              <td>{stock.cantidad}</td>
              <td>{stock.costo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockList;
