import API from './api';

export const issueService = {
  getIssues: async (params = {}) => {
    const response = await API.get('/issues', { params });
    return response.data;
  },

  createIssue: async (issueData) => {
    const response = await API.post('/issues', issueData);
    return response.data;
  },

  updateIssue: async (id, updateData) => {
    const response = await API.put(`/issues/${id}`, updateData);
    return response.data;
  },

  addComment: async (id, commentText) => {
    const response = await API.post(`/issues/${id}/comments`, { text: commentText });
    return response.data;
  }
};
