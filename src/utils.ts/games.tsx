import { operatorToken, playerToken } from '../constants/api';
import {
  Game,
  GameCategory,
  GameMajorTypes,
  SlotGameTag,
} from '../constants/games';

const DEFAULT_LIVE_GAMES_SORT_ORDER = [
  'Roulette',
  'Blackjack',
  'UnlimitedBlackjackSP',
  'UnlimitedBlackjackMP',
  'AndarBahar',
  'TeenPatti',
  'TeenPattiFaceOff',
  'Baccarat',
  'DragonTiger',
];

// eslint-disable-next-line import/prefer-default-export
export const getGamesFeatures = (
  game: Game,
  gameType: GameMajorTypes,
  maxFeatureCount?: number,
) => {
  const features: string[] = [];
  if (gameType === 'slots') {
    game.slotData.tags.forEach((tag: number) => {
      features.push(
        Object.keys(SlotGameTag)[
          Object.values(SlotGameTag).indexOf(tag)
        ].replace(/([A-Z])/g, ' $1'),
      );
    });
  } else if (gameType === 'live') {
    features.push(` Limits $ ${game.betData.min}-$ ${game.betData.max}`);

    if (game.categories) {
      game.categories.forEach(c => {
        features.push(GameCategory[c]);
      });
    }
  }

  return features.slice(0, maxFeatureCount);
};

export const toggleGameLounch = (game: Game) => {
  window.open(
    `${game.clientUrl}?gameToken=${game.token}&operatorToken=${operatorToken}&playerToken=${playerToken}&host=${game.hostUrl}`,
    '_blank',
  );
};

export const renderFeature = (gameFeature: string) => {
  const splitFeature = gameFeature.split(' ');

  const feature = (
    <>
      {splitFeature.map((w: string, index: number) => {
        if (index === 1)
          return (
            <div
              key={`${gameFeature}_feature_${w}`}
              style={{ color: '#93ba32' }}
            >
              {w}&nbsp;
            </div>
          );
        return w;
      })}
    </>
  );

  return feature;
};

export const getfilteredSlots = (
  games: Game[],
  linesRange: { min: number; max: number | null } | undefined,
  features: string[],
) => {
  const filteredGames: Game[] = games;

  let metMax: any = () => true;
  let metRange: any = () => true;
  let hasAllFeatures: any = () => true;

  if (linesRange) {
    metMax = (maxValue: number | null, val: number) => {
      if (!maxValue) return true;
      return val < maxValue;
    };
    metRange = (linesCount: number) =>
      linesCount && linesCount >= linesRange.min;
  }

  if (features.length > 0) {
    const numFeaturesArray = features.map(
      f => SlotGameTag[f as keyof typeof SlotGameTag],
    );

    hasAllFeatures = (featuresTags: number[]) =>
      numFeaturesArray.every(element => featuresTags.includes(element));
  }

  return filteredGames.filter(
    g =>
      metMax(linesRange ? linesRange.max : null, g.slotData.linesCount) &&
      metRange(g.slotData.linesCount) &&
      hasAllFeatures(g.slotData.tags),
  );
};

export const getLiveGamesSortOrder = (): string[] => {
  if (
    process.env.REACT_APP_LIVE_GAMES_GROUP_ORDER &&
    Array.isArray(
      JSON.parse(process.env.REACT_APP_LIVE_GAMES_GROUP_ORDER as string),
    )
  ) {
    return JSON.parse(process.env.REACT_APP_LIVE_GAMES_GROUP_ORDER as string);
  }

  return DEFAULT_LIVE_GAMES_SORT_ORDER;
};
