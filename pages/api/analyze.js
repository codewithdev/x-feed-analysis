import OpenAIApi from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Add your OpenAI API key here
});

export default async function handler(req, res) {
  try {
    const { content } = req.body;

    if (!content) {
      res.status(400).json({ error: 'Content is required' });
      return;
    }

    const response = await openai.chat.completions.create({
      model: 'gp-3.5-turbo',
      prompt: `Analyze the following tweet for emotions and attitudes: ${content}`,
      max_tokens: 150,
    });

    const explanation = response.data.choices[0].text.trim();
    res.status(200).json({ explanation });
  } catch (error) {
    console.error('Error in API route:', error.message);
    console.error('Error stack:', error.stack);
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }
}