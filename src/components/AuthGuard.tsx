// AuthGuard.tsx
import { useEffect } from "react";
import {
	getCurrentUser,
	setCurrentUser,
	setJwtToken,
} from "@/api/localstorage";
import api from "@/api/axios";
import { useUserStore } from "@/store/user";
import { notFound, useRouter } from "next/navigation";
import LoadingPage from "@/components/LoadingPage";
import { useAuthStore } from "@/store/auth";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { useDidMount } from "@/hooks/useDidMount";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
	const { user, setUser, clearUser } = useUserStore();
	const router = useRouter();
	const { loading, setLoading, setAuthenticated, authenticated } =
		useAuthStore();
	const didMount = useDidMount();
	const { initDataRaw, initData } = retrieveLaunchParams();
	const checkInterval = 60000;
	const isNewUser = () => {
		const userId = initData?.user?.id || null;
		console.log("Checking if new user...", userId);

		const cachedUserId = getCurrentUser();
		if (!userId) return;
		if (userId.toString() !== cachedUserId) {
			const error = new Error("Unauthorized");
			(error as any).response = { status: 401 };
			throw error;
		}
		return;
	};
	const checkAuth = async () => {
		const startTime = Date.now();
		try {
			console.log("Checking auth...");
			isNewUser();
			const response = await api.get("/api/user/me");
			setUser(response.data.user);
			setAuthenticated(true);
		} catch (error: any) {
			console.log("Error checking auth:", error);

			if (error.response && error.response.status === 401) {
				console.log("Unauthorized, trying to reconnect...");

				try {
					const tgData = initDataRaw;

					if (tgData) {
						const refreshResponse = await api.post("/api/connect", {
							tg_data: tgData,
						});
						const { token } = refreshResponse.data;
						setJwtToken(token);
						api.defaults.headers.Authorization = `Bearer ${token}`;

						const retryResponse = await api.get("/api/user/me");
						setUser(retryResponse.data.user);
						setCurrentUser(initData?.user?.id!);
						setAuthenticated(true);
					} else {
						clearUser();
						setAuthenticated(false);
					}
				} catch (refreshError) {
					clearUser();
					setAuthenticated(false);
				}
			} else {
				clearUser();
				setAuthenticated(false);
			}
		} finally {
			// setLoading(false);
			const elapsedTime = Date.now() - startTime;
			const remainingTime = Math.max(2000 - elapsedTime, 0);
			setTimeout(() => {
				setLoading(false);
			}, remainingTime);
		}
	};

	useEffect(() => {
		checkAuth();
		const interval = setInterval(() => {
			checkAuth();
		}, checkInterval);

		return () => clearInterval(interval);
	}, [setUser, clearUser]);

	if (loading) {
		return <LoadingPage />;
	}

	if (!authenticated) {
		return notFound(); // Replace with your custom 404 component or page
	}

	return <>{children}</>;
};

export default AuthGuard;
