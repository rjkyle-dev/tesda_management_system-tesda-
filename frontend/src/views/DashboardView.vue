<template>
  <div class="flex flex-col gap-5 p-5 md:p-6 h-full dashboard-page">

    <header class="dashboard-hero-card">
      <div class="dashboard-hero-left min-w-0 flex-1">
        <p class="dashboard-hero-kicker">Training center</p>
        <h1 class="dashboard-hero-title">{{ selectedTrainingCenterName }}</h1>
        <select
          v-if="canPickTrainingCenter"
          v-model="training_center_id"
          @change="getStats"
          class="dashboard-hero-select"
          aria-label="Training center"
        >
          <option v-for="i in alltraining_center" :key="i.id" :value="i.id">
            {{ i.description }}
          </option>
        </select>
      </div>
      <div class="dashboard-hero-right shrink-0">
        <label class="sr-only" for="dashboard-fiscal-year">Fiscal year</label>
        <select
          id="dashboard-fiscal-year"
          v-model="selectedYear"
          @change="getStats"
          class="dashboard-year-badge"
        >
          <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
        </select>
      </div>
    </header>

    <section class="grid grid-cols-1 md:grid-cols-3 gap-4 dashboard-budget-row">
      <div class="dashboard-budget-card dashboard-budget-approved animate__slideInUp">
        <div class="dashboard-budget-icon-wrap" aria-hidden="true">
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div class="dashboard-budget-body">
          <p class="dashboard-budget-label">Approved Budget</p>
          <p class="dashboard-budget-value">{{ data_statistics ? formatPeso(data_statistics.total_payment) : '—' }}</p>
        </div>
        <span v-if="selectedYear" class="dashboard-budget-pill">{{ selectedYear }}</span>
      </div>

      <div class="dashboard-budget-card dashboard-budget-utilized animate__slideInUp">
        <div class="dashboard-budget-icon-wrap" aria-hidden="true">
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <div class="dashboard-budget-body">
          <p class="dashboard-budget-label">Utilized Budget</p>
          <p class="dashboard-budget-value">{{ data_statistics ? formatPeso(data_statistics.total_utilized) : '—' }}</p>
        </div>
        <span v-if="budgetUtilizationPercent != null" class="dashboard-budget-pill">{{ budgetUtilizationPercent }}%</span>
      </div>

      <div class="dashboard-budget-card dashboard-budget-unutilized animate__slideInUp">
        <div class="dashboard-budget-icon-wrap" aria-hidden="true">
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
          </svg>
        </div>
        <div class="dashboard-budget-body">
          <p class="dashboard-budget-label">Unutilized Budget</p>
          <p class="dashboard-budget-value">{{ data_statistics ? formatPeso(data_statistics.total_unutilized) : '—' }}</p>
        </div>
        <span v-if="budgetUnutilizedPercent != null" class="dashboard-budget-pill">{{ budgetUnutilizedPercent }}%</span>
      </div>
    </section>

    <section class="grid grid-cols-1 sm:grid-cols-3 gap-4 dashboard-metric-row">
      <div class="dashboard-metric-card animate__slideInUp">
        <div class="dashboard-metric-icon dashboard-metric-icon-blue" aria-hidden="true">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <div>
          <p class="dashboard-metric-label">Trainings Implemented</p>
          <p class="dashboard-metric-value">{{ data_statistics ? data_statistics.total_implemented : '—' }}</p>
        </div>
      </div>
      <div class="dashboard-metric-card animate__slideInUp">
        <div class="dashboard-metric-icon dashboard-metric-icon-amber" aria-hidden="true">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div>
          <p class="dashboard-metric-label">Bills Submitted</p>
          <p class="dashboard-metric-value">{{ data_statistics ? data_statistics.total_submitted : '—' }}</p>
        </div>
      </div>
      <div class="dashboard-metric-card animate__slideInUp">
        <div class="dashboard-metric-icon dashboard-metric-icon-rose" aria-hidden="true">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p class="dashboard-metric-label">Pending Bills</p>
          <p class="dashboard-metric-value">{{ data_statistics ? data_statistics.total_pending : '—' }}</p>
        </div>
      </div>
    </section>

    <section class="dashboard-calendar-shell animate__slideInUp dashboard-panel">
      <div class="dashboard-calendar-toolbar">
        <div class="dashboard-calendar-title-wrap">
          <span class="dashboard-calendar-icon" aria-hidden="true">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </span>
          <h2 class="dashboard-calendar-heading">{{ calendarTitle || 'Calendar' }}</h2>
        </div>
        <div class="dashboard-calendar-nav">
          <button type="button" class="dashboard-cal-nav-btn" @click="calendarPrev" aria-label="Previous month">‹</button>
          <button type="button" class="dashboard-cal-today" @click="calendarToday">Today</button>
          <button type="button" class="dashboard-cal-nav-btn" @click="calendarNext" aria-label="Next month">›</button>
        </div>
      </div>
      <FullCalendar ref="fullCalendarRef" :options="calendarOptions" class="dashboard-calendar-inner" />
    </section>

      <!-- Shared Modal -->
      <div
      v-if="showGraphModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
      <div class="bg-white p-6 rounded-md shadow-md w-96">
          <h2 class="text-lg font-bold mb-4">{{ modalTitle }}</h2>

          <ul class="space-y-2">
          <li v-for="(item, index) in modalData" :key="index">
              {{ item }}
          </li>
          </ul>

          <button
          @click="showGraphModal = false"
          class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
          Close
          </button>
      </div>
      </div>

      <!--Performance Evaluation-->
      <div class="flex-none gap-4" v-show="$store.state.user.ut_id.description == 'Admin' || $store.state.user.ut_id.description == 'PO Staff'">

      <div class="p-4 bg-white rounded-md animate__slideInUp dashboard-panel">
          <div class="flex items-center gap-2">
              <p class="font-bold text-2xl">Performance Evaluation</p>
              <select v-model="selectedYear_Graph_PE" @change="getChartPerformanceEvaluation" class="rounded-lg text-gray-800">
                  <option v-for="year in years" :key="year" :value="year">
                      {{ year }}
                  </option>
              </select>
          </div>
          
          
          
          <div class="content-center h-full">
              <!-- Remove fixed width and height for responsive behavior -->
              <canvas id="bar-chart-PE" style="max-width: 100%;"></canvas>
          </div>
      </div>

      </div>
      <!--/Performance Evaluation-->

        <!--Budget Utilization-->
      <div class="flex-none gap-4" v-show="$store.state.user.ut_id.description == 'Admin' || $store.state.user.ut_id.description == 'PO Staff'">

       <div class="p-4 bg-white rounded-md animate__slideInUp dashboard-panel">
           <div class="flex items-center gap-2 flex-wrap">
              <p class="flex-none font-bold text-2xl">Budget Utilization</p>
              
              <select
                  v-model="selectedYear_Graph_BU"
                  @change="getChartBudgetUtilization"
                  class="rounded-lg text-gray-800 text-sm w-32"
              >
                  <option v-for="year in years" :key="year" :value="year">
                  {{ year }}
                  </option>
              </select>

              <select
                  v-model="selectedType_BU"
                  @change="getChartBudgetUtilization"
                  class="rounded-lg text-gray-800 text-sm w-48"
              >
                  <option value="scholarships">Scholarships</option>
                  <option value="training_centers">Training Centers</option>
              </select>
              </div>
              
              
                  <div class="content-center h-full">
                      <canvas id="bar-chart-budget-utilization" width="400" height="150"></canvas>
                  </div>

            
          </div>

      </div>
      <!--/Budget Utilization-->

       <!--Budget Submission-->
      <div class="flex-none gap-4" v-show="$store.state.user.ut_id.description == 'Admin' || $store.state.user.ut_id.description == 'PO Staff'">

        <div class="flex-none gap-4">

       <div class="p-4 bg-white rounded-md animate__slideInUp dashboard-panel">
            <div class="flex items-center gap-2 flex-wrap">
              <p class="flex-none font-bold text-2xl">Billing Submission</p>
              
              <select
                  v-model="selectedYear_Graph_BS"
                  @change="getChartBillingSubmission"
                  class="rounded-lg text-gray-800 text-sm w-32"
              >
                  <option v-for="year in years" :key="year" :value="year">
                  {{ year }}
                  </option>
              </select>

              </div>
          
          <div class="content-center h-full">
              <canvas id="bar-chart-BS" width="400" height="150"></canvas>
          </div>
      </div>


      </div>

      </div>
      <!--/Budget Submission-->

           <!--Assessment Rate-->
      <div class="flex-none gap-4" v-show="$store.state.user.ut_id.description == 'Admin' || $store.state.user.ut_id.description == 'PO Staff'">

      <div class="p-4 bg-white rounded-md animate__slideInUp dashboard-panel">
          <div class="flex items-center gap-2">
              <p class="font-bold text-2xl">Assessment Rate</p>
              <select v-model="selectedYear_Graph_AR" @change="getAssessmentRatesChart" class="rounded-lg text-gray-800">
                  <option v-for="year in years" :key="year" :value="year">
                      {{ year }}
                  </option>
              </select>
          </div>
          
          
          
          <div class="content-center h-full">
              <!-- Remove fixed width and height for responsive behavior -->
              <canvas id="bar-chart-AR" style="max-width: 100%; height: 400px;"></canvas>
          </div>
      </div>

      </div>
      <!--/Assessment Rate-->

      
      <!--BUDGET UTILIZATION-->
      <div class="flex-none grid grid-cols-1 sm:grid-cols-2 gap-4" v-show="$store.state.user.ut_id.description == 'Admin' || $store.state.user.ut_id.description == 'PO Staff'">

        <div class="p-4 bg-white rounded-md animate__slideInUp dashboard-panel">
              <div class="flex items-center gap-2 flex-wrap">
              <p class="flex-none font-bold text-2xl">Budget Allocation</p>
              
              <select
                  v-model="selectedYear_Graph_BA"
                  @change="getChartBurByScholarship"
                  class="rounded-lg text-gray-800 text-sm w-32"
              >
                  <option v-for="year in years" :key="year" :value="year">
                  {{ year }}
                  </option>
              </select>

              <select
                  v-model="selectedType_BA"
                  @change="getChartBurByScholarship"
                  class="rounded-lg text-gray-800 text-sm w-48"
              >
                  <option value="scholarships">Scholarships</option>
                  <option value="training_centers">Training Centers</option>
              </select>
              </div>
              
              <div class="content-center h-full">
                  <DoughnutChart :chartData="chartData_bur" :options="chartOptions_bur"  />
              </div>

            
          </div>

             <div class="p-4 bg-white rounded-md animate__slideInUp dashboard-panel">
              <div class="flex items-center gap-2 flex-wrap">
              <p class="flex-none font-bold text-2xl">Dropped Trainees</p>
              
              <select
                  v-model="selectedYear_Graph_DTD"
                  @change="getDoughnutChart"
                  class="rounded-lg text-gray-800 text-sm w-32"
              >
                  <option v-for="year in years" :key="year" :value="year">
                  {{ year }}
                  </option>
              </select>

              <select v-model="selectedTC_DTD" @change="getDoughnutChart" class="rounded-lg text-gray-800 w-48 text-sm" :disabled="$store.state.user.ut_id.description == 'TC Staff'">
                  <option v-for="i in alltraining_center" :key="i.id" :value="i.id">
                      {{  i.description }}
                  </option>
              </select>
              </div>
              
              <div class="content-center h-full">
                  <DoughnutChart :chartData="chartData_dropped_doughnut" :options="chartOptions_dropped_doughnut"  />
              </div>

            
          </div>

           


      </div>
      <!--BUDGET UTILIZATION-->


  


  </div>

  <!-- Modal -->
  <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
  <div class="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg relative">
      
      <!-- Close Button -->
      <button @click="showModal = false" class="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl">
      &times;
      </button>

      <!-- Modal Content -->
      <h2 class="text-lg font-semibold mb-4">Billing Period Details</h2>


      <div class="text-sm space-y-2">
      <div><strong>Training Center:</strong> {{ selectedEvent.other_info.tc_id.description }}</div>
      <div><strong>PQM Code:</strong> {{ selectedEvent.ctrl_num }}</div>
      <div><strong>Billing Type:</strong> {{ selectedEvent.bt_id.description }}</div>
      <div><strong>Qualification:</strong> {{ selectedEvent.other_info.q_id.description }}</div>
      <div><strong>Scholarship Type:</strong> {{ selectedEvent.sc_id.description }}</div>
      <div><strong>Due Date:</strong> {{ getDateFormat(selectedEvent.due) }}</div>
      <div><strong>Status:</strong> {{ getStatusText(selectedEvent.status) }}</div>
      <div><strong>Submitted Date:</strong> {{ selectedEvent.submitted ? getDateTimeFormat(selectedEvent.submitted) : 'Not yet submitted' }}</div>
      
      </div>
  </div>
  </div>
