<template>
    <div class="flex flex-col p-5 gap-4 h-full">

        <div v-show="$store.state.user.ut_id.description == 'Admin'">
            <select v-model="selectedYear" @change="getStats" class="rounded-lg text-gray-800">
            <option v-for="year in years" :key="year" :value="year">
                {{ year }}
            </option>
            </select>
        </div>

        <div class="flex gap-4">

            <div class="flex-auto flex flex-col bg-white rounded-lg gap-4 p-4"> <!--Left Column-->

                <div class="p-4 text-center bg-gray-100 rounded-lg">
                    Billing Record were submitted late as of Fiscal Year 2023-2024
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div class="flex flex-col text-center gap-2 p-4 bg-blue-400 bg-opacity-40 rounded-lg">
                        <b class="text-2xl">{{ stats.total_tc }}</b>
                        <span>Training Centers</span>
                    </div>

                    <div class="flex flex-col text-center gap-2 p-4 bg-blue-400 bg-opacity-40 rounded-lg">
                        <b class="text-2xl">{{ stats.total_q }}</b>
                        <span>Scholarship Type</span>
                    </div>

                    <div class="flex flex-col text-center gap-2 p-4 bg-blue-400 bg-opacity-40 rounded-lg">
                        <b class="text-2xl">{{ stats.total_q }}</b>
                        <span>Qualifications</span>
                    </div>
                </div>

            </div>

            <div class="flex-none flex flex-col gap-4"> <!--Right Column-->

                <div class="grid grid-cols-2 gap-4">
                    <div class="flex flex-col text-center gap-2 p-4 bg-blue-400 bg-opacity-40 rounded-lg">
                        <b class="text-2xl">{{ stats.total_tc }}</b>
                        <span>Training Centers</span>
                    </div>

                    <div class="flex flex-col text-center gap-2 p-4 bg-blue-400 bg-opacity-40 rounded-lg">
                        <b class="text-2xl">{{ stats.total_q }}</b>
                        <span>Qualifications</span>
                    </div>
                </div>

                <div class="flex flex-col p-4 bg-yellow-400 bg-opacity-40 rounded-lg gap-1">

                    <p>Top Training Centers</p>

                    <span v-for="(i, index) in stats.list_tc" :key="i.id" class="text-sm flex items-center gap-2">
                        <span>{{ index + 1 }}. {{ i.trainingCenter }}</span>
                        <span class="flex-auto"></span>
                        <span>{{ "(" + (i.WPS * 100).toFixed(2) + "%)" }}</span>
                    </span>

                </div>

                <div class="flex flex-col p-4 bg-yellow-400 bg-opacity-40 rounded-lg gap-1">

                    <p>Top Qualification</p>

                    <span v-for="(i, index) in stats.list_q" :key="i.id" class="text-sm flex items-center gap-2">
                        <span>{{ index + 1 }}. {{ i.qualification }}</span>
                        <span class="flex-auto"></span>
                        <span>{{ "(" + (i.BUR * 100).toFixed(2) + "%)" }}</span>
                    </span>

                </div>

            </div>

        </div>
        
    </div>
</template>

<script>

import axios from 'axios';

export default{
    data(){
        return{
            selectedYear: new Date().getFullYear(), // Default selected year
            years: [],
            stats: {
                total_tc : 0,
                total_q : 0,
                list_tc : null,
                list_q : null,
            }
        }
    },
    created() {
        const currentYear = new Date().getFullYear();
        for (let y = currentYear; y >= 2000; y--) {
        this.years.push(y);
        }

        this.getStats();
    },
    methods: {
        getStats() {
        // Your logic when the year changes
           this.getCounts();
           this.getTrainingCenters();
           this.getQualifications();
        },
        getCounts(){
            axios.get(process.env.VUE_APP_BASE_URL + '/training_centers/get_count/')
            .then((res) => {

                if (res.status == 200) {

                    this.stats.total_tc = res.data.total_cnt;

                }

            });

            axios.get(process.env.VUE_APP_BASE_URL + '/qualifications/get_count/')
            .then((res) => {

                if (res.status == 200) {

                    this.stats.total_q = res.data.total_cnt;

                }

            });
        },
        getQualifications(){
            axios.get(process.env.VUE_APP_BASE_URL + '/billing_periods/performance_scores_by_q/')
            .then((res) => {

                if (res.status == 200) {

                    this.stats.list_q = res.data;

                }

            });
        },
        getTrainingCenters(){
            axios.get(process.env.VUE_APP_BASE_URL + '/billing_periods/performance_scores/')
            .then((res) => {

                if (res.status == 200) {

                    this.stats.list_tc = res.data;

                }

            });
        },
    }
}
</script>