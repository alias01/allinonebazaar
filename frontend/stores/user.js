import { defineStore } from "pinia";
import httpAxios from "../utils/axios";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  let usernameMsgObj = ref(null);

  async function checkUserAvailability(username) {
    try {
      const res = await httpAxios.post("/username-availability", {
        username: username,
      });
      usernameMsgObj.value = res.data;
    } catch (err) {
      console.log(err);
    }
  }

  async function newUserSignup(userObj) {
    try {
      const res = await httpAxios.post("/signup", userObj);
      console.log("newUserSignup", res);
    } catch (err) {
      console.log(err);
    }
  }

  return { usernameMsgObj, checkUserAvailability, newUserSignup };
});
