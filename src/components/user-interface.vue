<script setup>
import IndexHeader1 from "@/components/indexHeader1.vue";
import IndexFooter1 from "@/components/indexFooter1.vue";
// 图标
import "@/assets/CSS/font-awesome-5.15.2.all.css";
import "@/assets/CSS/tiktok.css";

import {inject, onMounted, ref} from 'vue'
import axios from "axios";
import router from "@/router";
import moment from "moment";
// 用户头像
import {ElDialog, ElMessageBox} from 'element-plus';

const activeIndex = ref('1'); // 默认选中的菜单项
function handleSelect(index) {
  activeIndex.value = index;
}



// 航班订单列表
const tableData = ref([]);

// 酒店订单列表
const tableData1 = ref([]);

// 用户的信息
const userData = ref({
  // id: null,
  username: '',
  // password: null,
  email: '',
  phone: null,
  cardNum: null,
  point: 0
});


onMounted(() => {
  // 获取密匙
  const token = localStorage.getItem('securityKey');
  console.log(token)
  axios.get('/api/starAirlines/account', {
    headers: {
      'token': token
    }
  })
      .then(response => {
        // 请求成功处理逻辑
        // console.log(response.data);
        // 密匙为空，跳转到登陆界面
        if (response.data.msg === 'NOT_LOGIN') {
          console.log(response.data);
          ElMessageBox.alert('Not logged in. Please login first.', 'Alert', {
            showCloseBtn:false,
            showClose:false,
            type: 'warning',
          })
              .then(() => {
                router.push({ path: '/login' });
              })
          return;
        }
        if (response.data.msg === 'success') {
          const data = response.data.data;
          // userData.value.id = data.id;
          userData.value.username = data.username;
          console.log(userData.value.username)
          userData.value.email = data.email;
          userData.value.phone = data.phone;
          userData.value.point = data.point;
        }
      })


      .catch(error => {
        // 请求失败处理逻辑
        console.log(error);
      });

  // 获取用户航班订单信息
  axios.get('/api/starAirlines/account/flight_record', {
    headers: {
      'token': token
    }
  })
      .then(response => {
        // 请求成功处理逻辑,订单信息赋值
        const data = response.data.data;
        console.log(data)

        const orders = [];

        for (const item of data) {
          const flightInfo = item.flightInfo;
          const recordInfo = item.recordInfo;
          let type = '';
          if (recordInfo.type === 1) {
            type = 'Economy class';
          } else if (recordInfo.type === 2) {
            type = 'Business class';
          } else if (recordInfo.type === 3) {
            type = 'First class';
          }

          const order = {
            depart: flightInfo.depart,
            arrival: flightInfo.arrival,
            departTime: moment(flightInfo.departTime).format('YYYY-MM-DD HH:mm:ss'),
            arrivalTime: moment(flightInfo.arrivalTime).format('YYYY-MM-DD HH:mm:ss'),
            days: recordInfo.days,
            price: recordInfo.price,
            type: type,
            updateTime: moment(recordInfo.updateTime).format('YYYY-MM-DD HH:mm:ss'),
          };

          orders.push(order);
        }

        // 将订单信息传递到tableData中
        // tableData.push(...orders);
        tableData.value = orders;
        console.log(tableData);
      })
      .catch(error => {
        // 请求失败处理逻辑
        console.error(error);
      });

  // 获取用户酒店订单信息
  axios.get('/api/starAirlines/account/hotel_record', {
    headers: {
      'token': token
    }
  })
      .then(response => {
        // 请求成功处理逻辑,订单信息赋值
        const data = response.data.data;

        const orders = [];

        for (const item of data) {
          const hotelInfo = item.hotelInfo;
          const recordInfo = item.recordInfo;

          const order = {
            name: hotelInfo.name.toString(),
            address: hotelInfo.address.toString(),

            days: recordInfo.days.toString(),
            price: recordInfo.price.toString(),
            updateTime: moment(recordInfo.updateTime).format('YYYY-MM-DD HH:mm:ss').toString()
          };

          orders.push(order);
        }

        // 将订单信息传递到tableData1中
        tableData1.value = orders;
        console.log(tableData1);
      })
      .catch(error => {
        // 请求失败处理逻辑
        console.error(error);
      });

  const fistForm = document.getElementById('form1');
  fistForm.addEventListener('submit', (e) => e.preventDefault());
});


const user=ref({Email:'',Password:'',confirmPassword:''})  //关联用户注册时的输入信息
const centerDialogVisible1 = ref(false)
const centerDialogVisible2 = ref(false)
const centerDialogVisible6 = ref(false)
const handleSubmit = (e) => {
  e.preventDefault();
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
}

// 手机号信息编辑
const editMode = ref(false);
const editedPhone = ref('');

function toggleEditMode() {
  editedPhone.value = userData.value.phone !== null ? userData.value.phone : '';
  editMode.value = true;
}

