import env from '../env';

export const state = () => ({
    dark: false,
    setting: {
        bg: {
            type: 'custom',
            customUrl: 'https://yhedesk.dpdns.org/nz_001webp',
            blur: 0,
            opacity: 100,
            transparentEl: false,
            upload: {
                url: '',
                deleteUrl: ''
            }
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
