// components/Prediction.js
import React from "react";

function Prediction({ prediction }) {
  return (
    <div className="prediction">
      <table className="table-auto border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-400 p-2">Competition</th>
            <th className="border border-gray-400 p-2">Game</th>
            <th className="border border-gray-400 p-2">Tip</th>
            <th className="border border-gray-400 p-2">Odd</th>
            <th className="border border-gray-400 p-2">Result</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-400 p-2">
              {prediction?.competition}
            </td>
            <td className="border border-gray-400 p-2">{prediction?.game}</td>
            <td className="border border-gray-400 p-2">{prediction?.tip}</td>
            <td className="border border-gray-400 p-2">{prediction?.odd}</td>
            <td className="border border-gray-400 p-2">{prediction?.result}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Prediction;
