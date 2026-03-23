<template>
    <div class="flex flex-col p-5 gap-4 h-full">
        
        <div class="flex flex-col gap-2">

            <div class="p-4 duration-300 text-lg flex items-center gap-4">

                <span class="flex-none" v-if="$store.state.user.ut_id.description == 'Admin'">Select Training Center</span>

                <select v-model="selectedTC" class="rounded-lg" v-if="$store.state.user.ut_id.description == 'Admin'">
                <option :value="null">All</option>
                <option v-for="i in stats.list_tc" :key="i.id" :value="i.id">{{ i.abbre + " - " + i.description }}</option>
                </select>

                 <select v-model="selectedYear" class="rounded-lg">
                <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
                </select>
            </div>

            <div class="bg-white rounded-lg p-4 duration-300 text-lg flex items-center gap-4">
                <span class="flex-auto">Billing Report</span>

                <button @click="generateReport('billing_report','pdf')" class="p-2 bg-red-600 text-white text-sm rounded-lg">
                Generate as PDF
                </button>

                <button @click="generateReport('billing_report','excel')" class="p-2 bg-green-600 text-white text-sm rounded-lg">
                Generate as Excel
                </button>
            </div>

            <div class="bg-white rounded-lg p-4 duration-300 text-lg flex items-center gap-4">
                <span class="flex-auto">Billing Utilization Report</span>

                <button @click="generateReport('utilization_report','pdf')" class="p-2 bg-red-600 text-white text-sm rounded-lg">
                Generate as PDF
                </button>

                <button @click="generateReport('utilization_report','excel')" class="p-2 bg-green-600 text-white text-sm rounded-lg">
                Generate as Excel
                </button>
            </div>

            <div class="bg-white rounded-lg p-4 duration-300 text-lg flex items-center gap-4">
                <span class="flex-auto">Billing Compliance Report</span>

                <button @click="generateReport('compliance_report','pdf')" class="p-2 bg-red-600 text-white text-sm rounded-lg">
                Generate as PDF
                </button>

                <button @click="generateReport('compliance_report','excel')" class="p-2 bg-green-600 text-white text-sm rounded-lg">
                Generate as Excel
                </button>
            </div>

            <div class="bg-white rounded-lg p-4 duration-300 text-lg flex items-center gap-4">
                <span class="flex-auto">Assessment Rate Report</span>

                <button @click="generateReport('assessment_report','pdf')" class="p-2 bg-red-600 text-white text-sm rounded-lg">
                Generate as PDF
                </button>

                <button @click="generateReport('assessment_report','excel')" class="p-2 bg-green-600 text-white text-sm rounded-lg">
                Generate as Excel
                </button>
            </div>

            <div class="bg-white rounded-lg p-4 duration-300 text-lg flex items-center gap-4">
                <span class="flex-auto">Dropped Trainees</span>

                <button @click="generateReport('dropped_report','pdf')" class="p-2 bg-red-600 text-white text-sm rounded-lg">
                Generate as PDF
                </button>

                <button @click="generateReport('dropped_report','excel')" class="p-2 bg-green-600 text-white text-sm rounded-lg">
                Generate as Excel
                </button>
            </div>

             <div class="p-4 duration-300 text-lg flex items-center gap-4" v-if="$store.state.user.ut_id.description == 'Admin'">

                <span class="flex-none">For all Training Center</span>

                <select v-model="selectedYearAll" class="rounded-lg">
                <option v-for="year in years_all" :key="year" :value="year">{{ year }}</option>
                </select>

            </div>

            <div class="bg-white rounded-lg p-4 duration-300 text-lg flex items-center gap-4" v-if="$store.state.user.ut_id.description == 'Admin'">
                <span class="flex-auto">Scholarship Allocation Report</span>

                <button @click="generateReport('scholarship_report','pdf')" class="p-2 bg-red-600 text-white text-sm rounded-lg">
                Generate as PDF
                </button>

                <button @click="generateReport('scholarship_report','excel')" class="p-2 bg-green-600 text-white text-sm rounded-lg">
                Generate as Excel
                </button>
            </div>

            <div class="bg-white rounded-lg p-4 duration-300 text-lg flex items-center gap-4" v-if="$store.state.user.ut_id.description == 'Admin'">
                <span class="flex-auto">Performance Evaluation Report</span>


                <button @click="generateReport('performance_report','pdf')" class="p-2 bg-red-600 text-white text-sm rounded-lg">
                Generate as PDF
                </button>

                <button @click="generateReport('performance_report','excel')" class="p-2 bg-green-600 text-white text-sm rounded-lg">
                Generate as Excel
                </button>
            </div>


        </div>

    </div>

    <LoadingView v-if="isLoading"/>
</template>

<script>

import axios from 'axios';
import LoadingView from './LoadingView.vue';

