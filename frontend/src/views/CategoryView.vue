<template>
  <div class="flex-auto flex flex-col px-6 py-5">
    <!-- Actions row -->
    <div class="flex flex-col lg:flex-row lg:items-center gap-3">
      <button class="w-fit bg-primary-600 hover:bg-primary-500 text-white px-5 py-2.5 rounded-xl duration-200 shadow-sm flex items-center gap-2" @click="openModal('add', 0)">
        <span class="inline-flex items-center justify-center w-5 h-5 rounded-md bg-white/15">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
        Add Category +
      </button>
    </div>

    <!-- Table card -->
    <div class="mt-5 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm text-left text-slate-600">
          <thead class="text-[11px] text-slate-500 uppercase bg-slate-50">
            <tr>
              <th scope="col" class="px-6 py-4 text-left">Name</th>
              <th scope="col" class="px-6 py-4 text-center w-52">Date &amp; Time Added</th>
              <th scope="col" class="px-6 py-4 text-center w-28">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-if="alldata.length === 0">
              <td colspan="3" class="py-10 px-6">
                <p class="w-full text-center text-slate-400 text-sm">There are no files yet.</p>
              </td>
            </tr>

            <tr v-for="i in alldata" :key="i.id" class="hover:bg-slate-50/80">
              <td class="py-5 px-6 font-semibold text-slate-700">
                {{ i.description ? i.description : '-' }}
              </td>
              <td class="py-5 px-6 text-center text-slate-500">
                {{ getDateTimeFormat(i.datetime_added) }}
              </td>
              <td class="py-5 px-6">
                <div class="flex items-center justify-center">
                  <button type="button" class="text-slate-400 hover:text-primary-600" @click="openModal('edit', i.id)" aria-label="Edit">
                    <img src="../assets/icon_edit.png" class="h-4 w-auto" alt="" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination under table -->
      <div class="border-t border-slate-200 px-4 py-3 flex items-center justify-end">
        <div class="pagination_cmp">
          <vue-awesome-paginate :total-items="total_cnt" :items-per-page="page_limit" v-model="page" @click="getAllData()">
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
  </div>

    <AddCategory v-if="show_Modal_Add" @close-modal="show_Modal_Add = false" :refreshData="refreshData" :showNotification="showNotification" :item_data="item_data"/>
  
</template>

<script>

import AddCategory from '@/components/Modals/AddCategory.vue';
import axios from 'axios';
import moment from 'moment';

export default{
    components: {
        AddCategory,
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
            }
        }
    },
    methods: {
        refreshData(){
            this.getAllData();
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
            this.show_Modal_Add = true;
        },
        getAllData(){

            try{
                axios.get(process.env.VUE_APP_BASE_URL + '/categories/get_all_by_page/' + this.page + '/' + this.page_limit)
                .then((res) => {

                    if (res.status == 200) {

                        this.alldata = res.data[0];
                        this.total_cnt = res.data[1];

                    }

                });
            }
            catch(e){
                //
            }
            
        }
    }
}

</script>