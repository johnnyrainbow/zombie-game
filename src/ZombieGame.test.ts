import ZombieGame from './ZombieGame';

describe('ZombieGame result tests', () => {
	let gridDimension: number = 4;
	let zombiePosition: [number, number];
	let creaturePositions: [number, number][];
	let zombieMoveSequence: string[];
	beforeEach(() => {});

	test('Provide correct output for provided task test case', async () => {
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
		expect(zombiePositions.length).toEqual(4);
		const creaturePos = zombieGame.getGrid().getCreaturesPositions();
		expect(creaturePos.length).toEqual(0);
	});

	test('Provide correct output for EDGE CASE - multiple creatures on one square', async () => {
		gridDimension = 4;

		zombiePosition = [3, 1];

		creaturePositions = [
			[0, 1],
			[0, 1],
			[0, 1],
		];
		zombieMoveSequence = ['R', 'D'];

		const zombieGame = new ZombieGame(
			gridDimension,
			zombiePosition,
			creaturePositions,
			zombieMoveSequence
		);
		const zombiePositions = zombieGame.getGrid().getZombiesPositions();
		expect(zombiePositions[0].getCoordinates()).toEqual([0, 2]);

		expect(zombiePositions.length).toEqual(4);
		const creaturePos = zombieGame.getGrid().getCreaturesPositions();
		expect(creaturePos.length).toEqual(0);
	});

	test('Provide correct output for EDGE CASE - when zombie spawns on same square as creature', async () => {
		gridDimension = 4;

		zombiePosition = [0, 1];

		creaturePositions = [[0, 1]];
		zombieMoveSequence = [];

		const zombieGame = new ZombieGame(
			gridDimension,
			zombiePosition,
			creaturePositions,
			zombieMoveSequence
		);
		const zombiePositions = zombieGame.getGrid().getZombiesPositions();
		expect(zombiePositions[0].getCoordinates()).toEqual([0, 1]);

		expect(zombiePositions.length).toEqual(2);
		const creaturePos = zombieGame.getGrid().getCreaturesPositions();
		expect(creaturePos.length).toEqual(0);
	});

	test('Provide correct output for EDGE CASE - empty zombieMoveSequence provided ', async () => {
		gridDimension = 4;

		zombiePosition = [3, 1];

		creaturePositions = [
			[0, 1],
			[1, 2],
			[1, 1],
		];
		zombieMoveSequence = [];

		const zombieGame = new ZombieGame(
			gridDimension,
			zombiePosition,
			creaturePositions,
			zombieMoveSequence
		);
		const zombiePositions = zombieGame.getGrid().getZombiesPositions();
		expect(zombiePositions[0].getCoordinates()).toEqual([3, 1]);

		expect(zombiePositions.length).toEqual(1);
		const creaturePos = zombieGame.getGrid().getCreaturesPositions();
		expect(creaturePos.length).toEqual(3);
	});

	test('Provide correct output for grid size of n=1', async () => {
		gridDimension = 4;

		zombiePosition = [0, 0];

		creaturePositions = [
			[0, 0],
			[0, 0],
		];
		zombieMoveSequence = [];

		const zombieGame = new ZombieGame(
			gridDimension,
			zombiePosition,
			creaturePositions,
			zombieMoveSequence
		);
		const zombiePositions = zombieGame.getGrid().getZombiesPositions();
		expect(zombiePositions[0].getCoordinates()).toEqual([0, 0]);

		expect(zombiePositions.length).toEqual(3);
		const creaturePos = zombieGame.getGrid().getCreaturesPositions();
		expect(creaturePos.length).toEqual(0);
	});
});
