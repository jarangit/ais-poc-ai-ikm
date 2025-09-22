import axiosInstance from "./axios";

export const esService = {
  // Define your Elasticsearch related API calls here
  list: async () => {
    // Example: Fetch list of documents from Elasticsearch
    const response = await axiosInstance.get(`/docs/_search`, {
      params: {
        q: "*",
        size: 100,
      },
    });
    return response.data.hits.hits;
  },
};
