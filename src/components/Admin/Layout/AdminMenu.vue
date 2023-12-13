<template lang="">

	<el-menu
		active-text-color="#fc832c"
    background-color="#2C4151"
    text-color="#fff"
    default-active="2"
    class="el-menu"
    :collapse="store.isCollapse"
  >

    <!-- <div class="v-logo"> -->
    <el-menu-item index="0" class="v-logo">
      <img

        src="@/assets/logo/LOGO.png"
        alt="Element logo"
      />
      <span>
        網站後台
      </span>
    </el-menu-item>


    <!-- <router-link to="/admin/video">
      <el-menu-item index="1">
        <el-icon><i class="fa-solid fa-video"></i></el-icon>
        <template #title>影片管理</template>
      </el-menu-item>
    </router-link> -->

    <el-sub-menu index="1">
      <template #title>
        <el-icon><i class="fa-solid fa-video"></i></el-icon>
        <span>影片管理</span>
      </template>

      <router-link to="/admin/videotype">
        <el-menu-item index="1-1">
          <el-icon><i class="fa-solid fa-bookmark"></i></el-icon>
          <template #title>分類</template>
        </el-menu-item>
      </router-link>

      <router-link to="/admin/video">
        <el-menu-item index="1-2">
          <el-icon><i class="fa-solid fa-list"></i></el-icon>
          <template #title>列表</template>
        </el-menu-item>
      </router-link>
    </el-sub-menu>

		<!-- <el-sub-menu index="2">
      <template #title>
        <el-icon><i class="fa-solid fa-file"></i></el-icon>
        <span>資源管理</span>
      </template>

      <router-link to="/admin/filetype">
        <el-menu-item index="2-1">
          <el-icon><i class="fa-solid fa-bookmark"></i></el-icon>
          <template #title>分類</template>
        </el-menu-item>
      </router-link>
      <router-link to="/admin/file">
        <el-menu-item index="2-2">
          <el-icon><i class="fa-solid fa-list"></i></el-icon>
          <template #title>列表</template>
        </el-menu-item>
      </router-link>
    </el-sub-menu> -->

    <router-link to="/admin/receipt">
      <el-menu-item index="3">
        <el-icon><i class="fa-solid fa-inbox"></i></el-icon>
        <template #title>奉獻收據申請人</template>
      </el-menu-item>
    </router-link>

    <router-link to="/admin/question">
      <el-menu-item index="4">
        <el-icon><i class="fa-solid fa-envelope"></i></el-icon>
        <template #title>QA問題收集列表</template>
      </el-menu-item>
    </router-link>
  </el-menu>
</template>
<script setup>

import { useCollapseStore } from '@/stores/collapse.js';
const store = useCollapseStore()

</script>
<style lang="scss" scoped>
a{
  text-decoration: none
}

.el-menu{
	height: 100vh;
}

.v-logo{
  display: flex;
  align-items: center;

  img{
    width: 28px;
    margin-right: 5px;
  }

  span{
    color: white;
    font-size: 1.5rem;
  }
}
</style>