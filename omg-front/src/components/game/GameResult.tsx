import { lazy, useState } from 'react';
import { IoArrowRedo, IoArrowUndo } from 'react-icons/io5';

import { useGameResultStore } from '@/stores/useGameResultStore';
import useUser from '@/stores/useUser';

const GamePersonalResult = lazy(() => import('./GamePersonalResult'));
const GameTotalResult = lazy(() => import('./GameTotalResult'));

export default function GameResult() {
  const { playerResults } = useGameResultStore();
  const { nickname } = useUser();

  const [showTotalResult, setShowTotalResult] = useState(true);

  const currentPlayer = playerResults.find(
    player => player.nickname === nickname,
  );
  const rank = playerResults.indexOf(currentPlayer) + 1;

  const handleToggle = () => {
    setShowTotalResult(!showTotalResult);
  };

  return (
    <div className='fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-opacity-70'>
      <div className='p-8 w-[70%] modal-container flex justify-between'>
        <div className='flex flex-col  items-center gap-6'>
          <h2 className='text-center text-omg-40b'>🎄 최종 게임 결과 🎄</h2>
          <h3 className='text-center text-omg-24 '>
            {nickname}님의 최종 순위는{' '}
            <span className='text-red text-omg-30b'>🏆 {rank}위</span> 입니다.
          </h3>
        </div>
        <div className='h-1/3 '>
          {showTotalResult ? <GameTotalResult /> : <GamePersonalResult />}
        </div>
        <div className='flex justify-end w-full mt-4'>
          <button onClick={handleToggle} className='text-omg-28'>
            {showTotalResult ? <IoArrowRedo /> : <IoArrowUndo />}
          </button>
        </div>
        <p className='text-center underline text-omg-11 font-omg-body'>
          * 총 자산은 보유 현금 자산과 주식 최종액, 금괴 매입액을 합산하고
          대출액을 차감하여 산정합니다.
        </p>
      </div>
    </div>
  );
}
