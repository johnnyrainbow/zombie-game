import Entity from './Entity';
import Tile from '../Tile';

export default class Creature extends Entity {
	constructor(position: Tile, identifier: number) {
		super(position, identifier);
	}
}
