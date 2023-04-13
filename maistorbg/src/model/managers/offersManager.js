import localStorageManager from "./localStorageManager";
import { delayFunction, generateRandomId } from "../../utilFunctions/utilFunctions";

class OffersManager {

    async getAllOffers() {
        return await delayFunction(localStorageManager.getItem, ["allOffers"])
        .then(data => {
            return data;
        })
    }

    setOfferId = () => {
        return generateRandomId(this.getAllOffers);
    }

}

let offersManager = new OffersManager;
export default offersManager;