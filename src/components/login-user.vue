<template>
  <div class="container right-panel-active" style="width: 950px;height: 565px">
    <!-- Sign Up -->
    <div class="container__form container--signup">
      <form action="#" class="form" id="form1" @submit="handleSubmit">
        <h2 class="form__title">Sign Up</h2>
        <input type="text" placeholder="User" class="input" v-model="user.username"/>
        <input type="email" placeholder="Email" class="input" v-model="user.Email"/>
        <input type="password" placeholder="Password" class="input" v-model="user.Password"/>
        <button class="btn">Sign Up</button>
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
      </form>
    </div>

    <!-- Overlay -->
    <div class="container__overlay">
      <div class="overlay">
        <div class="overlay__panel overlay--left">
          <img src="../assets/logo1.png" width="300px" height="240px">
          <button class="btn" id="signIn">Sign In</button>
        </div>
        <div class="overlay__panel overlay--right">
          <img src="../assets/logo1.png" width="300px" height="240px">
          <button class="btn" id="signUp">Sign Up</button>
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
  const user=ref({username:'', Email:'',Password:''})  //关联用户注册时的输入信息
  const handleSubmit = (e) => {
    e.preventDefault();
    // 输出用户输入的值
    console.log('Username:', user.value.username);
    console.log('Email:', user.value.Email);
    console.log('Password:', user.value.Password);

    // 在这里可以进行进一步的处理，例如发送数据到后端等
    const { username, Email, Password } = user.value; // 解构出属性
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
            // 弹出错误提示框
            alert('账户或密码输入错误');

            // 清空输入框中的账户和密码
            user_login.value.Email = '';
            user_login.value.Password = '';
          }
        })
        .catch(function (error) {
          console.log(error);
        });
  };


</script>