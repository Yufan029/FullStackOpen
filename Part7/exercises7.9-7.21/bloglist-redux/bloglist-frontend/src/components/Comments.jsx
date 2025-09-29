import commentService from '../services/comments'

const Comments = ({ blogId, comments }) => {
  console.log(comments)
  const handleSubmit = async (event) => {
    const content = event.target.comment.value
    await commentService.create(blogId, content)
    event.target.comment.value = ''
  }

  return (
    <div>
      <h4>Comments</h4>
      <form onSubmit={handleSubmit}>
        <input type='text' name='comment' />
        <button>add comment</button>
      </form>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  )
}

export default Comments
