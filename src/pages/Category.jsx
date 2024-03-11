import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NewsBox from "../components/NewsBox";

const Category = () => {
  const [news, setNews] = useState([]);
  const { category } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [rateLimitExceeded, setRateLimitExceeded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 8;

  const categories = [
    "business",
    "entertainment",
    "health",
    "science",
    "sports",
    "technology",
  ];
  const navigate = useNavigate();

  useEffect(() => {
    setSearchQuery("");
    fetchData("");
  }, [category]);

  const fetchData = async (query) => {
    if (!categories.includes(category)) {
      return navigate("/not-found");
    }

    setLoading(true);
    setNoResults(false);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}`, {
        params: {
          q: query,
          category,
        },
      });
      const filteredNews = response.data.articles.filter(
        (article) => article.urlToImage
      );
      if (filteredNews.length === 0) setNoResults(true);
      setNews(filteredNews);
      setLoading(false);
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

  return (
    <div className="pb-5 position-relative">
      <header className="header ">
        <h1 className="display-1 fs-2 mb-4">{category}</h1>
        <nav aria-label="breadcrumb">
          <p>
            <Link to="/" className="text-decoration-none text-primary me-2">
              Home
            </Link>
            / &nbsp; {category}
          </p>
        </nav>
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
                {currentPageNews.map(
                  (item, index) =>
                    item.urlToImage && (
                      <NewsBox
                        key={index}
                        utlToImage={item.urlToImage}
                        title={item.title}
                        url={item.url}
                      />
                    )
                )}
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

export default Category;
