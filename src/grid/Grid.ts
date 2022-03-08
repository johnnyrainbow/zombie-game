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
		const zombies: Zombie[] = this.getZombies();
		const positions: Tile[] = [];
		for (const zombie of zombies) {
			positions.push(zombie.getPosition());
		}
		return positions;
	};

	public getCreaturesPositions = (): Tile[] => {
		const creatures: Creature[] = this.getCreatures();
		const positions: Tile[] = [];
		for (const creature of creatures) {
			positions.push(creature.getPosition());
		}
		return positions;
	};

	public getZombies = (): Zombie[] => {
		const zombies: Zombie[] = [];
		for (const entity of this.entities) {
			if (entity instanceof Zombie) zombies.push(entity);
		}
		return zombies;
	};

	private getCreatures = (): Creature[] => {
		const creatures: Creature[] = [];
		for (const entity of this.entities) {
			if (entity instanceof Creature) creatures.push(entity);
		}
		return creatures;
	};

	private generateZombieIdentifier = (): number => {
		return this.getZombies().length;
	};

	private isZombieMovesRemaining = (): boolean => {
		const zombies: Zombie[] = this.getZombies();
		for (const zombie of zombies) {
			if (zombie.getHasMovesLeft()) return true;
		}
		return false;
	};

	public getGridDimension = (): number => {
		return this.gridDimension;
	};

	private getCreatureAtTile = (tile: Tile): Creature | null => {
		const entitiesAtTile: Entity[] = this.getEntitiesAtTile(tile);
		for (const entityAtTile of entitiesAtTile) {
			if (entityAtTile instanceof Creature) return entityAtTile;
		}
		return null;
	};

	public performZombieGridMove = (zombie: Zombie): void => {
		//first, convert any creature on the same tile to a zombie, and run this method on the newly created creature
		const zombiePosition: Tile = zombie.getPosition();

		const creatureAtTile: Creature | null =
			this.getCreatureAtTile(zombiePosition);
		if (creatureAtTile) {
			const convertedZombie = new Zombie(
				creatureAtTile.getPosition(),
				zombie.getMoveSequence(),
				this.generateZombieIdentifier()
			);
			//remove dead creature, push new zombie
			this.removeEntityFromGrid(creatureAtTile);
			this.addEntityToGrid(convertedZombie);
			//we have a new zombie, this MUST move call on this
			console.log(
				`Zombie ${zombie.getIdentifier()} infected creature at (${zombie
					.getPosition()
					.getX()}, ${zombie.getPosition().getY()})`
			);
			return this.performZombieGridMove(convertedZombie);
		}
		//if no more move sequences for zombies, end recursion
		if (!this.isZombieMovesRemaining()) return;

		zombie.move(this.gridDimension);

		const index: number = this.getIndexOfZombie(zombie);
		//oldest zombie, set passed zombie back to the newest for the next move step
		if (index === 0)
			return this.performZombieGridMove(
				this.getZombies()[this.getZombies().length - 1]
			);
		//continue down the zombie age chain to the next newest
		return this.performZombieGridMove(this.getZombies()[index - 1]);
	};

	private getIndexOfZombie = (passedZombie: Zombie): number => {
		const zombies: Zombie[] = this.getZombies();
		for (var i = 0; i < zombies.length; i++) {
			const zombie: Zombie = zombies[i];
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
