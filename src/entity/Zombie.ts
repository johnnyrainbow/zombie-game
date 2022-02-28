import Entity from './Entity';
import Tile from '../util/Tile';

export default class Zombie extends Entity {
	private moveSequence: string[];
	private sequenceIndex: number = 0;
	
	constructor(position: Tile, moveSequence: string[] = [], identifier: number) {
		super(position, identifier);
		this.moveSequence = moveSequence;
	}

	public getMoveSequence = (): string[] => {
		return this.moveSequence;
	};

	public getHasMovesLeft = (): boolean => {
		return this.sequenceIndex < this.moveSequence.length;
	};

	public move = (gridDimension: number): void => {
		if (!this.getHasMovesLeft()) return;

		const move = this.moveSequence[this.sequenceIndex];
		const oldPositionX = this.getPosition().getX();
		const oldPositionY = this.getPosition().getY();
		switch (move.toUpperCase()) {
			case 'U':
				this.moveUp(gridDimension);
				break;

			case 'D':
				this.moveDown(gridDimension);
				break;

			case 'L':
				this.moveLeft(gridDimension);
				break;

			case 'R':
				this.moveRight(gridDimension);
				break;
		}
		this.sequenceIndex++;

		console.log(
			`Zombie ${this.getIdentifier()} moved from (${oldPositionX}, ${oldPositionY}) to (${this.getPosition().getX()}, ${this.getPosition().getY()})`
		);
	};
}
