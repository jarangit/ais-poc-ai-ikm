import axios from 'axios';

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || 'https://your-default-endpoint.com';
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN || '';
const NEXT_PUBLIC_ELASTIC_URL = process.env.NEXT_PUBLIC_ELASTIC_URL || 'https://your-elastic-url.com';
const NEXT_PUBLIC_ELASTIC_API_KEY = process.env.NEXT_PUBLIC_ELASTIC_API_KEY || 'your-elastic-api-key';

const axiosInstance = axios.create({
	baseURL: NEXT_PUBLIC_ELASTIC_URL,
	headers: {
		'Authorization': `ApiKey ${NEXT_PUBLIC_ELASTIC_API_KEY}`,
		'Content-Type': 'application/json',
	},
});

export default axiosInstance;
