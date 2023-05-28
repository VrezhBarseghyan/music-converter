const App = () => {
    const [youtubeLink, setYoutubeLink] = useState("");
    const [isConverting, setIsConverting] = useState(false);
    const [downloadUrl, setDownloadUrl] = useState("");
  
    const history = useHistory();
  
    useEffect(() => {
      if (youtubeLink && !isConverting) {
        setIsConverting(true);
  
        const options = {
          output: "/tmp/output.mp3",
        };
  
        (async () => {
          try {
            const result = await youtubeDlExec(youtubeLink, options);
            setDownloadUrl(result.url);
            setIsConverting(false);
          } catch (error) {
            console.error(error);
            if (error.error) {
              alert(error.error);
            } else {
              console.log("Error downloading video.");
            }
          }
        })();
      }
    }, [youtubeLink]);
  
    const handleYoutubeLinkChange = (event) => {
      setYoutubeLink(event.target.value);
    };
  
    const handleDownloadButtonClick = () => {
      if (downloadUrl) {
        history.push({
          pathname: downloadUrl,
        });
      } else {
        console.log("Error downloading video.");
      }
    };
  
    return (
      <div>
        <TextField
          label="YouTube Link"
          onChange={handleYoutubeLinkChange}
          value={youtubeLink}
        />
        <Button
          variant="contained"
          color="primary"
          disabled={isConverting}
          onClick={handleDownloadButtonClick}
        >
          Download
        </Button>
      </div>
    );
  };
  
  export default App;
  