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

// import userManager from "../managers/userManager";

// export default class User {
//     constructor(name, username, password, email, phoneNumber, isClient = true) {
//         this.name = name;
//         this.username = username;
//         this.password = password;
//         this.email = email;
//         this.phoneNumber = phoneNumber;
//         this.isClient = isClient;
//         this.id = userManager.setUserId();
//     }
// }