import Tile from '../util/Tile';

export default class Entity {
	private position: Tile;
	private identifier: number;

	constructor(position: Tile, identifier: number) {
		this.position = position;
		this.identifier = identifier;
	}

	public getIdentifier = (): number => {
		return this.identifier;
	};

	public getPosition = (): Tile => {
		return this.position;
	};

	protected moveUp = (gridDimension: number): void => {
		//handle grid wrap for lower y bounds
		let newPosition = this.position.getY() - 1;
		if (newPosition < 0) newPosition = gridDimension - 1;

		this.position.setY(newPosition);
	};

	protected moveDown = (gridDimension: number): void => {
		//handle grid wrap for upper y bounds
		let newPosition = this.position.getY() + 1;
		if (newPosition >= gridDimension) newPosition = 0;

		this.position.setY(newPosition);
	};

	protected moveLeft = (gridDimension: number): void => {
		//handle grid wrap for upper x bounds
		let newPosition = this.position.getX() - 1;
		if (newPosition < 0) newPosition = gridDimension - 1;

		this.position.setX(newPosition);
	};

	protected moveRight = (gridDimension: number): void => {
		//handle grid wrap for lower x bounds
		let newPosition = this.position.getX() + 1;
		if (newPosition >= gridDimension) newPosition = 0;

		this.position.setX(newPosition);
	};
}
