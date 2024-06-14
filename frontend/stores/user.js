import { defineStore } from "pinia";
import httpAxios from "../utils/axios";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  let usernameAvailabilityMsg = ref(null);
  let signUpUserObj = ref(null);

  async function checkUserAvailability(username) {
    try {
      const res = await httpAxios.post("/username-availability", {
        username: username,
      });
      usernameAvailabilityMsg.value = res.data;
    } catch (err) {
      console.log(err);
    }
  }

  async function newUserSignup(userObj) {
    try {
      const res = await httpAxios.post("/signup", userObj);
      if (res.data.error) {
        signUpUserObj.value = {
          error: res.data.error,
          msg: res.data.message,
        };
      } else {
        signUpUserObj.value = {
          error: res.data.error,
          msg: res.data.message,
        };
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function loginUser(userObj) {
    try {
      const res = await httpAxios.post("/login", userObj);
      if (res.status === 200) {
        // write token saving logic
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
    }
  }

  return {
    usernameAvailabilityMsg,
    checkUserAvailability,
    newUserSignup,
    signUpUserObj,
    loginUser,
  };
});
