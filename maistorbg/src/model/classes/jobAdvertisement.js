export default class jobAdvertisement{

    constructor (offerTittle, offerText, offerImage, authorId, category) {
        this.offerTittle = offerTittle;
        this.offerText = offerText;
        this.offerImage = offerImage;
        this.authorId = authorId;
        this.category = category;
        this.offerId = JSON.parse(localStorage.getItem("allOffers")).length;
        this.creationDate = new Date().toLocaleString()
    }
}