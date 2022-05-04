import React, { useState } from "react";

const ShortURL = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const submitFormData = async (e) => {
    e.preventDefault();
    if (originalUrl === "") {
      alert("invalid");
    } else {
      const response = await fetch("https://api-ssl.bitly.com/v4/shorten", {
        method: "POST",
        headers: {
          Authorization: "Bearer c5151e5c096c006dd0bea38903c562b2760f498a",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          long_url: originalUrl,
        }),
      });
      if (response && response.ok) {
        setOriginalUrl("");
        response.json().then((data) => setShortUrl(data.link));
      }
    }
  };
  return (
    <div className="container-fluid url">
      <div className="container">
        <h1 className="text-center text-white">URL SHORTENING</h1>
        <div className="short-form">
          <form className="row g-3" onSubmit={(e) => submitFormData(e)}>
            <div className="col-12">
              <label className="form-label text-white">Original URL</label>
              <input
                type="text"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                className="form-control"
                
                placeholder="Put URL Here"
              />
            </div>

            <div className="col-12 url-button">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="short-url">
          <span className="text-white">Short URL</span>
          <p>
            <a href={shortUrl}>{shortUrl}</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShortURL;