</template>

<script>

import axios from 'axios';
import moment from 'moment';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import { DoughnutChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";

export default{
  components: {
      FullCalendar,
      DoughnutChart,
      // BarChart,
      // LineChart
  },
  props:{
      showNotification : Function
  },
  data(){
      return{
          training_center_id : null,
          alltraining_center : '',
          fullname : this.$store.state.user.fname + ' ' + this.$store.state.user.lname,
          all_periods: [],
          calendarEvents: [], // fullcalendar uses this

          calendarTitle: '',

          calendarOptions: {
          plugins: [dayGridPlugin],
          initialView: 'dayGridMonth',
          headerToolbar: false,
          weekends: true,
          events: [],

          eventClick: this.onEventClick,
          eventDataTransform: this.transformBillingEvent,

          // 🔻 Add this to remove the time like "12a"
          eventTimeFormat: {
              hour: '2-digit',
              minute: '2-digit',
              meridiem: false
          },

          // Or completely hide time in month view
          views: {
              dayGridMonth: {
              displayEventTime: false
              }
          },
          datesSet: this.onDatesSet,
          },
          testData : '',
          testData2 : '',

          chart_data_PE : '',

          instance_chart_PE : null,
          instance_chart_BS : null,
          instance_chart_BU : null,

          statistics : '',

          data_statistics : '',
          showModal : false,
          selectedEvent : null,

          //charts
          chartData_dropped_doughnut : '',
          chartData_dropped_line : '',
          chartOptions_dropped_line : '',
          chartOptions_dropped_doughnut : '',
          chartData_bur: '',

          chartOptions_bur: null,

          selectedYear: '', // Default selected year
          selectedYear_Graph : null,
          years: [],

          modalData: [],
          showGraphModal : false,
          selectedYear_Graph_BA : null,
          selectedYear_Graph_BU : null,
          selectedYear_Graph_PE : null,
          selectedYear_Graph_BS : null,
          selectedYear_Graph_AR : null,
          selectedType_BA : 'scholarships',
          selectedType_BU : 'scholarships',

          selectedTC_DTL : null,
          selectedTC_DTD : null,
          selectedYear_Graph_DTL : null,
          selectedYear_Graph_DTD : null,

          chartOptions_dropped : '',
          
           
      }
  },
  computed: {
    canPickTrainingCenter() {
      const r = this.$store.state.user?.ut_id?.description;
      return r === 'Admin' || r === 'PO Staff';
    },
    selectedTrainingCenterName() {
      if (!Array.isArray(this.alltraining_center) || !this.training_center_id) return '—';
      const tc = this.alltraining_center.find((i) => String(i.id) === String(this.training_center_id));
      return tc?.description || '—';
    },
    budgetUtilizationPercent() {
      const d = this.data_statistics;
      if (!d || d.total_payment == null || d.total_utilized == null) return null;
      const pay = Number(d.total_payment);
      if (!Number.isFinite(pay) || pay <= 0) return null;
      const ut = Number(d.total_utilized);
      return Math.round((ut / pay) * 1000) / 10;
    },
    budgetUnutilizedPercent() {
      const d = this.data_statistics;
      if (!d || d.total_payment == null || d.total_unutilized == null) return null;
      const pay = Number(d.total_payment);
      if (!Number.isFinite(pay) || pay <= 0) return null;
      const un = Number(d.total_unutilized);
      return Math.round((un / pay) * 1000) / 10;
    },
  },
  mounted(){
      const currentYear = new Date().getFullYear();
      this.years = [];

      const startYear = 2020;
      const endYear = currentYear + 1; // include next fiscal year

      for (let y = endYear; y >= startYear + 1; y--) {
      const fiscalYear = `${y - 1}-${y}`;
      this.years.push(fiscalYear);
      }

      this.selectedYear = this.years[0];
      this.selectedYear_Graph = this.years[0];
      this.selectedYear_Graph_BU = this.years[0];
      this.selectedYear_Graph_BA = this.years[0];
      this.selectedYear_Graph_PE = this.years[0];
      this.selectedYear_Graph_BS = this.years[0];
      this.selectedYear_Graph_DTL = this.years[0];
      this.selectedYear_Graph_DTD = this.years[0];
      this.selectedYear_Graph_AR = this.years[0];

      if(this.$store.state.user.ut_id.description == 'Admin' || this.$store.state.user.ut_id.description == 'PO Staff'){
          this.getAllTrainingCenter();
      }
      else if(this.$store.state.user.ut_id.description == 'TC Staff'){
          this.getAllTrainingCenter();
          this.getStats();
      }
     
  },
  methods: {
   async getAssessmentRatesChart() {
try {
  const res = await axios.get(
    `${process.env.VUE_APP_BASE_URL}/billing_periods/assessment_rates/${this.selectedYear_Graph_AR}`
  );

  if (res.status === 200) {
    const data = res.data;

    const labels = data.map(item => item.trainingCenter);
    const competentData = data.map(item => item.rateCompetent);
    const nycData = data.map(item => item.rateNyc);
    const absentData = data.map(item => item.rateAbsent);

    const ctx = document.getElementById("bar-chart-AR").getContext("2d");

    if (this.instance_chart_AR) this.instance_chart_AR.destroy();

    this.instance_chart_AR = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          { 
            label: "Competent", 
            data: competentData, 
            backgroundColor: "#4CAF50",
            categoryPercentage: 0.6,
            barPercentage: 0.7,
            maxBarThickness: 40
          },
          { 
            label: "NYC", 
            data: nycData, 
            backgroundColor: "#FFEB3B",
            categoryPercentage: 0.6,
            barPercentage: 0.7,
            maxBarThickness: 40
          },
          { 
            label: "Absent", 
            data: absentData, 
            backgroundColor: "#F44336",
            categoryPercentage: 0.6,
            barPercentage: 0.7,
            maxBarThickness: 40
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // <-- important
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => `${context.dataset.label}: ${context.raw}%`
            }
          },
          legend: { position: "top" },
        },
        scales: {
          y: { beginAtZero: true, max: 100, title: { display: true, text: "Rate (%)" } },
          x: { title: { display: true, text: "Training Centers" } }
        },
        onClick: async (e, elements) => {
          if (!elements.length) return;

          const element = elements[0];
          const index = element.index;
          const datasetIndex = element.datasetIndex;
          const selected = data[index];
          const datasetLabel = this.instance_chart_AR.data.datasets[datasetIndex].label;

          let value;
          if (datasetLabel === "Competent") value = selected.rateCompetent;
          else if (datasetLabel === "NYC") value = selected.rateNyc;
          else if (datasetLabel === "Absent") value = selected.rateAbsent;

          this.openModal("Assessment Details", [
            `Training Center: ${selected.trainingCenter}`,
            `Competent: ${selected.competent} | Rate: ${selected.rateCompetent}%`,
            `NYC: ${selected.nyc} | Rate: ${selected.rateNyc}%`,
            `Absent: ${selected.absent} | Rate: ${selected.rateAbsent}%`,
            `Selected Category: ${datasetLabel} | Rate: ${value}%`
          ]);
        }
      }
    });
  }
} catch (err) {
  console.error("Error fetching assessment rates:", err);
}
},
      async getInsights(value, report_name) {
      try {
          const res = await axios.get(
          `${process.env.VUE_APP_BASE_URL}/insights/find_description/${value}/${report_name}`
          );
          if (res.status === 200) {
          return res.data.description;
          } else {
          return '-';
          }
      } catch (e) {
          console.error(e);
          return '-';
      }
      },
      openModal(title, dataArray) {
      this.modalTitle = title;
      this.modalData = dataArray;
      this.showGraphModal = true;
      },
      getAllTrainingCenter(){

          try{
              axios.get(process.env.VUE_APP_BASE_URL + '/training_centers/get_all/')
              .then((res) => {

                  if (res.status == 200) {

                      this.alltraining_center = res.data;
                      this.training_center_id = this.$store.state.user.ut_id.description == 'TC Staff' ? this.$store.state.user.tc_id.id : res.data[0].id;
                      this.selectedTC_DTL = this.$store.state.user.ut_id.description == 'TC Staff' ? this.$store.state.user.tc_id.id : res.data[0].id;
                      this.selectedTC_DTD = this.$store.state.user.ut_id.description == 'TC Staff' ? this.$store.state.user.tc_id.id : res.data[0].id;
                      this.getStats();
                      this.getCharts();
                      // this.total_cnt = res.data[1];

                  }

              });
          }
          catch(e){
              //
          }
          
      },
      getDateTimeFormat(value){
      return moment(value).format('MMMM DD, YYYY h:mm a');
      },
      getDateFormat(value){
      return moment(value).format('MMMM DD, YYYY');
      },
      getStatusText(status) {
      const map = {
          1: ['Approved', 'Completed'], // multiple values
          2: ['Disapproved'],
          3: ['Revised'],
          0: ['Pending']
      };
      
      const texts = map[status];
      if (!texts) return 'No action yet';
      
      return texts[0]; // first status text for the code
      },

      formatDate(datetime) {
          return datetime ? new Date(datetime).toLocaleString() : '—';
      },
      transformBillingEvent(raw) {
          const statusMap = {
          0: [{ text: 'Pending',     color: '#facc15' }],
          2: [{ text: 'Disapproved', color: '#ef4444' }],
          3: [{ text: 'Revised',     color: '#fb923c' }],
          1: [
              { text: 'Approved',  color: '#22c55e' },
              { text: 'Completed', color: '#16a34a' }
          ]
          };

          const statusArray = statusMap[raw.status] || [];
          const statusInfo = statusArray[0] || { text: '', color: '#9ca3af' };

          return {
          title: `${raw.ctrl_num} — ${raw.bt_id.description}`,
          start: raw.datetime_due,
          backgroundColor: statusInfo.color,
          textColor: '#ffffff',
          classNames: ['wrap-event'], // 👈 add this class
          extendedProps: {
              ctrl_num : raw.ctrl_num,
              id: raw.id,
              status: raw.status,
              sc_id: raw.sc_id,
              bt_id: raw.bt_id,
              due: raw.datetime_due,
              submitted: raw.datetime_submit,
              other_info : raw.other_info
          }
          };
      },
      onDatesSet(info) {
      this.calendarTitle = info.view.title;
      const month = info.start.getMonth() + 1;
      this.getCalendarBillingPeriods(month);
      },
      calendarApi() {
        return this.$refs.fullCalendarRef?.getApi?.() ?? null;
      },
      calendarPrev() {
        this.calendarApi()?.prev();
      },
      calendarNext() {
        this.calendarApi()?.next();
      },
      calendarToday() {
        this.calendarApi()?.today();
      },
      onEventClick(info) {
      this.selectedEvent = {
          ...info.event.extendedProps,  // spread extendedProps
          title: info.event.title       // add title separately
      };
      this.showModal = true;
      },
      async getCalendarBillingPeriods(month) {
      try {
          const res = await axios.get(this.$store.state.user.ut_id.description == 'Admin' || this.$store.state.user.ut_id.description == 'PO Staff' ? process.env.VUE_APP_BASE_URL + "/billing_periods/get_all_by_month/" + month : process.env.VUE_APP_BASE_URL + "/billing_periods/get_all_by_month_tc/" + month + "/" + this.$store.state.user.tc_id.id);
          if (res.status === 200) {
          this.all_periods = res.data;

          // 🔻 Map raw backend data into FullCalendar event format
          this.calendarOptions.events = res.data;
          }
      } catch (err) {
          console.error(err);
          this.showNotification("Error fetching billing periods", "error");
      }
      },
      refreshData(){
          this.getCharts();
      },
      getRandomColor() {
          const r = Math.floor(Math.random() * 255);
          const g = Math.floor(Math.random() * 255);
          const b = Math.floor(Math.random() * 255);
          return `rgba(${r}, ${g}, ${b}, 0.8)`;
      },
      formatPeso(value) {
          if (value == null || isNaN(value)){
              return '-';
          }
          else if(value == 0){
              return new Intl.NumberFormat('en-PH', {
              style: 'currency',
              currency: 'PHP',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
              }).format(0);
          }
          else{
              return new Intl.NumberFormat('en-PH', {
              style: 'currency',
              currency: 'PHP',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
              }).format(value);
          }
      },
      getStats(){
          
          axios.get(process.env.VUE_APP_BASE_URL + '/billing_periods/get_statistics/' + (this.$store.state.user.ut_id.description == 'Admin' || this.$store.state.user.ut_id.description == 'PO Staff' ? this.training_center_id : this.$store.state.user.tc_id.id) + '/' + this.selectedYear)
          .then((res) => {

              if (res.status == 200) {

                  this.data_statistics = res.data;

              }

          });
          
      },
      getCharts(){

          Chart.register(...registerables);
          this.getDoughnutChart();
          // this.getLineChartData();
          this.getBarChart();
          this.getChartPerformanceEvaluation();
          this.getChartBillingSubmission();
          this.getChartBurByScholarship();
          this.getChartBudgetUtilization();
          this.getAssessmentRatesChart();

      },
      // getDoughnutChart(fiscal_yr) {
      // axios
      //     .get(process.env.VUE_APP_BASE_URL + "/billing_periods/chart_get_dropped_by_tc/" + fiscal_yr)
      //     .then((res) => {
      //     if (res.status === 200) {
      //         const data = res.data;

      //         // Extract labels and data
      //         const chartLabels = data.map(item => item.scholarship);
      //         const chartData = data.map(item => parseFloat(item.total_dropped));
      //         const totalDropped = chartData.reduce((sum, val) => sum + val, 0);

      //         // Generate a random color for each label
      //         const backgroundColors = chartLabels.map(() => {
      //         const r = Math.floor(Math.random() * 256);
      //         const g = Math.floor(Math.random() * 256);
      //         const b = Math.floor(Math.random() * 256);
      //         return `rgba(${r}, ${g}, ${b}, 0.7)`;
      //         });

      //         // Chart Data
      //         this.chartData_dropped = {
      //         labels: chartLabels,
      //         datasets: [
      //             {
      //             data: chartData,
      //             backgroundColor: backgroundColors,
      //             }
      //         ],
      //         };

      //         // Chart Options (for tooltips)
      //         this.chartOptions_dropped = {
      //         plugins: {
      //             tooltip: {
      //             callbacks: {
      //                 label: (tooltipItem) => {
      //                 const value = chartData[tooltipItem.dataIndex];
      //                 const percent = ((value / totalDropped) * 100).toFixed(2);
      //                 return `${chartLabels[tooltipItem.dataIndex]}: ${value} (${percent}%)`;
      //                 }
      //             }
      //             },
      //             legend: {
      //             position: 'bottom',
      //             }
      //         },
      //         responsive: true,
      //         };
      //     }
      //     })
      //     .catch((error) => {
      //     console.error("Failed to fetch chart data:", error);
      //     });
      // },
      getDoughnutChart() {
  axios
    .get(`${process.env.VUE_APP_BASE_URL}/billing_periods/chart_get_dropped_by_tc/${this.selectedYear_Graph_DTD}/${this.selectedTC_DTD}`)
    .then((res) => {
      if (res.status === 200) {
        const data = res.data;

        // Labels and data
        const chartLabels = data.map(item => item.scholarship);
        const chartData = data.map(item => parseFloat(item.total_dropped));
        const totalDropped = chartData.reduce((sum, val) => sum + val, 0);

        // Random colors
        const backgroundColors = chartLabels.map(() => {
          const r = Math.floor(Math.random() * 256);
          const g = Math.floor(Math.random() * 256);
          const b = Math.floor(Math.random() * 256);
          return `rgba(${r}, ${g}, ${b}, 0.7)`;
        });

        this.chartData_dropped_doughnut = {
          labels: chartLabels,
          datasets: [
            {
              data: chartData,
              backgroundColor: backgroundColors,
            }
          ],
        };

        this.chartOptions_dropped_doughnut = {
          responsive: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  const value = chartData[tooltipItem.dataIndex];
                  const percent = ((value / totalDropped) * 100).toFixed(2);
                  return `${chartLabels[tooltipItem.dataIndex]}: ${value} (${percent}%)`;
                }
              }
            },
            legend: { position: 'bottom' },
            title: { display: true, text: 'Dropped Trainees by Scholarship' },
          },
          onClick: (e, elements) => {
            if (elements.length > 0) {
              const index = elements[0].index;
              const selected = data[index];

              const modalContent = [];
              modalContent.push(`Scholarship: ${selected.scholarship}`);
              modalContent.push(`Number of Dropped Trainees: ${selected.total_dropped}`);
              
              if (selected.qualifications && selected.qualifications.length > 0) {
                modalContent.push(`Number of Qualifications: ${selected.qualifications.length}`);
                selected.qualifications.forEach(qual => {
                  modalContent.push(`• ${qual.description}: ${qual.total_dropped}`);
                  qual.ctrl_nums.forEach(ctrl => {
                    modalContent.push(`  - ${ctrl.ctrl_num}: ${ctrl.count}`);
                  });
                });
              }

              // Open modal
              this.openModal("Dropped Students Details", modalContent);
            }
          }
        };
      }
    })
    .catch((error) => {
      console.error("Failed to fetch chart data:", error);
    });
},
async getLineChartData() {
try {
  const res = await axios.get(
    `${process.env.VUE_APP_BASE_URL}/billing_periods/chart_get_dropped_by_tc_month/${this.selectedYear_Graph_DTL}/${this.selectedTC_DTL}`
  );

  if (res.status !== 200) return;

  const data = res.data; // Array of scholarships, each with "months" array

  // All months in order
  const allMonths = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Get unique months from the data
  const uniqueMonths = Array.from(
    new Set(data.flatMap(item => item.months.map(m => (m.month?.trim() ?? ''))))
  )
    .filter(m => m)
    .sort((a, b) => allMonths.indexOf(a) - allMonths.indexOf(b));

  // Get scholarships
  const scholarships = data.map(item => item.scholarship);

  // Build datasets for Chart.js
  const datasets = scholarships.map(scholarship => {
    const sch = data.find(s => s.scholarship === scholarship);

    const monthlyData = uniqueMonths.map(month => {
      const monthData = sch.months.find(m => m.month === month);
      return monthData ? monthData.total_dropped : 0;
    });

    return {
      label: scholarship,
      data: monthlyData,
      fill: false,
      borderColor: this.getRandomColor(),
      backgroundColor: this.getRandomColor(),
      tension: 0.3,
      pointBackgroundColor: "rgba(75, 192, 192, 1)",
    };
  });

  // Destroy existing chart if exists
  if (this.instance_chart_dropped_line) {
    this.instance_chart_dropped_line.destroy();
  }

  // Get canvas context
  const ctx = document.getElementById('line-chart-dropped-trainees').getContext('2d');

  // Create Chart.js line chart
  this.instance_chart_dropped_line = new Chart(ctx, {
    type: 'line',
    data: {
      labels: uniqueMonths,
      datasets: datasets,
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: (tooltipItem) => {
              const value = tooltipItem.raw;
              return `${tooltipItem.dataset.label}: ${value}`;
            },
          },
        },
        legend: { position: "top" },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: "Dropped Trainees" },
        },
      },
      hover: { mode: "nearest", intersect: true },
      onClick: (e, elements) => {
        if (elements.length === 0) return;

        const datasetIndex = elements[0].datasetIndex;
        const index = elements[0].index;

        const scholarship = scholarships[datasetIndex];
        const month = uniqueMonths[index];

        const sch = data.find(s => s.scholarship === scholarship);
        const monthData = sch?.months.find(m => m.month === month);

        if (monthData) {
          const qualList = monthData.qualifications
            .map(q => `${q.description}: ${q.total_dropped}`)
            .join("\n");

          this.openModal(`Dropped Trainees - ${scholarship}`, [
            `Month: ${month}`,
            `Number of Dropped Trainees: ${monthData.total_dropped}`,
            `Qualifications:\n${qualList}`,
          ]);
        }
      },
    },
  });

} catch (err) {
  console.error("Error fetching dropped trainees by month:", err);
}
},
  //     getLineChartData(fiscal_yr) {
  //     axios
  //         .get(process.env.VUE_APP_BASE_URL + "/billing_periods/chart_get_dropped_by_tc_month/" + fiscal_yr)
  //         .then((res) => {
  //             if (res.status === 200) {
  //                 const data = res.data;

  //                 // Get unique months in order
  //                 const allMonths = [
  //                     "January", "February", "March", "April", "May", "June",
  //                     "July", "August", "September", "October", "November", "December"
  //                 ];
  //                 const uniqueMonths = Array.from(
  //                     new Set(data.map(item => item.month.trim()))
  //                 ).sort((a, b) => allMonths.indexOf(a) - allMonths.indexOf(b));

  //                 // Get unique scholarships
  //                 const scholarships = Array.from(new Set(data.map(item => item.scholarship)));

  //                 // Build datasets per scholarship
  //                 const datasets = scholarships.map(scholarship => {
  //                     const monthlyData = uniqueMonths.map(month => {
  //                         const record = data.find(
  //                             item => item.scholarship === scholarship && item.month.trim() === month
  //                         );
  //                         return record ? parseInt(record.total_dropped) : 0;
  //                     });

  //                     return {
  //                         label: scholarship,
  //                         data: monthlyData,
  //                         fill: false,  // No fill (solid line)
  //                         backgroundColor: this.getRandomColor(),  // Solid background color for points
  //                         tension: 0.2,
  //                         pointBackgroundColor: 'rgba(75, 192, 192, 1)', // Point color for each data point
  //                     };
  //                 });

  //                 // Chart data and options
  //                 this.chartData_dropped_line = {
  //                     labels: uniqueMonths,
  //                     datasets: datasets,
  //                 };

  //                 // Chart options (for tooltips and other configurations)
  //                 this.chartOptions_dropped = {
  //                     responsive: true,
  //                     plugins: {
  //                         tooltip: {
  //                             callbacks: {
  //                                 label: (tooltipItem) => {
  //                                     const value = tooltipItem.raw; // Get value for each point
  //                                     return `${tooltipItem.label}: ${value}`; // Show month and value
  //                                 }
  //                             }
  //                         },
  //                         legend: {
  //                             position: 'top',
  //                         },
  //                     },
  //                     scales: {
  //                         y: {
  //                             beginAtZero: true,
  //                             title: {
  //                                 display: true,
  //                                 text: 'Dropped Trainees',
  //                             }
  //                         },
  //                     },
  //                     hover: {
  //                         mode: 'nearest',
  //                         intersect: true,
  //                     },
  //                 };
  //             }
  //         })
  //         .catch((err) => {
  //             console.error("Error fetching dropped trainees by month:", err);
  //         });
  // },
     async getChartBudgetUtilization() {
try {
  const res = this.selectedType_BU == 'scholarships' ?
  await axios.get(
    `${process.env.VUE_APP_BASE_URL}/billing_periods/performance_scores_by_sc/${this.selectedYear_Graph_BU}`
  ) : await axios.get(
    `${process.env.VUE_APP_BASE_URL}/billing_periods/performance_scores_by_tc/${this.selectedYear_Graph_BU}`
  );

  if (res.status !== 200) return;

  const data = res.data;

  const labels = this.selectedType_BU == 'scholarships' ? data.map(item => item.scholarshipDescription) : data.map(item => item.trainingCenter);
  const utilizedRaw = data.map(item => parseFloat(item.utilizedBudget));
  const unutilizedRaw = data.map(item => parseFloat(item.unUtilizedBudget));
  const allocated = data.map(item => parseFloat(item.allocatedBudget));

  // Calculate percentages
  const utilizedPercent = utilizedRaw.map((val, idx) =>
    allocated[idx] > 0 ? ((val / allocated[idx]) * 100).toFixed(2) : 0
  );
  const unutilizedPercent = unutilizedRaw.map((val, idx) =>
    allocated[idx] > 0 ? ((val / allocated[idx]) * 100).toFixed(2) : 0
  );

  const ctx = document.getElementById('bar-chart-budget-utilization').getContext('2d');

  if (this.instance_chart_BU) {
    this.instance_chart_BU.destroy();
  }

  const formatPeso = this.formatPeso;

  this.instance_chart_BU = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Unutilized (%)',
          data: unutilizedPercent,
          backgroundColor: '#f87171', // red
          rawData: unutilizedRaw,
          categoryPercentage: 0.6, // spacing between groups
          barPercentage: 0.7,      // width of bars in group
          maxBarThickness: 40      // prevent overly thick bars
        },
        {
          label: 'Utilized (%)',
          data: utilizedPercent,
          backgroundColor: '#4ade80', // green
          rawData: utilizedRaw,
          categoryPercentage: 0.6,
          barPercentage: 0.7,
          maxBarThickness: 40
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: function (tooltipItem) {
              const dataset = tooltipItem.dataset;
              const rawAmount = dataset.rawData[tooltipItem.dataIndex];
              return `${dataset.label}: ${tooltipItem.formattedValue}% Amount: ${formatPeso(rawAmount)}`;
            },
          },
        },
        legend: { position: 'top' },
      },
      scales: {
        x: { stacked: true },
        y: { stacked: true, beginAtZero: true, max: 100, title: { display: true, text: 'Percentage (%)' } },
      },
      onClick: async (e, elements) => {
        if (elements.length === 0) return;

        const index = elements[0].index;
        const selected = data[index];
        const score = allocated[index] > 0 ? utilizedRaw[index] / allocated[index] : 0;
        const insight = await this.getInsights(
          score,
          this.selectedType_BU == 'scholarships'
            ? 'Budget Utilization Rate for Training Centers'
            : 'Budget Utilization Rate for Scholarships'
        );

        this.openModal('Budget Utilization Details', [
          `${this.selectedType_BU == 'scholarships' ? `Scholarship: ${selected.scholarshipDescription}` : `Training Center: ${selected.trainingCenter}`}`,
          `Allocated Budget: ${formatPeso(allocated[index])}`,
          `Utilized: ${formatPeso(utilizedRaw[index])} (${utilizedPercent[index]}%)`,
          `Unutilized: ${formatPeso(unutilizedRaw[index])} (${unutilizedPercent[index]}%)`,
          `Insight: ${insight}`,
        ]);
      },
    },
  });

} catch (error) {
  console.error('Failed to fetch budget utilization chart data:', error);
}
},
async getChartBillingSubmission() {
  try {
      const res = await axios.get(`${process.env.VUE_APP_BASE_URL}/billing_periods/chart_get_billing_submission_by_tc/${this.selectedYear_Graph_BS}`);

      if (res.status === 200) {
          const data = res.data;

          const labels = data.map(item => item.tc_description);
          const onTimeData = data.map(item => parseInt(item.on_time_count));
          const lateData = data.map(item => parseInt(item.late_count));

          const canvas = document.getElementById('bar-chart-BS');
          if (!canvas) {
              console.error("Canvas element 'bar-chart-BS' not found");
              return;
          }
          const ctx = canvas.getContext('2d');

          if (this.instance_chart_BS) this.instance_chart_BS.destroy();

          this.instance_chart_BS = new Chart(ctx, {
          type: 'bar',
          data: {
            labels,
            datasets: [
              { 
                label: 'On Time', 
                data: onTimeData, 
                backgroundColor: 'green',
                categoryPercentage: 0.6,  // spacing between groups
                barPercentage: 0.7,       // width of bars in each group
                maxBarThickness: 40       // prevent overly thick bars
              },
              { 
                label: 'Late', 
                data: lateData, 
                backgroundColor: 'red',
                categoryPercentage: 0.6,
                barPercentage: 0.7,
                maxBarThickness: 40
              }
            ]
          },
          options: {
            responsive: true,
            plugins: { 
              legend: { position: 'top' }, 
              tooltip: { mode: 'index', intersect: false } 
            },
            scales: { 
              y: { 
                beginAtZero: true, 
                title: { display: true, text: 'Number of Submissions' } 
              } 
            },
            onClick: async (e, elements) => {
              if (elements.length > 0) {
                const i = elements[0].index;
                const tcName = labels[i];
                const onTimeCount = onTimeData[i];
                const lateCount = lateData[i];
                const total = onTimeCount + lateCount;
                const rate = total ? ((onTimeCount / total) * 100).toFixed(2) : 0;
                const insights = await this.getInsights(rate / 100, 'Billing Submission Compliance');
                this.openModal(`Billing Submission - ${tcName}`, [
                  `Number of Billable Submissions: ${total}`,
                  `On-Time Submissions: ${onTimeCount}`,
                  `Compliance Rate: ${rate}%`,
                  `Insights: ${insights}`
                ]);
              }
            }
          }
});

      }
  } catch (e) {
      console.error("Failed to fetch chart data or render chart:", e);
  }
}
,
      async getChartPerformanceEvaluation() {
try {
  const res = await axios.get(
    `${process.env.VUE_APP_BASE_URL}/billing_periods/performance_scores/${this.selectedYear_Graph_PE}`
  );

  if (res.status === 200) {
    const data = res.data;
    const labels = data.map((item) => item.trainingCenter);
    const wpsData = data.map((item) => item.WPS);

    const canvas = document.getElementById("bar-chart-PE");

    // 🔥 Dynamic height calculation
    const minHeightPerBar = 80;
    const dynamicHeight = Math.max(labels.length * minHeightPerBar, 120);
    canvas.style.height = dynamicHeight + "px";

    const ctx = canvas.getContext("2d");

    if (this.instance_chart_PE) {
      this.instance_chart_PE.destroy();
    }

    this.instance_chart_PE = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "WPS Score",
            data: wpsData,
            backgroundColor: labels.map(() => this.getRandomColor()),
            barThickness: 18,          // thinner bars
            categoryPercentage: 0.5,   // more vertical space between categories
            barPercentage: 0.6      // controls bar width inside category
          },
        ],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false, // important!
        scales: {
          y: {
            ticks: {
              autoSkip: false,
            },
          },
        },
        onClick: async (e, elements) => {
          if (elements.length > 0) {
            const index = elements[0].index;
            const selected = data[index];

            const insight = await this.getInsights(
              selected.WPS,
              "Weighted Performance Score"
            );

            this.openModal("Performance Details", [
              `Training Center: ${selected.trainingCenter}`,
              `Budget Utilization Rate: ${selected.BUR}%`,
              `Billing Submission Compliance Rate: ${selected.BSC}%`,
              `Weighted Performance Score: ${selected.WPS}`,
              `Insights : ${insight}`,
            ]);
          }
        },
      },
    });
  }
} catch (err) {
  console.error("Error fetching performance evaluation:", err);
}
},
      getBarChart(){

          axios.get(process.env.VUE_APP_BASE_URL + '/training_centers/get_all/')
          .then((res) => {

              if (res.status == 200) {

                  var data_name = [];

                  for(var i = 0; i < res.data.length; i++){
                      data_name.push(res.data[i].abbre);
                  }

                  this.testData = {
                  labels: data_name,
                  datasets: [
                      {
                      label: 'Status', // Just one label, not an array
                      data: [65, 59, 80, 81, 56, 55, 40], // This should dynamically match your labels
                      backgroundColor: ['green', 'red', 'green', 'red', 'green', 'red', 'green'], // Match length of data
                      },
                  ],
                  options: {
                      indexAxis: 'y', // 🔁 Makes the chart horizontal
                      responsive: true,
                      scales: {
                      x: {
                          beginAtZero: true
                      }
                      }
                  }
                  };

              }

          });

      },
      async getChartBurByScholarship() {
    const url = this.selectedType_BA === 'scholarships'
      ? `${process.env.VUE_APP_BASE_URL}/billing_periods/performance_scores_by_sc/${this.selectedYear_Graph_BA}`
      : `${process.env.VUE_APP_BASE_URL}/billing_periods/performance_scores_by_tc/${this.selectedYear_Graph_BA}`

    const res = await axios.get(url)
    if (res.status !== 200) return

    const data = res.data
    const chartLabels = this.selectedType_BA === 'scholarships'
      ? data.map(item => item.scholarshipDescription)
      : data.map(item => item.trainingCenter)

    const chartData = data.map(item => parseFloat((item.BUR * 100).toFixed(2)))
    const totalBUR = chartData.reduce((sum, val) => sum + val, 0)

    const backgroundColors = chartLabels.map(() => {
      const r = Math.floor(Math.random() * 256)
      const g = Math.floor(Math.random() * 256)
      const b = Math.floor(Math.random() * 256)
      return `rgba(${r}, ${g}, ${b}, 0.7)`
    })

    this.chartData_bur = {
      labels: chartLabels,
      datasets: [{
        data: chartData,
        backgroundColor: backgroundColors,
      }],
    }

    // ✅ Chart.js options must be passed as :options prop
    this.chartOptions_bur = {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: (tooltipItem) => {
              const value = chartData[tooltipItem.dataIndex]
              const percent = ((value / totalBUR) * 100).toFixed(2)
              return `${chartLabels[tooltipItem.dataIndex]}: ${value}% (${percent}%)`
            }
          }
        },
        legend: { position: 'bottom' },
        title: {
          display: true,
          text: this.selectedType_BA === 'scholarships'
            ? 'Budget Allocation Rate (BUR) by Scholarship'
            : 'Budget Utilization Rate (BUR) by Training Center',
        }
      },
      onHover: (e, elements) => {
        e.native.target.style.cursor = elements.length ? 'pointer' : 'default'
      },
      onClick: async (e, elements, chart) => {
      const points = chart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, true)
      if (!points.length) return

      const index = points[0].index
      const selected = data[index]

      // const burValue = parseFloat(selected.BUR)
      // const insights = await this.getInsights(burValue, this.selectedType_BA == 'scholarships' ? 'Budget Utilization Rate for Training Centers' : 'Budget Utilization Rate for Scholarships' )

      const header = this.selectedType_BA === 'scholarships'
        ? `Scholarship: ${selected.scholarshipDescription}`
        : `Training Center: ${selected.trainingCenter}`

      // NEW: Dynamic details
      const details =
        this.selectedType_BA === 'scholarships'
          ? [
              header,
              `Allocated Budget: ₱${selected.allocatedBudget.toLocaleString()}`,
              `Number of Training Centers: ${selected.numberOfTrainingCenters}`,
              `Number of Trainings Implemented: ${selected.numberOfTrainingsImplemented}`,
              `Number of Qualifications: ${selected.numberOfQualifications}`,
              `Number of Approved Slots: ${selected.numberOfApprovedSlots}`,
              //  `Insights : ${insights}`
            ]
          : [
              header,
              `Allocated Budget: ₱${selected.allocatedBudget.toLocaleString()}`,
              `Number of Trainings Implemented: ${selected.numberOfTrainingsImplemented}`,
              `Number of Qualifications: ${selected.numberOfQualifications}`,
              `Number of Approved Slots: ${selected.numberOfApprovedSlots}`,
              //  `Insights : ${insights}`
            ]

      this.openModal("BUR Details", details)
    },
    }
  },
      // getChartBurByScholarship() {
      //     axios
      //         .get(this.selectedType_BA == 'scholarships' ? process.env.VUE_APP_BASE_URL + "/billing_periods/performance_scores_by_sc/" + this.selectedYear_Graph_BA : process.env.VUE_APP_BASE_URL + "/billing_periods/performance_scores_by_tc/" + this.selectedYear_Graph_BA)
      //         .then((res) => {
      //             if (res.status === 200) {
      //                 const data = res.data;

      //                 // Labels and data
      //                 const chartLabels = this.selectedType_BA == 'scholarships' ? data.map(item => item.scholarshipDescription) : data.map(item => item.trainingCenter);
      //                 const chartData = data.map(item => parseFloat((item.BUR * 100).toFixed(2)));
      //                 const totalBUR = chartData.reduce((sum, val) => sum + val, 0);

      //                 // Random colors
      //                 const backgroundColors = chartLabels.map(() => {
      //                     const r = Math.floor(Math.random() * 256);
      //                     const g = Math.floor(Math.random() * 256);
      //                     const b = Math.floor(Math.random() * 256);
      //                     return `rgba(${r}, ${g}, ${b}, 0.7)`;
      //                 });

      //                 // Chart data object
      //                 this.chartData_bur = {
      //                     labels: chartLabels,
      //                     datasets: [
      //                         {
      //                             data: chartData,
      //                             backgroundColor: backgroundColors,
      //                         }
      //                     ]
      //                 };

      //                 // Chart options object with onClick for modal
      //                 this.chartOptions_bur = {
      //                     responsive: true,
      //                     plugins: {
      //                         tooltip: {
      //                             callbacks: {
      //                                 label: (tooltipItem) => {
      //                                     const value = chartData[tooltipItem.dataIndex];
      //                                     const percent = ((value / totalBUR) * 100).toFixed(2);
      //                                     return `${chartLabels[tooltipItem.dataIndex]}: ${value}% (${percent}%)`;
      //                                 }
      //                             }
      //                         },
      //                         legend: { position: 'bottom' },
      //                         title: {
      //                             display: true,
      //                             text: 'Budget Utilization Rate (BUR) by Scholarship',
      //                         }
      //                     },
      //                     onClick: async (e, elements) => {
      //                         if (elements.length > 0) {
      //                             const index = elements[0].index;
      //                             const selected = data[index];

      //                             // Convert BUR to float
      //                             const burValue = parseFloat(selected.BUR);

      //                             // Fetch Insights dynamically
      //                             const insights = await this.getInsights(burValue, 'Budget Utilization Rate for Scholarships');

      //                             // Open dynamic modal
      //                             this.openModal("BUR Details", [
      //                                  `${this.selectedType_BA == 'scholarships' ? `Scholarship: ${selected.scholarshipDescription}` : `Training Center: ${selected.trainingCenter}`}`,
      //                                 `BUR (%) : ${burValue.toFixed(2)}`,
      //                                 `Share (%) : ${((chartData[index] / totalBUR) * 100).toFixed(2)}`,
      //                                 `Insights : ${insights}`
      //                             ]);
      //                         }
      //                     },
      //                 };
      //             }
      //         })
      //         .catch((error) => {
      //             console.error("Failed to fetch BUR chart data:", error);
      //         });
      // },
  }
  
}
</script>
<style scoped>
:deep(.fc-event.wrap-event) {
white-space: normal !important;
overflow-wrap: break-word;
line-height: 1.2;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.dashboard-page {
  background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
}

.dashboard-hero-card {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1rem;
  padding: 1.5rem 1.75rem;
  background: #fff;
  border-radius: 1rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.06);
}

