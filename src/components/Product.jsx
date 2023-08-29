import React from 'react';


const productDetails = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <button>Add to Cart</button>
    </div>
  );
};

const ProductsHomePage = () => {
  const products = [
    {
      name: 'Product 1',
      image: 'product1.jpg',
      description: 'Description for Product 1',
      price: ,
    },
    {
      name: 'Product 2',
      image: 'product2.jpg',
      description: 'Description for Product 2',
      price: ,
    },
    {
      name: 'Product 3',
      image: 'product2.jpg',
      description: 'Description for Product 2',
      price: ,
    },
    {
      name: 'Product 4',
      image: 'product2.jpg',
      description: 'Description for Product 2',
      price: ,
    },
    {
      name: 'Product 5',
      image: 'product2.jpg',
      description: 'Description for Product 2',
      price: ,
    },
    {
      name: 'Product 6',
      image: 'product2.jpg',
      description: 'Description for Product 2',
      price: ,
    },
    {
      name: 'Product 7',
      image: 'product2.jpg',
      description: 'Description for Product 2',
      price: ,
    },
    {
      name: 'Product 8',
      image: 'product2.jpg',
      description: 'Description for Product 2',
      price: ,
    },
    {
      name: 'Product 9',
      image: 'product2.jpg',
      description: 'Description for Product 2',
      price: ,
    },
    {
      name: 'Product 10',
      image: 'product2.jpg',
      description: 'Description for Product 2',
      price: ,
    },
    //add more products
  ];

  return (
    <div className="products-homepage">
      <h1>Welcome to Our Products</h1>
      <div className="product-list">
        {products.map((product, index) => (
          <productDetails key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsHomePage;
