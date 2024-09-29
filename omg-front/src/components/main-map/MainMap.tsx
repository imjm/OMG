import { Suspense, useContext, useEffect, useState } from 'react';
import { GiConsoleController } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';

import Character from '@/components/character/Character';
import Button from '@/components/common/Button';
import ExitButton from '@/components/common/ExitButton';
import MainAlert from '@/components/common/MainAlert';
import Round from '@/components/common/Round';
import Timer from '@/components/common/Timer';
import Map from '@/components/main-map/Map';
import { useOtherUserStore } from '@/stores/useOtherUserState';
import { useSocketMessage } from '@/stores/useSocketMessage';
import useUser from '@/stores/useUser';
import { SocketContext } from '@/utils/SocketContext';
import {
  KeyboardControls,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';

import ChatButton from '../common/ChatButton';

const CharacterInfo = {
  santa: {
    url: '/models/santa/santa.gltf',
    scale: [2, 2, 2],
  },
  elf: {
    url: '/models/elf/elf.gltf',
    scale: [1, 1, 1],
  },
  snowman: {
    url: '/models/snowman/snowman.gltf',
    scale: [1, 1, 1],
  },
  gingerbread: {
    url: '/models/gingerbread/gingerbread.gltf',
    scale: [1, 1, 1],
  },
};

export default function MainMap() {
  const { characterType } = useUser();
  const {
    socket,
    online,
    initGameSetting,
    allRendered,
    purchaseGold,
    takeLoan,
  } = useContext(SocketContext);
  const { otherUsers } = useOtherUserStore();
  const { goldPurchaseMessage, loanMessage } = useSocketMessage();

  useEffect(() => {
    if (socket && online && allRendered) {
      initGameSetting();
    }
  }, [initGameSetting, allRendered, socket, online]);

  useEffect(() => {
    if (!goldPurchaseMessage.message) return;

    if (goldPurchaseMessage.isCompleted) {
      alert(
        `금괴를 성공적으로 구매했습니다! 현재 소유 금괴 수량: ${goldPurchaseMessage.message}`,
      );
    } else if (!goldPurchaseMessage.isCompleted) {
      alert(goldPurchaseMessage.message);
    }
  }, [goldPurchaseMessage]);

  useEffect(() => {
    if (!loanMessage.message) return;

    if (loanMessage.isCompleted) {
      alert(`대출 신청이 완료되었습니다! 대출액: ${loanMessage}`);
    } else if (!goldPurchaseMessage.isCompleted) {
      alert(loanMessage);
    }
  }, [loanMessage]);

  const characterKeys = Object.keys(CharacterInfo) as Array<
    keyof typeof CharacterInfo
  >;

  const selectedCharacterKey = characterKeys[characterType] || 'santa';
  const selectedCharacter = CharacterInfo[selectedCharacterKey];

  const otherCharacters = otherUsers.map(user => {
    const userCharacterKey = characterKeys[user.characterType] || 'santa';

    return {
      id: user.id,
      ...CharacterInfo[userCharacterKey],
      position: user.position,
      direction: user.direction,
    };
  });

  const Controls = {
    forward: 'forward',
    back: 'back',
    left: 'left',
    right: 'right',
    pickup: 'pickup',
  };

  const keyboardMap = [
    { name: Controls.forward, keys: ['ArrowUp'] },
    { name: Controls.back, keys: ['ArrowDown'] },
    { name: Controls.left, keys: ['ArrowLeft'] },
    { name: Controls.right, keys: ['ArrowRight'] },
    { name: Controls.pickup, keys: ['Space'] },
  ];

  const navigate = useNavigate();

  const goToStockMarket = () => {
    navigate('/stockmarket');
  };

  const openMainSettingsModal = () => {
    alert('메인 판 모달 띄워주기');
  };

  const openPersonalSettingsModal = () => {
    alert('개인 판 모달 띄워주기');
  };

  const openPersonalMissionModal = () => {
    alert('게임 미션 모달 띄워주기');
  };

  // TODO: 삭제해야됨
  const handleClickPurchaseGold = () => {
    const goldPurchaseCount = Number(prompt('금괴 매입 수량을 입력하세요.'));
    purchaseGold(goldPurchaseCount);
  };

  const handleClickTakeLoan = () => {
    const loanAmount = Number(prompt('대출할 액수를 입력하세요.'));
    takeLoan(loanAmount);
  };

  return (
    <main className='relative w-full h-screen overflow-hidden'>
      {/* Round & Timer & Chat 고정 위치 렌더링 */}
      <section className='absolute z-10 flex flex-col items-end gap-4 top-10 right-10'>
        <Round presentRound={1} />
        <Timer />
      </section>

      {/* 모달 모음 */}
      <section className='absolute z-10 flex flex-col items-start gap-4 left-10 top-10'>
        <Button text='메인 판' type='mainmap' onClick={openMainSettingsModal} />
        <Button
          text='개인 판'
          type='mainmap'
          onClick={openPersonalSettingsModal}
        />
        <Button
          text='게임 미션'
          type='mainmap'
          onClick={openPersonalMissionModal}
        />
        {/* TODO: 삭제해야됨, 임시 금괴매입 버튼 */}
        <Button
          text='임시 금괴매입 버튼'
          type='mainmap'
          onClick={handleClickPurchaseGold}
        />
        {/* TODO: 삭제해야됨, 임시 대출신청 버튼 */}
        <Button
          text='임시 금괴매입 버튼'
          type='mainmap'
          onClick={handleClickTakeLoan}
        />
      </section>

      {/* MainAlert 고정 위치 렌더링 */}
      <div
        className='absolute z-20 transform -translate-x-1/2 bottom-14 left-1/2 w-[60%]'
        onClick={goToStockMarket}
      >
        <MainAlert text='클릭하면 임시 주식방으로' />
      </div>

      {/* 채팅 및 종료 버튼 고정 렌더링 */}
      <section className='absolute bottom-0 left-0 z-10 flex items-center justify-between w-full text-white py-14 px-14 text-omg-40b'>
        <ChatButton />
        <ExitButton />
      </section>
      <KeyboardControls map={keyboardMap}>
        <Canvas>
          <Suspense>
            <OrbitControls />
            <Physics>
              <ambientLight />
              <directionalLight />
              <Map />
              <PerspectiveCamera />
              {/* 본인 캐릭터 */}
              <Character
                characterURL={selectedCharacter.url}
                characterScale={selectedCharacter.scale}
                isOwnCharacter={true}
              />

              {/* 다른 유저들 캐릭터 */}
              {otherCharacters.map(userCharacter => (
                <Character
                  key={userCharacter.id}
                  characterURL={userCharacter.url}
                  characterScale={userCharacter.scale}
                  position={userCharacter.position}
                  direction={userCharacter.direction}
                  isOwnCharacter={false}
                />
              ))}
            </Physics>
          </Suspense>
        </Canvas>
      </KeyboardControls>
    </main>
  );
}