export default{
    components:{
        LoadingView
    },
    data() {
        return {
            isLoading: false,
            selectedYear: '',
            selectedYearAll: '',
            years: [],        // e.g. ["2020-2021", "2021-2022", ..., "2025-2026"]
            years_all: [],    // e.g. ["2020-2021", "2021-2022", ..., "2024-2025"]
            stats: {
            total_tc: 0,
            total_q: 0,
            list_tc: null,
            list_q: null,
            },
            selectedTC: null,
        }
        },
    created() {
    const startYear = 2020;
    const currentYear = new Date().getFullYear();

    // Generate fiscal years up to *next* fiscal year for both arrays
    for (let y = startYear; y <= currentYear; y++) {
        const fy = `${y}-${y + 1}`;
        this.years.push(fy);
        this.years_all.push(fy);
    }

    // Defaults — last (most recent) fiscal year
    this.selectedYear = this.years[this.years.length - 1];
    this.selectedYearAll = this.years_all[this.years_all.length - 1];

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
            axios.get(process.env.VUE_APP_BASE_URL + '/billing_periods/performance_scores_by_q/' + this.selectedYearAll)
            .then((res) => {

                if (res.status == 200) {

                    this.stats.list_q = res.data;

                }

            });
        },
        getTrainingCenters(){
            axios.get(process.env.VUE_APP_BASE_URL + '/training_centers/get_all')
            .then((res) => {

                if (res.status == 200) {

                    this.stats.list_tc = res.data;
                    

                }

            });
        },
        formatName(data){
            const lname = data.lname ? data.lname : '';
            const fname = data.fname ? data.fname : '';
            const mname = data.mname ? data.mname : '';
            const extension = data.extension ? data.extension : '';

            return lname + ', ' + fname + ' ' + mname + ' ' + extension;
        },
        async generateReport(type, file_type) {
        try {
            this.isLoading = true;

            let file_data = {};
            let findVal = null;

            // Find selected training center if any
            if (this.selectedTC) {
            findVal = this.stats.list_tc.find(item => item.id === this.selectedTC);
            }
            
            if(this.$store.state.user.ut_id.description == 'TC Staff') this.selectedTC = this.$store.state.user.tc_id.id;
            // Base year value
            const year = ['performance_report', 'scholarship_report'].includes(type)
            ? this.selectedYearAll
            : this.selectedYear;

            // Common base structure
            file_data = {
            title_report : type.replace(/_/g, " ").toUpperCase() + ' FOR ' + this.selectedYear,
            title: findVal && (type != 'scholarship_report' && type != 'performance_report') ? findVal.description : 'ALL TRAINING CENTER',
            type,
            year,
            prepared_by : this.formatName(this.$store.state.user.user_info),
            params: {
                tc_id: this.selectedTC || null,
            },
            };

            

            // Dynamic filename (different extension depending on file_type)
            const fileExt = file_type === 'pdf' ? 'pdf' : 'xlsx';
            const prefix = findVal ? findVal.abbre + '_' : '';

            if (type === 'billing_report')
            file_data.file_name = `${prefix}billing_report_${year}.${fileExt}`;
            else if (type === 'utilization_report')
            file_data.file_name = `${prefix}utilization_report_${year}.${fileExt}`;
            else if (type === 'compliance_report')
            file_data.file_name = `${prefix}compliance_report_${year}.${fileExt}`;
            else if (type === 'performance_report')
            file_data.file_name = `performance_report_${year}.${fileExt}`;
            else if (type === 'scholarship_report')
            file_data.file_name = `scholarship_allocation_report_${year}.${fileExt}`;
            else if (type === 'assessment_report')
            file_data.file_name = `assessment_report_${year}.${fileExt}`;
            else if (type === 'dropped_report')
            file_data.file_name = `dropped_report_${year}.${fileExt}`;

            // Determine API endpoint
            const endpoint =
            file_type === 'pdf'
                ? '/billing_periods/generate_report_billing'
                : '/billing_periods/generate_excel_billing';

            // 🔥 Send POST request
            const response = await axios.post(
            `${process.env.VUE_APP_BASE_URL}${endpoint}`,
            file_data
            );

            // ✅ Backend should ideally return { fileName: '...xlsx' }
            if (response.status === 200 || response.status === 201) {
            const fileName = response.data.fileName || file_data.file_name;

            const fileUrl =
                file_type === 'pdf'
                ? `${process.env.VUE_APP_BASE_URL}/billing_periods/get_report_file/${fileName}`
                : `${process.env.VUE_APP_BASE_URL}/billing_periods/get_excel_file/${fileName}`;

            // Open or download the file
            window.open(fileUrl, '_blank');
            }

        } catch (error) {
            console.error('Error generating report:', error);
        } finally {
            this.isLoading = false;
        }
        },
        checkDateFormat(date) {
        // This method should format the date as needed, for example:
        const d = new Date(date);
        return d.toISOString().split('T')[0]; // Format as YYYY-MM-DD
        }
    }
}
</script>