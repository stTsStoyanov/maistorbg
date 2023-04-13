import offersManager from "../managers/offersManager";

export default class Offer{

    constructor (offerTittle, offerText, offerImage, authorId, category) {
        this.offerTittle = offerTittle;
        this.offerText = offerText;
        this.offerImage = offerImage;
        this.authorId = authorId;
        this.category = category;
        this.offerId = offersManager.setOfferId();
    }
}