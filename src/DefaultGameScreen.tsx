import React from "react";

interface Props {
  onStartGame: () => void;
}

const DefaultScreen: React.FC<Props> = ({ onStartGame }) => {
  return (
    <div className="my-12 flex flex-col items-center">
      <button
        className="flex items-center justify-center w-48 h-20 text-black text-2xl border-4 border-yellow-500 rounded-full cursor-pointer my-16 shadow-none"
        onClick={onStartGame}
      >
        GO
      </button>

      <div className="text-center">
        <label className="text-yellow-500 text-lg">How To Play?</label>
        <p className="text-base">
          Answer true/false for simple questions at your best speed!
        </p>
      </div>
    </div>
  );
};

export default DefaultScreen;
