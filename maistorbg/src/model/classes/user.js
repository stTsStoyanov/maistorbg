export default class User {
    constructor(name, username, password, email, phoneNumber, id = null) {
        this.name = name;
        this.username = username;
        this.password = password;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.isClient = true;
        this.id = id;
        this.photo = "https://us.123rf.com/450wm/apoev/apoev1806/apoev180600171/103284764-default-placeholder-fitness-trainer-in-a-t-shirt-half-length-portrait-photo-avatar-gray-color.jpg?ver=6"
    }
}