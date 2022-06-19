/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Tooltip from 'react-tooltip';
import { Game, GameMajorTypes } from '../../constants/games';
import defaultThumbnail from '../../assets/default_thumbnail.png';
import playersIcon from '../../assets/players.svg';
import styles from './index.module.css';
import { getGamesFeatures, renderFeature } from '../../utils.ts/games';

function Card({
  key,
  game,
  onClick,
  gameType,
}: {
  game: Game;
  onClick: () => void;
  // eslint-disable-next-line react/require-default-props
  key?: string;
  gameType: GameMajorTypes;
}) {
  const { name, thumbnails, liveData, slotData } = game;

  const getThumbnailUrl = () => {
    const defaultGameThumbnail = thumbnails
      .sort((a, b) => a.width - b.width)
      .find(t => (t.width === 301 && t.height === 180) || t.width === -1);

    if (defaultGameThumbnail) {
      return defaultGameThumbnail.imageUrl;
    }

    return defaultThumbnail;
  };

  return (
    <div
      key={key || name}
      className={styles.card}
      data-tip
      data-for={key || name}
      onClick={onClick as any}
    >
      <img
        src={getThumbnailUrl()}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = defaultThumbnail;
        }}
        alt="playersIcon"
      />
      {thumbnails[0] && thumbnails[0].videoUrl && (
        <video className={styles.video} autoPlay muted loop>
          <source src={thumbnails[0].videoUrl} />
        </video>
      )}
      <Tooltip id={key || name}>
        <p>{name}</p>
      </Tooltip>
      {/* labels */}
      <div className={styles.labels}>
        {gameType === 'slots' && (
          <div className={styles.feature}>
            <span className={styles['gold-text']}>
              {slotData && slotData.linesCount}
            </span>
            &nbsp;LINES
          </div>
        )}
        {getGamesFeatures(game, gameType).map((f: string) => (
          <div key={`${name}_${f}`} className={styles.feature}>
            {renderFeature(f)}
          </div>
        ))}
      </div>
      {gameType === 'live' && (
        <div className={styles['game-info']}>
          <div>{name}</div>
          <div>
            <img src={playersIcon} alt="playersIcon" />
            <span>{liveData.playersCount}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
