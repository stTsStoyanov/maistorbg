export default class jobAdvertisement{

    constructor (jobAdvertisementTittle, jobAdvertisementText, jobAdvertisementImage, authorId, category) {
        this.jobAdvertisementTittle = jobAdvertisementTittle;
        this.jobAdvertisementText = jobAdvertisementText;
        this.jobAdvertisementImage = jobAdvertisementImage;
        this.authorId = authorId;
        this.category = category;
        this.jobAdvertisementId = JSON.parse(localStorage.getItem("allJobAdvertisements")).length;
        this.creationDate = new Date().toLocaleString();
        this.isOfferTaken = false;
        this.offers = [];
    }
}

