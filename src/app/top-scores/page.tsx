'use client';

import { useEffect, useState } from 'react';
import { useAppSelector } from '@/app/lib/hooks';
// import { selectTheme } from '@/app/lib/features/theme/theme-slice';

const TopScores = () => {
  const [version, setVersion] = useState('');

  const scoreValue = useAppSelector(( store: { score: { score: { value: number } } }) => 
    store.score.score.value);

  useEffect(() => {
    setVersion(process.env.APP_DISPLAY_VERSION ?? '');
  }, []);

  console.log(version);

  // const madeTopTen = (): boolean => {
  //   if (scoreValue > 0) {
  //     return true;
  //   }
  //   return false;
  // }

  return (
    <>
      <h1>Top Scores!</h1>
      <p>Congratulations, you have completed the game and defeated various monsters attacking your village!</p>
      <p>You defeated waves of monsters, with a high score of {scoreValue}!</p>

    </>
  );
};

export default TopScores;