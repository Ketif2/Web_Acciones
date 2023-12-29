import React , {useEffect, useState} from 'react';
import StockList from './StockList';
import stocks from '../data/acciones.json'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/StockList.css';
import StockForm from './StockForm';
const NAVITAGION_EVENT = 'pushstate';

function navigate (href){
  window.history.pushState({}, '', href);
  //crear un evento personalizado para avisar cuando se navegue
  const navEvent = new Event(NAVITAGION_EVENT);
  window.dispatchEvent(navEvent);
}

function addActions(){
  return(
    <StockForm></StockForm>
  )
}

function home(){
  return (
    <div className="app">
    <h1>Mis Acciones</h1>
    <br />
    <div className='detail-button-container'>
      <button onClick={()=>
      navigate('/add')
      }> 
        Agregar Acción
      </button>
    </div>
    <StockList stocks={stocks} />
  </div>
  );
}

export function App() {
  const [route, setRoute] = useState(window.location.pathname);
  useEffect(()=> {
    const onLocationChange = () => {
      setRoute(window.location.pathname);
    }
    window.addEventListener(NAVITAGION_EVENT, onLocationChange);
    return () => {
      window.removeEventListener(NAVITAGION_EVENT, onLocationChange);
    }
  })
  return (
    <main>
      {route === '/' && home()}
      {route === '/add' && addActions()}
    </main>
  );
}
