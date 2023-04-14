export default class Review {
    constructor (craftsmanId, clientId, offerId, reviewSummary, review, rating) {
        this.craftsmanId = craftsmanId;
        this.clientId = clientId;
        this.offerId = offerId;
        this.review = review;
        this.reviewSummary = reviewSummary;
        this.rating = rating;
        this.clientName = JSON.parse(localStorage.getItem("users")).find(user => user.id === this.clientId).name;
        this.craftsmanName = JSON.parse(localStorage.getItem("users")).find(user => user.id === this.craftsmanId).name;
    }
}

