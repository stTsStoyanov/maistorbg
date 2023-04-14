import Offer from "../classes/jobAdvertisement"
import userManager from "./userManager"

class ClientManager {


    createOffer = (offerTittle, offerText, offerImage, category) => {
        const loggedUserId = userManager.getLoggedUser.id;

        return new Offer(offerTittle, offerText, offerImage, category, loggedUserId)
    }

}