<template>
  <div class="responsive-component">
    <div style="background-color: #1f252e ;height: 10vh;width: 100%;position: absolute;top: 0">
      <index-header1 ></index-header1>
    </div>
    <div id="login">
      <div class="containerlogin right-panel-active" style="width: 60vw;height: 73vh;margin-top: 10vh">
        <!--          检验用户名输入是否为空-->
        <el-dialog  v-model="centerDialogVisible5" title="Warning" class="dialog-mistake" center :z-index="9999" style="z-index: 9999; width: 35vw;height: 30vh;margin-top: 15%">
              <span>
            The username is null！
              </span>
          <template #footer>
              <span class="dialog-footer">
                <el-button type="primary" @click="centerDialogVisible5 = false">
                  Confirm
                </el-button>
              </span>
          </template>
        </el-dialog>
        <!-- 注册邮箱是否为空-->
        <el-dialog  v-model="centerDialogVisible6" title="Warning" class="dialog-mistake" center :z-index="9999" style="z-index: 9999; width: 35vw;height: 30vh;margin-top: 15%">
        <span>
      The Email is null！
        </span>
          <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="centerDialogVisible6 = false">
            Confirm
          </el-button>
        </span>
          </template>
        </el-dialog>
        <!--      注册两次密码输入不一致-->
        <el-dialog  v-model="centerDialogVisible1" title="Warning" class="dialog-mistake" center :z-index="9999" style="z-index: 9999; width: 35vw;height: 30vh;margin-top: 15%">
          <span>
        The two passwords inputs were inconsistent！
          </span>
          <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="centerDialogVisible1 = false">
            Confirm
          </el-button>
        </span>
          </template>
        </el-dialog>

        <!--注册时密码输入格式有误-->
        <el-dialog  v-model="centerDialogVisible2" title="Warning" class="dialog-mistake" center :z-index="9999" style="z-index: 9999; width: 35vw;height: 30vh;margin-top: 15%">
          <span>
        The format of passwords is incorrect！
          </span>
          <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="centerDialogVisible2 = false">
            Confirm
          </el-button>
        </span>
          </template>
        </el-dialog>

        <!--      邮箱已被注册-->
        <el-dialog  v-model="centerDialogVisible7" title="Warning" class="dialog-mistake" center :z-index="9999" style="z-index: 9999; width: 35vw;height: 30vh;margin-top: 15%">
          <span>
        The email has been registered！
          </span>
          <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="centerDialogVisible7 = false">
            Confirm
          </el-button>
        </span>
          </template>
        </el-dialog>

        <!-- Register -->
        <div class="container__form container--signup">
          <form action="#" class="form" id="form1" @submit="handleSubmit">
            <h2 class="form__title">Register</h2>
            <input type="text" placeholder="Username" class="input" v-model="user.username"/>
            <input type="email" placeholder="Email" class="input" v-model="user.Email"/>
            <!-- 输入密码时的提示框,输入密码 -->
            <el-tooltip content="passwords with 8 or more digits">
              <input type="password" placeholder="Password" class="input" v-model="user.Password"/>
            </el-tooltip>
            <el-tooltip content="passwords with 8 or more digits">
              <input type="password" placeholder="Confirm Password" class="input" v-model="user.confirmPassword" />
            </el-tooltip>
            <button class="btn1" style="margin-top: 5vh">Register</button>
          </form>
        </div>
        <!--      错误提示框-->
        <el-dialog  v-model="centerDialogVisible" title="Warning" class="dialog-mistake" center :z-index="9999" style="width: 35vw;height: 30vh;margin-top: 15%">
          <span>
        Account or password error！
      </span>
          <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="centerDialogVisible = false">
            Confirm
          </el-button>
        </span>
          </template>
        </el-dialog>
        <!--注册成功-->
        <el-dialog  v-model="isRegistered" class="dialog-mistake" center :z-index="9999" style="width: 35vw;height: 50vh;margin-top: 15%">
          <el-row justify='center' v-if="isRegistered">
            <el-col :sm="12" :lg="6">
              <el-result
                  icon="success"
                  sub-title="Sign up successfully!"
              >
                <template #extra>
                  <el-button type="primary"  @click="isRegistered = false">Back</el-button>
                </template>
              </el-result>
            </el-col>
          </el-row>
        </el-dialog>

        <!-- Sign In -->
        <div class="container__form container--signin">
          <form action="#" class="form" id="form2" @submit="handleSubmit2">
            <h2 class="form__title">Sign In</h2>
            <input type="email" placeholder="Email" class="input" v-model="user_login.Email"/>
            <input type="password" placeholder="Password" class="input" v-model="user_login.Password"/>
            <a href="#" class="link" @click="centerDialogVisible8 = true">Forgot your password?</a>
            <button class="btn1" style="margin-top: 13.2vh" @click="open">Sign In</button>
          </form>
        </div>

        <!--      登录未输入账号或者密码-->
        <el-dialog  v-model="centerDialogVisible20" title="Warning" class="dialog-mistake" center :z-index="9999" style="width: 35vw;height: 30vh;margin-top: 15%">
          <span>
        No account or password enterer！
      </span>
          <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="centerDialogVisible20 = false">
            Confirm
          </el-button>
        </span>
          </template>
        </el-dialog>

        <!--      忘记密码-->
        <el-dialog  v-model="centerDialogVisible8" class="dialog-mistake" center :z-index="9999" style="width: 35vw;height: 30vh;margin-top: 15%">
          <input type="email" placeholder="Please input your email" class="input" style="width: 30vw;height: 2vh"/>
          <p style="margin-top: 2vh; text-align: center;">We will send identifying code to your emial</p>
          <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="centerDialogVisible8 = false">
            Submit
          </el-button>
        </span>
          </template>
        </el-dialog>

        <!-- Overlay -->
        <div class="container__overlay">
          <div class="overlay">
            <div class="overlay__panel overlay--left" >
              <img src="../assets/logo1.png" width="300px" height="240px">
              <button class="btn1" id="signIn" style="margin-top: 16.7vh">Sign In</button>
            </div>
            <div class="overlay__panel overlay--right">
              <img src="../assets/logo1.png" width="300px" height="240px">
              <button class="btn1" id="signUp" style="margin-top: 16.5vh">Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import $ from 'jquery';
