const { SpeechMarkdown } = require('./dist/src/SpeechMarkdown.js');

const speech = new SpeechMarkdown();

console.log('=== Test Google Style (no namespace) ===');
const markdown = `(Hello I'm so happy today!)[style:"lively"]`;
const ssml = speech.toSSML(markdown, { platform: 'google-assistant' });
console.log(JSON.stringify(ssml));
console.log(ssml);

// Check that namespace is NOT present
if (ssml.includes('xmlns:google')) {
  console.log('\n✗ ERROR: Google namespace found (should not be there)');
} else {
  console.log('\n✓ Correct: No namespace in speak tag');
}

if (ssml.includes('<google:style name="lively">')) {
  console.log('✓ google:style tag found!');
} else {
  console.log('✗ google:style tag NOT found');
}
