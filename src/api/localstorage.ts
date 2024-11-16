// jwt.ts
export const getJwtToken = () => {
	return localStorage.getItem("jwtToken");
};

export const setJwtToken = (token: string) => {
	localStorage.setItem("jwtToken", token);
};

export const removeJwtToken = () => {
	localStorage.removeItem("jwtToken");
};


export const getCurrentUser = () => {
	const user = localStorage.getItem("currentUser");
	return user
}

export const setCurrentUser = (user: number) => {
	localStorage.setItem("currentUser", user.toString());
};

export const isTutorialCompleted = () => {
	return localStorage.getItem("tutorialCompleted") === "true";
}

export const setTutorialCompleted = () => {
	localStorage.setItem("tutorialCompleted", "true");
};

export const getLastRefreshReferralRewards = () => {
	return localStorage.getItem("lastRefreshRewardsTime");
}

export const setLastRefreshReferralRewards = () => {
	localStorage.setItem("lastRefreshRewardsTime", Date.now().toString());
};