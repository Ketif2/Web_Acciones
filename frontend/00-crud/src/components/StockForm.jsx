import React, { useState } from 'react';
import './CSS/StockForm.css';

const StockForm = ({ onAddStock }) => {
  const [formData, setFormData] = useState({
    name: '',
    saleDate: '',
    price: '',
    cantidad: '',
    costo: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación de datos aquí, si es necesario
    // Luego, llama a la función para agregar la acción de stock
    onAddStock(formData);
    // Limpiar el formulario después de enviar
    setFormData({
      name: '',
      saleDate: '',
      price: '',
      cantidad: '',
      costo: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
      </label>
      <label>
        Fecha de Compra:
        <input type="date" name="saleDate" value={formData.saleDate} onChange={handleInputChange} />
      </label>
      <label>
        Precio:
        <input type="number" name="price" value={formData.price} onChange={handleInputChange} />
      </label>
      <label>
        Cantidad:
        <input type="number" name="cantidad" value={formData.cantidad} onChange={handleInputChange} />
      </label>
      <label>
        Costo:
        <input type="number" name="costo" value={formData.costo} onChange={handleInputChange} />
      </label>
      <button type="submit">Agregar</button>
    </form>
  );
};

export default StockForm;

