export default class Craftsman {
    constructor(name, username, password, email, phoneNumber, skills, isClient, id) {
        this.name = name;
        this.username = username;
        this.password = password;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.skills = skills;
        this.allRatings = [];
        this.id = id;
        this.averageRating = this.allRatings.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0) / this.allRatings.length || null;
        this.isClient = isClient;
        this.photo = "https://us.123rf.com/450wm/apoev/apoev1806/apoev180600171/103284764-default-placeholder-fitness-trainer-in-a-t-shirt-half-length-portrait-photo-avatar-gray-color.jpg?ver=6"
    }
}