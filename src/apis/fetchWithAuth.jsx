const refreshToken = async () => {
    const res = await fetch("http://localhost:8080/api/auth/refresh", {
        method: "POST",
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("토큰 재발급 실패");
    }

    const data = await res.json();
    const newToken = data.data.accessToken;

    localStorage.setItem("accessToken", newToken);
    return newToken;
};

export const fetchWithAuth = async (url, options = {}) => {
    let token = localStorage.getItem("accessToken");

    let response = await fetch(url, {
        ...options,
        headers: {
            ...(options.headers || {}),
            Authorization: `Bearer ${token}`,
        },
        credentials: "include",
    });

    if (response.status === 401 || response.status === 403) {
        try {
            token = await refreshToken();
            response = await fetch(url, {
                ...options,
                headers: {
                    ...(options.headers || {}),
                    Authorization: `Bearer ${token}`,
                },
                credentials: "include",
            });
        } catch (err) {
            console.error("재로그인 필요");
            localStorage.removeItem("accessToken");
            window.location.href = "/login";
        }
    }

    return response;
};