@media (min-width: 640px) {
  .dashboard-hero-card {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 1.25rem;
  }
}

.dashboard-hero-left {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.dashboard-hero-kicker {
  margin: 0;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #6b7280;
}

.dashboard-hero-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.25;
  color: #0f172a;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.dashboard-hero-select {
  margin-top: 0.5rem;
  width: fit-content;
  max-width: min(100%, 28rem);
  min-height: 2.25rem;
  padding: 0.35rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  color: #374151;
  font-size: 0.8125rem;
  cursor: pointer;
}

.dashboard-hero-right {
  align-self: flex-start;
}

@media (min-width: 640px) {
  .dashboard-hero-right {
    align-self: center;
  }
}

.dashboard-year-badge {
  min-height: auto;
  padding: 0.35rem 0.75rem;
  border-radius: 0.5rem;
  border: none;
  background: #e5e7eb;
  color: #374151;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: none;
}

.dashboard-year-badge:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

.dashboard-budget-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  min-height: 118px;
  padding: 1.25rem 1.35rem;
  border-radius: 1rem;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.22);
  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  overflow: hidden;
}

.dashboard-budget-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 34px rgba(15, 23, 42, 0.26);
}

.dashboard-budget-approved {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 45%, #1e3a8a 100%);
}

.dashboard-budget-utilized {
  background: linear-gradient(135deg, #059669 0%, #047857 50%, #065f46 100%);
}

.dashboard-budget-unutilized {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 45%, #b91c1c 100%);
}

.dashboard-budget-icon-wrap {
  flex-shrink: 0;
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.28);
}

