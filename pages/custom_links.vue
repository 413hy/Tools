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
            
            <nya-input
                v-model.trim="newLink.priority"
                class="mb-15"
                label="优先级"
                type="number"
                placeholder="数字越大越靠前显示"
                fullwidth
            />
            
            <button type="button" class="nya-btn mb-15" @click="addLink">
                添加网站
            </button>
        </nya-container>

        <nya-container v-if="sortedLinks.length > 0" title="已添加的网站">
            <div class="link-list">
                <div v-for="(link, index) in sortedLinks" :key="index" class="link-item">
                    <template v-if="editingIndex === index">
                        <div class="edit-form">
                            <nya-input
                                v-model.trim="editingLink.name"
                                class="mb-10"
                                label="网站名称"
                                fullwidth
                            />
                            <nya-input
                                v-model.trim="editingLink.url"
                                class="mb-10"
                                label="网站地址"
                                fullwidth
                            />
                            <nya-input
                                v-model.trim="editingLink.priority"
                                class="mb-10"
                                label="优先级"
                                type="number"
                                fullwidth
                            />
                            <div class="actions">
                                <button class="nya-btn success" @click="saveEdit(index)">
                                    保存
                                </button>
                                <button class="nya-btn" @click="cancelEdit">
                                    取消
                                </button>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="link-info">
                            <div class="link-name">
                                {{ link.name }}
                            </div>
                            <div class="link-url">
                                {{ link.path }}
                            </div>
                            <div class="link-priority">
                                优先级: {{ link.priority || 0 }}
                            </div>
                        </div>
                        <div class="link-actions">
                            <button class="nya-btn small" @click="editLink(index)">
                                编辑
                            </button>
                            <button class="nya-btn small danger" @click="removeLink(index)">
                                删除
                            </button>
                        </div>
                    </template>
                </div>
            </div>
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
                url: '',
                priority: 0
            },
            editingIndex: -1,
            editingLink: null
        };
    },
    computed: {
        sortedLinks() {
            const links = this.$store.state.customLinks || [];
            return [...links].sort(
                (a, b) => (b.priority || 0) - (a.priority || 0)
            );
        }
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

            const customLinks = [...(this.$store.state.customLinks || [])];
            customLinks.push({
                name: this.newLink.name,
                path: this.newLink.url,
                priority: parseInt(this.newLink.priority) || 0
            });

            this.$store.commit('SET_STORE', {
                key: 'customLinks',
                value: customLinks
            });

            this.newLink.name = '';
            this.newLink.url = '';
            this.newLink.priority = 0;
            this.$noty.success('添加成功');
        },
        editLink(index) {
            const link = this.sortedLinks[index];
            this.editingLink = {
                name: link.name,
                url: link.path,
                priority: link.priority || 0
            };
            this.editingIndex = index;
        },
        saveEdit(index) {
            if (!this.editingLink.name || !this.editingLink.url) {
                this.$noty.error('网站名称和地址不能为空');
                return;
            }
            if (
                !this.editingLink.url.startsWith('http://') &&
                !this.editingLink.url.startsWith('https://')
            ) {
                this.$noty.error('网站地址必须以 http:// 或 https:// 开头');
                return;
            }
            const customLinks = [...this.$store.state.customLinks];
            const realIndex = customLinks.findIndex(
                link =>
                    link.name === this.sortedLinks[index].name &&
                    link.path === this.sortedLinks[index].path
            );

            if (realIndex !== -1) {
                customLinks[realIndex] = {
                    name: this.editingLink.name,
                    path: this.editingLink.url,
                    priority: parseInt(this.editingLink.priority) || 0
                };

                this.$store.commit('SET_STORE', {
                    key: 'customLinks',
                    value: customLinks
                });

                this.editingIndex = -1;
                this.editingLink = null;
                this.$noty.success('修改成功');
            }
        },
        cancelEdit() {
            this.editingIndex = -1;
            this.editingLink = null;
        },
        removeLink(index) {
            const customLinks = [...this.$store.state.customLinks];
            const realIndex = customLinks.findIndex(
                link =>
                    link.name === this.sortedLinks[index].name &&
                    link.path === this.sortedLinks[index].path
            );

            if (realIndex !== -1) {
                customLinks.splice(realIndex, 1);
                this.$store.commit('SET_STORE', {
                    key: 'customLinks',
                    value: customLinks
                });
                this.$noty.success('删除成功');
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.custom_links {
    .link-list {
        .link-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px;
            margin-bottom: 15px;
            border-radius: 8px;
            background-color: var(--theme-bg-light);

            .link-info {
                .link-name {
                    font-weight: bold;
                    margin-bottom: 5px;
                }
                .link-url {
                    color: var(--theme-text-light);
                    font-size: 0.9em;
                    margin-bottom: 5px;
                }
                .link-priority {
                    color: var(--theme-text-lighter);
                    font-size: 0.8em;
                }
            }

            .link-actions {
                .nya-btn.small {
                    margin-left: 8px;
                    padding: 4px 8px;
                    font-size: 0.9em;
                }
            }

            .edit-form {
                width: 100%;
                .actions {
                    display: flex;
                    gap: 10px;
                    justify-content: flex-end;
                }
            }
        }
    }
}
</style>
