<template>
  <div class="login-container">
    <div class="left-side">
      <h1>Login</h1>
      <p>Get access to your Orders, Wishlist and Recommendations</p>
    </div>
    <div class="right-side">
      <n-form
        ref="formRef"
        inline
        :label-width="80"
        :model="formValue"
        :rules="rules"
      >
        <n-form-item label="Name" path="user.name">
          <n-input
            v-model:value="formValue.user.name"
            placeholder="Input Name"
          />
        </n-form-item>
        <n-form-item label="Age" path="user.age">
          <n-input v-model:value="formValue.user.age" placeholder="Input Age" />
        </n-form-item>
        <n-form-item label="Adress" path="user.address">
          <n-input
            v-model:value="formValue.user.address"
            placeholder="Input Address"
          />
        </n-form-item>
        <n-form-item label="Phone" path="phone">
          <n-input v-model:value="formValue.phone" placeholder="Phone Number" />
        </n-form-item>
        <n-form-item v-model:value="formValue.phone">
          <n-button @click="handleValidateClick"> Validate </n-button>
        </n-form-item>
      </n-form>

      <pre>
 {{ JSON.stringify(formValue, null, 2) }}
    </pre
      >
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
