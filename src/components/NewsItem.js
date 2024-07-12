import React from 'react';

const NewsItem = (props)=> {
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
      <div className="my-3">
        <div className="card">
          <div style={{display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0'}}>
            <span className="badge rounded-pill bg-danger">
              {source.name}
            </span>
          </div>
          <img src={imageUrl || "https://scx2.b-cdn.net/gfx/news/hires/2024/quantum.jpg"} 
            className="card-img-top" alt="News" />
          <div className="card-body">
            <h5 className="card-title">
              {title} 
            </h5>
            <p className="card-text">{description}...</p>
            <p className='card-text'>
              <small className='text-muted'>
                By {!author ? "Unknown" : author.name} on {new Date(date).toGMTString()}
              </small>
            </p>
            <a href={newsUrl} target='_blank' rel="noopener noreferrer" className="btn btn-sm btn-primary">Read More</a>
          </div>
        </div>
      </div>
    );
  }

export default NewsItem;
