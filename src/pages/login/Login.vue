<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// 引入一下element的消息弹出框
import { ElNotification } from 'element-plus'
// 引入login仓库
import { loginStore } from '@/stores/login'
import { storeToRefs } from 'pinia';

// 在组件里面用一个store变量接收一下login仓库,方便使用
const store = loginStore()

// 试用一下useRouter
const router = useRouter()

// 决定注册是否展示
const letSignUpShow = ref(false)

// 获取四个元素
let signInInputs = ref(null) //登录的表单
let signUpImgBox = ref(null) //小红
let signInImgBox = ref(null) //wlop
let signUpInputs = ref(null) // 注册的表单

// v-model 用户输入用户名
let userAccountName = ref('');
// v-model 第一次输入密码
let passwordFirst = ref('')
// v-model 第二次输入密码
let passwordSecound = ref('')
// v-model 用户登录输入账号
let loginAccount = ref('')
// v-model 用户登录输入密码
let loginPassword = ref('')


// 从store里面拿存储的用户名和密码
const { account, password } = storeToRefs(store)


// 动画函数
function switchShow() {
  // 点击先取反,第一次点击应该是让注册的显示(值为true)
  letSignUpShow.value = !letSignUpShow.value
  // 显示注册

  // 解决一下ts报错
  if (signInInputs.value && signUpImgBox.value && signInImgBox.value && signUpInputs.value) {
    if (letSignUpShow.value) {
      (signUpInputs.value as HTMLElement).style.left = "0";
      (signInImgBox.value as HTMLElement).style.left = "-400px";
      (signUpImgBox.value as HTMLElement).style.left = "0";
      (signInInputs.value as HTMLElement).style.left = "400px";
    } else {
      (signUpInputs.value as HTMLElement).style.left = "-400px";
      (signInImgBox.value as HTMLElement).style.left = "0px";
      (signUpImgBox.value as HTMLElement).style.left = "400px";
      (signInInputs.value as HTMLElement).style.left = "0px";
    }
  }
}

// 点击登录
function singin() {
  console.log('登录');
  if (loginAccount.value != account.value) {
    ElNotification({
      title: '错误',
      message: '没有此用户',
      type: 'error',
    })
  } else if (loginPassword.value != password.value) {
    ElNotification({
      title: '错误',
      message: '密码输入错误',
      type: 'error',
    })
  } else {
    ElNotification({
      title: '消息',
      message: '登录成功',
      type: 'success',
    })
    // 等一下:登录成功跳转到首页
    setTimeout(() => {
      router.push({
        path: '/home'
      })
    },1000)
  }
}

// 点击注册
function singup() {
  console.log('注册');
  if (userAccountName.value.trim() == '') {
    ElNotification({
      title: '提示',
      message: '请输入用户名',
      type: 'warning',
    })
  } else if (userAccountName.value.length > 10) {
    ElNotification({
      title: '提示',
      message: '用户名长度最大为10',
      type: 'warning',
    })
  } else if (passwordFirst.value.trim() == '') {
    ElNotification({
      title: '提示',
      message: '请输入密码',
      type: 'warning',
    })
  } else if (passwordFirst.value.length < 6 || passwordFirst.value.length > 18) {
    ElNotification({
      title: '提示',
      message: '密码长度最短为6,最长为18',
      type: 'warning',
    })
  } else if (passwordFirst.value != passwordSecound.value) {
    ElNotification({
      title: '错误',
      message: '两次密码输入不一致',
      type: 'error',
    })
  } else {
    store.saveAccount(userAccountName.value, passwordFirst.value)
    ElNotification({
      title: '消息',
      message: '注册成功',
      type: 'success',
    })
    // 注册成功后,触发动画,调到登录页面
    switchShow()
  }
}




</script>

