<template>
  <div class="flex-auto flex flex-col px-6 py-5">
    <!-- Tabs -->
    <div class="inline-flex items-center gap-2 bg-white rounded-2xl shadow-sm border border-slate-200 px-2 py-2 w-fit">
      <button
        type="button"
        class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
        :class="Number($route.params.type) === 2 ? 'bg-primary-600 text-white shadow' : 'text-slate-600 hover:bg-slate-100'"
        @click="$router.push('/accounts/2')"
      >
        <span class="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-white/15" v-if="Number($route.params.type) === 2">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </span>
        <span v-else class="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-slate-100 text-slate-500">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </span>
        PO Staff
      </button>

      <button
        type="button"
        class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
        :class="Number($route.params.type) !== 2 ? 'bg-primary-600 text-white shadow' : 'text-slate-600 hover:bg-slate-100'"
        @click="$router.push('/accounts/3')"
      >
        <span class="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-white/15" v-if="Number($route.params.type) !== 2">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </span>
        <span v-else class="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-slate-100 text-slate-500">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </span>
        TC Staff
      </button>
    </div>

    <!-- Actions row -->
    <div class="mt-4 flex flex-col lg:flex-row lg:items-center gap-3">
      <button
        class="w-fit bg-primary-600 hover:bg-primary-500 text-white px-5 py-2.5 rounded-xl duration-200 shadow-sm flex items-center gap-2"
        @click="openModal('add', 0)"
      >
        <span class="inline-flex items-center justify-center w-5 h-5 rounded-md bg-white/15">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
        {{ Number($route.params.type) === 2 ? 'Add PO Staff' : 'Add TC Staff' }}
      </button>

      <div class="relative w-full lg:max-w-md">
        <span class="pointer-events-none absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
        </span>
        <input
          type="text"
          class="w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="Search user..."
          @input="onSearchInput($event.target.value)"
        />
      </div>
    </div>

    <!-- Table card -->
<div class="mt-5 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
  
  <div class="overflow-x-auto">
    
    <!-- scroll wrapper -->
    <div class="max-h-[420px] overflow-y-auto">
      
      <table class="min-w-full text-sm text-left text-slate-600">
        
        <!-- sticky header -->
        <thead class="text-[11px] text-slate-500 uppercase bg-slate-50 sticky top-0 z-10">
          <tr>
            <th scope="col" class="px-6 py-4 text-left">Name</th>
            <th scope="col" class="px-6 py-4 text-left">Email Address</th>
            <th scope="col" class="px-6 py-4 text-center">Contact Number</th>
            <th scope="col" class="px-6 py-4 text-center">Date &amp; Time Added</th>
            <th scope="col" class="px-6 py-4 text-center w-28">Actions</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-slate-100">
          
          <tr v-if="alldata.length === 0">
            <td colspan="5" class="py-10 px-6">
              <p class="w-full text-center text-slate-400 text-sm">
                There are no files yet.
              </p>
            </td>
          </tr>

          <tr
            v-for="i in alldata"
            :key="i.id"
            class="hover:bg-slate-50/80"
          >
            
            <!-- Name -->
            <td class="py-5 px-6 font-semibold text-slate-700">
              <div class="max-h-20 overflow-hidden leading-snug">
                {{ checkIfEmpty(formatUserName(i.user_profile)) }}
              </div>
            </td>

            <!-- Email -->
            <td class="py-5 px-6">
              <div class="max-h-20 overflow-hidden break-all">
                {{ checkIfEmpty(i.email) }}
              </div>
            </td>

            <!-- Contact -->
            <td class="py-5 px-6 text-center">
              <div class="max-h-20 overflow-hidden">
                {{ i.user_profile ? i.user_profile.phone_number : '-' }}
              </div>
            </td>

            <!-- Date -->
            <td class="py-5 px-6 text-center text-slate-500">
              <div class="max-h-20 overflow-hidden">
                {{ getDateTimeFormat(i.datetime_added) }}
              </div>
            </td>

            <!-- Actions -->
            <td class="py-5 px-6">
              <div class="flex items-center justify-center gap-3 max-h-20 overflow-hidden">
                <button
                  type="button"
                  class="text-slate-400 hover:text-primary-600"
                  @click="openModal('edit', i.id)"
                  aria-label="Edit"
                >
                  <img src="../assets/icon_edit.png" class="h-4 w-auto" alt="" />
                </button>
                <button
                  type="button"
                  class="text-slate-400 hover:text-primary-600"
                  @click="openModal('view', i.id)"
                  aria-label="View"
                >
                  <img src="../assets/action_icon_view.png" class="h-4 w-auto" alt="" />
                </button>
              </div>
            </td>

          </tr>

        </tbody>
      </table>

    </div>
  </div>

  <!-- Pagination (unchanged) -->
  <!-- <div class="border-t border-slate-200 px-4 py-3 flex items-center justify-end">
    <div class="pagination_cmp">
      <vue-awesome-paginate
        :total-items="total_cnt"
        :items-per-page="page_limit"
        v-model="page"
        @click="getAllData(null, null)"
      >
        <template #prev-button>
          <span>Prev</span>
        </template>
        <template #next-button>
          <span>Next</span>
        </template>
      </vue-awesome-paginate>
    </div>
  </div> -->

</div>
  </div>

    <AddAccount v-if="show_Modal_Add" @close-modal="show_Modal_Add = false" :refreshData="refreshData" :showNotification="showNotification" :item_data="item_data"/>
  
</template>

<script>

import AddAccount from '@/components/Modals/AddAccount.vue';
import axios from 'axios';
import moment from 'moment';

export default{
    components: {
        AddAccount,
    },
    mounted(){
        this.refreshData();
    },
    props:{
        showNotification : Function
    },
    data(){
        return{
            alldata : [],
            page: 1,
            total_cnt: 0,
            total_pages : 0,
            page_limit : 25,
            show_Modal_Add : false,

            item_data : {
                id : 0,
                type: 0,
            }
        }
    },
    methods: {
        onSearchInput(val) {
            this.page = 1;
            this.getAllData(val, 'search');
        },
        refreshData(){
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

                return i.lname + ", " + i.fname + " " + (i.mname ? i.mname : '');
            }
            else return "-";
        },
        openModal(action, id){
            this.item_data.action = action;
            this.item_data.id = id;
            this.item_data.type = this.$route.params.type;
            this.show_Modal_Add = true;
        },
        getAllData(search_value, type) {
            const params = {};

            if (search_value !== null && type) {
                params.value = search_value;
                params.type = type;
            }

            axios.get(
                `${process.env.VUE_APP_BASE_URL}/user/get_users_by_page/${this.$route.params.type}/${this.page}/${this.page_limit}`,
                { params }  
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
    
    '$route': {
        immediate:true,
        handler(){
          this.refreshData();
        },
    },
    
    }

}

</script>