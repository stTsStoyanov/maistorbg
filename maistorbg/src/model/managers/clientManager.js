import jobAdvertisement from "../classes/jobAdvertisement";
import userManager from "./userManager"

class ClientManager {


    createJobAdvertisement = (offerTittle, offerText, offerImage, category) => {
        const loggedUserId = userManager.getLoggedUser().id;

        const offer = new jobAdvertisement(offerTittle, offerText, offerImage, category, loggedUserId)
    }

    createReview = () => {
        const loggedUserId = userManager.getLoggedUser().id;


    }

}