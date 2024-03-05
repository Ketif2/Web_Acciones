import React, { useState } from "react";
import { createPortal } from 'react-dom';
import StockDetail from "./StockDetail.jsx";

const StockList = ({ stocks }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  
  const openmodal = (selectSk) => {
    setSelectedStock(selectSk);
    setIsOpen(true)
  };
  
  const closemodal = () => setIsOpen(false);

  return (
    <div className="stock-list stock-table-container">
      <table className="stock-table table-striped">
        <thead>
          <tr>
            <th>Nombre de la acción</th>
            <th>Fecha de Compra</th>
            <th>Precio de compra por acción</th>
            <th>Cantidad de acciones</th>
            <th>Costo total por Compra</th>
            <th>Cambio</th> 
            <th>Ganancia/Pérdida</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock, index) => (
            <tr key={index}>
              <td>
                <button onClick={()=> openmodal(stock)}>
                  {stock.name}
                </button>
              </td>
              <td> {stock.formattedSaleDate} </td>
              <td>$ {stock.price} </td>
              <td> {stock.cantidad} </td>
              <td> $ {stock.costo} </td>
              <td>{typeof stock.change === 'number' ? `${stock.change.toFixed(2)}%` : 'N/A'}</td>
              <td>{typeof stock.gainLoss === 'number' ? `$${stock.gainLoss.toFixed(2)}` : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isOpen && (
          <StockDetail isOpen={isOpen} onClose={closemodal} stock={selectedStock}> </StockDetail>
      )}
          
    </div>
    
  );
};

export default StockList;