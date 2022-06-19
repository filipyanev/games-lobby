import { createContext } from 'react';
import { Game } from '../constants/games';
import { Player } from '../constants/player';

export interface ICtxValues {
  isLoading: boolean;
  player?: Player;
  games: Game[];
}

export interface ICtxProviderValues {
  values: ICtxValues;
  change: (key: string, value: boolean | Game[] | Player) => void;
}

export const defaultValues: ICtxValues = {
  isLoading: true,
  player: undefined,
  games: [],
};

const defaultCtx: ICtxProviderValues = {
  values: defaultValues,
  change: () => {},
};

const Ctx = createContext<ICtxProviderValues>(defaultCtx);

export default Ctx;
