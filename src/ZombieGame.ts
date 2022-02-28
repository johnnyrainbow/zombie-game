import Creature from './entity/Creature';
import Grid from './grid/Grid';
import Tile from './util/Tile';
import Zombie from './entity/Zombie';

export default class ZombieGame {
	private grid: Grid;

	constructor(
		gridDimension: number,
		zombiePosition: [number, number],
		creaturePositions: [number, number][],
		zombieMoveSequence: string[]
	) {
		console.log('Welcome to Zombie Game!');

		this.grid = new Grid(gridDimension);

		this.instantiateCreatures(
			zombiePosition,
			creaturePositions,
			zombieMoveSequence
		);
		this.startGame();
	}

	private startGame = (): void => {
		//pass patient zero zombie in
		// this.convert;
		this.grid.performGridMoveIteration(
			this.grid.getZombies()[this.grid.getZombies().length - 1]
		);

		console.log('Game finished! \n-----');
		console.log(
			`zombies' positions: ${JSON.stringify(this.grid.getZombiesPositions())}`
		);
		console.log(
			`creatures' positions: ${JSON.stringify(
				this.grid.getCreaturesPositions()
			)}`
		);
	};

	public getGrid = (): Grid => {
		return this.grid;
	};
	private validatePositionBounds = (position: [number, number]) => {
		if (
			position[0] > this.grid.getGridDimension() - 1 ||
			position[1] > this.grid.getGridDimension() - 1
		)
			throw new Error('Position exceeds grid bounds');

		if (position[0] < 0 || position[1] < 0)
			throw new Error('Position has invalid (negative) value');
	};
	private instantiateCreatures = (
		zombiePosition: [number, number],
		creaturePositions: [number, number][],
		zombieMoveSequence: string[]
	): void => {
		//create the original zombie

		this.validatePositionBounds(zombiePosition);

		const zombie = new Zombie(
			new Tile(zombiePosition[0], zombiePosition[1]),
			zombieMoveSequence,
			0
		);
		//add zombie to grid
		this.grid.addEntityToGrid(zombie);

		//create and add creatures to grid
		for (var i = 0; i < creaturePositions.length; i++) {
			const position = creaturePositions[i];
			this.validatePositionBounds(position);
			this.grid.addEntityToGrid(
				new Creature(new Tile(position[0], position[1]), i)
			);
		}
	};
}
