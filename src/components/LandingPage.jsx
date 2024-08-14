import React, { useEffect, useState } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'; // Import arrow icons
import { IoAddOutline } from 'react-icons/io5';
import AddCommentForm from './ui/AddCommentForm';
import CommentCard from './ui/CommentCard';
import EditCommentForm from './ui/EditCommentForm';
import ReplyCard from './ui/ReplyCard';

const getCommentsFromStorage = () => {
  const storedComments = localStorage.getItem('commentsAndReplies');
  return storedComments ? JSON.parse(storedComments) : [];
};

const saveCommentsToStorage = (comments) => {
  localStorage.setItem('commentsAndReplies', JSON.stringify(comments));
};

function LandingPage() {
  const [comments, setComments] = useState(getCommentsFromStorage());
  const [replyName, setReplyName] = useState('');
  const [selectedCommentIndex, setSelectedCommentIndex] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editCommentIndex, setEditCommentIndex] = useState(null);
  const [formName, setFormName] = useState('');
  const [formComment, setFormComment] = useState('');
  const [isReplyFormVisible, setIsReplyFormVisible] = useState(false);
  const [replyComment, setReplyComment] = useState('');
  const [isEditReplyMode, setIsEditReplyMode] = useState(false);
  const [editReplyIndex, setEditReplyIndex] = useState(null);
  const [editReplyComment, setEditReplyComment] = useState('');

  // New state for sidebar visibility
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  
  // State for sorting order
  const [commentSortOrder, setCommentSortOrder] = useState('asc');
  const [replySortOrder, setReplySortOrder] = useState('asc');

  useEffect(() => {
    saveCommentsToStorage(comments);
  }, [comments]);

  const handleCommentClick = (index) => {
    setSelectedCommentIndex(index);
    setIsSidebarVisible(false);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
    if (!isFormVisible) {
      setSelectedCommentIndex(null);
      setIsEditMode(false);
      setEditCommentIndex(null);
      setFormName('');
      setFormComment('');
    }

    // Toggle sidebar visibility for small devices
    if (window.innerWidth <= 768) { // Adjust breakpoint as needed
      setIsSidebarVisible(!isSidebarVisible);
    }
  };

  const handleNameChange = (e) => setFormName(e.target.value);
  const handleCommentChange = (e) => setFormComment(e.target.value);
  const handleReplyChange = (e) => setReplyComment(e.target.value);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formComment) {
      if (isEditMode) {
        const updatedComments = comments.map(comment =>
          comment.index === editCommentIndex
            ? { ...comment, commentInfo: formComment }
            : comment
        );
        setComments(updatedComments);
        setIsEditMode(false);
      } else {
        const newComment = {
          index: (comments.length + 1) + '.',
          timestamp: Date.now(),
          commentorName: formName,
          commentInfo: formComment,
          replies: []
        };
        setComments([...comments, newComment]);
      }
      setFormComment('');
      setIsSidebarVisible(true);
      setIsFormVisible(false);
    }
  };

  const closeSideBar = () => {
    setIsSidebarVisible(true);
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (replyComment && selectedCommentIndex !== null) {
      const updatedComments = comments.map(comment =>
        comment.index === selectedCommentIndex
          ? {
              ...comment,
              replies: [
                ...comment.replies,
                {
                  index: (comment.replies.length + 1) + '.',
                  timestamp: Date.now(),
                  commentorName: replyName,
                  commentInfo: replyComment
                }
              ]
            }
          : comment
      );
      setComments(updatedComments);
      setReplyComment('');
      setReplyName('');
      setIsReplyFormVisible(false);
    }
  };

  const handleDeleteComment = (indexToDelete) => {
    const updatedComments = comments.filter(comment => comment.index !== indexToDelete);
    setComments(updatedComments);
  };

  const handleDeleteReply = (replyIndexToDelete) => {
    const updatedComments = comments.map(comment => {
      if (comment.index === selectedCommentIndex) {
        return {
          ...comment,
          replies: comment.replies.filter(reply => reply.index !== replyIndexToDelete)
        };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleEditComment = (indexToEdit) => {
    setIsSidebarVisible(false);
    const commentToEdit = comments.find(comment => comment.index === indexToEdit);
    if (commentToEdit) {
      setFormName(commentToEdit.commentorName);
      setFormComment(commentToEdit.commentInfo);
      setEditCommentIndex(indexToEdit);
      setIsEditMode(true);
      setIsFormVisible(true);
    }
  };

  const handleEditReplySubmit = (e) => {
    e.preventDefault();
    if (editReplyComment && selectedCommentIndex !== null) {
      const updatedComments = comments.map(comment =>
        comment.index === selectedCommentIndex
          ? {
              ...comment,
              replies: comment.replies.map(reply =>
                reply.index === editReplyIndex
                  ? {
                      ...reply,
                      commentInfo: editReplyComment
                    }
                  : reply
              )
            }
          : comment
      );
      setComments(updatedComments);
      setReplyName('');
      setEditReplyComment('');
      setIsEditReplyMode(false);
    }
  };

  const handleEditReply = (indexToEdit) => {
    const commentWithReply = comments.find(comment => comment.index === selectedCommentIndex);
    if (commentWithReply) {
      const replyToEdit = commentWithReply.replies.find(reply => reply.index === indexToEdit);
      if (replyToEdit) {
        setReplyName(replyToEdit.commentorName);
        setEditReplyComment(replyToEdit.commentInfo);
        setEditReplyIndex(indexToEdit);
        setIsEditReplyMode(true);
        setIsReplyFormVisible(false);
      }
    }
  };

  const handleReplyButtonClick = () => {
    setIsReplyFormVisible(true);
    setIsEditReplyMode(false);
    setReplyName('');
  };

  const handleCommentSortOrderChange = (order) => {
    setCommentSortOrder(order);
  };

  const handleReplySortOrderChange = (order) => {
    setReplySortOrder(order);
  };

  const sortedComments = comments
    .map(comment => ({
      ...comment,
      replies: comment.replies.sort((a, b) => (replySortOrder === 'asc' ? a.timestamp - b.timestamp : b.timestamp - a.timestamp))
    }))
    .sort((a, b) => (commentSortOrder === 'asc' ? a.timestamp - b.timestamp : b.timestamp - a.timestamp));

  const selectedComment = comments.find(comment => comment.index === selectedCommentIndex);

  return (
    <div className='h-full w-full flex justify-center items-center overflow-hidden font-mono'>
      <div className='chatting flex h-[80vh] w-[80vw] bg-white bg-opacity-20 backdrop-blur-md border border-white border-opacity-30 rounded-lg shadow-lg'>
        <div className={`sidebar ${isSidebarVisible ? 'flex' : 'hidden md:flex'} w-[100%] h-full border-r-[1px] border-zinc-600 flex flex-col md:w-[50%] lg:w-[40%] xl:min-w-[25%] xl:max-w-[25%]`}>
          <div className='flex justify-between items-baseline mt-5 ml-10 mb-5 mr-10'>
            <p className="heading text-3xl font-mono">Comment</p>
            <button
              onClick={toggleFormVisibility}
              className='text-2xl border-[1px] border-zinc-600 w-6 h-6 flex items-center justify-center leading-none tracking-widest'
            >
              <IoAddOutline />
            </button>
          </div>
          <div className='sorting-controls mb-5 ml-10'>
            <p>Sort Comments:</p>
            <button onClick={() => handleCommentSortOrderChange('asc')} aria-label="Sort comments ascending">
              <FaArrowUp className={`text-xl ${commentSortOrder === 'asc' ? 'text-black' : 'text-gray-500'}`} />
            </button>
            <button onClick={() => handleCommentSortOrderChange('desc')} aria-label="Sort comments descending">
              <FaArrowDown className={`text-xl ${commentSortOrder === 'desc' ? 'text-black' : 'text-gray-500'}`} />
            </button>
          </div>
          <div className='scrollable-element flex-1 overflow-y-auto mb-10'>
            <div className="sidebarCommentCard flex flex-col gap-5 mb-10">
              {sortedComments.map((comment) => (
                <CommentCard
                  key={comment.index}
                  index={comment.index}
                  commentorName={comment.commentorName}
                  commentInfo={comment.commentInfo}
                  onClick={() => handleCommentClick(comment.index)}
                  onEdit={() => handleEditComment(comment.index)}
                  onDelete={() => handleDeleteComment(comment.index)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className={`main-col ${isSidebarVisible ? 'hidden md:flex md:w-[50%] lg:w-[60%] xl:w-[75%]' : 'w-[100%]'}`}>
          {isFormVisible && (
            <div className="form-container p-10 w-full">
              {isEditMode ? (
                <EditCommentForm
                  formComment={formComment}
                  handleCommentChange={handleCommentChange}
                  handleFormSubmit={handleFormSubmit}
                />
              ) : (
                <AddCommentForm
                  formName={formName}
                  formComment={formComment}
                  handleNameChange={handleNameChange}
                  handleCommentChange={handleCommentChange}
                  handleFormSubmit={handleFormSubmit}
                />
              )}
            </div>
          )}
          <button className='absolute right-5 top-5 block md:hidden z-[10]' onClick={closeSideBar}>X</button>
          <div className='flex-1 relative'>
            {!isFormVisible && selectedComment && (
              <>
                <div className="topBar m-5">
                  <div className='flex gap-10'>
                    <div className="commentorNameHeading">
                      {selectedComment.commentorName}
                    </div>
                    <button className='addReply text-blue-700' onClick={handleReplyButtonClick}>
                      REPLY
                    </button>
                  </div>
                  <div className="mainComment">
                    {selectedComment.commentInfo}
                  </div>
                </div>
                <div className="sorting-controls mb-5 ml-10">
                  <p>Sort Replies:</p>
                  <button onClick={() => handleReplySortOrderChange('asc')} aria-label="Sort replies ascending">
                    <FaArrowUp className={`text-xl ${replySortOrder === 'asc' ? 'text-black' : 'text-gray-500'}`} />
                  </button>
                  <button onClick={() => handleReplySortOrderChange('desc')} aria-label="Sort replies descending">
                    <FaArrowDown className={`text-xl ${replySortOrder === 'desc' ? 'text-black' : 'text-gray-500'}`} />
                  </button>
                </div>
                <div className="scrollable-element replySection absolute right-0 w-full h-[60vh] overflow-y-auto p-10 ">
                  <div className="flex flex-col gap-5">
                    {selectedComment.replies.map((reply) => (
                      <ReplyCard
                        key={reply.index}
                        index={reply.index}
                        commentorName={reply.commentorName}
                        commentInfo={reply.commentInfo}
                        onEdit={handleEditReply}
                        onDelete={handleDeleteReply}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
            {isReplyFormVisible && (
              <div className="replyForm-container fixed bottom-0 right-0 w-[100%] md:flex md:w-[50%] lg:w-[60%] xl:w-[75%] bg-black p-5 border-t-[1px] border-gray-500 flex flex-col">
                <button 
                  onClick={() => setIsReplyFormVisible(false)}
                  className="text-white bg-transparent border-none text-2xl self-end mb-3"
                  style={{ alignSelf: 'flex-end' }}
                >
                  &times; 
                </button>
                <form onSubmit={handleReplySubmit} className="flex flex-col gap-4 h-full w-full">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={replyName}
                    onChange={(e) => setReplyName(e.target.value)}
                    className="p-2 bg-black border border-gray-700 rounded placeholder-gray-500 text-white"
                  />
                  <textarea
                    placeholder="Write your reply..."
                    value={replyComment}
                    onChange={handleReplyChange}
                    className="p-2 bg-black border border-gray-700 rounded placeholder-gray-500 text-white resize-none"
                    style={{ height: '4rem' }}
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded mt-2"
                  >
                    Reply
                  </button>
                </form>
              </div>
            )}
            {isEditReplyMode && (
              <div className="replyForm-container fixed bottom-0 right-0 w-[75%] bg-black p-5 border-t-[1px] border-gray-500 flex flex-col">
                <button 
                  onClick={() => setIsEditReplyMode(false)}
                  className="text-white bg-transparent border-none text-2xl self-end mb-3"
                  style={{ alignSelf: 'flex-end' }}
                >
                  &times;
                </button>
                <form onSubmit={handleEditReplySubmit} className="flex flex-col gap-4 h-full">
                  <textarea
                    placeholder="Edit your reply..."
                    value={editReplyComment}
                    onChange={(e) => setEditReplyComment(e.target.value)}
                    className="p-2 bg-black border border-gray-700 rounded placeholder-gray-500 text-white resize-none"
                    style={{ height: '4rem' }}
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded mt-2"
                  >
                    Save
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
