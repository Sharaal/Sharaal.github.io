const fs = require('fs/promises');
const fsCallback = require('fs'); // For createWriteStream
const path = require('path');
const matter = require('gray-matter');
const { ElevenLabsClient } = require('elevenlabs-node');

const SCHEDULE_FILE_PATH = path.join(__dirname, '..', 'config', 'tts-schedule.txt');
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY; // Placeholder
const ELEVENLABS_VOICE_ID = process.env.ELEVENLABS_VOICE_ID; // Placeholder

async function readScheduleFile() {
  try {
    const content = await fs.readFile(SCHEDULE_FILE_PATH, 'utf-8');
    return content.trim().split('\n').filter(line => line.length > 0);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.warn('Schedule file not found.');
      return [];
    }
    throw error;
  }
}

async function main() {
  console.log('Starting TTS generation process...');

  const schedule = await readScheduleFile();
  if (schedule.length === 0) {
    console.log('No articles in the schedule. Exiting.');
    return;
  }

  const articlePath = schedule[0];
  console.log(`Processing article: ${articlePath}`);

  // Read article content
  let articleContent;
  try {
    articleContent = await fs.readFile(articlePath, 'utf-8');
    console.log(`Successfully read content of ${articlePath}`);
  } catch (error) {
    console.error(`Error reading article file ${articlePath}:`, error);
    // TODO: Consider how to handle this error. Maybe remove from schedule?
    return; // Exit for now
  }

  // Use gray-matter to parse frontmatter
  const { data: frontmatter, content: articleBody } = matter(articleContent);
  console.log('Successfully parsed frontmatter:', frontmatter);

  // Call ElevenLabs API
  if (!ELEVENLABS_API_KEY || !ELEVENLABS_VOICE_ID) {
    throw new Error('ElevenLabs API key or Voice ID not set in environment variables. Exiting.');
  }

  const elevenLabs = new ElevenLabsClient({
    apiKey: ELEVENLABS_API_KEY,
  });

  try {
    console.log(`Generating TTS for article: ${articlePath} using voice ID: ${ELEVENLABS_VOICE_ID}`);
    const audioStream = await elevenLabs.textToSpeech({
      voiceId: ELEVENLABS_VOICE_ID,
      text: articleBody, // Or a summarized/cleaned version of it
      modelId: "eleven_multilingual_v2" // or any other model
    });
    // console.log('Placeholder for ElevenLabs API call. Audio stream would be here.');
    // For now, we'll simulate a successful call without actual audio data
    // const audioStream = "simulated_audio_stream"; // Placeholder

    if (!audioStream) {
      console.error('Failed to generate TTS audio stream.');
      return; // Exit or handle error appropriately
    }
    console.log('Successfully generated TTS audio stream.');

    // Save MP3 file
    const articleFilename = path.basename(articlePath, path.extname(articlePath));
    const audioDir = path.join(process.cwd(), 'assets', 'tts'); // Updated path
    const audioFilename = `${articleFilename}.mp3`;
    const audioFilePath = path.join(audioDir, audioFilename);

    try {
      await fs.mkdir(audioDir, { recursive: true });
      // Save the audio stream to a file
      const fileStream = fsCallback.createWriteStream(audioFilePath);
      await new Promise((resolve, reject) => {
        audioStream.pipe(fileStream);
        fileStream.on('finish', resolve);
        fileStream.on('error', reject);
      });
      console.log(`Successfully saved TTS audio to ${audioFilePath}`);
    } catch (error) {
      console.error(`Error saving MP3 file to ${audioFilePath}:`, error);
      return; // Exit or handle error appropriately
    }

  } catch (error) {
    console.error('Error calling ElevenLabs API:', error);
    return; // Exit or handle error appropriately
  }

  // Update article frontmatter with TTS audio URL
  const audioUrl = `assets/tts/${audioFilename}`; // Updated URL path
  frontmatter.tts = audioUrl; // Updated frontmatter key

  try {
    const updatedArticleContent = matter.stringify(articleBody, frontmatter);
    await fs.writeFile(articlePath, updatedArticleContent, 'utf-8');
    console.log(`Successfully updated frontmatter of ${articlePath} with audio URL: ${audioUrl}`);
  } catch (error) {
    console.error(`Error updating frontmatter for ${articlePath}:`, error);
    // Consider if we should proceed to update the schedule even if frontmatter update fails
    return; // Exit or handle error appropriately
  }

  // Update the schedule file (remove the processed article)
  schedule.shift(); // Remove the first element (the processed article)
  try {
    await fs.writeFile(SCHEDULE_FILE_PATH, schedule.join('\n'), 'utf-8');
    console.log(`Successfully updated schedule file. ${schedule.length} articles remaining.`);
  } catch (error) {
    console.error('Error updating schedule file:', error);
    // This is a critical error, as it might lead to reprocessing the same article
    return; // Exit or handle error appropriately
  }

  console.log('TTS generation process finished.');
}

main().catch(error => {
  console.error('Error during TTS generation:', error);
  process.exit(1);
});
