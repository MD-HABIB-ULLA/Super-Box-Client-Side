import React from "react";

// Sample image for products
const placeholderImage =
  "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80D";

const TransactionItem = ({ transaction }) => {
  const handleCancel = (transactionId) => {
    // Logic for canceling the transaction
    console.log(`Cancel transaction: ${transactionId}`);
  };

  return (
    <div className="border rounded-lg p-4 shadow-lg bg-white flex justify-between items-center mb-4">
      <img
        src={placeholderImage}
        alt="Product"
        className="w-24 h-24 object-cover rounded-md"
      />
      <div className="ml-4 flex-1">
        <h3 className="text-lg font-semibold">{transaction.shopName}</h3>
        <p>Product ID: {transaction.productId}</p>
            <p>Price: ${transaction.productPrice.toFixed(2)}</p>
        <p>
          Transaction Time:{" "}
          {new Date(transaction.transactionTime).toLocaleString()}
        </p>
        <p>Status: {transaction.isReceived ? "Received" : "Not Received"}</p>
      </div>
      <button
        onClick={() => handleCancel(transaction.transactionId)}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
      >
        Cancel
      </button>
    </div>
  );
};

const PendingProducts = () => {
  const transactions = [
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
    <div className="max-w-4xl mx-auto p-6 ">
      <h1 className="text-2xl font-bold mb-6">Your Transactions</h1>
      {transactions.map((transaction) => (
        <TransactionItem
          key={transaction.transactionId}
          transaction={transaction}
        />
      ))}
    </div>
  );
};

export default PendingProducts;
