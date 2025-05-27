import pinyin from './pinyin';

export default {
    title: 'YangHE のTools',
    domain:
        process.env.NODE_ENV === 'development'
            ? 'dev.miku.tools:3000'
            : 'yuhe.zone.id',
    description: '一个轻量的工具集合',
    url:
        process.env.NODE_ENV === 'development'
            ? 'https://tools.085580.xyz/'
            : 'https://tools.085580.xyz/',
    apiUrl:
        process.env.NODE_ENV === 'development'
            ? 'https://tools.085580.xyz/'
            : 'https://tools.085580.xyz/',
    pinyin: pinyin,
    development: process.env.NODE_ENV === 'development',
    axios:
        process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:3001'
            : 'https://tools.085580.xyz/'
};
