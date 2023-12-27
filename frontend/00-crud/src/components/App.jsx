import React from 'react';
import StockList from './StockList';
import stocks from '../data/acciones.json'; 
import 'bootstrap/dist/css/bootstrap.min.css';

export function App() {
  
  return (
    <div className="app">
    <h1>Compra de Acciones</h1>
    <StockList stocks={stocks} />
  </div>
  );
}
