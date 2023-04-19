import users from "../../data/users";
import articles from "../../data/articles";
import reviews from "../../data/reviews";
import jobAdvertisements from "../../data/jobAdvertisements";
import craftsmenCategories from "../../data/craftsmenCategories";

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
        if (!data) {
            this.setItem("articles", articles)
        }
    }

    async initializeReviews() {
        const data = await this.getItem("allReviews");
        if (!data) {
            this.setItem("allReviews", reviews)
        }
    }

    async initializeJobAdvertisements() {
        const data = await this.getItem("allJobAdvertisements");
        if (!data) {
            this.setItem("allJobAdvertisements", jobAdvertisements)
        }
    }

    async initializeCraftsmenCategories() {
        const data = await this.getItem("craftsmenCategories");
        if (!data) {
            this.setItem("craftsmenCategories", craftsmenCategories)
        }
    }

    async initializeOffers() {
        const data = await this.getItem("allOffers");
        if (!data) {
            this.setItem("allOffers",[])
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

    loggedUser = () => {
        const logged = JSON.parse(localStorage.getItem('loggedUser'));
        let flag = null;
        if (logged) {
            flag = true;
        } else {
            flag = false;
        }
        return flag;
    }




    '[{"authorId":273767,"jobAdvertisementId":20,"offerText":"SasASasASsaAS","offeredSum":"3","offeredTerm":"3","isAccepted":false,"creationDate":"4/18/2023, 12:58:51 AM"},{"authorId":273767,"jobAdvertisementId":20,"offerText":"SasASasASa","offeredSum":"2","offeredTerm":"2","isAccepted":false,"creationDate":"4/18/2023, 12:58:57 AM"},{"authorId":273767,"jobAdvertisementId":20,"offerText":"xZxAsAzsASsA","offeredSum":"2","offeredTerm":"2","isAccepted":false,"creationDate":"4/18/2023, 12:59:03 AM"},{"authorId":273767,"jobAdvertisementId":21,"offerText":"asASasASasdasas","offeredSum":"3","offeredTerm":"3","isAccepted":false,"creationDate":"4/18/2023, 12:59:17 AM"},{"authorId":273767,"jobAdvertisementId":21,"offerText":"asdasdasdasdas","offeredSum":"3","offeredTerm":"3","isAccepted":false,"creationDate":"4/18/2023, 12:59:20 AM"},{"authorId":273767,"jobAdvertisementId":21,"offerText":"ASsASsA","offeredSum":"3","offeredTerm":"3","isAccepted":false,"creationDate":"4/18/2023, 12:59:24 AM"}]'
}

let localStorageManager = new LocalStorageManager();
export default localStorageManager;
