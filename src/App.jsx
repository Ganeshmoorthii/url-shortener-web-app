import { useState } from "react";
import "./App.css";
import SearchUrl from "./components/SearchUrl";
import ResultUrl from "./components/ResultUrl";
import ParticlesBackground from "./components/ParticlesBackground";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

function App() {
  const [inputUrl, setInputUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [showEmptyAlert, setShowEmptyAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShorten = async () => {
    if (!inputUrl) {
      setShowEmptyAlert(true);
      setTimeout(() => setShowEmptyAlert(false), 3000);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://api.tinyurl.com/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TINYURL_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: inputUrl,
          domain: "tinyurl.com",
        }),
      });

      const data = await response.json();

      if (data.data && data.data.tiny_url) {
        setShortUrl(data.data.tiny_url);
        setShowResult(true);
      } else {
        alert(
          "Failed to shorten URL: " +
            (data.errors?.[0]?.message || "Unknown error")
        );
      }
    } catch (error) {
      console.error(error);
      alert("Error shortening URL. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setInputUrl("");
    setShortUrl("");
    setShowResult(false);
  };

  return (
    <>
      <ParticlesBackground />
      <div className="app-container">
        <h1 className="app-title">Short URL</h1>

        {loading ? (
          // Skeleton container
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              borderRadius: 2,
              backgroundColor: "white",
              width: "300px",
              maxWidth: "90%",
            }}
          >
            <Skeleton variant="text" width="80%" height={40} />
            <Skeleton variant="rectangular" width="100%" height={50} sx={{ mt: 1 }} />
            <Skeleton variant="text" width="60%" height={30} sx={{ mt: 1 }} />
            <Skeleton variant="rectangular" width="100%" height={40} sx={{ mt: 2 }} />
          </Paper>
        ) : showResult ? (
          <ResultUrl
            originalUrl={inputUrl}
            shortUrl={shortUrl}
            onBack={handleBack}
          />
        ) : (
          <SearchUrl
            inputUrl={inputUrl}
            setInputUrl={setInputUrl}
            onShorten={handleShorten}
          />
        )}

        {/* Alert at bottom-right */}
        {showEmptyAlert && (
          <Stack
            sx={{
              position: "fixed",
              bottom: 20,
              right: 20,
              zIndex: 1000,
            }}
          >
            <Alert variant="filled" severity="warning">
              Please enter a URL before shortening.
            </Alert>
          </Stack>
        )}
      </div>
    </>
  );
}

export default App;
