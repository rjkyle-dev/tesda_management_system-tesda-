<template>
    <div class="flex-auto flex flex-col">

        <!-- TOP BAR -->
  <div class="bg-white border-b py-3 space-y-3">

   <!-- STATUS FOLDER TABS -->
    <div class="border-b border-gray-200">
    <div class="flex space-x-1">

        <button
        v-for="tab in statusTabs"
        :key="tab.key"
        @click="onStatusTabClick(tab.key)"
        class="relative px-5 py-2 text-base font-medium transition-all tracking-widest"
        :class="activeTab === tab.key
            ? 'bg-white border border-b-0 border-gray-300 text-primary-600 rounded-t-lg z-10'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-t-lg'"
        >
        {{ tab.label }}

        <span
            v-if="activeTab === tab.key"
            class="absolute inset-x-0 -bottom-px h-0.5 bg-primary-600"
        ></span>
        </button>

    </div>
    </div>



    <!-- SEARCH + PAGINATION -->
    <div class="flex items-center w-full gap-3">

      <!-- SEARCH -->
      <div class="flex-none w-64">
        <input
          type="text"
          class="w-full rounded-md border-gray-300 text-sm
                 focus:outline-none focus:ring-1 focus:ring-primary-500
                 focus:border-primary-500 px-3 py-2"
          placeholder="Search here..."
          @input="getAllData($event.target.value, 'search')"
        />
      </div>

      <div class="flex-auto"></div>

      <!-- PAGINATION -->
      <div class="flex-none" v-if="alldata.length > page_limit">
        <div class="pagination_cmp">
          <vue-awesome-paginate
            :total-items="total_cnt"
            :items-per-page="page_limit"
            v-model="page"
            @click="getAllData(null, null)"
          >
            <template #prev-button>
              <span class="px-2 text-sm">Prev</span>
            </template>

            <template #next-button>
              <span class="px-2 text-sm">Next</span>
            </template>
          </vue-awesome-paginate>
        </div>
      </div>

    </div>

    </div>

          <!-- TABLE CARD -->
  <div class="bg-white m-4 p-4 rounded-md shadow-sm">

    <div class="relative scrollbar sm:rounded-lg border">

      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs uppercase bg-gray-50 text-gray-700">
          <tr>
            <th class="px-6 py-3">Training Center</th>
            <th class="px-6 py-3">Control #</th>
            <th class="px-6 py-3">Batch Name</th>
            <th class="px-6 py-3">Qualification</th>
            <th class="py-3 text-center w-40">Status</th>
            <th class="py-3 text-center w-40">Next Billing</th>
            <th class="py-3 text-center w-40">Date & Time Added</th>
            <th class="px-6 py-3 text-center w-28">Actions</th>
          </tr>
        </thead>

        <tbody>

          <tr v-if="alldata.length === 0">
            <td colspan="8" class="py-8 text-center text-gray-500 text-sm">
              There are no files yet.
            </td>
          </tr>

          <tr
            v-for="i in alldata"
            :key="i.id"
            class="border-b hover:bg-gray-100 transition"
          >
            <td class="px-6 py-4">{{ i.tc_id ? i.tc_id.abbre : '-' }}</td>
            <td class="px-6 py-4">{{ checkIfEmpty(i.ctrl_num) }}</td>
            <td class="px-6 py-4">{{ checkIfEmpty(i.batch_name) }}</td>
            <td class="px-6 py-4">{{ i.q_id ? i.q_id.description : '-' }}</td>

            <td class="px-6 py-4 text-center">
              <span
                class="px-4 py-1 rounded-full text-xs text-white"
                :class="getStatusClass(i.status_id)"
              >
                {{ getStatus(i.status_id) }}
              </span>
            </td>

            <td class="px-6 py-4 text-center">
              <span
                class="text-xs"
                :class="!i.current_billing
                  ? 'bg-green-600 px-4 py-1 text-white rounded-full'
                  : ''"
              >
                {{ i.current_billing && i.current_billing.status !== 1
                  ? getDateFormat(i.current_billing.datetime_due)
                  : 'Finished' }}
              </span>
            </td>

            <td class="px-6 py-4 text-center">
              {{ getDateTimeFormat(i.datetime_added) }}
            </td>

            <td class="px-6 py-4 text-center">
              <img
                src="../assets/action_icon_view.png"
                class="h-4 cursor-pointer mx-auto"
                @click="openModal('view', i.id)"
              />
            </td>
          </tr>

        </tbody>
      </table>

    </div>
  </div>

        
    </div>

    <BillingInfoModal v-if="show_Modal_View" @close-modal="show_Modal_View = false" :refreshData="refreshData" :showNotification="showNotification" :item_data="item_data"/>
  
