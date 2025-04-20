<template>
    <div class="custom_links">
        <nya-container title="自定义网页导航">
            <div class="nya-subtitle">
                添加您常用的网站到导航栏中，方便快速访问
            </div>
            
            <div class="link-info">
                <div class="link-name">
                    {{ link.name }}
                </div>
                <div class="link-url">
                    {{ link.path }}
                </div>
                <div class="link-desc">
                    {{ link.description }}
                </div>
            </div>
            
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
            
            const link = {
                name: this.newLink.name,
                path: this.newLink.url,
                external: true
            };
            
            this.links.push(link);
            this.$store.commit('SET_STORE', {
                key: 'customLinks',
                value: this.links
            });
            
            this.newLink.name = '';
            this.newLink.url = '';
            
            this.$noty.success('添加成功');
        },
        removeLink(index) {
            this.links.splice(index, 1);
            this.$store.commit('SET_STORE', {
                key: 'customLinks',
                value: this.links
            });
            this.$noty.success('删除成功');
        }
    }
};
</script>