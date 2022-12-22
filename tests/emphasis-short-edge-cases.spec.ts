// tslint:disable-next-line:import-name
import { SpeechMarkdown } from '../src/SpeechMarkdown';

describe('emphasis-short-edge-cases', () => {
  const speech = new SpeechMarkdown();

  const equalCases = [
    'a+moderate+level',
    'mother-in-law',
    '2020-10-10',
    '01-01-2021',
  ];

  test('converts to Plain Text', () => {
    for (let input of equalCases) {
      const text = speech.toText(input, {});
      expect(text).toBe(input);
    }
  });
});
