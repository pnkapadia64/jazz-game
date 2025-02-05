import { useAccount } from "jazz-react";
import { Logo } from "./Logo.tsx";
import { Game } from "./Game.tsx";
import GamePlayer from "./GamePlayer.tsx";

function App() {
  const { me, logOut } = useAccount({ profile: {}, root: {} });

  return (
    <>
      <header>
        <nav className="container flex justify-between items-center py-3">
          <span>
            You're logged in as <strong>{me?.profile?.name}</strong>
          </span>
          <button
            className="bg-stone-100 py-1.5 px-3 text-sm rounded-md"
            onClick={() => logOut()}
          >
            Log out
          </button>
        </nav>
      </header>
      <main className="container mt-16 flex flex-col gap-8">
        <Logo />
        <GamePlayer />
      </main>
    </>
  );
}

export default App;
