<template>
  <div class="flex flex-col p-5 gap-4 h-full dashboard-page">

      <div class="flex items-center gap-2 dashboard-toolbar">
          <select v-model="training_center_id" @change="getStats" class="rounded-lg text-gray-800 dashboard-select" :disabled="$store.state.user.ut_id.description == 'TC Staff'">
              <option v-for="i in alltraining_center" :key="i.id" :value="i.id">
                  {{  i.description }}
              </option>
          </select>

          <select v-model="selectedYear" @change="getStats" class="rounded-lg text-gray-800 dashboard-select">
              <option v-for="year in years" :key="year" :value="year">
                  {{ year }}
              </option>
          </select>
      </div>
    
     <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 dashboard-summary-grid">
<!-- Approved Budget -->
<div class="flex items-center bg-green-800 text-white rounded-lg p-5 gap-4 animate__slideInUp dashboard-summary-card dashboard-summary-approved">
  <img src="../assets/icon_peso.png" class="flex-none h-8 w-8 dashboard-summary-icon"/>
  <div class="flex-auto flex flex-col">
    <p class="text-sm dashboard-summary-label">Jerson</p>
    <b class="text-2xl font-thin dashboard-summary-metric">{{ data_statistics ? formatPeso(data_statistics.total_payment) : '-' }}</b>
  </div>
</div>

<!-- Utilized Budget -->
<div class="flex items-center bg-green-700 text-white rounded-lg p-5 gap-4 animate__slideInUp dashboard-summary-card dashboard-summary-utilized">
  <img src="../assets/icon_peso.png" class="flex-none h-8 w-8 dashboard-summary-icon"/>
  <div class="flex-auto flex flex-col">
    <p class="text-sm dashboard-summary-label">Utilized Budget</p>
    <b class="text-2xl font-thin dashboard-summary-metric">{{ data_statistics ? formatPeso(data_statistics.total_utilized) : '-' }}</b>
  </div>
</div>

<!-- Unutilized Budget -->
<div class="flex items-center bg-red-600 text-white rounded-lg p-5 gap-4 animate__slideInUp dashboard-summary-card dashboard-summary-unutilized">
  <img src="../assets/icon_peso.png" class="flex-none h-8 w-8 dashboard-summary-icon"/>
  <div class="flex-auto flex flex-col"> 
    <p class="text-sm dashboard-summary-label">Unutilized Budget</p>
    <b class="text-2xl font-thin dashboard-summary-metric">{{ data_statistics ? formatPeso(data_statistics.total_unutilized) : '-' }}</b>
  </div>
</div>

<!-- Trainings Implemented -->
<div class="flex items-center bg-blue-700 text-white rounded-lg p-5 gap-4 animate__slideInUp dashboard-summary-card dashboard-summary-trainings">
  <img src="../assets/icon_bill.png" class="flex-none h-8 w-8 dashboard-summary-icon"/>
  <div class="flex-auto flex flex-col">
    <p class="text-sm dashboard-summary-label">Trainings Implemented</p>
    <b class="text-2xl font-thin dashboard-summary-metric">{{ data_statistics ? data_statistics.total_implemented : '-' }}</b>
  </div>
</div>

<!-- Bills Submitted -->
<div class="flex items-center bg-orange-700 text-white rounded-lg p-5 gap-4 animate__slideInUp dashboard-summary-card dashboard-summary-bills">
  <img src="../assets/icon_bill.png" class="flex-none h-8 w-8 dashboard-summary-icon"/>
  <div class="flex-auto flex flex-col">
    <p class="text-sm dashboard-summary-label">Bills Submitted</p>
    <b class="text-2xl font-thin dashboard-summary-metric">{{ data_statistics ? data_statistics.total_submitted : '-' }}</b>
  </div>
</div>

<!-- Pending Bills -->
<div class="flex items-center bg-orange-700 text-white rounded-lg p-5 gap-4 animate__slideInUp dashboard-summary-card dashboard-summary-pending">
  <img src="../assets/icon_bill.png" class="flex-none h-8 w-8 dashboard-summary-icon"/>
  <div class="flex-auto flex flex-col">
    <p class="text-sm dashboard-summary-label">Pending Bills</p>
    <b class="text-2xl font-thin dashboard-summary-metric">{{ data_statistics ? data_statistics.total_pending : '-' }}</b>
  </div>
</div>
</div>

       <!--Calendar-->
      <!-- <div class="flex-none grid grid-cols-1 sm:grid-cols-2 gap-4 sm:hidden"> -->
      <div>

          <div>
              <FullCalendar :options="calendarOptions" class="bg-white p-4 h-auto max-h-96 rounded-md animate__slideInUp dashboard-panel dashboard-calendar"/>
          </div>

          

      </div>
       <!--Calendar-->

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

          calendarOptions: {
          plugins: [dayGridPlugin],
          initialView: 'dayGridMonth',
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
      const currentMonth = new Date(info.start).getMonth() + 1; // month is 0-based
      this.getCalendarBillingPeriods(currentMonth + 1);
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

.dashboard-page {
  background: linear-gradient(180deg, #f8fbff 0%, #f2f5fb 100%);
}

.dashboard-toolbar {
  flex-wrap: wrap;
  padding: 0.85rem 1rem;
  border-radius: 0.9rem;
  background: #ffffff;
  border: 1px solid #e4e9f2;
  box-shadow: 0 4px 16px rgba(30, 41, 59, 0.06);
}

.dashboard-select {
  min-height: 2.35rem;
  padding: 0.35rem 0.75rem;
  border: 1px solid #d5deea;
  background: #f8fafc;
}

.dashboard-summary-grid {
  margin-top: 0.15rem;
}

.dashboard-summary-card {
  min-height: 102px;
  border-radius: 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.18);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.dashboard-summary-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 30px rgba(15, 23, 42, 0.24);
}

.dashboard-summary-approved {
  background: linear-gradient(135deg, #0f8d4c 0%, #0d6f3e 100%);
}

.dashboard-summary-utilized {
  background: linear-gradient(135deg, #1c9a5c 0%, #147947 100%);
}

.dashboard-summary-unutilized {
  background: linear-gradient(135deg, #f03947 0%, #d51b2a 100%);
}

.dashboard-summary-trainings {
  background: linear-gradient(135deg, #396eff 0%, #2552d8 100%);
}

.dashboard-summary-bills {
  background: linear-gradient(135deg, #de641c 0%, #c04f10 100%);
}

.dashboard-summary-pending {
  background: linear-gradient(135deg, #cb4f15 0%, #a9400d 100%);
}

.dashboard-summary-icon {
  filter: brightness(0) invert(1);
}

.dashboard-summary-label {
  font-weight: 600;
  letter-spacing: 0.01em;
  opacity: 0.95;
}

.dashboard-summary-metric {
  margin-top: 0.3rem;
  font-size: 1.5rem;
  font-weight: 800;
  line-height: 1.05;
}

.dashboard-panel {
  border-radius: 0.9rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 10px 24px rgba(30, 41, 59, 0.08);
}

.dashboard-calendar {
  overflow: hidden;
}
</style>