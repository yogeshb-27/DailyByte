import React, { useEffect, useState } from "react";
import axios from "axios";
import NewsBox from "../components/NewsBox";

const Home = () => {
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [rateLimitExceeded, setRateLimitExceeded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 8;

  useEffect(() => {
    setSearchQuery("");
    fetchData("");
  }, []);

  const fetchData = async (query) => {
    setLoading(true);
    setNoResults(false);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}`, {
        params: {
          q: query,
          category: "general",
        },
      });
      console.log(response.data);
      const filteredNews = response.data.articles.map((article) => {
        const authorName = article.author ? article.author : "Unknown Author";
        return {
          ...article,
          urlToImage:
            article.urlToImage ||
            `https://via.placeholder.com/150?text=${encodeURIComponent(
              authorName
            )}`,
        };
      });
      if (filteredNews.length === 0) setNoResults(true);
      setNews(filteredNews);
      setCurrentPage(1);
    } catch (error) {
      if (error.response && error.response.status === 429) {
        setRateLimitExceeded(true);
      }
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(news.length / newsPerPage);
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentPageNews = news.slice(indexOfFirstNews, indexOfLastNews);

  const todayDateOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  const todayDate = new Date().toLocaleDateString("en-GB", todayDateOptions);

  return (
    <div className="container mb-5 pb-5 position-relative">
      <small className="position-absolute top-0 end-0 me-lg-5 pe-lg-5 text-primary">
        {todayDate}
      </small>
      <header className="text-center my-5 pt-5">
        <h1 className="display-1 fs-1 mb-4 pt-lg-5 lh-base ">
          <span className="text-primary">DailyByte</span>: Your Daily Digest of
          <br />
          Fresh <span className="text-primary">News</span> Delivered
        </h1>
        <p>
          Clear and Concise: Understand the world with short, insightful news
          crafted just for you.
        </p>
      </header>
      <div className="search my-4 py-3 m-auto">
        <input
          className="w-100 p-1 px-3 "
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (e.target.value === "") fetchData("");
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") fetchData(searchQuery);
          }}
          placeholder="Search News..."
        />
      </div>
      {loading ? (
        <p className="pt-5 mt-5 text-center"> Loading ...</p>
      ) : (
        <>
          {rateLimitExceeded ? (
            <p className="pt-5 mt-5 text-center text-danger">
              API rate limit exceeded. Please try again later.
            </p>
          ) : noResults ? (
            <p className="pt-5 mt-5 text-center">No Results Found</p>
          ) : (
            <>
              <main className="news container my-5">
                {currentPageNews.map((item, index) => (
                  <NewsBox
                    key={index}
                    urlToImage={item.urlToImage}
                    title={item.title}
                    url={item.url}
                    altText={item.author || "Unknown Author"}
                  />
                ))}
              </main>
              <div className="pagination d-flex align-items-center justify-content-center w-100">
                <button
                  className={`${
                    currentPage === 1 ? "disabled" : ""
                  } btn btn-link text-decoration-none text-dark `}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Prev
                </button>
                {currentPage} /{totalPages}
                <button
                  className={` ${
                    currentPage === totalPages ? "disabled" : ""
                  } btn btn-link text-decoration-none text-dark`}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
