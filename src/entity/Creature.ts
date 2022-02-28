import Entity from './Entity';
import Tile from '../util/Tile';

export default class Creature extends Entity {
	constructor(position: Tile, identifier: number) {
		super(position, identifier);
	}
}
