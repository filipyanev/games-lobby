import { useContext } from 'react';
import { GameType, Game } from '../../constants/games';
import Ctx from '../../utils.ts/context';
import ContentWrapper from '../contentWrapper';
import { getLiveGamesSortOrder, toggleGameLounch } from '../../utils.ts/games';
import SectionHeader from '../sectionHeader';
import GameCard from '../gameCard';
import styles from './index.module.css';

function LiveGames() {
  const ctx = useContext(Ctx);

  const liveGames = ctx.values.games.filter(
    (g: Game) =>
      g.gameType !== GameType.SlotV1 && g.gameType !== GameType.SlotV2,
  );

  const sortOrder = getLiveGamesSortOrder();

  const groupedAndSortedGames = Object.entries(
    liveGames.reduce((group: { [key: number]: Game[] }, game) => {
      const { gameType } = game;
      // eslint-disable-next-line no-param-reassign
      group[gameType] = group[gameType] ?? [];
      group[gameType].push(game);
      return group;
    }, {}),
  ).sort(
    (a, b) =>
      sortOrder.findIndex(e => e === GameType[parseInt(a[0], 10)]) -
      sortOrder.findIndex(e => e === GameType[parseInt(b[0], 10)]),
  );

  return (
    <div>
      {liveGames.length > 1 && (
        <>
          {groupedAndSortedGames.map((value: [string, Game[]]) => (
            <>
              <SectionHeader
                key={`game_type_${value[0]}`}
                title={GameType[value[0] as keyof typeof GameType]
                  .toString()
                  .replace(/([A-Z])/g, ' $1')}
              />

              {/* games */}
              <ContentWrapper>
                <div className={styles['card-wrapper']}>
                  {value[1].map((game: Game) => (
                    <GameCard
                      game={game}
                      gameType="live"
                      onClick={() => toggleGameLounch(game)}
                      key={`game_type_${value[0]}_${game.name}`}
                    />
                  ))}
                </div>
              </ContentWrapper>
            </>
          ))}
        </>
      )}
    </div>
  );
}

export default LiveGames;
