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
            ? 'https://yuhe.zone.id/'
            : 'https://yuhe.zone.id/',
    apiUrl:
        process.env.NODE_ENV === 'development'
            ? 'https://yuhe.zone.id/'
            : 'https://yuhe.zone.id/',
    pinyin: pinyin,
    development: process.env.NODE_ENV === 'development',
    axios:
        process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:3001'
            : 'https://yuhe.zone.id/'
};
