import { fetchWithAuth } from "./fetchWithAuth";

export const createStudy = (data) => {
    return fetchWithAuth("http://localhost:8080/api/studies", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
};