import {onMounted, ref} from 'vue'
import {ElMessage} from 'element-plus'
import axios from 'axios'
import router from '@/router';
import IndexHeader1 from "@/components/indexHeader1.vue";

//JS
onMounted(() => {
  const signInBtn = document.getElementById('signIn');
  const signUpBtn = document.getElementById('signUp');
  const fistForm = document.getElementById('form1');
  const secondForm = document.getElementById('form2');
  const container = document.querySelector('.containerlogin');

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
const centerDialogVisible1 = ref(false)
const centerDialogVisible2 = ref(false)
const centerDialogVisible5 = ref(false)
const centerDialogVisible6 = ref(false)
const centerDialogVisible7 = ref(false)
const centerDialogVisible8 = ref(false)
const isRegistered = ref(false);
const handleSubmit = (e) => {
  e.preventDefault();
  // 用户名未输入
  if (!user.value.username) {
    centerDialogVisible5.value = true;
    return;
  }
  // 注册邮箱未输入
  if (!user.value.Email) {
    centerDialogVisible6.value = true;
    return;
  }
  // 密码长度不足，报错
  if ((user.value.Password.match(/[a-zA-Z]/g) || []).length + (user.value.Password.match(/\d/g) || []).length < 8) {
    centerDialogVisible2.value = true;
    user.value.Password = '';
    user.value.confirmPassword = '';
    return;
  }
  // 密码不一致，显示错误消息或执行相关操作
  if (user.value.Password !== user.value.confirmPassword) {
    centerDialogVisible1.value = true
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
        // 邮箱已经注册
        if (response.data.msg === 'this email has been used.') {
          centerDialogVisible7.value = true;
          return
        }
        // 注册成功提示
        isRegistered.value = true;
      })
      .catch(function (error) {
        console.log(error);
      });
};


//用户登录操作
const isenabled = ref(false);
const user_login=ref({Email:'',Password:''})  //初始时为空值
const centerDialogVisible20=ref(false);
const centerDialogVisible = ref(false)
const handleSubmit2 = (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('account', user_login.value.Email);
  formData.append('password', user_login.value.Password);
  axios
      .post('http://localhost:8080/starAirlines/login', formData)
      .then(function (response) {
        console.log(response);
        // 未输入账号密码
        if (!user_login.value.Email || !user_login.value.Password) {
          centerDialogVisible20.value = true;
          return;
        }
        // 用户账号密码输入错误，设置错误消息并清空输入框
        if (response.data.msg === 'The account or password is incorrect') {
          centerDialogVisible.value = true
          user_login.value.Email = '';
          user_login.value.Password = '';
        }
        if (response.data.msg === 'success') {
          // 登陆成功
          isenabled.value=true;
          //密匙，保存在本地前端页面中
          const securityKey=response.data.data;
          console.log(securityKey);
          localStorage.setItem('securityKey', securityKey);
          localStorage.setItem('jump',1)
          // 跳转到主页（可以使用Vue Rout@er进行导航）
          router.push({path: '/flight'});
        }
        if (isenabled.value) {
          ElMessage({
            message: 'Login successfully.',
            type: 'success',
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
}

$("#sticky-header").addClass("sticky-menu")


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

.containerlogin {
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

.containerlogin.right-panel-active .container--signin {
  transform: translateX(100%);
}

.container--signup {
  left: 0;
  opacity: 0;
  width: 50%;
  z-index: 1;
}

.containerlogin.right-panel-active .container--signup {
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

.containerlogin.right-panel-active .container__overlay {
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

.containerlogin.right-panel-active .overlay {
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

.containerlogin.right-panel-active .overlay--left {
  transform: translateX(0);
}

.overlay--right {
  right: 0;
  transform: translateX(0);
}

.containerlogin.right-panel-active .overlay--right {
  transform: translateX(20%);
}

.btn1 {
  background-color: var(--blue);
  background-image: linear-gradient(90deg, var(--blue) 0%, var(--lightblue) 74%);
  border-radius: 20px;
  border: 1px solid var(--blue);
  color: var(--white);
  cursor: pointer;
  font-size: 0.7rem;
  font-weight: bold;
  letter-spacing: 0.1rem;
  padding: 0.9rem 4rem;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  margin-top: 4.4rem;
}

.form>.btn1 {
  margin-top: 1.5rem;
}

.btn1:active {
  transform: scale(0.95);
}

.btn1:focus {
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
  border-radius: 3%;
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

//body {  background-color: #e30a0a; /* 设置整体背景色， */  }
/* 响应式样式 */
@media only screen and (max-width: 768px) {
  /* 根据需要调整样式在不同屏幕宽度下的表现 */
  .containerlogin {
    width: 120vw !important;
    height: 90vh !important;
    /* 其他样式调整... */
  }

  .container__form {
    width: 45% !important;
    height: 80% !important;
    /* 其他样式调整... */
  }

  .overlay__panel {
    width: 40% !important;
    /* 其他样式调整... */
  }

  .container--signup {
    display: none !important;
  }

  .overlay__panel overlay--right{
    display: none !important;
  }
  .container__form container--signup{
    display: none !important;
  }
}
</style>
