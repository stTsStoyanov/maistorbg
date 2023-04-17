import jobAdvertisement from "./jobAdvertisement";

export default class Offer {
    constructor(authorId, jobAdvertisementId, offerText, offeredSum, offeredTerm) {
        this.authorId = authorId;
        this.jobAdvertisementId = jobAdvertisementId;
        this.offerText = offerText;
        this.offeredSum = offeredSum;
        this.offeredTerm = offeredTerm;
        this.isAccepted = null;
        this.creationDate = new Date().toLocaleString();
    }
}