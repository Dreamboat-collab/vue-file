<script setup>
import IndexHeader from "@/components/IndexHeader.vue";
import IndexHeader1 from "@/components/indexHeader1.vue";
import IndexFooter1 from "@/components/indexFooter1.vue";
// 图标
import "@/assets/CSS/font-awesome-5.15.2.all.css";
import "@/assets/CSS/tiktok.css";
import "@/assets/CSS/style.css";
import "@/assets/CSS/style1.css";
import "@/assets/CSS/style2.css";
import "@/assets/CSS/style3.css";
import "@/assets/CSS/style4.css";
import "@/assets/CSS/style5.css";
import "@/assets/CSS/style6.css";
import "@/assets/CSS/style7.css";

import { ref } from 'vue'
const activeIndex = ref('1'); // 默认选中的菜单项
function handleSelect(index) {
  activeIndex.value = index;
}

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
]

const input = ref('');
const password = ref('');
const confirmPassword = ref('');
</script>

<template>
  <index-header1></index-header1>
  <div class="card" style="margin-bottom: 0px;">
    <div class="section">
      <div class="pic">
        <img src="@/assets/images/Jeddy.jpg" alt="图片加载错误！">
      </div>
      <div class="name">Jeddy</div>
      <div class="tag">1556782359@qq.com</div>
    </div>

    <div class="bottom-section" style="height: 5vh !important;margin-bottom: 0px">
      <div class="social-media">
        <a href="#"><i class="fab fa-facebook"></i></a>
        <a href="#"><i class="fab fa-twitter"></i></a>
        <a href="#"><i class="fab fa-instagram"></i></a>
      </div>
    </div>
  </div>

  <!--用户信息-->
  <div style="margin-bottom: 50px;">
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
    >
      <el-menu-item index="1" @click="handleSelect('1')">Account Information</el-menu-item>
      <el-menu-item index="2" @click="handleSelect('2')">Order Information</el-menu-item>
      <el-menu-item index="3" @click="handleSelect('3')">Alter Password</el-menu-item>
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
          Jeddy
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <iphone/>
              </el-icon>
              Email
            </div>
          </template>
          1556782359@qq.com
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <location/>
              </el-icon>
              Telephone
            </div>
          </template>
          18924669438
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <tickets/>
              </el-icon>
              Membership level
            </div>
          </template>
          <el-tag size="small">first</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <office-building/>
              </el-icon>
              Address
            </div>
          </template>
          No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
        </el-descriptions-item>
      </el-descriptions>
    </div>

    <!--    订单信息-->
    <div v-show="activeIndex === '2'">
      <el-table :data="tableData" style="width: 100%" height="250">
        <el-table-column fixed prop="date" label="Date" width="150" />
        <el-table-column prop="name" label="Name" width="120" />
        <el-table-column prop="state" label="State" width="120" />
        <el-table-column prop="city" label="City" width="320" />
        <el-table-column prop="address" label="Address" width="600" />
        <el-table-column prop="zip" label="Zip" width="120" />
      </el-table>


    </div>


    <!--    修改密码-->
    <div v-show="activeIndex === '3'">
      <div class="container" style="margin-left: 34vw">
        <div class="row">
          <label for="email">Email:</label>
          <div class="input-wrapper">
            <el-input v-model="input" id="email" placeholder="Please input email" class="password-input" />
          </div>
        </div>
        <div class="row">
          <label for="password">Password:</label>
          <div class="input-wrapper">
            <el-input v-model="password" id="password" type="password" placeholder="Please input password" show-password class="password-input"/>
          </div>
        </div>
        <div class="row">
          <label for="confirm-password">Confirm password:</label>
          <div class="input-wrapper">
            <el-input v-model="confirmPassword" id="confirm-password" type="password" placeholder="Please confirm your password" show-password class="password-input"/>
          </div>
        </div>
      </div>
    </div>
  </div>

  <index-footer1></index-footer1>
  <router-view ></router-view>
</template>

<style scoped>
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