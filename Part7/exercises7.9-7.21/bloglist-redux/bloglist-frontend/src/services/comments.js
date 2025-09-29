import axios from 'axios'

const create = async (blogId, content) => {
  await axios.post(`/api/blogs/${blogId}/comments`, { content })
}

export default {
  create,
}
