import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./index.css";

function SearchUrl({ inputUrl, setInputUrl, onShorten, loading }) {
  return (
    <div className="main-container">
      <h1 className="main-heading">Paste the URL to be shortened</h1>

      <div className="url-input-group">
        <input
          type="text"
          placeholder="Enter the link here"
          className="url-input"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
        />
        <button className="shorten-button" onClick={onShorten} disabled={loading}>
          {loading ? (
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CircularProgress size={20} color="inherit" />
            </Box>
          ) : (
            "Shorten URL"
          )}
        </button>
      </div>

      <p className="description">
        ShortURL is a free tool to shorten URLs and generate short links
        <br />
        URL shortener allows to create a shortened link making it easy to share
      </p>
    </div>
  );
}

export default SearchUrl;
