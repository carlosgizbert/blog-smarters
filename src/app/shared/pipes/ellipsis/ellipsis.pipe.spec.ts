import { EllipsisPipe } from './index.pipe';

describe('EllipsisPipe', () => {
  let pipe: EllipsisPipe;

  beforeEach(() => {
    pipe = new EllipsisPipe();
  });

  it('should truncate the string and add "..." when the length exceeds the limit', () => {
    const result = pipe.transform('This is a long text', 10);
    expect(result).toBe('This is a ...');
  });

  it('should return the string as is when the length is less than or equal to the limit', () => {
    const result = pipe.transform('Short text', 20);
    expect(result).toBe('Short text');
  });

  it('should return the string as is when the limit is 0', () => {
    const result = pipe.transform('No truncation', 0);
    expect(result).toBe('No truncation');
  });

  it('should return the string as is when the limit is negative', () => {
    const result = pipe.transform('Negative limit test', -5);
    expect(result).toBe('Negative limit test');
  });
});