.dashboard-budget-body {
  flex: 1;
  min-width: 0;
}

.dashboard-budget-label {
  font-size: 0.8rem;
  font-weight: 600;
  opacity: 0.95;
  letter-spacing: 0.02em;
}

.dashboard-budget-value {
  margin-top: 0.35rem;
  font-size: clamp(1.25rem, 3vw, 1.65rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.dashboard-budget-pill {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.2rem 0.65rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.22);
  border: 1px solid rgba(255, 255, 255, 0.35);
  white-space: nowrap;
}

.dashboard-metric-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.15rem 1.25rem;
  border-radius: 1rem;
  background: #fff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 8px 20px rgba(30, 41, 59, 0.07);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.dashboard-metric-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 26px rgba(30, 41, 59, 0.1);
}

.dashboard-metric-icon {
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
  border-radius: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dashboard-metric-icon-blue {
  background: #eff6ff;
  color: #2563eb;
}

.dashboard-metric-icon-amber {
  background: #fffbeb;
  color: #d97706;
}

.dashboard-metric-icon-rose {
  background: #fef2f2;
  color: #e11d48;
}

.dashboard-metric-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: #64748b;
}

.dashboard-metric-value {
  margin-top: 0.2rem;
  font-size: 1.5rem;
  font-weight: 800;
  color: #0f172a;
  line-height: 1;
}

