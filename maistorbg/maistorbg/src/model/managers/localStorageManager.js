import users from "../../data/users";
import articles from "../../data/articles";

class LocalStorageManager {
    
    constructor() {
        this.initializeAllUsers();
        this.initializeArticles();
    }

    async initializeAllUsers() {
        const data = await this.getItem("users");
        if (!data) {
            this.setItem("users", users);
        }
    }

    async initializeArticles() {
        const data = await this.getItem("articles");
        if(!data) {
            this.setItem("articles", articles)
        }
    }

    getItem = (key) => {
        return new Promise((res, rej) => {
            const data = JSON.parse(localStorage.getItem(key));
            res(data);
        });
    };

    setItem = (key, item) => {
        localStorage.setItem(key, JSON.stringify(item));
    };

    deleteItem = (key) => {
        localStorage.removeItem(key);
    };
}

let localStorageManager = new LocalStorageManager();
export default localStorageManager;
