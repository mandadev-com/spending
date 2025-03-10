import { API_URL } from "../api";
import { authService } from "./auth.services";

const date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1
month = `${month}`
if (month.length === 1) {
    month = `0${month}`
}
let current = `${year}-${month}`

const token = authService.getUser()



export class ProductsService {
    async getFinance(tk) {
        const token = authService.getUser()

        const res = await fetch(`${API_URL}/api/finance/${current}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": tk
            }
        });
        return res.json();
    }
    async getFinanceByTerm(term) {
        const token = authService.getUser()
        const res = await fetch(`${API_URL}/api/finance/${term}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });
        const data = await res.json();
        if (data.error) {
            console.log("data.error")
            return {
                status: false,
                error: data.error
            };
        }

        return {
            status: true,
            data: data
        };
    }
    async postExpense(name, amount, occurrence, term) {
        const token = authService.getUser()

        if (term === "current") {
            term = current
        }
        let data = JSON.stringify({ "name": name, 'amount': amount, "term": term, 'occurrence': occurrence })
        return await fetch(`${API_URL}/api/expense/add`, {
            method: "POST",
            body: data,
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        }).then(res => res.json());
    }
    async postIncome(name, amount, occurrence, term) {
        const token = authService.getUser()

        if (term === "current") {
            term = current
        }
        let data = JSON.stringify({ "name": name, 'amount': amount, "term": term, 'occurrence': occurrence })
        return await fetch(`${API_URL}/api/income/add`, {
            method: "POST",
            body: data,
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        }).then(res => res.json());
    }
    async remove(id) {
        const token = authService.getUser()

        return await fetch(`${API_URL}/api/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        }).then(res => res.json());

    }
    async account(tk) {
        const token = authService.getUser()

        return await fetch(`${API_URL}/api/auth/account`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": tk
            }
        }).then(res => res.json());

    }

    async getCode() {
        const token = authService.getUser()
        const res = await fetch(`${API_URL}/api/auth/code`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })
        return (res.json())
    }
}

export const productsService = new ProductsService();
