import * as THREE from 'three';

// 좌표
export const zones = {
  //주식 시장
  stockMarket: {
    minX: Math.min(
      31.575848177908483,
      3.7258481779082966,
      2.421682123392728,
      31.797151457549752,
    ),
    maxX: Math.max(
      31.575848177908483,
      3.7258481779082966,
      2.421682123392728,
      31.797151457549752,
    ),
    minZ: Math.min(
      23.176214762936734,
      25.576214762936864,
      -2.316157516877238,
      -0.3984047909531311,
    ),
    maxZ: Math.max(
      23.176214762936734,
      25.576214762936864,
      -2.316157516877238,
      -0.3984047909531311,
    ),
  },
  // 대출방
  loanMarket: {
    minX: Math.min(
      37.940558356895615,
      46.19517276802779,
      50.62745301547213,
      50.75771935260647,
    ),
    maxX: Math.max(
      37.940558356895615,
      46.19517276802779,
      50.62745301547213,
      50.75771935260647,
    ),
    minZ: Math.min(
      79.79952469488194,
      77.29953481207126,
      72.44286631761085,
      66.09576197562656,
    ),
    maxZ: Math.max(
      79.79952469488194,
      77.29953481207126,
      72.44286631761085,
      66.09576197562656,
    ),
  },
  // 금 거래소
  goldMarket: {
    minX: Math.min(
      -23.564937032095813,
      -27.392493299760257,
      -33.292493299760366,
      -33.29249329976042,
    ),
    maxX: Math.max(
      -23.564937032095813,
      -27.392493299760257,
      -33.292493299760366,
      -33.29249329976042,
    ),
    minZ: Math.min(
      6.319106754949637,
      -8.241742485085151,
      -15.741742485085124,
      -9.341742485085136,
    ),
    maxZ: Math.max(
      6.319106754949637,
      -8.241742485085151,
      -15.741742485085124,
      -9.341742485085136,
    ),
  },
  // santa 집
  santaHouse: {
    minX: Math.min(
      -12.364237416513806,
      -17.53795972597701,
      -12.240089397037906,
      -16.790089397037892,
    ),
    maxX: Math.max(
      -12.364237416513806,
      -17.53795972597701,
      -12.240089397037906,
      -16.790089397037892,
    ),
    minZ: Math.min(
      86.10495804244223,
      81.10360178188705,
      83.45093197402531,
      80.30093197402545,
    ),
    maxZ: Math.max(
      86.10495804244223,
      81.10360178188705,
      83.45093197402531,
      80.30093197402545,
    ),
  },
  //snowman 집
  snowmanHouse: {
    minX: Math.min(86.32513253255415, 80.82513253255446),
    maxX: Math.max(86.32513253255415, 80.82513253255446),
    minZ: Math.min(-18.315050531004307, -23.015050531004373),
    maxZ: Math.max(-18.315050531004307, -23.015050531004373),
  },
  //elf 집
  elfHouse: {
    minX: Math.min(
      110.09392795333166,
      117.39392795333124,
      101.53209954298346,
      102.36782732334241,
    ),
    maxX: Math.max(
      110.09392795333166,
      117.39392795333124,
      101.53209954298346,
      102.36782732334241,
    ),
    minZ: Math.min(
      8.764950916516984,
      8.764950916516984,
      27.456524893012883,
      21.176670235074653,
    ),
    maxZ: Math.max(
      8.764950916516984,
      8.764950916516984,
      27.456524893012883,
      21.176670235074653,
    ),
  },
  // gingerbread 집
  gingerbreadHouse: {
    minX: Math.min(9.57660722024359, 2.676607220243608),
    maxX: Math.max(9.57660722024359, 10.176607220243588),
    minZ: Math.min(86.28175115063624, 86.8817511506362, 91.38175115063595),
    maxZ: Math.max(86.28175115063624, 91.38175115063595),
  },
};

// 범위
export const isInZone = (position: THREE.Vector3, zone: any): boolean => {
  return (
    position.x >= zone.minX &&
    position.x <= zone.maxX &&
    position.z >= zone.minZ &&
    position.z <= zone.maxZ
  );
};
