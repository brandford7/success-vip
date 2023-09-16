import React from "react";

const mockPredictions = [
  {
    _id: "1",
    game: "Match 1",
    competition: "League A",
    odd: "2.0",
    tip: "Home Win",
    result: "Pending",
    isVIP: false,
  },
  {
    _id: "2",
    game: "Match 2",
    competition: "League B",
    odd: "1.5",
    tip: "Draw",
    result: "Pending",
    isVIP: true,
  },
  {
    _id: "3",
    game: "Match 3",
    competition: "League C",
    odd: "3.0",
    tip: "Away Win",
    result: "Pending",
    isVIP: false,
  },
];

function Prediction() {
  // Filter predictions where isVIP is false
  const filteredPredictions = mockPredictions.filter(
    (prediction) => !prediction.isVIP
  );

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Free Predictions</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200 text-left">Competition</th>
              <th className="py-2 px-4 bg-gray-200 text-left">Game</th>
              <th className="py-2 px-4 bg-gray-200 text-left">Odd</th>
              <th className="py-2 px-4 bg-gray-200 text-left">Tip</th>
              <th className="py-2 px-4 bg-gray-200 text-left">Result</th>
            </tr>
          </thead>
          <tbody>
            {filteredPredictions.map((prediction) => (
              <tr key={prediction._id} className="hover:bg-gray-100">
                <td className="py-2 px-4">{prediction.competition}</td>
                <td className="py-2 px-4">{prediction.game}</td>
                <td className="py-2 px-4">{prediction.odd}</td>
                <td className="py-2 px-4">{prediction.tip}</td>
                <td className="py-2 px-4">{prediction.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Prediction;
