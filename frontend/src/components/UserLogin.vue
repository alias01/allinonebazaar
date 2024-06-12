<template>
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
        ref="formRef"
        v-if="isNewUser"
        :label-width="80"
        :model="formValue"
        :rules="rules"
      >
        <n-form-item label="Username" path="username">
          <n-input
            v-model:value="formValue.username"
            placeholder="Enter Username"
          />
        </n-form-item>
        <n-form-item path="password" label="Password">
          <n-input
            v-model:value="formValue.password"
            type="password"
            @input="handlePasswordInput"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item
          ref="rPasswordFormItemRef"
          first
          path="reenteredPassword"
          label="Re-enter Password"
        >
          <n-input
            v-model:value="formValue.reenteredPassword"
            :disabled="!formValue.password"
            type="password"
            @keydown.enter.prevent
          />
        </n-form-item>
        <p class="form-clause">
          By continuing, you agree to allinonebazaar's Terms of Use and Privacy
          Policy.
        </p>
        <n-form-item v-model:value="formValue.phone">
          <n-button @click="handleValidateClick" type="info">
            Sign Up
          </n-button>
        </n-form-item>
      </n-form>
      <n-form
        ref="formRef"
        v-else
        :label-width="80"
        :model="formValue"
        :rules="rules"
      >
        <n-form-item label="Username" path="username">
          <n-input
            v-model:value="formValue.username"
            placeholder="Enter Username"
          />
        </n-form-item>
        <n-form-item path="password" label="Password">
          <n-input
            v-model:value="formValue.password"
            type="password"
            @input="handlePasswordInput"
            @keydown.enter.prevent
          />
        </n-form-item>
        <p class="form-clause">
          By continuing, you agree to allinonebazaar's Terms of Use and Privacy
          Policy.
        </p>
        <n-form-item v-model:value="formValue.phone">
          <n-button @click="handleValidateClick" type="info">
            Sign In
          </n-button>
        </n-form-item>
      </n-form>
      <p v-if="!isNewUser" class="form-footer-link" @click="handleNewUserClick">
        New to allinonebazaar? Create an account
      </p>
    </div>
  </div>
</template>

<script setup>
import { NForm, NFormItem, NButton, NInput, useMessage } from "naive-ui";
import { ref } from "vue";

const isNewUser = ref(false);
const formRef = ref(null);
// const message = useMessage();
const formValue = ref({
  username: null,
  password: null,
  reenteredPassword: null,
});

const rules = {
  username: {
    required: true,
    trigger: "blur",
    validator: (rule, value) => {
      return new Promise((resolve, reject) => {
        if (value !== "testName") {
          reject(Error("error name"));
        } else {
          resolve();
        }
      });
    },
  },

  password: [
    {
      required: true,
      message: "Password is required",
    },
  ],
  reenteredPassword: [
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

function validatePasswordStartWith(rule, value) {
  return (
    !!formValue.value.password &&
    formValue.value.password.startsWith(value) &&
    formValue.value.password.length >= value.length
  );
}
function validatePasswordSame(rule, value) {
  return value === formValue.value.password;
}

function handleValidateClick(e) {
  e.preventDefault();
  const messageReactive = message.loading("Verifying", {
    duration: 0,
  });
  formRef.value?.validate((errors) => {
    if (!errors) {
      message.success("Valid");
    } else {
      message.error("Invalid");
      console.log("errors", errors);
    }
    messageReactive.destroy();
  });
}

function handleNewUserClick(e) {
  e.preventDefault();
  isNewUser.value = !isNewUser.value;
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
    }
  }
}
</style>
