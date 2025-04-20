<template>
    <div class="custom_links">
        <nya-container title="自定义网页导航">
            <div class="nya-subtitle">
                添加您常用的网站到导航栏中，方便快速访问
            </div>
            
            <nya-input
                v-model.trim="newLink.name"
                class="mb-15"
                label="网站名称"
                placeholder="例如：百度"
                fullwidth
            />
            
            <nya-input
                v-model.trim="newLink.url"
                class="mb-15"
                label="网站地址"
                placeholder="例如：https://www.baidu.com"
                fullwidth
            />
            
            <button type="button" class="nya-btn mb-15" @click="addLink">
                添加网站
            </button>
        </nya-container>
    </div>
</template>

<script>
export default {
    name: 'CustomLinks',
    data() {
        return {
            newLink: {
                name: '',
                url: ''
            }
        };
    }
};
</script>
