/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from 'react';
import './App.css';
import Layout from './components/layout';
import { Game } from './constants/games';
import { Player } from './constants/player';
import Ctx, { defaultValues, ICtxProviderValues } from './utils.ts/context';

function App() {
  const [player, setPlayer] = useState<Player | undefined>(
    defaultValues.player,
  );
  const [games, setGames] = useState<Game[]>(defaultValues.games);
  const [isLoading, setLoadingState] = useState<boolean>(true);

  function handleChangeValues(itemKey: string, value: any) {
    switch (itemKey) {
      case 'player':
        setPlayer(value);
        break;
      case 'games':
        setGames(value);
        break;
      case 'isLoading':
        setLoadingState(value);
        break;
      default:
        break;
    }
  }

  return (
    <div className="App">
      <Ctx.Provider
        value={
          {
            values: { player, games },
            change: handleChangeValues,
          } as ICtxProviderValues
        }
      >
        <Layout />
      </Ctx.Provider>
    </div>
  );
}

export default App;
