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

// {
//     authorId: random Number;
//     jobAdvertisement: random Number;
//     offerText: text explaining what the offer is;
//     offeredSum: Number, which represents the sum for the job that will be done;
//     offeredTerm: the number of days it would take for the job to be done;
//     creationDate: new Date().toLocaleString()
// }