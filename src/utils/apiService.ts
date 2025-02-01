import { API_URL } from "../helper/common";

export const apiFetch = async (
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
    body: object | null = null
): Promise<any> => {
    const url = `${API_URL}${endpoint}`;
    const options: RequestInit = {
        method,
        body: body ? JSON.stringify(body) : null,
        headers: {
            "Content-Type": "application/json",
        },
    };
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
};





