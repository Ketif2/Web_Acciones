import React from "react";
import StockDetail from "./StockDetail";

const StockList = ({ stocks }) => {
  const [selectedStock, setSelectedStock] = React.useState(null);
  const handleStockClick = (stock) => {
    setSelectedStock(stock);
  }
  const handleCloseModal = () => {
    setSelectedStock(null);
  };
  return (
    <div className="stock-list stock-table-container">
      <table className="stock-table table-striped" >
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
              <td className="td-main" onClick={()=> handleStockClick(stock)}>
                {stock.name}
              </td>
              <td>{stock.saleDate}</td>
              <td>{stock.price}</td>
              <td>{stock.cantidad}</td>
              <td>{stock.costo}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedStock && (
        <div className="modal-overlay">
          <div className="modal">
            <StockDetail stock={selectedStock} />
            <button onClick={handleCloseModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockList;
