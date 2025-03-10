import { API_URL } from "../api";
console.log("API_URL is ", API_URL)

const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY || "user_";


export class AuthService {
    async login(email, password) {
        let data = JSON.stringify({ email: email, password: password })
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: "POST",
            body: data,
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json());

        if (response.token) {
            localStorage.setItem(TOKEN_KEY, response.token);
            return (true)
        } else {
            return (response.error)
        }
    }
    async signup(email, password) {
        let data = JSON.stringify({ email: email, password: password })
        const response = await fetch(`${API_URL}/api/auth/signup`, {
            method: "POST",
            body: data,
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json());

        if (response.token) {
            localStorage.setItem(TOKEN_KEY, response.token);
            return (true)
        } else {
            return (response.error)
        }
    }

    logout() {
        localStorage.removeItem(TOKEN_KEY);
    }

    saveUser(user = undefined) {
        if (!user) return;
        localStorage.setItem(TOKEN_KEY, JSON.stringify(user))
    }

    getUser() {
        try {
            return localStorage.getItem(TOKEN_KEY);
        } catch (err) {
            return {};
        }
    }

}


export const authService = new AuthService();
