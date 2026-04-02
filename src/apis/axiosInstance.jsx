import axios from "axios";

const api = axios.create({
    baseURL: "/api",
    withCredentials: true, // 쿠키 보내기 필수
});

// 요청 인터셉터 (accessToken 붙이기)
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// 응답 인터셉터 (토큰 만료 처리)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // 403 or 401 → 토큰 만료
        if ((error.response?.status === 401 || error.response?.status === 403)
            && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const res = await axios.post("/api/auth/refresh", {}, {
                    withCredentials: true, // 쿠키 포함
                });

                const newAccessToken = res.data.data.accessToken;
                localStorage.setItem("accessToken", newAccessToken);

                // 기존 요청 재시도
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);

            } catch (refreshError) {
                // refresh도 실패 → 로그인 페이지로
                alert("세션이 만료되었습니다. 다시 로그인해주세요.");
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

export default api;