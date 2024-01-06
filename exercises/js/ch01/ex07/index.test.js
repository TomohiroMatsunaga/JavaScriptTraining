import { Point } from './index.js';

describe('Point class', () => {
  it('adds coordinates', () => {
    const point1 = new Point(1, 2);
    const point2 = new Point(3, 4);
    point1.add(point2);

    expect(point1.x).toBe(4);
    expect(point1.y).toBe(6);
  });
  
});
