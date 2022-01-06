// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Matchers<R> {
      toContainPixel(
        startIndex: number,
        color: { r: number; g: number; b: number; a: number },
      ): jest.CustomMatcherResult;

      toRespondWith(statusCode: number): Promise<jest.CustomMatcherResult>;
    }
  }
}

expect.extend({});

export default undefined;