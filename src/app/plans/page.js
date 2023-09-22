import React from "react";

const VipPlans = () => {
  const vipPlans = [
    {
      name: "VIP Plan 1",
      price: "$19.99/month",
      features: ["Feature 1", "Feature 2", "Feature 3"],
    },
    {
      name: "VIP Plan 2",
      price: "$29.99/month",
      features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
    },
    {
      name: "VIP Plan 3",
      price: "$39.99/month",
      features: [
        "Feature 1",
        "Feature 2",
        "Feature 3",
        "Feature 4",
        "Feature 5",
      ],
    },
  ];

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-8">VIP Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vipPlans.map((plan, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-4">{plan.name}</h2>
            <p className="text-lg mb-4">{plan.price}</p>
            <ul className="list-disc list-inside">
              {plan.features.map((feature, i) => (
                <li key={i} className="text-base mb-2">
                  {feature}
                </li>
              ))}
            </ul>
            <button className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600">
              Subscribe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VipPlans;
