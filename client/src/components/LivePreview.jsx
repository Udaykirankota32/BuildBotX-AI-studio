function LivePreview({ code }) {
  if (!code) {
    return (
      <div className="preview-empty">
        <p className="preview-empty-icon">&#9672;</p>
        <p className="preview-empty-title">Your app will appear here</p>
        <p className="preview-empty-subtitle">
          Describe what you want to build in the chat
        </p>
      </div>
    );
  }

  return (
    <iframe
      srcDoc={code}
      title="Live Preview"
      className="live-preview-iframe"
      sandbox="allow-scripts allow-same-origin"
    />
  );
}

export default LivePreview;
