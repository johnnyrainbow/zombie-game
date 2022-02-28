import ZombieGame from './ZombieGame';

describe('ZombieGame result tests', () => {
	let gridDimension: number = 4;
	let zombiePosition: [number, number];
	let creaturePositions: [number, number][];
	let zombieMoveSequence: string[];
	beforeEach(() => {});

	test('Provide correct output for provided task test case ', async () => {
		gridDimension = 4;

		zombiePosition = [3, 1];

		creaturePositions = [
			[0, 1],
			[1, 2],
			[1, 1],
		];
		zombieMoveSequence = ['R', 'D', 'R', 'U'];

		const zombieGame = new ZombieGame(
			gridDimension,
			zombiePosition,
			creaturePositions,
			zombieMoveSequence
		);
		const zombiePositions = zombieGame.getGrid().getZombiesPositions();
		expect(zombiePositions[0].getCoordinates()).toEqual([1, 1]);
		expect(zombiePositions[1].getCoordinates()).toEqual([2, 1]);
		expect(zombiePositions[2].getCoordinates()).toEqual([3, 1]);
		expect(zombiePositions[3].getCoordinates()).toEqual([3, 2]);

		const creaturePos = zombieGame.getGrid().getCreaturesPositions();
		expect(creaturePos.length).toEqual(0);
	});
});
