import React, { useEffect, useState } from 'react';
import './CSS/StockForm.css';

const StockForm = ({ isOpen, onClose, onAddStock , datosIniciales}) => {
  const [formData, setFormData] = useState({
    name: '',
    formattedSaleDate: '',
    price: '',
    cantidad: '',
    costo: '',
  });
  useEffect(() => {
    if (datosIniciales) {
      setFormData(datosIniciales);
    }
  }, [datosIniciales]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Enviar los datos al componente padre (App.jsx)
    onAddStock(formData);
    // Cerrar el modal
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className='modal-overlay'>
          <div className='modal-detail'>
            <span className='close' onClick={onClose}>&times;</span>
            <h2>Accion</h2>
            <form onSubmit={handleFormSubmit}>
              <label>
                Nombre:
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
              </label>
              <label>
                Fecha de Compra:
                <input type="date" name="formattedSaleDate" value={formData.formattedSaleDate} onChange={handleInputChange} />
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
              <div className='detail-button-container'>
                <button type="submit">Agregar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default StockForm;
