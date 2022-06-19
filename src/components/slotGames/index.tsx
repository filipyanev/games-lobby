/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useContext, useState } from 'react';
import Tooltip from 'react-tooltip';
import {
  availableGameFeatures,
  availableNumberOfLinesRanges,
  GameType,
  Game,
  GameThumbnail,
} from '../../constants/games';
import defaultThumbnail from '../../assets/default_thumbnail.png';
import Ctx from '../../utils.ts/context';
import {
  getfilteredSlots,
  getGamesFeatures,
  renderFeature,
  toggleGameLounch,
} from '../../utils.ts/games';
import ContentWrapper from '../contentWrapper';
import styles from './index.module.css';
import SectionHeader from '../sectionHeader';
import GameCard from '../gameCard';

function SlotGames() {
  const [filterCheckedLinesRange, changeLinesRange] = useState<
    { min: number; max: number | null } | undefined
  >(undefined);
  const [filterCheckedGamesFeatures, changeGamesFeatures] = useState<string[]>(
    [],
  );
  const [areFiltersVisble, setFitlerVisibility] = useState<boolean>(false);

  const ctx = useContext(Ctx);

  const groupedFeaturedGames: Array<Array<Game>> = ctx.values.games
    .filter(
      (g: Game) =>
        g.isFeatured &&
        (g.gameType === GameType.SlotV1 || g.gameType === GameType.SlotV2),
    )
    .reduce((result, value, index, array) => {
      if (index % 2 === 0) (result as any).push(array.slice(index, index + 2));
      return result;
    }, []);

  const getThumbnailUrl = (g: Game, useDefaultGameThumbnail?: boolean) => {
    if (useDefaultGameThumbnail) {
      const defaultGameThumbnail = g.thumbnails.find(
        t => t.width === -1 || t.width > t.height,
      );
      if (defaultGameThumbnail) {
        return defaultGameThumbnail.imageUrl;
      }
    }

    const narrowThumbnail = g.thumbnails.find(
      (t: GameThumbnail) => t.width < t.height,
    );
    if (narrowThumbnail) {
      return narrowThumbnail.imageUrl;
    }

    return defaultThumbnail;
  };

  const toggleFilterLines = (
    range: { min: number; max: number | null } | undefined,
  ): void => {
    changeLinesRange(range);
  };

  const toggleFilterGamesFeature = (feature: string, value: boolean) => {
    if (value) {
      changeGamesFeatures([...filterCheckedGamesFeatures, feature]);
    } else {
      changeGamesFeatures([
        ...filterCheckedGamesFeatures.filter(f => f !== feature),
      ]);
    }
  };

  return (
    <div style={{ color: '#fff' }}>
      {groupedFeaturedGames.length > 0 && (
        <>
          <SectionHeader key="Featured games" title="Featured games" />

          <ContentWrapper>
            <div className={styles['featured-card-wrapper']}>
              {groupedFeaturedGames.map((gamesPair: Game[], index: number) => (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={`split-featureed-games-${index}`}
                  className={
                    styles[`${index === 1 ? 'column' : 'row'}-cards-wrapper`]
                  }
                >
                  {gamesPair.map(g => (
                    <div
                      key={g.name}
                      data-tip
                      data-for={`feature_games_tooltip_${g.name}`}
                      style={{
                        width: index === 1 ? '100%' : `50%`,
                      }}
                      className={styles['featured-card']}
                      onClick={() => toggleGameLounch(g)}
                    >
                      <img
                        src={getThumbnailUrl(g, index === 1)}
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null;
                          currentTarget.src = defaultThumbnail;
                        }}
                        alt="playersIcon"
                      />
                      <Tooltip id={`feature_games_tooltip_${g.name}`}>
                        <p>{g.name}</p>
                      </Tooltip>
                      {/* labels */}
                      <div className={styles.labels}>
                        <div className={styles.feature}>
                          <span className={styles['gold-text']}>
                            {g.slotData && g.slotData.linesCount}
                          </span>
                          &nbsp;LINES
                        </div>
                        {getGamesFeatures(g, 'slots').map((f: string) => (
                          <div
                            key={`${g.name}_${f}`}
                            className={styles.feature}
                          >
                            {renderFeature(f)}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </ContentWrapper>

          <SectionHeader
            key="Slots"
            customRender={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <h3>Slots</h3>
                <div
                  className={styles['filter-btn']}
                  onClick={() => setFitlerVisibility(!areFiltersVisble)}
                >
                  Filter
                  <div
                    className={styles['filter-btn-icon']}
                    style={{
                      transform: `rotate(${areFiltersVisble ? '0' : '180'}deg)`,
                    }}
                  >
                    &#94;
                  </div>
                </div>
              </div>
            }
          />

          {/* filters */}
          <div
            className={styles['filters-wrapper']}
            style={{
              height: areFiltersVisble ? '300px' : '0px',
            }}
          >
            <ContentWrapper>
              <div className={styles.filters}>
                <div>
                  <div className={styles['filter-title']}>Lines</div>
                  <div>
                    {availableNumberOfLinesRanges.map(range => (
                      <div
                        key={`range${range.min}-${range.max}`}
                        className={styles['filter-checkbox']}
                      >
                        <input
                          key={range.min.toString()}
                          id={range.min.toString()}
                          type="checkbox"
                          checked={filterCheckedLinesRange?.min === range.min}
                          onChange={val =>
                            toggleFilterLines(
                              val.target.checked ? range : undefined,
                            )
                          }
                        />
                        <label htmlFor={range.min.toString()}>
                          {' '}
                          {range.min}
                          {range.max ? `-${range.max}` : '+'}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className={styles['filter-title']}>Game Features</div>
                  <div>
                    {availableGameFeatures.map(f => (
                      <div
                        key={`available-feature-${f}`}
                        className={styles['filter-checkbox']}
                      >
                        <input
                          key={f}
                          id={f}
                          type="checkbox"
                          checked={
                            !!filterCheckedGamesFeatures.find(
                              fVal => fVal === f,
                            )
                          }
                          onChange={val =>
                            toggleFilterGamesFeature(f, val.target.checked)
                          }
                        />
                        <label htmlFor={f}>
                          {' '}
                          {f.replace(/([A-Z])/g, ' $1')}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ContentWrapper>
          </div>
          <ContentWrapper>
            <div className={styles['card-wrapper']}>
              {getfilteredSlots(
                ctx.values.games.filter(
                  (g: Game) =>
                    g.gameType === GameType.SlotV1 ||
                    g.gameType === GameType.SlotV2,
                ),
                filterCheckedLinesRange,
                filterCheckedGamesFeatures,
              ).map((g: Game) => (
                <GameCard
                  game={g}
                  gameType="slots"
                  onClick={() => toggleGameLounch(g)}
                  key={g.name}
                />
              ))}
            </div>
          </ContentWrapper>
        </>
      )}
    </div>
  );
}

export default SlotGames;
