import React, { useEffect, useState } from "react";
import { Game } from "./Game";
import { GAME_STATUS } from "./constants";
import DefaultScreen from "./DefaultGameScreen";
import GameOverScreen from "./GameOverScreen";
import { createLeaderboard, JazzGame, Leaderboard } from "./schema";
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
  const leaderboard: Leaderboard | undefined = useCoState(
    Leaderboard,
    "co_zJSsJ8TdyxG9kZLajxRDQ6M5zWd" as ID<Leaderboard>,
    []
  );
  // Leaderboard id = co_zJSsJ8TdyxG9kZLajxRDQ6M5zWd
  //   const [leaderboard] = useState(createLeaderboard());
  const GameComponent = GAME_COMPONENT_MAP[gameStatus];

  //   useEffect(() => {
  //     const game = JazzGame.create({ highestScore: 0 });
  //     // leaderboard = createLeaderboard();
  //   }, []);

  const addHighestScore = (hs: number) => {
    if (leaderboard) {
      leaderboard.push(hs);
      console.log(`== adding highest=`, hs, leaderboard);
    }
  };

  const onStartGame = () => setGameStatus(GAME_STATUS.ONGOING);
  const onGameOver = () => setGameStatus(GAME_STATUS.OVER);
  return (
    <>
      <GameComponent
        onOver={onGameOver}
        onStartGame={onStartGame}
        addHighestScore={addHighestScore}
      />
      <TopScores leaderboard={leaderboard} />
    </>
  );
};

export default GamePlayer;
