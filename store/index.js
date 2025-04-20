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
    SET_STORE(state, { key, value }) {
        state[key] = value;
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
