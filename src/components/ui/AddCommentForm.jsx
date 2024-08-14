import React from 'react';

function AddCommentForm({ formName, formComment, handleNameChange, handleCommentChange, handleFormSubmit }) {
  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Your Name"
        value={formName}
        onChange={handleNameChange}
        className="p-2 bg-transparent border border-gray-300 rounded placeholder-white text-black"
      />
      <textarea
        placeholder="Your Comment"
        value={formComment}
        onChange={handleCommentChange}
        className="p-2 bg-transparent border border-gray-300 rounded placeholder-white text-black"
      />
      <button
        type="submit"
        className="bg-zinc-500 text-white p-2 rounded"
      >
        Submit
      </button>
    </form>
  );
}

export default AddCommentForm;
