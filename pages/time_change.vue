<template>
    <div class="time-converter">
        <nya-container title="时区转换">
            <div class="input-group">
                <nya-select
                    v-model="inputFormat"
                    :items="timezoneList"
                    label="选择输入时区"
                    class="nya-select"
                />
                <nya-input
                    v-model="inputTime"
                    type="datetime-local"
                    label="输入时间"
                    class="nya-input"
                />
                <button
                    type="button"
                    class="nya-btn"
                    :disabled="!isValidInput"
                    @click="convertTime"
                >
                    转换
                </button>
            </div>

            <nya-container v-if="convertedTime" title="转换结果">
                <div class="result-list">
                    <div v-for="(time, zone) in convertedTime" :key="zone" class="result-item">
                        <span class="zone-name">{{ getZoneName(zone) }}:</span>
                        <span class="time-value">{{ time }}</span>
                    </div>
                </div>
            </nya-container>

            <nya-container title="说明">
                <div class="timezone-explanation">
                    <p><strong>UTC</strong>: 协调世界时，全球标准时间</p>
                    <p><strong>GMT</strong>: 格林威治标准时间</p>
                    <p><strong>CST</strong>: 中国标准时间 (UTC+8)</p>
                    <p><strong>EST</strong>: 美国东部时间 (UTC-5)</p>
                    <p><strong>PST</strong>: 美国太平洋时间 (UTC-8)</p>
                </div>
            </nya-container>
        </nya-container>
    </div>
</template>

<script>
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export default {
    name: 'TimeConverter',
    head() {
        return this.$store.state.currentTool.head;
    },
    data() {
        return {
            inputTime: '',
            inputFormat: 'UTC',
            convertedTime: null,
            timezoneList: {
                UTC: 'UTC',
                GMT: 'GMT',
                CST: '中国标准时间 (CST)',
                EST: '美国东部时间 (EST)',
                PST: '美国太平洋时间 (PST)'
            }
        };
    },
    computed: {
        isValidInput() {
            return this.inputTime && !isNaN(new Date(this.inputTime).getTime());
        }
    },
    methods: {
        getZoneName(zone) {
            return this.timezoneList[zone] || zone;
        },
        convertTime() {
            if (!this.isValidInput) return;

            let date;
            const inputDate = dayjs(this.inputTime);

            switch (this.inputFormat) {
                case 'UTC':
                    date = inputDate.utc();
                    break;
                case 'GMT':
                    date = inputDate;
                    break;
                case 'CST':
                    date = inputDate.utc().add(8, 'hour');
                    break;
                case 'EST':
                    date = inputDate.utc().subtract(5, 'hour');
                    break;
                case 'PST':
                    date = inputDate.utc().subtract(8, 'hour');
                    break;
                default:
                    return;
            }

            this.convertedTime = {
                UTC: date.format('YYYY-MM-DD HH:mm:ss [UTC]'),
                GMT: date.format('YYYY-MM-DD HH:mm:ss [GMT]'),
                CST: date.add(8, 'hour').format('YYYY-MM-DD HH:mm:ss [CST]'),
                EST: date.add(5, 'hour').format('YYYY-MM-DD HH:mm:ss [EST]'),
                PST: date.add(8, 'hour').format('YYYY-MM-DD HH:mm:ss [PST]')
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
        gap: 15px;
    }

    .nya-select {
        width: 100%;
    }

    .nya-input {
        width: 100%;
    }

    .nya-btn {
        width: 100%;
        padding: 10px;
        background-color: var(--theme);
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;

        &:hover {
            opacity: 0.9;
        }

        &:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }
    }

    .result-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 10px 0;
    }

    .result-item {
        display: flex;
        justify-content: space-between;
        padding: 8px;
        background-color: #f5f5f5;
        border-radius: 4px;

        .zone-name {
            font-weight: bold;
            color: #333;
        }

        .time-value {
            color: var(--theme);
        }
    }

    .timezone-explanation {
        margin-top: 10px;
        font-size: 14px;
        line-height: 1.6;

        p {
            margin: 5px 0;
        }

        strong {
            color: var(--theme);
        }
    }
}
</style>
