import localStorageManager from "./localStorageManager";
import { delayFunction, generateRandomId } from "../../utilFunctions/utilFunctions";
import User from "../classes/user";
import Craftsman from "../classes/craftsman";

class UserManager {

  login = ({ username, password }) => {
    return new Promise((resolve, reject) => {
      delayFunction(localStorageManager.getItem, ["users"])
        .then(users => {
          let existingUser = users.find(user => user.username === username && user.password === password);
          if (existingUser) {
            localStorageManager.setItem("loggedUser", existingUser);
            resolve(existingUser);
          } else {
            reject(new Error("Грешно потребителско име и/или парола"));
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  };



  register = async ({ name, email, phoneNumber, username, password, isClient }, id = null, skills = null) => {
    try {
      const users = await delayFunction(localStorageManager.getItem, ["users"]);

      const existingUser = users.find(user => user.username === username || user.email === email);
      if (existingUser) {
        return false;
      }

      const newUser = isClient === "true" ? new User(name, username, password, email, phoneNumber, id, skills) :
        new Craftsman(name, username, password, email, phoneNumber, skills, isClient, id);
      newUser.id = users.length;
      users.push(newUser);
      localStorageManager.setItem("users", users);
      return users;
    } catch (error) {
      return null;
    }
  }

  acceptOffer = () => {

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


}

let userManager = new UserManager();
export default userManager;