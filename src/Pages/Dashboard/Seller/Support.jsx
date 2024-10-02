import { useState } from 'react';

const Support = () => {
  // Fake data for FAQs and tutorials
  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "To reset your password, click on 'Forgot Password' on the login page and follow the instructions.",
    },
    {
      question: "How can I contact customer support?",
      answer: "You can contact customer support via the 'Contact Us' form or by emailing support@example.com.",
    },
    {
      question: "Where can I find tutorials?",
      answer: "Tutorials are available in the 'Help Center' section of our website.",
    },
  ];

  const tutorials = [
    {
      title: "Getting Started",
      link: "#",
    },
    {
      title: "How to Make a Purchase",
      link: "#",
    },
    {
      title: "Managing Your Account",
      link: "#",
    },
  ];

  // State for contact form
  const [contact, setContact] = useState({ name: '', email: '', message: '' });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send the contact data to the server)
    console.log("Contact Form Submitted:", contact);
    // Reset form
    setContact({ name: '', email: '', message: '' });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Support</h1>

      {/* FAQs Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="p-4 border border-gray-300 rounded-lg">
              <h3 className="font-semibold">{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tutorials Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Tutorials</h2>
        <ul className="list-disc pl-5 space-y-2">
          {tutorials.map((tutorial, index) => (
            <li key={index}>
              <a href={tutorial.link} className="text-blue-500 hover:underline">{tutorial.title}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact Support Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Contact Support</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Name:</label>
            <input 
              type="text" 
              name="name" 
              value={contact.name}
              onChange={handleInputChange}
              required 
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div>
            <label className="block mb-1">Email:</label>
            <input 
              type="email" 
              name="email" 
              value={contact.email}
              onChange={handleInputChange}
              required 
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div>
            <label className="block mb-1">Message:</label>
            <textarea 
              name="message" 
              value={contact.message}
              onChange={handleInputChange}
              required 
              className="border border-gray-300 rounded-lg p-2 w-full" 
              rows="4"
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Support;
