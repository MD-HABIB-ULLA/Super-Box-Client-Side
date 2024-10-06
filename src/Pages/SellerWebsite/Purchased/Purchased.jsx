import React from "react";

// Placeholder image URL for products (fake image)
const placeholderProductImage =
  "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80D";

// Component for each product item
const ProductItem = ({ product }) => {
  const handleCancel = () => {
    alert(`Cancelling product: ${product.productId}`);
  };

  return (
    <div className="border rounded-lg p-4 shadow-lg  flex flex-col justify-between bg-white items-center mb-4">
      <img
        src={placeholderProductImage}
        alt={product.productId}
        className="w-44  object-cover rounded-md"
      />
      <div className="ml-4 flex-1">
        <h3 className="text-lg font-semibold">
          Product ID: {product.productId}
        </h3>
        <p>Shop Name: {product.shopName}</p>
        <p>Price: ${product.productPrice.toFixed(2)}</p>
        <p>
          Transaction Time: {new Date(product.transactionTime).toLocaleString()}
        </p>
        <p>Status: {product.isReceived ? "Received" : "Pending"}</p>
      </div>
    </div>
  );
};

// Main component for product purchase history
const Purchased = () => {
  const productPurchases = [
    {
      productId: "PROD123456",
      shopName: "WorkOut",
      sellerEmail: "seller1@gmail.com",
      transactionId: "TXN987654321",
      transactionTime: "2024-10-03T14:25:30Z",
      isReceived: false,
      productPrice: 299.99,
    },
    {
      productId: "PROD789101",
      shopName: "WorkOut",
      sellerEmail: "seller1@gmail.com",
      transactionId: "TXN123456789",
      transactionTime: "2024-10-03T15:10:45Z",
      isReceived: false,
      productPrice: 149.99,
    },
    {
      productId: "PROD112233",
      shopName: "WorkOut",
      sellerEmail: "seller1@gmail.com",
      transactionId: "TXN987654322",
      transactionTime: "2024-10-03T16:05:00Z",
      isReceived: false,
      productPrice: 199.99,
    },
    {
      productId: "PROD445566",
      shopName: "WorkOut",
      sellerEmail: "seller1@gmail.com",
      transactionId: "TXN123456788",
      transactionTime: "2024-10-03T17:20:15Z",
      isReceived: false,
      productPrice: 99.99,
    },
    {
      productId: "PROD778899",
      shopName: "WorkOut",
      sellerEmail: "seller1@gmail.com",
      transactionId: "TXN987654323",
      transactionTime: "2024-10-03T18:45:25Z",
      isReceived: false,
      productPrice: 249.99,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 ">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-6">Product Purchase History</h1>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {productPurchases.map((product) => (
          <ProductItem key={product.productId} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Purchased;
