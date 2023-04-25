export default class Review {
    constructor (craftsmanId, clientId, offerId, reviewSummary, review, rating, jobAdvertisementId) {
        this.craftsmanId = craftsmanId;
        this.clientId = clientId;
        this.offerId = offerId;
        this.review = review;
        this.reviewSummary = reviewSummary;
        this.jobAdvertisementId = jobAdvertisementId;
        this.rating = rating;
        this.creationDate =  new Date().toLocaleString();
    }
}

