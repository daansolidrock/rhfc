import { defineStore } from "pinia";
import { ref, computed } from 'vue';

export const useCollapseStore = defineStore('collapse', () => {

    const isCollapse = ref(false)

    // @ts-ignore
    function switchCollapse() {
        isCollapse.value = !isCollapse.value
        console.log(isCollapse.value)
    }

    return {
        isCollapse,
        switchCollapse
    }
})