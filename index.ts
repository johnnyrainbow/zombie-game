import ZombieGame from './src/ZombieGame';

const gridDimension: number = 4;

const zombiePosition: [number, number] = [3, 1];

const creaturePositions: [number, number][] = [
	[0, 1],
	[1, 2],
	[1, 1],
];
const zombieMoveSequence = ['R', 'D', 'R', 'U'];

new ZombieGame(
	gridDimension,
	zombiePosition,
	creaturePositions,
	zombieMoveSequence
);
