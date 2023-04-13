import localStorageManager from "./localStorageManager";
import delayFunction from "../../utilFunctions/utilFunctions";
import User from "../classes/user";
import Craftsman from "../classes/craftsman";

class UserManager {

    login = ({username, password}) => {
        delayFunction(localStorageManager.getItem, ["users"])
            .then(users => {
                let existingUser = users.find(user => user.username === username && user.password === password);
                if (existingUser) {
                    localStorageManager.setItem("loggedUser", existingUser);
                } else {
                    alert("there is no such user!")
                }
            })
    }

    register = ({name, email, phoneNumber, username, password, isClient}, id = null, skills = null) => {
        delayFunction(localStorageManager.getItem, ["users"])
            .then(users => {
                let existingUser = users.findIndex(user => user.username === username || user.email === email);
                let newUser = null;
                id = users.length;
                if (existingUser >= 0) {
                    alert("The username or email is already taken");
                } else {
                    if (isClient === "true") {
                        newUser = new User(name, username, password, email, phoneNumber, id, skills);
                    } else if(isClient === "false"){
                        newUser = new Craftsman(name, username, password, email, phoneNumber, skills, isClient, id)
                    }
                    users.push(newUser);
                    localStorageManager.setItem("users", users);
                    console.log(newUser)
                    return users;
                }
            })
    }


}

let userManager = new UserManager();
export default userManager;