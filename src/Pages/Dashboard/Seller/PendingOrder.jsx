import React, { useState } from 'react';

const PendingOrder = () => {
  const [products, setProducts] = useState([
    {
      "productId": "PROD123456",
      "shopName": "WorkOut",
      "sellerEmail": "seller1@gmail.com",
      "transactionId": "TXN987654321",
      "transactionTime": "2024-10-03T14:25:30Z",
      "isReceived": false,
      "productPrice": 299.99
    },
    {
      "productId": "PROD789101",
      "shopName": "WorkOut",
      "sellerEmail": "seller1@gmail.com",
      "transactionId": "TXN123456789",
      "transactionTime": "2024-10-03T15:10:45Z",
      "isReceived": false,
      "productPrice": 149.99
    },
    {
      "productId": "PROD112233",
      "shopName": "WorkOut",
      "sellerEmail": "seller1@gmail.com",
      "transactionId": "TXN987654322",
      "transactionTime": "2024-10-03T16:05:00Z",
      "isReceived": false,
      "productPrice": 199.99
    },
    {
      "productId": "PROD445566",
      "shopName": "WorkOut",
      "sellerEmail": "seller1@gmail.com",
      "transactionId": "TXN123456788",
      "transactionTime": "2024-10-03T17:20:15Z",
      "isReceived": false,
      "productPrice": 99.99
    },
    {
      "productId": "PROD778899",
      "shopName": "WorkOut",
      "sellerEmail": "seller1@gmail.com",
      "transactionId": "TXN987654323",
      "transactionTime": "2024-10-03T18:45:25Z",
      "isReceived": false,
      "productPrice": 249.99
    }
  ]);

  const handleSendProduct = (productId) => {
    setProducts(products.map(product => 
      product.productId === productId ? {...product, isReceived: true} : product
    ));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">WorkOut Products</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Product ID</th>
              <th className="px-4 py-2 text-left">Transaction ID</th>
              <th className="px-4 py-2 text-left">Transaction Time</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.productId} className="border-t border-gray-300">
                <td className="px-4 py-2">{product.productId}</td>
                <td className="px-4 py-2">{product.transactionId}</td>
                <td className="px-4 py-2">{new Date(product.transactionTime).toLocaleString()}</td>
                <td className="px-4 py-2">${product.productPrice.toFixed(2)}</td>
                <td className="px-4 py-2">{product.isReceived ? 'Received' : 'Pending'}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleSendProduct(product.productId)}
                    className={`px-4 py-2 rounded ${
                      product.isReceived
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                    disabled={product.isReceived}
                  >
                    {product.isReceived ? 'Sent' : 'Send Product'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingOrder;