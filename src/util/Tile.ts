export default class Tile {
	private x: number;
	private y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
	public getCoordinates = (): [number, number] => {
		return [this.x, this.y];
	};

	public setX = (value: number): void => {
		this.x = value;
	};

	public setY = (value: number): void => {
		this.y = value;
	};

	public getX = (): number => {
		return this.x;
	};

	public getY = (): number => {
		return this.y;
	};

	public isEqualToTile = (tile: Tile): boolean => {
		return this.getX() == tile.getX() && this.getY() == tile.getY();
	};
}
