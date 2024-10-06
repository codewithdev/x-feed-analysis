import { useState } from 'react';

export default function Home() {
  const [tweetUrl, setTweetUrl] = useState('');
  const [analysis, setAnalysis] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tweetId = extractTweetId(tweetUrl);
    const tweetContent = await fetchTweetContent(tweetId);
    const analysisResult = await analyzeTweet(tweetContent);
    setAnalysis(analysisResult);
  };

  const extractTweetId = (url) => {
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 1];
  };

  const fetchTweetContent = async (tweetId) => {
    // Fetch tweet content using Twitter API
  };

  const formStyle = {
    fontFamily: "'Franklin Gothic Medium', 'Arial Narrow'",
    textAlign: 'center',
  };

  const formContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  };
  const inputStyle = {
    padding: '20px',
    margin: '10px 0',
    width: '300px',
    fontSize: '16px',
  };

  return (
    <div style={formContainerStyle}>
      <h1>Tweet Analysis</h1>
      <form
        style={formStyle}
        onSubmit={handleSubmit}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'blue')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '')}
      >
        <input
          type="text"
          value={tweetUrl}
          onChange={(e) => setTweetUrl(e.target.value)}
          placeholder="Enter Tweet URL"
        />
        <button type="submit">Analyze</button>
      </form>
      {analysis && (
        <div>
          <h2>Analysis Result</h2>
          <p>{analysis.explanation}</p>
        </div>
      )}
    </div>
  );
}