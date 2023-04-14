import users from "../../data/users";
import articles from "../../data/articles";
import dummyData from "../../data/dummyData";

class LocalStorageManager {
    
    constructor() {
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

    async initializeReviews() {
        const data = await this.getItem("allReviews");
        if(!data) {
            this.setItem("allReviews", dummyData)
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

    loggedUser = () =>{
        const logged = JSON.parse(localStorage.getItem('loggedUser'));
        let flag = null;
        if(logged){
            flag = true;
        }else{
            flag = false;
        }
        return flag;
    }
}

let localStorageManager = new LocalStorageManager();
export default localStorageManager;
