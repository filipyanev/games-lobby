/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useContext, useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import styles from './index.module.css';
import logo from '../../assets/logo.png';
// import Loader from '../loader';
import { getPlayerData } from '../../services/player/service';
import Ctx from '../../utils.ts/context';
import SlotGames from '../../routes/slotGames';
import LiveCasinoGames from '../../routes/liveCasinoGames';
import ContentWrapper from '../contentWrapper';
import { getGamesData } from '../../services/games/service';
import { GetPlayerPayload } from '../../constants/player';
import { Game } from '../../constants/games';
import Loader from '../loader';

const DEFAULT_FETCH_INTERVAL = 5; // in seconds

const tabs = [
  {
    title: 'LIVE CASINO GAMES',
    link: '/live',
  },
  {
    title: 'SLOT GAMES',
    link: '/slots',
  },
];
const defaultOpen = 'SLOT GAMES';

function Layout() {
  let refreshTimeoutId: any;
  let refreshGamesIntervalId: any;

  const navigate = useNavigate();
  const location = useLocation();
  const ctx = useContext(Ctx);

  const { player, isLoading } = ctx.values;

  const defOpenTab = tabs.find(t => t.link === location.pathname);
  const [selectedTab, setSelectedTab] = useState<string>(
    defOpenTab?.title || defaultOpen,
  );

  useEffect(() => {
    getPlayerData()
      .then(res => {
        const { data } = res as GetPlayerPayload;

        if ((res as GetPlayerPayload).data) {
          ctx.change('player', data);

          getGamesData(data.currency, 'any')
            .then(gamesResp => {
              ctx.change('games', gamesResp as Game[]);
            })
            .catch((e: any) => {
              ctx.change('isLoading', false);
            });

          // set intervals for fetching data
          refreshTimeoutId = setInterval(() => {
            getPlayerData()
              .then(newPlayerData => {
                if ((newPlayerData as GetPlayerPayload).data) {
                  ctx.change(
                    'player',
                    (newPlayerData as GetPlayerPayload).data,
                  );
                }
              })
              .catch(() => {
                ctx.change('isLoading', false);
              });
          }, (process.env.REACT_APP_PLAYER_DATA_INTERVAL ? parseInt(process.env.REACT_APP_PLAYER_DATA_INTERVAL, 10) : DEFAULT_FETCH_INTERVAL) * 1000);

          refreshGamesIntervalId = setInterval(() => {
            if (data) {
              getGamesData(data.currency, 'any')
                .then(gamesResp => {
                  ctx.change('games', gamesResp as Game[]);
                })
                .catch(() => {
                  ctx.change('isLoading', false);
                });
            }
          }, (process.env.REACT_APP_GAMES_DATA_INTERVAL ? parseInt(process.env.REACT_APP_GAMES_DATA_INTERVAL, 10) : DEFAULT_FETCH_INTERVAL) * 1000);
        }
      })
      .catch(() => {
        ctx.change('isLoading', false);
      });

    // destroy interval on unmount
    return () => {
      clearInterval(refreshTimeoutId);
      clearInterval(refreshGamesIntervalId);
    };
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.lobby} style={{ border: 'red' }}>
        <header className={styles.header}>
          <ContentWrapper>
            <>
              <div className={styles.logo}>
                <img src={logo} alt="logo" />
              </div>
              <div className={styles.tabs}>
                {tabs.map(({ title, link }) => (
                  <div
                    key={title}
                    style={{
                      color: title === selectedTab ? '#fff' : 'goldenrod',
                      borderBottomColor:
                        title === selectedTab ? '#1f1530' : 'goldenrod',
                      opacity: title === selectedTab ? 1 : 0.7,
                      backgroundColor:
                        title === selectedTab ? '#1f1530' : 'initial',
                    }}
                    onClick={() => {
                      setSelectedTab(title);
                      navigate(link);
                    }}
                  >
                    {title}
                  </div>
                ))}
              </div>
              <div className={styles['user-data']}>
                {player && (
                  <>
                    <span>{player.username},&nbsp;</span>
                    <span>${player.balance.toFixed(2)}</span>
                  </>
                )}
              </div>
            </>
          </ContentWrapper>
        </header>
      </div>
      <Routes>
        <Route path="/" element={<SlotGames />} />
        <Route path="slots" element={<SlotGames />} />
        <Route path="live" element={<LiveCasinoGames />} />
      </Routes>

      <footer className={styles.footer}>
        <span>
          FE task for <b style={{ color: 'goldenrod' }}>7Mojos</b>
        </span>
        <b style={{ color: 'goldenrod' }}>Filip Yanev</b>
      </footer>
    </>
  );
}

export default Layout;
