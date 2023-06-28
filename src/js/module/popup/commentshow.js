const generateCommentHTML = (comment) => `
  <div class="comment container">
    <p>${comment.creation_date} ${comment.username}: ${comment.comment}</p>
  </div>
`;

export default generateCommentHTML;
