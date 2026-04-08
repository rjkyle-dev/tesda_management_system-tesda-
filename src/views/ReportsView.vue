<template>
  <div class="flex flex-col p-5 gap-4 h-full page-anim">
    <div class="flex items-start justify-between gap-4">
      <h1 class="text-2xl font-semibold text-slate-900">Reports</h1>
    </div>

    <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col sm:flex-row sm:items-center gap-3 filter-anim">
      <div class="flex items-center gap-3 flex-wrap">
        <div v-if="$store.state.user.ut_id.description == 'Admin'" class="inline-flex items-center gap-2">
          <span class="text-sm text-slate-500">Training Center</span>
          <select v-model="selectedTC" class="filter-select">
            <option :value="null">All</option>
            <option v-for="i in stats.list_tc" :key="i.id" :value="i.id">
              {{ i.abbre + " - " + i.description }}
            </option>
          </select>
        </div>

        <div class="inline-flex items-center gap-2">
          <select v-model="selectedYear" class="year-pill" aria-label="Select fiscal year">
            <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
          </select>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-4">
      <div
        v-for="(r, idx) in reportCards"
        :key="r.type"
        class="report-card card-anim"
        :style="{ animationDelay: `${Math.min(idx, 20) * 55}ms` }"
      >
        <div class="report-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" class="w-5 h-5">
            <path
              d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linejoin="round"
            />
            <path
              d="M14 3v5h5"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linejoin="round"
            />
            <path
              d="M8 13h8M8 17h6"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
            />
          </svg>
        </div>

        <div class="flex-1 min-w-0">
          <p class="text-slate-800 font-semibold truncate">{{ r.label }}</p>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <button @click="generateReport(r.type, 'pdf')" class="btn-pdf" type="button">
            <span class="inline-flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" class="w-4 h-4" aria-hidden="true">
                <path
                  d="M12 3v10m0 0l-4-4m4 4l4-4"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5 15v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                />
              </svg>
              PDF
            </span>
          </button>

          <button @click="generateReport(r.type, 'excel')" class="btn-excel" type="button">
            <span class="inline-flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" class="w-4 h-4" aria-hidden="true">
                <path
                  d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linejoin="round"
                />
                <path
                  d="M14 3v5h5"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linejoin="round"
                />
                <path
                  d="M9 14l2 2 4-4"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Excel
            </span>
          </button>
        </div>
      </div>
    </div>

    <div v-if="$store.state.user.ut_id.description == 'Admin'" class="mt-2">
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col sm:flex-row sm:items-center gap-3 filter-anim">
        <div class="flex items-center gap-3 flex-wrap">
          <span class="text-sm text-slate-500">For all Training Center</span>
          <select v-model="selectedYearAll" class="year-pill" aria-label="Select fiscal year for all training centers">
            <option v-for="year in years_all" :key="year" :value="year">{{ year }}</option>
          </select>
        </div>
      </div>

      <div class="flex flex-col gap-4 mt-4">
        <div
          v-for="(r, idx) in adminReportCards"
          :key="r.type"
          class="report-card card-anim"
          :style="{ animationDelay: `${Math.min(idx + reportCards.length, 20) * 55}ms` }"
        >
          <div class="report-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" class="w-5 h-5">
              <path
                d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linejoin="round"
              />
              <path
                d="M14 3v5h5"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linejoin="round"
              />
              <path
                d="M8 13h8M8 17h6"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
              />
            </svg>
          </div>

          <div class="flex-1 min-w-0">
            <p class="text-slate-800 font-semibold truncate">{{ r.label }}</p>
          </div>

          <div class="flex items-center gap-2 shrink-0">
            <button @click="generateReport(r.type, 'pdf')" class="btn-pdf" type="button">
              <span class="inline-flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" class="w-4 h-4" aria-hidden="true">
                  <path
                    d="M12 3v10m0 0l-4-4m4 4l4-4"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5 15v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                  />
                </svg>
                PDF
              </span>
            </button>

            <button @click="generateReport(r.type, 'excel')" class="btn-excel" type="button">
              <span class="inline-flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" class="w-4 h-4" aria-hidden="true">
                  <path
                    d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M14 3v5h5"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9 14l2 2 4-4"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Excel
              </span>
            </button>
          </div>
        </div>
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
    computed: {
        reportCards(){
          return [
            { type: 'billing_report', label: this.reportLabel('billing_report') },
            { type: 'utilization_report', label: this.reportLabel('utilization_report') },
            { type: 'compliance_report', label: this.reportLabel('compliance_report') },
            { type: 'assessment_report', label: this.reportLabel('assessment_report') },
            { type: 'dropped_report', label: this.reportLabel('dropped_report') },
          ];
        },
        adminReportCards(){
          return [
            { type: 'scholarship_report', label: this.reportLabel('scholarship_report') },
            { type: 'performance_report', label: this.reportLabel('performance_report') },
          ];
        },
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
        reportLabel(type){
          const map = {
            billing_report: 'Billing Report',
            utilization_report: 'Billing Utilization Report',
            compliance_report: 'Billing Compliance Report',
            assessment_report: 'Assessment Rate Report',
            dropped_report: 'Dropped Trainees',
            scholarship_report: 'Scholarship Allocation Report',
            performance_report: 'Performance Evaluation Report',
          };
          return map[type] || type;
        },
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

<style scoped>
.filter-select{
  border: 1px solid rgba(226, 232, 240, 1);
  border-radius: 0.9rem;
  padding: 0.55rem 0.9rem;
  font-size: 0.9rem;
  color: #0f172a;
  background: #fff;
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.04);
}