.dashboard-calendar-shell {
  overflow: hidden;
  background: #fff;
}

.dashboard-calendar-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 1rem 1.15rem 0.75rem;
  border-bottom: 1px solid #f1f5f9;
}

.dashboard-calendar-title-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
}

.dashboard-calendar-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.65rem;
  background: #eff6ff;
  color: #2563eb;
}

.dashboard-calendar-heading {
  font-size: 1.05rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.dashboard-calendar-nav {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.dashboard-cal-nav-btn {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
  background: #fff;
  color: #475569;
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
  transition: background 0.15s ease;
}

.dashboard-cal-nav-btn:hover {
  background: #f8fafc;
}

.dashboard-cal-today {
  padding: 0.35rem 0.85rem;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
  background: #fff;
  font-size: 0.8rem;
  font-weight: 600;
  color: #334155;
  cursor: pointer;
}

.dashboard-cal-today:hover {
  background: #f1f5f9;
}

.dashboard-calendar-inner {
  padding: 0.5rem 0.85rem 1rem;
}

.dashboard-panel {
  border-radius: 0.9rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 10px 24px rgba(30, 41, 59, 0.08);
}

:deep(.dashboard-calendar-inner .fc) {
  --fc-border-color: #e2e8f0;
  --fc-neutral-bg-color: #f8fafc;
  --fc-today-bg-color: #eff6ff;
  font-size: 0.85rem;
}

:deep(.dashboard-calendar-inner .fc .fc-col-header-cell-cushion) {
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  font-size: 0.65rem;
  letter-spacing: 0.06em;
}

:deep(.dashboard-calendar-inner .fc .fc-daygrid-day-number) {
  font-weight: 600;
  color: #334155;
  padding: 0.35rem 0.45rem;
}
</style>