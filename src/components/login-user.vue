<template>
  <div class="container right-panel-active" style="width: 950px;height: 565px">
    <!-- Register -->
    <div class="container__form container--signup">
      <form action="#" class="form" id="form1" @submit="handleSubmit">
        <h2 class="form__title">Register</h2>
        <input type="text" placeholder="Username" class="input" v-model="user.username"/>
        <input type="email" placeholder="Email" class="input" v-model="user.Email"/>
        <input type="password" placeholder="Password" class="input" v-model="user.Password"/>
        <input type="password" placeholder="Confirm Password" class="input" v-model="user.confirmPassword"/>
        <button class="btn">Register</button>
        <div v-if="error" class="error-message">{{ error }}</div>
      </form>
    </div>

    <!-- Sign In -->
    <div class="container__form container--signin">
      <form action="#" class="form" id="form2" @submit="handleSubmit2">
        <h2 class="form__title">Sign In</h2>
        <input type="email" placeholder="Email" class="input" v-model="user_login.Email"/>
        <input type="password" placeholder="Password" class="input" v-model="user_login.Password"/>
        <a href="#" class="link">Forgot your password?</a>
        <button class="btn">Sign In</button>
<!--        当errorMessage不为空时出现错误提示框-->
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      </form>
    </div>

    <!-- Overlay -->
    <div class="container__overlay">
      <div class="overlay">
        <div class="overlay__panel overlay--left">
          <img src="../assets/logo1.png" width="300px" height="240px">
          <button class="btn" id="signIn" >Sign In</button>
        </div>
        <div class="overlay__panel overlay--right">
          <img src="../assets/logo1.png" width="300px" height="240px">
          <button class="btn" id="signUp">Register</button>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup>
  import {ref,onMounted} from 'vue'
  import axios from 'axios'
  // const message=ref('');


  //JS
  onMounted(() => {
    const signInBtn = document.getElementById('signIn');
    const signUpBtn = document.getElementById('signUp');
    const fistForm = document.getElementById('form1');
    const secondForm = document.getElementById('form2');
    const container = document.querySelector('.container');

    signInBtn.addEventListener('click', () => {
      container.classList.remove('right-panel-active');
    });

    signUpBtn.addEventListener('click', () => {
      container.classList.add('right-panel-active');
    });

    fistForm.addEventListener('submit', (e) => e.preventDefault());
    secondForm.addEventListener('submit', (e) => e.preventDefault());
  });

  //用户注册
  const user=ref({username:'', Email:'',Password:'',confirmPassword:''})  //关联用户注册时的输入信息
  let error = '';
  const handleSubmit = (e) => {
    e.preventDefault();
    // // 输出用户输入的值
    // console.log('Username:', user.value.username);
    // console.log('Email:', user.value.Email);
    // console.log('Password:', user.value.Password);
    // console.log('Password:', user.value.confirmPassword);
    if (user.value.Password !== user.value.confirmPassword) {
      // 密码不一致，显示错误消息或执行相关操作
      error = 'Two password inputs are inconsistent';
      user.value.username = '';
      user.value.Email = '';
      user.value.Password = '';
      user.value.confirmPassword = '';
      return;
    }
    // 在这里可以进行进一步的处理，例如发送数据到后端等
    const { username, Email, Password, } = user.value; // 解构出属性
    axios
        .post(
            'http://localhost:8080/starAirlines/register',
            { username:username, email:Email, password: Password }, // 将解构后的属性作为请求体
            {
              headers: { 'Content-Type': 'application/json' }, // 设置请求头
            }
        )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
  };

  //用户登录操作
  const user_login=ref({Email:'',Password:''})  //初始时为空值
  let errorMessage = '';
  const handleSubmit2 = (e) => {
  e.preventDefault();
  // 输出用户输入的值
  const formData = new FormData();
  formData.append('account', user_login.value.Email);
  formData.append('password', user_login.value.Password);

  axios
      .post('http://localhost:8080/starAirlines/login', formData)
      .then(function (response) {
        console.log(response);
        if (response.data.msg === 'The account or password is incorrect') {
          // 用户账号密码输入错误，设置错误消息并清空输入框
          errorMessage = 'Account or password error';
          user_login.value.Email = '';
          user_login.value.Password = '';
        }
      })
      .catch(function (error) {
        console.log(error);
      });
};


</script>