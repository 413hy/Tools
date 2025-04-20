<template>
    <div>
        <div class="container">
            <div class="form-group">
                <div class="input-group">
                    <input
                        id="datetime"
                        v-model="datetime"
                        type="datetime-local"
                        class="form-control"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import dayjs from 'dayjs';
export default {
    name: 'TimeConverter',
    data() {
        return {
            inputTime: '',
            inputFormat: 'UTC',
            convertedTime: null
        };
    },
    computed: {
        isValidInput() {
            // 检查输入时间格式是否有效
            return this.inputTime && !isNaN(new Date(this.inputTime).getTime());
        }
    },
    methods: {
        convertTime() {
            let date;
            switch (this.inputFormat) {
                case 'UTC':
                    date = new Date(this.inputTime + 'Z');
                    break;
                case 'GMT':
                    date = new Date(this.inputTime);
                    break;
                case 'CST':
                    date = new Date(this.inputTime);
                    date = new Date(date.getTime() + 8 * 60 * 60 * 1000); // CST为UTC+8
                    break;
                case 'EST':
                    date = new Date(this.inputTime);
                    date = new Date(date.getTime() - 5 * 60 * 60 * 1000); // EST为UTC-5
                    break;
                case 'PST':
                    date = new Date(this.inputTime);
                    date = new Date(date.getTime() - 8 * 60 * 60 * 1000); // PST为UTC-8
                    break;
                default:
                    return;
            }

            this.convertedTime = {
                utc: dayjs(date).format('YYYY-MM-DD HH:mm:ss [UTC]'),
                gmt: dayjs(date).format('YYYY-MM-DD HH:mm:ss [GMT]'),
                cst: dayjs(date.getTime() + 8 * 60 * 60 * 1000).format(
                    'YYYY-MM-DD HH:mm:ss [CST]'
                ),
                est: dayjs(date.getTime() + 5 * 60 * 60 * 1000).format(
                    'YYYY-MM-DD HH:mm:ss [EST]'
                ),
                pst: dayjs(date.getTime() + 8 * 60 * 60 * 1000).format(
                    'YYYY-MM-DD HH:mm:ss [PST]'
                )
            };
        }
    }
};
</script>

<style lang="scss">
.time-converter {
    .input-group {
        margin-bottom: 15px;
        display: flex;
        flex-direction: column;
    }

    .nya-select {
        margin-top: 10px;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
    }

    .nya-btn {
        width: 100%;
        padding: 10px;
        margin-top: 15px;
        background-color: #28a745;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;

        &:hover {
            background-color: #218838;
        }

        &:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }
    }

    .timezone-explanation {
        margin-top: 10px;
        font-size: 14px;
        line-height: 1.5;

        strong {
            color: #333;
        }
    }
}
</style>
