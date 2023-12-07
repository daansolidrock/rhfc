<template lang="">
    <div class="common-layout" >
        <el-container >
            <el-aside width="200px" :class="{ active: store.isCollapse}">
                <AdminMenuVue />
            </el-aside>
            <el-container>
                <el-header height="60px" style="padding:0px">
                    <AdminHeader />
                </el-header>
                <el-main class="main">
                    <RouterView></RouterView>
                </el-main>
            </el-container>
        </el-container>
    </div>

</template>
<script setup>
import { RouterView } from 'vue-router';
import AdminMenuVue from '@/components/Admin/Layout/AdminMenu.vue';
import AdminHeader from '@/components/Admin/Layout/AdminHeader.vue';
import { useCollapseStore } from '../../stores/collapse';
const store = useCollapseStore()

</script>
<style lang="scss" scoped>
.main{
    background-color: #EFF3F8;
    height: calc(100vh - 60px);
}

.active{
    width: auto;
}
</style>