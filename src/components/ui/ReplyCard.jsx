import React from 'react';
import { AiOutlineDelete } from "react-icons/ai";
function ReplyCard({ index, commentorName, commentInfo, onEdit, onDelete }) {
  return (
    <div className="replyCard flex items-center">
      <div className='w-[100%]  rounded-lg text-white p-5  bg-white bg-opacity-20 backdrop-blur-md border border-white border-opacity-30 shadow-lg'>
        <div className="replierName text-lg font-semibold mb-2">{commentorName}</div>
        <div className="replyInfo text-sm  text-ellipsis">
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
        <button className='text-blue-600' 
        onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the reply card's onClick
            onEdit(index); // Call the onEdit function with the reply index
          }}
        >EDIT</button>
      </div>
    </div>
  );
}

export default ReplyCard;
