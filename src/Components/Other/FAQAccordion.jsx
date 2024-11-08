import React from 'react';

export default function FAQAccordion() {
  const faqs = [
    {
      question: "Why Do I Need This Platform?",
      answer: (
        <>
          <p>
            Running a business—whether online, offline, or both—comes with its share of challenges. Our platform is designed to simplify your operations, boost efficiency, and support your business growth.
          </p>
          <ul className="list-disc ml-6 mt-2">
            <li>Manage all your operations in one place.</li>
            <li>Secure payments and build customer trust.</li>
            <li>Automate sales tracking, delivery management, and more.</li>
          </ul>
        </>
      ),
    },
    {
      question: "What Services Does This Platform Offer?",
      answer: (
        <>
          <p>We provide a complete solution for businesses looking to expand digitally or optimize operations in the real world:</p>
          <ul className="list-disc ml-6 mt-2">
            <li><strong>Secure Payments & Business Verification:</strong> Fraud protection and verification for customer trust.</li>
            <li><strong>Website Creation:</strong> Build a professional website for showcasing products/services.</li>
            <li><strong>Delivery & Logistics Integration:</strong> Choose multiple delivery options for seamless logistics.</li>
            <li><strong>Invoicing & Sales Tracking:</strong> Automate invoicing and real-time sales tracking.</li>
            <li><strong>Order & Booking Management:</strong> Efficiently handle customer orders/bookings.</li>
            <li><strong>Reporting & Business Insights:</strong> Access data on sales, customer activity, and performance.</li>
          </ul>
        </>
      ),
    },
    {
      question: "How Does It Work?",
      answer: (
        <ol className="list-decimal ml-6 mt-2">
          <li>Create an account and set up your business profile.</li>
          <li>Set up your website or service listings for an online presence.</li>
          <li>Manage orders, payments, inventory, and deliveries all in one place.</li>
          <li>Track your performance and optimize for growth.</li>
        </ol>
      ),
    },
    {
      question: "What Are the Upcoming Features in the Lite Package?",
      answer: (
        <ul className="list-disc ml-6 mt-2">
          <li><strong>Personalized Invoice Design:</strong> Reflect your brand identity in your invoices.</li>
          <li><strong>Advanced POS & Stock Management:</strong> Manage inventory and sales both online and in-store.</li>
          <li><strong>Advanced Analysis:</strong> Gain deeper insights into your business data.</li>
          <li><strong>Business Growth Support:</strong> Access consulting, marketing advice, and customer service tools.</li>
        </ul>
      ),
    },
    {
      question: "Why Should I Join Now?",
      answer: (
        <>
          <p>
            Join our exclusive beta launch to secure a 70% discount for the first 10 businesses, gain early access to the platform, and receive free access to the Lite Package when it launches, as well as exclusive discounts on the Pro Pack.
          </p>
        </>
      ),
    },
    {
      question: "What Are Users Saying?",
      answer: (
        <blockquote className="text-gray-600 italic border-l-4 border-indigo-500 pl-4">
          “Managing my business operations has never been easier. From handling payments to managing deliveries, this platform has simplified everything, allowing me to focus on growing my business.” – Aisha, Retail Business Owner
        </blockquote>
      ),
    },
  ];

  return (
    <section className="py-20">
       <div className="text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">FAQ</h2>
          <p className="mt-2 pb-10 text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
          Frequently Asked Questions
          </p>
        
        </div>
      <div className="max-w-4xl mx-auto">
       
        {faqs.map((faq, index) => (
          <div key={index} className="collapse collapse-plus bg-indigo-200/15 mb-4">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">{faq.question}</div>
            <div className="collapse-content text-gray-700">{faq.answer}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
