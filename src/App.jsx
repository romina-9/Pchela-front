import React from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';

const products = [
  { id: 1, name: "Producto 1", price: 100, image: "https://via.placeholder.com/150" },
  { id: 2, name: "Producto 2", price: 150, image: "https://via.placeholder.com/150" },
  { id: 3, name: "Producto 3", price: 200, image: "https://via.placeholder.com/150" },
];

function App() {
  return (
    <div>
      <Navbar />
      <main className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </main>
    </div>
  );
}

export default App;
