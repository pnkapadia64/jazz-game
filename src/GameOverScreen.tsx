import { useAccount } from "jazz-react";

interface Props {
  score: number;
  onStartGame: () => void;
}

const GameOverScreen: React.FC<Props> = ({ score, onStartGame }) => {
  const { me } = useAccount({ profile: {}, root: {} });

  return (
    <div className="text-center">
      <div className="text-blue-500 text-3xl mt-16">Game Over!</div>

      <div className="text-xl my-4">"Oops! Wrong Answer"</div>
      <div className="text-2xl my-4">Score: {score}</div>

      <button
        className="flex items-center justify-center w-48 h-20 text-black text-2xl border-4 border-yellow-500 rounded-full cursor-pointer my-16 shadow-none mx-auto"
        onClick={onStartGame}
      >
        Play again
      </button>

      <div className="text-xl my-4">
        <p>Your High Score: {me?.root.highScore}</p>
      </div>
    </div>
  );
};

export default GameOverScreen;
