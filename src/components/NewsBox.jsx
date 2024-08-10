import React from "react";

export default function NewsBox({ urlToImage, title, url }) {
  const truncateTitle = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className="news-box border shadow text-left">
      <div className="news-image-cover">
        <img src={urlToImage} alt="News Image" loading="lazy" />
      </div>
      <div className="news-desc">
        <h6
          className="news-title"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title={title}
        >
          {truncateTitle(title, 130)}
        </h6>
        <a
          href={url}
          target="_blank"
          className="btn btn-primary btn-sm news-btn"
          rel="noopener noreferrer"
        >
          Read More
        </a>
      </div>
    </div>
  );
}
