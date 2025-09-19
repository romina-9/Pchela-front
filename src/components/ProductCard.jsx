import React from 'react';

export default function ProductCard({ product }) {
  return (
    <div className="border rounded shadow p-4 flex flex-col items-center">
      <img src={product.image} alt={product.name} className="w-32 h-32 object-cover mb-2"/>
      <h2 className="font-bold text-lg">{product.name}</h2>
      <p className="text-gray-700">${product.price}</p>
      <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Comprar
      </button>
    </div>
  );
}
