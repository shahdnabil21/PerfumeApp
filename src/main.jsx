import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'flowbite';
import 'animate.css';
import App from './App.jsx'
import { CartProvider } from './components/Context/CartContext.jsx';

createRoot(document.getElementById('root')).render(
  <CartProvider>
    <App />
  </CartProvider>
  
)
