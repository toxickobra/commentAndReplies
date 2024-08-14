// src/components/CommentCard.jsx
import React from 'react';
import { AiOutlineDelete } from "react-icons/ai";

function CommentCard({ index, commentorName, commentInfo, onClick, onDelete, onEdit }) {
  return (
    <div 
      className="CommentCard  flex items-center  relative justify-center " 
       // Attach the onClick handler
    >
      
      <div 
      onClick={onClick}
      className='min-w-[80%] max-w-[80%] cursor-pointer rounded-lg text-white p-5  bg-white bg-opacity-20 backdrop-blur-md border border-white border-opacity-30 shadow-lg'>
        <div className="commentorName text-lg font-semibold mb-2 flex">
        <div className="index ">{index}</div>
            {commentorName}
            </div>
        <div className="commentInfo overflow-hidden whitespace-nowrap text-ellipsis">
          {commentInfo}
        </div>
        <div 
          className='deleteComment absolute top-1/2 -translate-y-[1vh] right-0 translate-x-[50%] border-[1px] p-1 rounded-full bg-black cursor-pointer' 
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the comment card's onClick
            onDelete(index); // Call the onDelete function with the comment index
          }}
        >
          <AiOutlineDelete />
        </div>
        <button 
          className='editComment text-blue-600 uppercase '
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the comment card's onClick
            onEdit(index); // Call the onEdit function with the comment index
          }}
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default CommentCard;