.year-pill{
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: 1px solid rgba(226, 232, 240, 1);
  border-radius: 9999px;
  padding: 0.55rem 1.05rem;
  font-size: 0.95rem;
  font-weight: 700;
  color: #0f172a;
  background: rgba(241, 245, 249, 1);
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.04);
}

.report-card{
  background: #fff;
  border: 1px solid rgba(226, 232, 240, 1);
  border-radius: 1.15rem;
  padding: 1.1rem 1.1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 10px 22px rgba(15, 23, 42, 0.06);
}

.report-icon{
  width: 44px;
  height: 44px;
  border-radius: 1rem;
  display: grid;
  place-items: center;
  background: rgba(226, 232, 240, 0.55);
  color: #0f766e;
}

.btn-pdf, .btn-excel{
  border-radius: 9999px;
  padding: 0.55rem 0.95rem;
  font-size: 0.85rem;
  font-weight: 800;
  color: #fff;
  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.08);
  transition: transform 150ms ease, filter 150ms ease;
}

.btn-pdf{
  background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%);
}

.btn-excel{
  background: linear-gradient(135deg, #10b981 0%, #047857 100%);
}

.btn-pdf:hover, .btn-excel:hover{
  filter: brightness(1.03);
  transform: translateY(-1px);
}

.btn-pdf:active, .btn-excel:active{
  transform: translateY(0);
}

.page-anim{
  animation: pageFadeUp 520ms cubic-bezier(.2,.9,.2,1) both;
}

.filter-anim{
  animation: filterFade 520ms cubic-bezier(.2,.9,.2,1) both;
}

.card-anim{
  opacity: 0;
  transform: translateY(10px);
  animation: cardFadeUp 560ms cubic-bezier(.2,.9,.2,1) both;
  will-change: transform, opacity;
}

@keyframes pageFadeUp{
  from{ opacity: 0; transform: translateY(10px); }
  to{ opacity: 1; transform: translateY(0); }
}

@keyframes filterFade{
  from{ opacity: 0; transform: translateY(6px); }
  to{ opacity: 1; transform: translateY(0); }
}

@keyframes cardFadeUp{
  from{ opacity: 0; transform: translateY(14px); }
  to{ opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce){
  .page-anim, .filter-anim, .card-anim{ animation: none !important; transform: none !important; opacity: 1 !important; }
}
</style>