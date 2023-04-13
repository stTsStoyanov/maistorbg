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
    }
}



// export default class Craftsman {
//     constructor(name, username, password, email, phoneNumber, skills, isClient = false, id = null, allRatings) {
//         this.name = name;
//         this.username = username;
//         this.password = password;
//         this.email = email;
//         this.phoneNumber = phoneNumber;
//         this.skills = skills;
//         this.allRatings = allRatings || [];
//         this.id = id;
//         this.averageRating = this.allRatings.reduce((accumulator, currentValue) => {
//             return accumulator + currentValue;
//         }, 0) / this.allRatings.length || null;
//         this.isClient = isClient;
//     }
// }