import env from '../env';
import createPersistedState from 'vuex-persistedstate';

export const state = () => ({
    setting: {
        bg: {
            type: 'custom',
            customUrl: 'https://yhedesk.dpdns.org/nz_001webp',
            blur: 0,
            opacity: 100,
            transparentEl: true
        },
        hideNotice: true,
        hidePay: true,
        inNewTab: true,
        animations: true,
        hide: [],
        favorites: [],
        hideCategory: false,
        css: '',
        js: ''
    },
    noticeId: false,
    inFrames: false,
    currentTool: null,
    disabledMouseWheel: false,
    ads: true,
    loaded: false,
    globalLoading: false,
    welcome: true,
    isMobile: {},
    env: env,
    customLinks: [], // 确保有默认值
    syncTime: 0
});

export const mutations = {
    SET_STORE(state, { key, value }) {
        if (key === 'customLinks') {
            // 确保 customLinks 总是一个数组，并且每个项目都有正确的结构
            state[key] = Array.isArray(value) ? value.map(link => ({
                name: link.name,
                path: link.path,
                priority: parseInt(link.priority) || 0,
                external: true
            })) : [];
        } else {
            state[key] = value;
        }
    },
    TOGGLE_DARK(state) {
        state.dark = !state.dark;
        const disabledMouseWheel = event => {
            event.preventDefault();
        };
        if (state.dark) {
            document.addEventListener('mousewheel', disabledMouseWheel, {
                passive: false
            });
        } else {
            document.removeEventListener('mousewheel', disabledMouseWheel);
        }
    }
};

export const plugins = [
    createPersistedState({
        paths: ['customLinks', 'setting'],
        storage: window.localStorage
    })
];
