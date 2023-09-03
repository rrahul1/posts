import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [comments, setComments] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);
  const [postIdFilter, setPostIdFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage] = useState(10); // Number of comments per page
  const [rightPanelComments, setRightPanelComments] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
        setFilteredComments(data);
      });
  }, []);

  const handleFilterChange = (e) => {
    const filterValue = e.target.value;
    setPostIdFilter(filterValue);
    if (filterValue === "") {
      setFilteredComments(comments);
    } else {
      const filtered = comments.filter(
        (comment) => comment.postId.toString() === filterValue
      );
      setFilteredComments(filtered);
    }
  };

  const handleCommentClick = (postId) => {
    const commentsForPost = comments.filter(
      (comment) => comment.postId === postId
    );

 
    setRightPanelComments(commentsForPost);
  };

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = filteredComments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="App">
      <div className="left-panel">
        <h2>Posts</h2>
        <input
          type="text"
          placeholder="Filter by postId"
          value={postIdFilter}
          onChange={handleFilterChange}
        />
        <div className="scrollable-list">
          <ul>
            {currentComments.map((comment) => (
              <li
                key={comment.id}
                onClick={() => handleCommentClick(comment.postId)}
              >
                {comment.body}
              </li>
            ))}
          </ul>
        </div>
        <div className="pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="page-number">{currentPage}</span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage ===
              Math.ceil(filteredComments.length / commentsPerPage)
            }
          >
            Next
          </button>
        </div>
      </div>
      <div className="right-panel">
        <h2>Comments</h2>

        <div className="scrollable-comments">
          <ul>
            {rightPanelComments.map((comment) => (
              <li key={comment.id}>{comment.body}</li>
            ))}
          </ul>
          {/* Add comments here */}
        </div>
      </div>
    </div>
  );
}

export default App;
