import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = ({ country = 'in', pageSize = 8, category = 'general', setProgress }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(category)} - NewsMonkey`;
    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, category]);

  const fetchNews = async () => {
    setLoading(true);
    setProgress(10);
    try {
      const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=84e1b65076e940fbbffaaa35cc777d1e&page=${page}&pageSize=${pageSize}`;
      const data = await fetch(url);
      setProgress(30);
      const parsedData = await data.json();
      setProgress(70);
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
      setProgress(100);
    } catch (error) {
      console.error('Error fetching the news data', error);
      setLoading(false);
    }
  };

  const fetchMoreData = async () => {
    if (articles.length < totalResults) {
      const newPage = page + 1;
      setPage(newPage);
      const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=84e1b65076e940fbbffaaa35cc777d1e&page=${newPage}&pageSize=${pageSize}`;
      const data = await fetch(url);
      const parsedData = await data.json();
      setArticles(articles.concat(parsedData.articles));
    }
  };

  return (
    <div className='container my-3'>
      <h1 className='text-center' style={{ margin: '35px 0', marginTop: '90px' }}>
        NewsMonkey - Top {capitalizeFirstLetter(category)} Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        style={{ overflow: 'visible' }}
      >
        <div className="row">
          {articles.map((article, index) => (
            <div className='col-md-4' key={index}>
              <NewsItem
                title={article.title ? article.title.slice(0, 45) : ''}
                description={article.description ? article.description.slice(0, 88) : ''}
                imageUrl={article.urlToImage}
                newsUrl={article.url}
                author={article.author}
                date={article.publishedAt}
                source={article.source}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  setProgress: PropTypes.func.isRequired,
};

export default News;
