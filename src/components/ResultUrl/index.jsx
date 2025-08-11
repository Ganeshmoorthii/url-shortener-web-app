import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import "./index.css";

function ResultUrl({ originalUrl, shortUrl, onReset }) {
  const [open, setOpen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <div className="main-container">
      <h2 className="main-heading">Your Shortened URL</h2>

      <div className="url-input-group">
        <input type="text" className="url-input" value={shortUrl} readOnly />
        <button className="shorten-button" onClick={handleCopy}>
          Copy URL
        </button>
      </div>

      <div className="url-result-group">
        <p>
          <strong>Original URL: </strong>
          <a href={originalUrl} target="_blank" rel="noopener noreferrer">
            {originalUrl}
          </a>
        </p>
      </div>

      <button className="shorten-button1" onClick={onReset}>
        Short Another URL
      </button>

      {/* Snackbar Alert at bottom right */}
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="success" variant="filled">
          Shortened URL copied to clipboard!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ResultUrl;