function savePhone() {
  if (editedPhone.value.length === 11 && /^\d+$/.test(editedPhone.value)) {
    userData.value.phone = editedPhone.value;
    editMode.value = false;
  } else {
// 手机号码不满足要求，提示错误信息
    alert('Invalid phone number. Please enter a valid 11-digit number.');
  }
}

// 信用卡信息编辑
const editMode1 = ref(false);
const editedcard = ref('');

function toggleEditMode1() {
  editedcard.value = userData.value.cardNum !== null ? userData.value.cardNum : '';
  editMode1.value = true;
}

function savecard() {
  if (editedcard.value.length === 16 && /^\d+$/.test(editedcard.value)) {
    userData.value.cardNum = editedcard.value;
    editMode1.value = false;
  } else {
// 信用卡号不满足要求，提示错误信息
    alert('Invalid card number. Please enter a valid 16-digit number.');
  }
}

// 用户头像相关逻辑
const avatars = [
  require('@/assets/images/avatar1.jpg'),
  require('@/assets/images/avatar2.jpg'),
  require('@/assets/images/avatar3.jpg'),
  require('@/assets/images/avatar4.jpg'),
];
const selectedAvatar = ref(require('@/assets/images/avatar1.jpg'));
const showAvatarModal = ref(false);
const userStore = inject('userStore');

const selectAvatar = (index) => {
  selectedAvatar.value = avatars[index];
  showAvatarModal.value = false;
  console.log('用户选择的头像编号：', index);

  // 更新全局用户状态的头像信息
  userStore.updateAvatar(avatars[index]);
};

const closeAvatarModal = () => {
  showAvatarModal.value = false;
};

// // 用户头像
// import { ElDialog } from 'element-plus';
//
// const avatars = [
//   require('@/assets/images/avatar1.jpg'),
//   require('@/assets/images/avatar2.jpg'),
//   require('@/assets/images/avatar3.jpg'),
//   require('@/assets/images/avatar4.jpg'),
// ];
// const selectedAvatar = ref(require('@/assets/images/avatar1.jpg'));
// const showAvatarModal = ref(false);
//
// const selectAvatar = (index) => {
//   selectedAvatar.value = avatars[index];
//   showAvatarModal.value = false;
//   console.log('用户选择的头像编号：', index);
// };
//
// const closeAvatarModal = () => {
//   showAvatarModal.value = false;
// };
</script>

