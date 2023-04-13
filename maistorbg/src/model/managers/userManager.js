import localStorageManager from "./localStorageManager";
import { delayFunction, generateRandomId } from "../../utilFunctions/utilFunctions";
import User from "../classes/user";
import Craftsman from "../classes/craftsman";

class UserManager {

    login = ({ username, password }) => {
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

    register = async ({ name, email, phoneNumber, username, password, isClient }, id = null, skills = null) => {
        try {
          const users = await delayFunction(localStorageManager.getItem, ["users"]);
      
          const existingUser = users.find(user => user.username === username || user.email === email);
          if (existingUser) {
            alert("The username or email is already taken");
            return null;
          }
      
          const newUser = isClient === "true" ? new User(name, username, password, email, phoneNumber, id, skills) :
                                                 new Craftsman(name, username, password, email, phoneNumber, skills, isClient, id);
          newUser.id = users.length;
          users.push(newUser);
          localStorageManager.setItem("users", users);
      
          console.log(newUser);
          return users;
        } catch (error) {
          console.error(error);
          return null;
        }
      }

    logout = () => {
        localStorageManager.setItem("loggedUser", null);
    }

    async getLoggedUser() {
        return await delayFunction(localStorageManager.getItem, ["loggedUser"])
            .then(data => {
               return data;
            });
    }

    // getAllUsers() {
    //  JSON.parse(localStorage.getItem("users"))
    // }

    // setUserId = () => {
    //     const x =this.getAllUsers()
    //     return generateRandomId(x);
    // }

}

let userManager = new UserManager();
export default userManager;