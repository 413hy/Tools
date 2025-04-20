import createPersistedState from 'vuex-persistedstate';

export default ({ store }) => {
    window.onNuxtReady(() => {
        createPersistedState({
            key: 'miku_vuex',
            paths: [
                'setting',
                'dark',
                'customLinks', // 添加 customLinks 到持久化列表
                'syncTime',
                'noticeId',
                'welcome'
            ]
        })(store);
    });
};
