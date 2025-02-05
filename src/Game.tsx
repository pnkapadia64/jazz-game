import { useState } from "react";
import { GAME_STATUS } from "./constants";
import Equation from "./equation";
import { useAccount, useCoState } from "jazz-react";
import { JazzGame } from "./schema";
import { ID } from "jazz-tools";

interface Props {
  gameStatus: typeof GAME_STATUS;
  onOver: () => void;
  addHighestScore: (hs: number) => void;
}

export const Game: React.FC<Props> = (props) => {
  const [equation, setEquation] = useState(new Equation());
  const [score, setScore] = useState(0);

  //   const [highestScore, setHighestScore] = useState(40);
  const { me } = useAccount({ profile: {}, root: {} });

  const [highestScore, setHighestScore] = useState<ID<JazzGame>>();

  const answeredCorrectly = () => {
    const newscore = score + 1;
    setScore(newscore);
    setEquation(new Equation());
  };

  const answeredIncorrectly = () => {
    props.onOver();
    if (me && score > (me?.root.highScore || 0)) {
      console.log(`= setting hs=`, score);
      me.root.highScore = score;
      props.addHighestScore(score);
    }
  };
  const onTrueClick = () => {
    return equation.isCorrect() ? answeredCorrectly() : answeredIncorrectly();
  };

  const onFalseClick = () => {
    return equation.isCorrect() ? answeredIncorrectly() : answeredCorrectly();
  };

  const renderGameQuestion = () => {
    const { nos, operator, answer } = equation;
    return (
      <div className="w-full h-12 text-center my-4 inline-block">
        <div className="inline-block w-12 text-3xl leading-[3rem] mx-2">
          {nos[0]}
        </div>
        <div className="inline-block w-12 text-3xl leading-[3rem] mx-2">
          {operator.symbol}
        </div>
        <div className="inline-block w-12 text-3xl leading-[3rem] mx-2">
          {nos[1]}
        </div>
        <div className="inline-block w-12 text-3xl leading-[3rem] mx-2">=</div>
        <div className="inline-block w-12 text-3xl leading-[3rem] mx-2 font-bold">
          {answer}
        </div>
      </div>
    );
  };

  return (
    !!me && (
      <div className="my-app__game">
        <div className="my-app__g__wrapper">
          {renderGameQuestion()}
          <div className="flex h-16 w-full items-center justify-center space-x-4">
            <button
              className="flex-1 h-full text-2xl text-beige border-4 border-green-500 rounded-full cursor-pointer"
              onClick={onTrueClick}
            >
              True
            </button>
            <button
              className="flex-1 h-full text-2xl text-beige border-4 border-red-500 rounded-full cursor-pointer"
              onClick={onFalseClick}
            >
              False
            </button>
          </div>
        </div>
        <div className="text-center text-2xl">
          <div className="text-yellow-500 my-8">Score - {score}</div>
          <div className="text-xl mb-2">
            Your High Score - {me.root.highScore}
          </div>
        </div>
      </div>
    )
  );
};
