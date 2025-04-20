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
    },
    methods: {
        addLink() {
            if (!this.newLink.name || !this.newLink.url) {
                this.$noty.error('网站名称和地址不能为空');
                return;
            }
            if (
                !this.newLink.url.startsWith('http://') &&
                !this.newLink.url.startsWith('https://')
            ) {
                this.$noty.error('网站地址必须以 http:// 或 https:// 开头');
                return;
            }
            const customLinks = this.$store.state.customLinks || [];
            customLinks.push({
                name: this.newLink.name,
                path: this.newLink.url
            });
            this.$store.commit('SET_STORE', {
                key: 'customLinks',
                value: customLinks
            });
            // 清空输入
            this.newLink.name = '';
            this.newLink.url = '';
            this.$noty.success('添加成功');
        }
    }
};
</script>
