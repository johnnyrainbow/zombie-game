import Tile from '../util/Tile';
import Zombie from './Zombie';

describe('Zombie movement tests', () => {
	const gridDimension = 4;
	beforeEach(() => {});

	test('Perform R right movement correctly non wrap case', async () => {
		const zombie = new Zombie(new Tile(1, 0), ['R'], 0);
		zombie.move(gridDimension);
		const position = zombie.getPosition();
		expect(position.getCoordinates()).toEqual([2, 0]);
	});
	test('Perform R right movement correctly for wrap around grid case', async () => {
		const zombie = new Zombie(new Tile(3, 0), ['R'], 0);
		zombie.move(gridDimension);
		const position = zombie.getPosition();
		expect(position.getCoordinates()).toEqual([0, 0]);
	});
	test('Perform L left movement correctly correctly non wrap case', async () => {
		const zombie = new Zombie(new Tile(2, 0), ['L'], 0);
		zombie.move(gridDimension);
		const position = zombie.getPosition();
		expect(position.getCoordinates()).toEqual([1, 0]);
	});
	test('Perform L left movement correctly for wrap around grid case', async () => {
		const zombie = new Zombie(new Tile(0, 0), ['L'], 0);
		zombie.move(gridDimension);
		const position = zombie.getPosition();
		expect(position.getCoordinates()).toEqual([3, 0]);
	});
    test('Perform U up movement correctly for wrap around grid case', async () => {
		const zombie = new Zombie(new Tile(0, 0), ['U'], 0);
		zombie.move(gridDimension);
		const position = zombie.getPosition();
		expect(position.getCoordinates()).toEqual([0, 3]);
	});
    test('Perform U up movement correctly for non wrap around grid case', async () => {
		const zombie = new Zombie(new Tile(0, 2), ['U'], 0);
		zombie.move(gridDimension);
		const position = zombie.getPosition();
		expect(position.getCoordinates()).toEqual([0, 1]);
	});

    test('Perform D down movement correctly for wrap around grid case', async () => {
		const zombie = new Zombie(new Tile(0, 3), ['D'], 0);
		zombie.move(gridDimension);
		const position = zombie.getPosition();
		expect(position.getCoordinates()).toEqual([0, 0]);
	});
    test('Perform D down movement correctly for non wrap around grid case', async () => {
		const zombie = new Zombie(new Tile(0, 2), ['D'], 0);
		zombie.move(gridDimension);
		const position = zombie.getPosition();
		expect(position.getCoordinates()).toEqual([0, 3]);
	});
});
