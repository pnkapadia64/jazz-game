import React, { useState } from "react";
import { Game } from "./Game";
import { GAME_STATUS, LEADERBOARD_ID } from "./constants";
import DefaultScreen from "./DefaultGameScreen";
import GameOverScreen from "./GameOverScreen";
import { Leaderboard } from "./schema";
import TopScores from "./TopScores";
import { useCoState } from "jazz-react";
import { ID } from "jazz-tools";

interface Props {}

const GAME_COMPONENT_MAP = {
  [GAME_STATUS.DEFAULT]: DefaultScreen,
  [GAME_STATUS.ONGOING]: Game,
  [GAME_STATUS.OVER]: GameOverScreen,
};

const GamePlayer: React.FC<Props> = ({}) => {
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.DEFAULT);
  const [score, setScore] = useState(0);

  const leaderboard: Leaderboard | undefined = useCoState(
    Leaderboard,
    LEADERBOARD_ID as ID<Leaderboard>,
    []
  );
  //   const [leaderboard] = useState(createLeaderboard());
  const GameComponent = GAME_COMPONENT_MAP[gameStatus];

  const onAddHighestScore = (hs: number) => {
    if (leaderboard) {
      leaderboard.push(hs);
    }
  };
  const onStartGame = () => {
    setGameStatus(GAME_STATUS.ONGOING);
    setScore(0);
  };
  const onGameOver = () => setGameStatus(GAME_STATUS.OVER);
  return (
    <>
      <GameComponent
        score={score}
        onOver={onGameOver}
        onStartGame={onStartGame}
        onUpdateScore={setScore}
        onAddHighestScore={onAddHighestScore}
      />
      <TopScores leaderboard={leaderboard} />
    </>
  );
};

export default GamePlayer;
