<template lang="">
	<el-menu
    background-color="#FFF"
    text-color="#000"
    active-text-color="#000"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-menu-item index="0" style="font-size:20px" @click="store.switchCollapse()">
      <i class="fa-solid fa-bars"></i>
    </el-menu-item>

    <div class="flex-grow"/>
    
    <el-sub-menu index="2">
      <template #title>
        {{ authStore.state.userInfo.username }}
      </template>
      <el-menu-item index="2-1" @click="logout">登出</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { useCollapseStore } from '@/stores/collapse.js';
import { useAuthStore } from "@/stores/auth.js";
import router from '@/router';
const store = useCollapseStore()
const authStore = useAuthStore();

const logout = () => {
  localStorage.removeItem("auth");
	authStore.setUserInfo('')
  router.push("/login");
};
</script>

<style lang="scss" scoped>
.flex-grow {
  flex-grow: 1;
}
.el-header{
	padding: 0;
  background-color: #EFF2F2;
}
</style>