import Grid from './Grid';

describe('Grid tests', () => {
	beforeEach(() => {});

	test('Should throw error if negative grid dimension is passed ', async () => {
		try {
			new Grid(-1);
		} catch (e) {
			expect(e.message).toEqual('Grid size cannot be zero or a negative value');
		}
	});
	test('Should throw error if zero value grid dimension is passed ', async () => {
		try {
			new Grid(0);
		} catch (e) {
			expect(e.message).toEqual('Grid size cannot be zero or a negative value');
		}
	});
	test('Should successfully construct grid without error if invalid grid dimension is passed ', async () => {
		new Grid(2);
	});
});
