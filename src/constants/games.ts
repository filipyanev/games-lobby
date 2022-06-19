/* eslint-disable no-shadow */
export enum GameType {
  SlotV1 = 0,
  Roulette,
  Blackjack,
  UnlimitedBlackjackSP,
  UnlimitedBlackjackMP,
  AndarBahar,
  Baccarat,
  DragonTiger,
  TeenPatti,
  TeenPattiFaceOff,
  SlotV2,
}

export enum GameCategory {
  Slots = 0,
  Live,
  Dealer,
  Cards,
}

export enum SlotGameTag {
  FreeSpins = 0,
  BonusGame,
  ScatterPays,
  Gamble,
  Mysteries,
  Wild,
  Fruits,
}

export type GameThumbnail = {
  width: number;
  height: number;
  imageUrl?: string;
  videoUrl: string;
};

export type GameSlotData = {
  reelsCount: number;
  rowsCount: number;
  linesCount: number;
  tags: Array<number>;
};

export type GameLiveData = {
  dealerName: string;
  lastResults: Array<number>;
  playersCount: number;
};

export type Game = {
  categories: Array<number>;
  clientUrl: string;
  gameType: number;
  hostUrl: string;
  isFeatured: boolean;
  name: string;
  slotData: GameSlotData;
  liveData: GameLiveData;
  thumbnails: Array<GameThumbnail>;
  token: string;
  betData: {
    min: number;
    max: number;
  };
};

export const availableNumberOfLinesRanges = [
  {
    min: 5,
    max: 9,
  },
  {
    min: 10,
    max: 29,
  },
  {
    min: 30,
    max: 49,
  },
  {
    min: 50,
    max: null,
  },
];

export const availableGameFeatures = Object.keys(SlotGameTag)
  .map((key: any) => SlotGameTag[key])
  .filter(value => typeof value === 'string') as string[];

export type GameMajorTypes = 'slots' | 'live';
