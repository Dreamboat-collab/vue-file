
import { reactive, readonly } from 'vue';

const userStore = reactive({
    avatar: require('@/assets/images/avatar1.jpg'), // 默认头像
    updateAvatar(avatar) {
        userStore.avatar = avatar;
    }
});

export function provideUserStore() {
    return readonly(userStore);
}
