import React, { useState } from 'react';

function App() {
  const [youtubeLink, setYoutubeLink] = useState('');
  const [conversionInProgress, setConversionInProgress] = useState(false);
  const [downloadLink, setDownloadLink] = useState('');

  const handleDownload = async () => {
    if (!youtubeLink) {
      alert('Please provide a YouTube link.');
      return;
    }

    setConversionInProgress(true);

    try {
      const response = await fetch('/api/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ youtubeLink }),
      });

      const data = await response.json();

      if (response.ok) {
        setDownloadLink(data.downloadLink);
      } else {
        throw new Error(data.message || 'Conversion failed.');
      }
    } catch (error) {
      alert(`An error occurred: ${error.message}`);
    }

    setConversionInProgress(false);
  };

  return (
    <div>
      <h1>YouTube to MP3/WAV Converter</h1>
      <input
        type="text"
        placeholder="Enter YouTube link"
        value={youtubeLink}
        onChange={(e) => setYoutubeLink(e.target.value)}
      />
      <button onClick={handleDownload} disabled={conversionInProgress}>
        {conversionInProgress ? 'Converting...' : 'Convert and Download'}
      </button>
      {downloadLink && (
        <div>
          <a href={downloadLink} download>Download Converted File</a>
        </div>
      )}
    </div>
  );
}

export default App;