</template>

<script>

import BillingInfoModal from '@/components/Modals/BillingInfoModal.vue';
import axios from 'axios';
import moment from 'moment';

export default{
    components: {
        BillingInfoModal,
    },
    mounted(){

        const statusFromQuery = this.$route.query.status

        if (statusFromQuery) {
        this.activeTab = statusFromQuery
        } else {
        // Set default URL
        this.updateStatusQuery(this.activeTab)
        }
        this.refreshData();
    },
    props:{
        showNotification : Function
    },
    data(){
        return{
            activeTab: 'pending',
            statusTabs: [
            { key: 'pending', label: 'PENDING' },
            { key: 'approved', label: 'APPROVED' },
            { key: 'denied', label: 'REVISION' },
            { key: 'completed', label: 'FINISHED' }
            ],
            isWorkback : null,
            alldata : '',
            page: 1,
            total_cnt: 0,
            total_pages : 0,
            page_limit : 25,
            show_Modal_View : false,

            item_data : {
                id : 0,
                isWorkback : null,
            }
        }
    },
    methods: {
        refreshData(){
            this.getParamType();
        },
        onStatusTabClick(status) {
        if (this.activeTab === status) return

        this.activeTab = status
        this.updateStatusQuery(status)
        this.getAllData(null, null)
        },

        updateStatusQuery(status) {
        this.$router.push({
            query: {
            ...this.$route.query,
            status
            }
        })
        },
        getDateFormat(value){
        return moment(value).format('MMMM DD, YYYY');
        },
        getStatusClass(val){
            if(val == 0) return "bg-orange-500";
            else if(val == 1) return "bg-green-500";
            else if(val == 2) return "bg-orange-500";
            else if(val == 3) return "bg-green-500";
        },
        getStatus(val){
            if(val == 0) return "Pending";
            else if(val == 1) return "Approved";
            else if(val == 2) return "For Revision";
            else if(val == 3) return "Completed";
        },
        getParamType(){
            this.isWorkback = this.$route.params.isWorkback;
            this.getAllData(null,null);
        },
        getDateTimeFormat(value){
        return moment(value).format('MMMM DD, YYYY h:mm a');
        },
        checkIfEmpty(val){
        if(val) return val;
        else return "-";
        },
        formatUserName(i){
            if(i != null){
                return i.lname + ", " + i.fname + " " + i.mname + " " + i.suffix;
            }
            else return "-";
        },
        openModal(action, id){
            this.item_data.action = action;
            this.item_data.id = id;
            this.show_Modal_View = true;
        },
        getAllData(search_value, type) {

            var status_id = null;
            if(this.activeTab == 'pending') status_id = 0;
            if(this.activeTab == 'approved') status_id = 1;
            if(this.activeTab == 'denied') status_id = 2;
            if(this.activeTab == 'completed') status_id = 3;
            const params = {};

            if (search_value !== null && type) {
                params.value = search_value;
                params.type = type;
            }

            axios.get(
                `${process.env.VUE_APP_BASE_URL}/billing_records/get_all_by_page/${this.page}/${this.page_limit}/${status_id}`,
                { params }     // <-- IMPORTANT
            )
            .then(res => {
                if (res.status === 200) {
                    this.alldata = res.data[0];
                    this.total_cnt = res.data[1];
                }
            });
        },
    },
    watch: {
        '$route.query.status'(newStatus) {
        if (newStatus && newStatus !== this.activeTab) {
            this.activeTab = newStatus
            this.refreshData();
        }
        }
    }
}

</script>