<template>
  <div class="login">
    <!-- 中心登录注册模块区域 -->
    <div class="form">
      <div class="left">
        <!-- 登录的输入框区域 -->
        <div class="signInInputs inputs" ref="signInInputs">
          <h1>登录</h1>
          <div class="inputBox">
            <div class="svgBox">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-yonghu-is-"></use>
              </svg>
            </div>
            <input type="text" placeholder="请输入账号" v-model="loginAccount">
          </div>
          <div class="inputBox singUpInputs">
            <div class="svgBox">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-mima-"></use>
              </svg>
            </div>
            <input type="password" placeholder="请输入密码" v-model="loginPassword">
          </div>
          <button @click="singin">登录</button>
        </div>
        <!-- 注册的图片盒子 小红-->
        <div class="signUpImgBox imgBox" ref="signUpImgBox">
          <img src="@/assets/temp/login/singin.jpg" alt="">
          <div class="text">
            <h1>已有账号</h1>
            <p>赶紧来登录</p>
            <button @click="switchShow">登录</button>
          </div>
        </div>
      </div>

      <div class="right">
        <!-- 登录的图片盒子 wlop-->
        <div class="signInImgBox imgBox" ref="signInImgBox">
          <img src="@/assets/temp/login/singup.jpg" alt="">
          <div class="text">
            <h1>没有账号?</h1>
            <p>快来注册吧</p>
            <button @click="switchShow">注册</button>
          </div>
        </div>
        <!-- 注册的输入框区域 -->
        <div class="signUpInputs inputs" ref="signUpInputs">
          <h1>注册</h1>
          <div class="inputBox">
            <div class="svgBox">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-yonghu-is-"></use>
              </svg>
            </div>
            <input type="text" placeholder="请输入用户名" v-model="userAccountName">
          </div>
          <div class="inputBox">
            <div class="svgBox">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-mima-"></use>
              </svg>
            </div>
            <input type="password" placeholder="请输入密码" v-model="passwordFirst">
          </div>
          <div class="inputBox">
            <div class="svgBox">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-mima-"></use>
              </svg>
            </div>
            <input type="password" placeholder="请再次输入密码" v-model="passwordSecound">
          </div>
          <button @click="singup">注册</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$yelloColor: rgb(228, 197, 114);
$darkYellow: rgb(199, 167, 80);

button {
  transition: .5s;
  font-size: 15px;
  font-weight: 450;

  &:hover {
    background-color: white;
    box-shadow: 0 2px 10px 1px rgba(62, 62, 62, 0.196);
  }
}

.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;

  .form {
    width: 800px;
    height: 500px;
    background-color: rgba(190, 153, 53, 0.442);
    border-radius: 10px;
    position: relative;
    overflow: hidden;
    transition: all .3s;



    // 这是注册和登录图片盒子抽离的公共属性
    .imgBox {
      width: 400px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      position: absolute;

      img {
        transition: all .5s;
      }

      // 图片盒子要有一个文字内容,
      .text {
        position: absolute;
        text-align: center;

        h1 {
          color: white;
          transform: translateY(-25px);
        }

        p {
          color: white;
          margin: 65px 0;
        }

        button {
          border: 2px solid white;
          background: transparent;
          color: white;
          font-size: 16px;
          width: 100px;
          height: 38px;
          border-radius: 4px;
          transition: all .5s;
          font-weight: bold;

          &:hover {
            background-color: $yelloColor;
            // border: 2px solid rgb(205, 175, 92);
          }
        }
      }
    }

    // 这是注册和登录输入表单区域抽离出来的公共属性
    .inputs {
      position: absolute;
      width: 400px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: $yelloColor;

      h1 {
        color: white;
        transform: translateY(-30px);
      }

      .inputBox {
        display: flex;
        align-items: center;
        border-radius: 5px;
        background-color: white;
        margin: 15px 0;

        input {
          width: 280px;
          height: 40px;
          border-radius: 5px;
          text-indent: .5em;
        }

        .svgBox {
          width: 40px;
          height: 40px;
          background-color: $darkYellow;
          border-radius: 5px;
          display: flex;
          justify-content: center;
          align-items: center;

          svg {
            width: 30px;
            height: 30px;
          }
        }
      }

      button {
        width: 320px;
        height: 40px;
        border-radius: 5px;
        margin: 15px 0;
      }
    }


    .left {
      width: 400px;
      height: 100%;
      position: absolute;
      left: 0;
      overflow: hidden;
    }

    .signInInputs {
      // 登录表单
      left: 0;
      transition: all 1s;
      z-index: 2;
    }

    .signUpImgBox {
      // 注册图片
      left: 400px;
      transition: all 1s;
      display: flex;
      justify-content: center;

      img {
        width: 105%;
        height: auto;
        transform: translateY(120px)
      }
    }


    .right {
      width: 400px;
      height: 100%;
      position: absolute;
      right: 0;
      overflow: hidden;
    }

    .signUpInputs {
      // 注册表单
      left: -400px;
      transition: all 1s;
    }

    .signInImgBox {
      // 登录盒子
      left: 0;
      transition: all 1s;

      img {
        width: 110%;
        height: auto;
        transform: translateY(-80px);
      }
    }
  }
}
</style>