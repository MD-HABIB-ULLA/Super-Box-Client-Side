import React from 'react';
import { CheckIcon } from 'lucide-react';

const tiers = [
  {
    name: 'Starter',
    price: 29,
    description: 'Perfect for small businesses just starting out.',
    features: [
      'Secure Payments & Business Verification',
      'Basic Website Creation',
      'Single Delivery Option',
      'Simple Invoicing',
      'Basic Order Management',
      'Monthly Sales Report',
    ],
  },
  {
    name: 'Growth',
    price: 79,
    description: 'Ideal for businesses looking to expand their online presence.',
    features: [
      'All Starter features, plus:',
      'Advanced Website Creation with customization',
      'Multiple Delivery Options',
      'Automated Invoicing & Basic Sales Tracking',
      'Enhanced Order and Booking Management',
      'Weekly Business Insights',
    ],
  },
  {
    name: 'Enterprise',
    price: 199,
    description: 'For established businesses seeking comprehensive solutions.',
    features: [
      'All Growth features, plus:',
      'Premium Website with E-commerce Integration',
      'Advanced Delivery and Logistics Integration',
      'Comprehensive Invoicing & Real-time Sales Tracking',
      'Advanced Order and Booking Management',
      'Detailed Reporting & Business Insights',
    ],
  },
];

const PricingSection= () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Pricing</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
            Choose the right plan for your business
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Whether you're just starting out or looking to scale, we have a plan that fits your needs.
          </p>
        </div>

        <div className="mt-20 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
          {tiers.map((tier) => (
            <div key={tier.name} className="relative p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">{tier.name}</h3>
                {tier.name === 'Growth' && (
                  <p className="absolute top-0 py-1.5 px-4 bg-indigo-500 text-white text-sm font-semibold rounded-full transform -translate-y-1/2">
                    Most Popular
                  </p>
                )}
                <p className="mt-4 flex items-baseline text-gray-900">
                  <span className="text-5xl font-extrabold tracking-tight">{tier.price}tk</span>
                  <span className="ml-1 text-xl font-semibold">/month</span>
                </p>
                <p className="mt-6 text-gray-500">{tier.description}</p>

                <ul role="list" className="mt-6 space-y-6">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex">
                      <CheckIcon className="flex-shrink-0 w-6 h-6 text-indigo-500" aria-hidden="true" />
                      <span className="ml-3 text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#"
                className={`mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium ${
                  tier.name === 'Growth'
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                }`}
              >
                {tier.name === 'Enterprise' ? 'Contact Sales' : 'Get started'}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;