import Creature from '../entity/Creature';
import Entity from '../entity/Entity';
import Tile from '../util/Tile';
import Zombie from '../entity/Zombie';

export default class Grid {
	private gridDimension: number;
	private entities: Entity[];

	constructor(gridDimension: number) {
		if (gridDimension <= 0)
			throw new Error('Grid size cannot be zero or a negative value');

		this.gridDimension = gridDimension;
		this.entities = [];
	}

	public getZombiesPositions = (): Tile[] => {
		const zombies = this.getZombies();
		const positions = [];
		for (const zombie of zombies) {
			positions.push(zombie.getPosition());
		}
		return positions;
	};

	public getCreaturesPositions = (): Tile[] => {
		const creatures = this.getCreatures();
		const positions = [];
		for (const creature of creatures) {
			positions.push(creature.getPosition());
		}
		return positions;
	};

	public getZombies = (): Zombie[] => {
		const zombies = [];
		for (const entity of this.entities) {
			if (entity instanceof Zombie) zombies.push(entity);
		}
		return zombies;
	};

	private getCreatures = (): Creature[] => {
		const creatures = [];
		for (const entity of this.entities) {
			if (entity instanceof Creature) creatures.push(entity);
		}
		return creatures;
	};

	private generateZombieIdentifier = (): number => {
		return this.getZombies().length;
	};

	private isZombieMovesRemaining = (): boolean => {
		const zombies = this.getZombies();
		for (const zombie of zombies) {
			if (zombie.getHasMovesLeft()) return true;
		}
		return false;
	};

	public getGridDimension = (): number => {
		return this.gridDimension;
	};

	public performGridMoveIteration = (zombie: Zombie): void => {
		//if no more move sequences for zombies, end recursion
		if (!this.isZombieMovesRemaining()) return;

		zombie.move(this.gridDimension);
		const zombiePosition = zombie.getPosition();

		const entitiesAtTile = this.getEntitiesAtTile(zombiePosition);

		for (const entityAtTile of entitiesAtTile) {
			if (!(entityAtTile instanceof Creature)) continue;
			//convert same tile creatures to a zombie
			const convertedZombie = new Zombie(
				entityAtTile.getPosition(),
				zombie.getMoveSequence(),
				this.generateZombieIdentifier()
			);
			//remove dead creature, push new zombie
			this.removeEntityFromGrid(entityAtTile);
			this.addEntityToGrid(convertedZombie);

			console.log(`A new creature was infected!`);
			//we have a new zombie, this MUST move next
			return this.performGridMoveIteration(convertedZombie);
		}

		const index = this.getIndexOfZombie(zombie);
		//oldest zombie, set passed zombie back to the newest for the next move step
		if (index === 0)
			return this.performGridMoveIteration(
				this.getZombies()[this.getZombies().length - 1]
			);
		//continue down the zombie age chain to the next newest
		return this.performGridMoveIteration(this.getZombies()[index - 1]);
	};

	private getIndexOfZombie = (passedZombie: Zombie): number => {
		const zombies = this.getZombies();
		for (var i = 0; i < zombies.length; i++) {
			const zombie = zombies[i];
			if (zombie.getIdentifier() === passedZombie.getIdentifier()) return i;
		}
		return -1;
	};
	
	public removeEntityFromGrid = (passedEntity: Entity): void => {
		this.entities = this.entities.filter(function (entity) {
			return entity !== passedEntity;
		});
	};

	public addEntityToGrid = (entity: Entity): void => {
		this.entities.push(entity);
	};

	public getEntitiesAtTile = (tile: Tile): Entity[] => {
		return this.entities.filter((entity) =>
			entity.getPosition().isEqualToTile(tile)
		);
	};
}
