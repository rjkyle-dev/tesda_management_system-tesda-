<template>
  <div class="flex-auto flex flex-col">

    <!-- STATUS FOLDER TABS -->
    <div class="bg-white px-4 pt-2 border-b border-gray-200">
      <div class="flex space-x-1">

        <button
          v-for="tab in statusTabs"
          :key="tab.key"
          @click="onStatusTabClick(tab.key)"
          class="relative px-5 py-2 text-lg font-medium transition-all tracking-widest"
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

    <!-- TOP ACTION BAR -->
    <div class="flex items-center w-full bg-white gap-4 border-b border-gray-200">

      <div class="flex-none">
        <button
          class="bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 mx-4 my-2 rounded-lg duration-300"
          @click="openModal('add',0)"
        >
          {{ isWorkback == 1 ? 'Add Workback +' : 'Create Bill +' }}
        </button>
      </div>

      <div class="flex-auto">
        <input
          type="text"
          class="font-bold border-gray-300 w-full rounded-md text-sm
                 focus:outline-none focus:ring-1 focus:ring-primary-500
                 focus:border-primary-500"
          placeholder="Search control number.."
          @input="getAllData($event.target.value, 'search')"
        >
      </div>

      <div class="flex-none">
        <div class="pagination_cmp px-3" v-if="alldata.length > page_limit">
          <vue-awesome-paginate
            :total-items="total_cnt"
            :items-per-page="page_limit"
            v-model="page"
            @click="getAllData(null,null)"
          >
            <template #prev-button>
              <span>Prev</span>
            </template>

            <template #next-button>
              <span>Next</span>
            </template>
          </vue-awesome-paginate>
        </div>
      </div>
    </div>

    <!-- TABLE -->
    <div class="bg-white m-4 rounded-md shadow-sm border border-gray-300 border-t-0">

      <div class="relative scrollbar sm:rounded-b-md mx-6">

        <table class="w-full text-sm text-left text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left">Control #</th>
              <th class="px-6 py-3 text-left">Batch Name</th>
              <th class="px-6 py-3 text-left">Qualification</th>
              <th class="py-3 text-center w-40">Status</th>
              <th class="py-3 text-center w-40">Next Billing</th>
              <th class="py-3 text-center w-40">Date & Time added</th>
              <th class="px-6 py-3 text-center w-28">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-if="alldata.length == 0">
              <td colspan="7" class="py-6 text-center text-gray-500 text-sm">
                There are no files yet.
              </td>
            </tr>

            <tr
              v-for="i in alldata"
              :key="i.id"
              class="border-b hover:bg-gray-200 transition"
            >
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
                <div class="flex items-center justify-center space-x-2">
                  <img
                    v-if="i.status_id == 0 || i.status_id == 3"
                    src="../assets/icon_edit.png"
                    class="h-4 cursor-pointer"
                    @click="openModal('edit',i.id)"
                  >
                  <img
                    src="../assets/action_icon_view.png"
                    class="h-4 cursor-pointer"
                    @click="openViewModal('view',i.id)"
                  >
                </div>
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>

  </div>

  <AddTCBilling
    v-if="show_Modal_Add"
    @close-modal="show_Modal_Add = false"
    :refreshData="refreshData"
    :showNotification="showNotification"
    :item_data="item_data"
  />

  <BillingInfoModal
    v-if="show_Modal_View"
    @close-modal="show_Modal_View = false"
    :refreshData="refreshData"
    :showNotification="showNotification"
    :item_data="item_data"
  />
</template>


<script>

import AddTCBilling from '@/components/Modals/AddTCBilling.vue';
import BillingInfoModal from '@/components/Modals/BillingInfoModal.vue';
import axios from 'axios';
import moment from 'moment';

export default{
    components: {
        AddTCBilling,
        BillingInfoModal
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
            { key: 'completed', label: 'FINISHED' },
            ],
            isWorkback : null,
            alldata : '',
            page: 1,
            total_cnt: 0,
            total_pages : 0,
            page_limit : 25,
            show_Modal_Add : false,
            show_Modal_View : false,

            item_data : {
                id : 0,
                isWorkback : null,
            }
        }
    },
    methods: {
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
        openViewModal(action, id){
            this.item_data.action = action;
            this.item_data.id = id;
            this.show_Modal_View = true;
        },
        refreshData(){
            this.getParamType();
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
            this.getAllData(null, null);
        },
        getDateFormat(value){
        return moment(value).format('MMMM DD, YYYY');
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
            this.item_data.isWorkback = this.isWorkback;
            this.show_Modal_Add = true;
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
                `${process.env.VUE_APP_BASE_URL}/billing_records/get_all_by_page_type_user/${this.$store.state.user.tc_id.id}/${this.isWorkback}/${this.page}/${this.page_limit}/${status_id}`,
                { params }     // <-- IMPORTANT
            )
            .then(res => {
                if (res.status === 200) {
                    this.alldata = res.data[0];
                    this.total_cnt = res.data[1];
                }
            });
        }
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