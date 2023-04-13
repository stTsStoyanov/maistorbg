export default class User {
    constructor(name, username, password, email, phoneNumber, isClient = true, id = null) {
        this.name = name;
        this.username = username;
        this.password = password;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.isClient = isClient;
        this.id = id;
    }
}