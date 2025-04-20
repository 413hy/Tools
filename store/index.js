import _ from 'lodash';
import env from '../env';

export const state = () => ({
    dark: false,
    noticeId: false,
    inFrames: false,
    currentTool: null,
    disabledMouseWheel: false,
    ads: true,
    loaded: false,
    setting: {
        animations: true,
        hide: [],
        favorites: [],
        hideCategory: false,
        hidePay: false,
        hideNotice: false,
        css: '',
        js: '',
        inNewTab: null,
        bg: {
            type: 'none',
            upload: {
                url: '',
                deleteUrl: ''
            },
            customUrl: '',
            blur: 4,
            opacity: 50,
            transparentEl: true
        }
    },
    globalLoading: false,
    welcome: true,
    isMobile: {},
    env: env,
    customLinks: [],
    syncTime: 0
});

export const mutations = {
    SET_STORE(state, n) {
        if (_.isArray(n.value)) {
            n.value = Array.from(n.value);
        }
        if (_.isObject(n.value)) {
            n.value = _.chain(n.value)
                .assign()
                .value();
        }
        state = _.chain(state)
            .set(n.key, n.value)
            .value();
    },
    loadingComponent(state, n) {
        state.globalLoading = n;
    },
    switchTheme(state, n) {
        if (n !== undefined) {
            state.dark = n;
        } else {
            state.dark = !state.dark;
        }
    },
    disabledMouseWheel(state, type) {
        if (type) {
            document.addEventListener('wheel', disabledMouseWheel, {
                passive: true
            });
        } else {
            document.removeEventListener('wheel', disabledMouseWheel, {
                passive: true
            });
        }
        state.disabledMouseWheel = type;
    },
    
    UPDATE_CUSTOM_LINKS(state, links) {
        state.customLinks = links;
        // 自动保存到本地存储
        if (process.browser) {
            localStorage.setItem('miku_custom_links', JSON.stringify(links));
        }
    }
};

export const actions = {
    nuxtServerInit({ commit }) {
        if (process.browser) {
            const savedLinks = localStorage.getItem('miku_custom_links');
            if (savedLinks) {
                commit('UPDATE_CUSTOM_LINKS', JSON.parse(savedLinks));
            }
        }
    }
};