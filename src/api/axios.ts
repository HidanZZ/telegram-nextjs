// api.ts
import axios from "axios";
import { getJwtToken, removeJwtToken } from "./localstorage";
import { useAuthStore } from "@/store/auth";

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// Request interceptor to add JWT token to headers
api.interceptors.request.use(
	(config) => {
		const token = getJwtToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response && error.response.status === 401) {
			console.log("refreshing token");

			// Token expired or unauthorized, remove token and redirect to login
			removeJwtToken();
		}
		return Promise.reject(error);
	}
);

export default api;