<template>
  <index-header1 :selectedAvatar="selectedAvatar"></index-header1>
  <router-view ></router-view>
  <div class="card" style="margin-bottom: 0px;">
    <div class="section1">
      <!--      头像区域-->
      <div>
        <div class="pic" @click="showAvatarModal = true">
          <img :src="userStore.avatar" alt="Avatar" />
        </div>
        <el-dialog
            title="Choose a avatar"
            v-model="showAvatarModal"
            width="55vw"
            style="z-index: 9999"
        >
          <div class="avatar-list">
            <img
                v-for="(avatar, index) in avatars"
                :src="avatar"
                :key="index"
                @click="selectAvatar(index)"
                style="width: 15vw;height: 30vh"
            />
          </div>
        </el-dialog>
      </div>
      <div class="name">{{ userData.username }}</div>
      <div class="tag">{{ userData.email }}</div>
    </div>
    <div class="bottom-section" style="height: 5vh !important;margin-bottom: 0px">
      <div class="social-media">
        <a href="#"><i class="fab fa-facebook"></i></a>
        <a href="#"><i class="fab fa-twitter"></i></a>
        <a href="#"><i class="fab fa-instagram"></i></a>
      </div>
    </div>
    <!--&lt;!&ndash;    展示用户可以选择的图像&ndash;&gt;-->
    <!--    <div  class="avatar-list">-->
    <!--      <img-->
    <!--          v-for="(avatar, index) in avatars"-->
    <!--          :src="avatar"-->
    <!--          :key="index"-->
    <!--          @click="selectAvatar(index)"-->
    <!--      />-->
    <!--    </div>-->
  </div>

  <!--用户信息-->
  <div style="margin-bottom: 50px;">
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
    >
      <el-menu-item index="1" @click="handleSelect('1')">Account information</el-menu-item>
      <el-menu-item index="2" @click="handleSelect('2')">Flight information</el-menu-item>
      <el-menu-item index="3" @click="handleSelect('3')">Hotel information</el-menu-item>
      <el-menu-item index="4" @click="handleSelect('4')">Alter password</el-menu-item>
    </el-menu>
    <!--    账户信息-->
    <div v-show="activeIndex === '1'" >
      <el-descriptions class="margin-top" :column="1" :size="size" border>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <user/>
              </el-icon>
              Username
            </div>
          </template>
          {{ userData.username }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
              </el-icon>
              Email
            </div>
          </template>
          {{ userData.email }}
        </el-descriptions-item>
        <!--        手机号信息-->
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
              </el-icon>
              Phone
            </div>
          </template>
          <div v-if="editMode">
            <el-tooltip content="11 digit phone number">
              <el-input v-model="editedPhone" style="width: 20vw"></el-input>
            </el-tooltip>
            <el-button @click="savePhone">Save</el-button>
          </div>
          <div v-else>
            <span>{{ userData.phone }}</span>
            <el-button @click="toggleEditMode">Edit</el-button>
          </div>
        </el-descriptions-item>
        <!--        信用卡信息-->
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
              </el-icon>
              Credit card
            </div>
          </template>
          <div v-if="editMode1">
            <el-tooltip content="16 digit card number">
              <el-input v-model="editedcard" style="width: 20vw"></el-input>
            </el-tooltip>
            <el-button @click="savecard">Save</el-button>
          </div>
          <div v-else>
            <span>{{ userData.cardNum }}</span>
            <el-button @click="toggleEditMode1">Edit</el-button>
          </div>
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
              </el-icon>
              Point
            </div>
          </template>
          <el-tag size="small">{{ userData.point }}</el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </div>

    <!--    航班订单信息-->
    <div v-show="activeIndex === '2'" class="table-container">
      <el-table :data="tableData" :default-sort="{ prop: 'departTime', order: 'descending' }" align="center">
        <el-table-column fixed prop="depart" label="Depart" width="100"/>
        <el-table-column prop="arrival" label="Arrival" width="100" />
        <el-table-column prop="departTime" label="Departime" sortable width="180" />
        <el-table-column prop="arrivalTime" label="Arrivaltime" width="180"  />
        <el-table-column prop="days" label="Days" width="120"  />
        <el-table-column prop="price" label="Price" width="120"  />
        <el-table-column prop="type" label="Type" width="120"  />
        <el-table-column prop="updateTime" label="Updatetime" width="190"  />
      </el-table>
    </div>

<!--    酒店订票信息-->
    <div v-show="activeIndex === '3'" class="table-container">
      <el-table :data="tableData1" :default-sort="{ prop: 'updateTime', order: 'descending' }"  align="center">
        <el-table-column fixed prop="name" label="Name" width="170" :label-align="center" :align="center"/>
        <el-table-column prop="address" label="Address" width="100" :label-align="center" :align="center" />
        <el-table-column prop="days" label="Days" width="100" :label-align="center" :align="center" />
        <el-table-column prop="price" label="Price" width="100" :label-align="center" :align="center" />
        <el-table-column prop="updateTime" sortable label="Updatetime" width="180" :label-align="center" :align="center" />
      </el-table>
    </div>

    <!--    修改密码-->
    <!--    未输入邮箱-->
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
    <!--     两次密码输入不一致-->
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

    <!--密码输入格式有误-->
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

    <div v-show="activeIndex === '4'">
      <div class="container" style="margin-left: 34vw">
        <form action="#" class="form" id="form1" @submit="handleSubmit">
          <div class="row">
            <label for="email">Email:</label>
            <div class="input-wrapper">
              <el-input v-model="user.Email" id="email" placeholder="Please input email" class="password-input" />
            </div>
          </div>
          <div class="row">
            <label for="password">Password:</label>
            <div class="input-wrapper">
              <el-tooltip content="passwords with 8 or more digits">
                <el-input v-model="user.Password" id="password" type="password" placeholder="Please input password" show-password class="password-input"/>
              </el-tooltip>
            </div>
          </div>
          <div class="row">
            <label for="confirm-password">Confirm password:</label>
            <div class="input-wrapper">
              <el-input v-model="user.confirmPassword" id="confirm-password" type="password" placeholder="Please confirm your password" show-password class="password-input"/>
            </div>
          </div>
          <button class="btn" id="signUp" style="margin-top: 5.5vh;margin-left: 11vw;height: 4vh">Submit</button>
        </form>
      </div>
    </div>
  </div>
  <index-footer1></index-footer1>
</template>

<style scoped>



.avatar-list {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.avatar-list img {
  margin: 3px;
  width: 13vw !important;
  height: 25vh !important;
}

.el-menu-demo .el-menu-item{
  padding-left: 40px !important;
  padding-right: 40px !important;/* 设置菜单项的右边距 */
}
.el-menu-demo{
  justify-content: center; /* 在水平方向上居中 */
  align-items: center; /* 在垂直方向上居中 */
//display:flexible;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 5vh auto;
}

.row {
  display: flex;
  align-items: center; /* 修改为 center */
  margin-bottom: 10px; /* 添加此行，用于调整行之间的间距 */
}

label {
  width: 150px;
  padding-right: 10px;
}

.input-wrapper {
  flex: 1; /* 添加此行，使输入框填充剩余空间 */
}

.password-input {
  width: 250px;
}

</style>