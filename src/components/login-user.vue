<template>
  <index-header></index-header>
  <div id="login">
    <div class="container right-panel-active" style="width: 60vw;height: 73vh;">
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

<!--      错误提示框-->
      <el-dialog  v-model="centerDialogVisible" title="Warning" class="dialog-mistake" center :z-index="9999" style="z-index: 9999;">
        <span>
      Account or password error！
    </span>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">
          Confirm
        </el-button>
      </span>
        </template>
      </el-dialog>
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
          <div class="overlay__panel overlay--left" >
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

  </div>
</template>



<script setup>
  import {ref,onMounted} from 'vue'
  import axios from 'axios'
  import IndexHeader from "@/components/IndexHeader.vue";
  // const centerDialogVisible = ref(false)

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
  const centerDialogVisible = ref(false)
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
          // centerDialogVisible = 'Account or password error';
          centerDialogVisible.value = true
          user_login.value.Email = '';
          user_login.value.Password = '';
        }
      })
      .catch(function (error) {
        console.log(error);
      });
};


</script>
<style>
.dialog-mistake{
  width:30%;
  z-index:9999 !important;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
.small-input{
  width: 200px !important;
  padding: 2px 7px;
  font-size: 12px;
  border: black 2px !important;
}
.small-input .el-input input {
  border-color: black !important;
  border: 2px;
}
.black-aside {
  background-color: black;
  color: white; /* 可选，设置文字颜色为白色 */
}
:root {
  /* COLORS */
  --white: #e9e9e9;
  --gray: #333;
  --blue: #0367a6;
  --lightblue: #008997;

  /* RADII */
  --button-radius: 0.7rem;

  /* SIZES */
  --max-width: 758px;
  --max-height: 420px;

  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
  Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

#login {
  align-items: center;
  background-color: var(--white);
  /*background: url("https://res.cloudinary.com/dbhnlktrv/image/upload/v1599997626/background_oeuhe7.jpg");*/
  /* 决定背景图像的位置是在视口内固定，或者随着包含它的区块滚动。 */
  /* https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-attachment */
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: grid;
  height: 100vh;
  place-items: center;
}

.form__title {
  font-weight: 300;
  margin: 0;
  margin-bottom: 1.25rem;
}

.link {
  color: var(--gray);
  font-size: 0.9rem;
  margin: 1.5rem 0;
  text-decoration: none;
}

.container {
  background-color: var(--white);
  border-radius: var(--button-radius);
  box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25),
  0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
  height: var(--max-height);
  max-width: var(--max-width);
  overflow: hidden;
  position: relative;
  width: 100%;
}

.container__form {
  height: 100%;
  position: absolute;
  top: 0;
  transition: all 0.6s ease-in-out;
}

.container--signin {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .container--signin {
  transform: translateX(100%);
}

.container--signup {
  left: 0;
  opacity: 0;
  width: 50%;
  z-index: 1;
}

.container.right-panel-active .container--signup {
  animation: show 0.6s;
  opacity: 1;
  transform: translateX(100%);
  z-index: 5;
}

.container__overlay {
  height: 100%;
  left: 50%;
  overflow: hidden;
  position: relative;
  top: 0;
  transition: transform 0.6s ease-in-out;
  width: 50%;
  z-index: 100;
}

.container.right-panel-active .container__overlay {
  transform: translateX(-100%);
}

.overlay {
  background-color: #212121;
  /*background: url("https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547_1280.jpg");*/
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  left: -100%;
  position: relative;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  width: 200%;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay__panel {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  position: absolute;
  text-align: center;
  top: 0;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  width: 50%;
}

.overlay--left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay--left {
  transform: translateX(0);
}

.overlay--right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay--right {
  transform: translateX(20%);
}

.btn {
  background-color: var(--blue);
  background-image: linear-gradient(90deg, var(--blue) 0%, var(--lightblue) 74%);
  border-radius: 20px;
  border: 1px solid var(--blue);
  color: var(--white);
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: bold;
  letter-spacing: 0.1rem;
  padding: 0.9rem 4rem;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  margin-top: 4.7rem;
}

.form>.btn {
  margin-top: 1.5rem;
}

.btn:active {
  transform: scale(0.95);
}

.btn:focus {
  outline: none;
}

.form {
  background-color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 3rem;
  height: 100%;
  text-align: center;
}

.input {
  background-color: #fff;
  border: none;
  padding: 0.9rem 0.9rem;
  margin: 0.5rem 0;
  width: 100%;
}

@keyframes show {

  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}
.error-message {
  color: #ff007f;
  padding: 0.9rem 0.9rem;
  margin: 0.5rem 0;
  width: 100%;
  position: absolute;

}

body {
  background-color: #C0C0C0	; /* 设置整体背景色， */
}

</style>