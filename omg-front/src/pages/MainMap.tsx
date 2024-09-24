import { Suspense, useMemo } from 'react';

import Mickey from '@/components/character/Mickey';
// import GingerBread from '@/components/character/GingerBread';
import Map from '@/components/main-map/Map';
import {
  KeyboardControls,
  type KeyboardControlsEntry,
  OrbitControls,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';

// import Controller from 'ecctrl';

// import { useChatFocusStore, useUserStore, useWorldStore } from '../../store';
// 사용자 및 세계 상태를 관리하는 스토어 훅
// import { socket as socketInstance } from '../../lib/socket';
// 소켓 인스턴스 가져옴
// import useSocket from '../../hooks/useSocket';
// 소켓 연결을 위한 커스텀 훅 가져옴

// Scene 컴포넌트 정의
// const Scene = () => {
//   const socket = useSocket(socketInstance);  소켓 인스턴스 사용
//   const { world } = useWorldStore();  월드 스토어에서 world 상태 가져옴 (캐릭터 정보 포함)
//   const { id } = useUserStore();  사용자 ID 가져옴
//   const { focus } = useChatFocusStore();  채팅 포커스 상태 가져옴
//   const [sub] = useKeyboardControls<Controls>();  키보드 입력 상태 구독

// import { useControls } from 'leva';

export enum Controls {
  forward = 'forward', // 전진
  back = 'back', // 후진
  left = 'left', // 왼쪽
  right = 'right', // 오른쪽
  pickup = 'pickup', // 줍기
}

export default function MainMap() {
  // 키보드 이동
  const keyboardMap = useMemo<KeyboardControlsEntry<Controls>[]>(
    () => [
      { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] }, // 전진: 위쪽 화살표 또는 W 키
      { name: Controls.back, keys: ['ArrowDown', 'KeyS'] }, // 후진: 아래쪽 화살표 또는 S 키
      { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] }, // 왼쪽으로 이동: 왼쪽 화살표 또는 A 키
      { name: Controls.right, keys: ['ArrowRight', 'KeyD'] }, // 오른쪽으로 이동: 오른쪽 화살표 또는 D 키
      { name: Controls.pickup, keys: ['Space'] },
    ],
    [],
    // 빈 배열을 두어 초기 한 번만 이 값을 계산하고, 이후에는 메모이제이션된 값을 사용
  );

  // 카메라 시점 이동
  // const { camera } = useThree();

  return (
    <main className='relative w-full h-screen p-1'>
      <KeyboardControls map={keyboardMap}>
        <Canvas>
          {/* 이 밑부터 작업 필요 */}

          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <OrbitControls />
          <Suspense>
            <Physics>
              {/* 이동 최대 속도 5 */}
              {/* <Controller maxVelLimit={5}> */}
              <Mickey />
              {/* </Controller> */}
              <Map />
            </Physics>
          </Suspense>
          {/* 이 위까지 */}
        </Canvas>
      </KeyboardControls>
    </main>
  );
}
