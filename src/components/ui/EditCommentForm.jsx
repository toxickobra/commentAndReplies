import React from 'react';

function EditCommentForm({ formComment, handleCommentChange, handleFormSubmit }) {
  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
      <textarea
        placeholder="Edit Comment"
        value={formComment}
        onChange={handleCommentChange}
        className="p-2 bg-transparent border border-gray-300 rounded placeholder-white text-black"
      />
      <button
        type="submit"
        className="bg-zinc-500 text-white p-2 rounded"
      >
        Save
      </button>
    </form>
  );
}

export default EditCommentForm;
