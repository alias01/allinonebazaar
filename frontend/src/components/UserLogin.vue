<template>
  <n-modal v-model:show="showModal">
    <div class="login-container">
      <div class="left-side">
        <div class="content" v-if="isNewUser">
          <h1>Looks like you're new here!</h1>
          <p>Sign up with your mobile number to get started</p>
        </div>
        <div class="content" v-else>
          <h1>Login</h1>
          <p>Get access to your Orders, Wishlist and Recommendations</p>
        </div>
        <div class="image-container">
          <img src="../assets/login_cart.png" alt="cart" />
        </div>
      </div>
      <div class="right-side">
        <n-form
          ref="newUserformRef"
          v-if="isNewUser"
          :label-width="80"
          :model="newUserformValue"
          :rules="newUserRules"
        >
          <n-form-item label="Username" path="username">
            <n-input
              v-model:value="newUserformValue.username"
              placeholder="Enter Username"
            />
          </n-form-item>
          <n-form-item path="password" label="Password">
            <n-input
              v-model:value="newUserformValue.password"
              type="password"
              @input="handlePasswordInput"
              @keydown.enter.prevent
            />
          </n-form-item>
          <n-form-item
            ref="rPasswordFormItemRef"
            first
            path="repeatPassword"
            label="Re-enter Password"
          >
            <n-input
              v-model:value="newUserformValue.repeatPassword"
              :disabled="!newUserformValue.password"
              type="password"
              @keydown.enter.prevent
            />
          </n-form-item>
          <p class="form-clause">
            By continuing, you agree to allinonebazaar's Terms of Use and
            Privacy Policy.
          </p>
          <n-form-item v-model:value="newUserformValue.phone">
            <n-button @click="signUp" type="info"> Sign Up </n-button>
          </n-form-item>
        </n-form>
        <n-form
          ref="oldUserformRef"
          v-else
          :label-width="80"
          :model="oldUserformValue"
          :rules="oldUserRules"
        >
          <n-form-item label="Username" path="username">
            <n-input
              v-model:value="oldUserformValue.username"
              placeholder="Enter Username"
            />
          </n-form-item>
          <n-form-item path="password" label="Password">
            <n-input
              v-model:value="oldUserformValue.password"
              type="password"
              @input="handlePasswordInput"
              @keydown.enter.prevent
            />
          </n-form-item>
          <p class="form-clause">
            By continuing, you agree to allinonebazaar's Terms of Use and
            Privacy Policy.
          </p>
          <n-form-item v-model:value="oldUserformValue.phone">
            <n-button @click="signIn" type="info"> Sign In </n-button>
          </n-form-item>
        </n-form>
        <p
          v-if="!isNewUser"
          class="form-footer-link"
          @click="handleNewUserClick"
        >
          New to allinonebazaar? Create an account
        </p>
      </div>
    </div>
  </n-modal>
</template>

<script setup>
import { useMessage } from "naive-ui";
import { ref } from "vue";
import { useUserStore } from "../../stores/user";

const message = useMessage();
const showModal = ref(false);
const isNewUser = ref(false);

const newUserformRef = ref(null);
const newUserformValue = ref({
  username: null,
  password: null,
  repeatPassword: null,
});
const newUserRules = {
  username: [
    {
      required: true,
      trigger: "blur",
      asyncValidator: (rule, value) => {
        return new Promise(async (resolve, reject) => {
          await userStore.checkUserAvailability(value);
          if (userStore.usernameAvailabilityMsg?.error) {
            reject(userStore.usernameAvailabilityMsg.message);
          } else {
            resolve();
          }
        });
      },
    },
  ],
  password: [
    {
      required: true,
      message: "Password is required",
    },
  ],
  repeatPassword: [
    {
      required: true,
      message: "Re-entered password is required",
      trigger: ["input", "blur"],
    },
    {
      validator: validatePasswordStartWith,
      message: "Password is not same as re-entered password!",
      trigger: "input",
    },
    {
      validator: validatePasswordSame,
      message: "Password is not same as re-entered password!",
      trigger: ["blur", "password-input"],
    },
  ],
};

const oldUserformRef = ref(null);
const oldUserformValue = ref({
  username: null,
  password: null,
});
const oldUserRules = {
  username: [
    {
      required: true,
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "Password is required",
    },
  ],
  repeatPassword: [
    {
      required: true,
      message: "Re-entered password is required",
      trigger: ["input", "blur"],
    },
    {
      validator: validatePasswordStartWith,
      message: "Password is not same as re-entered password!",
      trigger: "input",
    },
    {
      validator: validatePasswordSame,
      message: "Password is not same as re-entered password!",
      trigger: ["blur", "password-input"],
    },
  ],
};

const userStore = useUserStore();

function handlePasswordInput() {
  // handle re-entered password input
  if (newUserformValue.value.repeatPassword) {
    rPasswordFormItemRef.value?.validate({ trigger: "password-input" });
  }
}

function validatePasswordStartWith(rule, value) {
  return (
    !!newUserformValue.value.password &&
    newUserformValue.value.password.startsWith(value) &&
    newUserformValue.value.password.length >= value.length
  );
}

function validatePasswordSame(rule, value) {
  return value === newUserformValue.value.password;
}

function signIn(e) {
  e.preventDefault();
  const messageReactive = message.loading("Verifying", {
    duration: 0,
  });
  oldUserformRef.value?.validate(async (errors) => {
    if (!errors) {
      let isUserExist = await userStore.loginUser(oldUserformValue.value);
      if (isUserExist) {
        showModal.value = false;
      } else {
        message.error("Oops something went wrong!");
      }
    } else {
      message.error("Invalid");
      console.log("errors", errors);
    }
    messageReactive.destroy();
  });
}

function signUp(e) {
  e.preventDefault();

  const messageReactive = message.loading("Verifying", {
    duration: 0,
  });

  newUserformRef.value?.validate(async (errors) => {
    if (!errors) {
      await userStore.newUserSignup(newUserformValue.value);
      if (userStore.signUpUserObj.error) {
        message.error(`${userStore.signUpUserObj.msg}`);
      } else {
        isNewUser.value = false;
      }
    } else {
      message.error("Invalid");
      console.log("errors", errors);
    }
    messageReactive.destroy();
  });
}

function handleNewUserClick(e) {
  e.preventDefault();
  isNewUser.value = true;
}
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  color: #212121;
  margin: 0 auto;
  border-radius: 2px;
  height: 528px;
  max-width: 750px;
  min-width: 650px;
  justify-content: space-between;
  background-color: white;

  .left-side {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #212427;
    padding: 40px 33px;
    font-size: 15px;
    width: 40%;

    .content {
      text-align: left;

      h1 {
        font-size: 28px;
        font-weight: 500;
      }
    }

    .image-container {
      text-align: center;
    }
  }

  .right-side {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 56px 35px 16px;
    width: 60%;

    .form-clause {
      text-align: left;
    }

    :deep(.n-button) {
      width: 100%;
    }

    .form-footer-link {
      color: #2874f0;
      font-weight: 500;
      cursor: pointer;
      text-align: center;
    }
  }
}
</style>
