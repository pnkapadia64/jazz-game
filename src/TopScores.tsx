import React from "react";
import _sortBy from "lodash/sortBy";
import { Leaderboard } from "./schema";
import { useCoState } from "jazz-react";

interface Props {
  leaderboard: Leaderboard;
}

const TopScores: React.FC<Props> = ({ leaderboard }) => {
  const scores = useCoState(Leaderboard, leaderboard?.id, []);
  const sortedScores = _sortBy(scores || [], "value").reverse();
  console.log(`-- top-`, top);

  return (
    <div className="w-full max-w-sm mx-auto mt-2 p-4 bg-white rounded-lg shadow-md border border-gray-300">
      <h2 className="text-xl text-center text-yellow-500 font-semibold mb-3">
        Leaderboard
      </h2>
      <div className="divide-y divide-gray-300">
        {Object.values(sortedScores).map((score, i) => (
          <div
            key={score?.by?.profile?.name || i}
            className="flex justify-between items-center px-3 py-2"
          >
            <span className="text-md text-gray-600">{i + 1}</span>
            <span className="text-md text-gray-600">
              {score.by?.profile?.name || "Anonymous"}
            </span>
            <span className="text-lg font-medium text-gray-800">
              {score.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopScores;
