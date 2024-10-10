import { useContext, useEffect, useRef, useState } from 'react';

import { CharacterInfo } from '@/assets/data/characterInfo';
import { itemNameList } from '@/assets/data/stockMarketData';
import PersonalBG1 from '@/assets/img/bg-personal1.svg?react';
import PersonalBG2 from '@/assets/img/bg-personal2.svg?react';
import Rank1 from '@/assets/img/rank1.svg?react';
import Rank2 from '@/assets/img/rank2.svg?react';
import Rank3 from '@/assets/img/rank3.svg?react';
import useCountUp from '@/hooks/useCountUp';
import { treeItemNameInKorean } from '@/hooks/useStock';
import { useGameStore } from '@/stores/useGameStore';
import { usePersonalBoardStore } from '@/stores/usePersonalBoardStore';
import useUser from '@/stores/useUser';
import { SocketContext } from '@/utils/SocketContext';
import formatNumberWithCommas from '@/utils/formatNumberWithCommas';

export default function PersonalBoard() {
  const { enterLoan } = useContext(SocketContext);
  const { stock, goldOwned, cash, totalDebt } = usePersonalBoardStore();
  const [hoveredItem, setHoveredItem] = useState<null | number>(null);
  const { nickname, characterType } = useUser();
  const { gameData } = useGameStore();
  const { playerRanking } = gameData || {};
  let rank = null;

  if (playerRanking) {
    const index = playerRanking.indexOf(nickname);
    if (index !== -1) {
      rank = index + 1;
    }
  }

  useEffect(() => {
    enterLoan();
  }, [goldOwned, totalDebt]);

  const renderRankImage = () => {
    if (rank === 1)
      return (
        <Rank1 className='absolute -right-[2px] z-20 object-contain w-24 h-auto -top-2 drop-shadow-md' />
      );
    if (rank === 2)
      return (
        <Rank2 className='absolute -right-[3px] z-20 object-contain w-24 h-auto -top-1 drop-shadow-md' />
      );
    if (rank === 3)
      return (
        <Rank3 className='absolute -right-[1px] z-20 object-contain w-24 h-auto -top-1 drop-shadow-md' />
      );
    return null;
  };

  const renderGoldImages = () => {
    const images = [];
    const count = Math.min(goldOwned, 15);

    for (let i = 0; i < Math.ceil(count / 5); i++) {
      images.push(
        <img
          key={i}
          src='/assets/gold.png'
          alt='금괴 이미지'
          className={`object-contain w-10 drop-shadow-md absolute left-1/2 -translate-x-1/2`}
          style={{ zIndex: images.length, left: `${i * 10}px` }}
        />,
      );
    }

    return images;
  };

  const characterImageUrl = `/assets/${Object.keys(CharacterInfo)[characterType]}.png`;

  const cashRef = useRef<HTMLSpanElement>(null);
  const debtRef = useRef<HTMLSpanElement>(null);
  const animatedCash = useCountUp(cashRef, cash);
  const animatedDebt = useCountUp(debtRef, totalDebt);

  return (
    <section className='flex justify-center flex-1 h-[104px] -mb-6 text-black fade-in'>
      <div className='w-[470px] relative flex h-full py-2 bg-white1 bg-opacity-85 border-t-4 border-x-4 border-white rounded-t-10 overflow-hidden items-center shadow-inner'>
        <div className='absolute z-18 -top-2 -right-28'>
          <PersonalBG1 className='w-1/2 h-1/2' />
        </div>
        <div className='absolute bottom-0 -left-3 z-18'>
          <PersonalBG2 className='w-2/5 h-auto' />
        </div>
        <div className='relative flex flex-col justify-center h-full px-4'>
          {rank !== null && rank !== 4 && renderRankImage()}
          <div className='flex items-center justify-center'>
            <img
              src={characterImageUrl}
              alt={`${nickname} character`}
              className='object-contain w-14 h-14 drop-shadow-md'
            />
          </div>
          <span className='p-1 mt-2 text-center bg-white text-omg-10 font-omg-body rounded-5 drop-shadow-md'>
            {nickname}
          </span>
        </div>
        <div className='flex flex-col flex-1 h-full'>
          <div className='flex items-center flex-1 w-full h-1/2'>
            <div className='flex justify-around flex-grow w-full h-full'>
              {itemNameList.map((item, idx) => (
                <div
                  key={idx}
                  className='relative z-10 flex flex-col items-center justify-center w-full m-1 bg-white drop-shadow-md rounded-10 group'
                  onMouseEnter={() => setHoveredItem(idx)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className='relative flex items-end h-10'>
                    <img
                      src={`/assets/${item}.png`}
                      alt={`${item} image`}
                      className={`w-[16px] transition-opacity duration-300 ${hoveredItem === idx ? 'opacity-0' : 'opacity-100'}`}
                    />
                    <span
                      className={`absolute -translate-x-1/2 left-1/2 bottom-2 text-black transition-opacity duration-300 font-omg-body text-omg-11 break-keep ${hoveredItem === idx ? 'opacity-100' : 'opacity-0'}`}
                    >
                      {treeItemNameInKorean(item)}
                    </span>
                  </div>
                  <span className='absolute top-0 text-black right-2 font-omg-body text-omg-14'>
                    {stock[idx + 1]}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className='flex flex-col px-6 text-omg-11 font-omg-body'>
            <div className='flex justify-between w-full'>
              <span>보유 현금</span>
              <span ref={cashRef}>${formatNumberWithCommas(animatedCash)}</span>
            </div>
            <div className='flex justify-between w-full'>
              <span>대출액</span>
              <span ref={debtRef}>${formatNumberWithCommas(animatedDebt)}</span>
            </div>
          </div>
        </div>
        <div className='relative flex flex-col items-center justify-center px-4 pr-12 h-4/5 text-omg-11 font-omg-body'>
          <span>보유 금 개수</span>
          {goldOwned !== 0 && renderGoldImages()}
          <span
            className={`relative h-full ${goldOwned === 0 ? 'flex items-center justify-center' : ''} font-omg-title ${goldOwned === 0 ? 'text-omg-18' : ''}`}
          >
            {goldOwned}
            <span> 개</span>
          </span>
        </div>
      </div>
    </section>
  );
}
