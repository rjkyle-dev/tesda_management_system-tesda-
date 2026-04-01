<template>
  <div class="flex-auto flex flex-col p-5 page-anim">
    <div class="flex items-start justify-between gap-4 mb-4">
      <div class="min-w-0">
        <h1 class="text-2xl font-semibold text-slate-900">Qualifications</h1>
      </div>
      <button
        type="button"
        class="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 rounded-xl shadow-sm duration-200 whitespace-nowrap"
        @click="openModal('add', 0)"
      >
        <span class="text-lg leading-none">+</span>
        <span class="font-semibold text-sm">Add Qualification</span>
      </button>
    </div>

    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
      <div class="relative w-full sm:max-w-md">
        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" class="w-4 h-4">
            <path
              d="M21 21l-4.3-4.3m1.3-5.2a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
            />
          </svg>
        </span>
        <input
          type="text"
          class="w-full rounded-2xl border border-slate-200 bg-white text-sm px-10 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-300"
          placeholder="Search qualification..."
          @input="getAllData($event.target.value, 'search')"
        >
      </div>

      <div class="pagination_cmp sm:px-3 self-end sm:self-auto" v-if="alldata.length > page_limit">
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
    </div>

    <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="text-[11px] text-slate-500 uppercase bg-slate-50">
            <tr>
              <th scope="col" class="px-6 py-4 text-left tracking-wider">Qualification Title</th>
              <th scope="col" class="px-6 py-4 text-left tracking-wider">Category</th>
              <th scope="col" class="px-6 py-4 text-center tracking-wider">Hours</th>
              <th scope="col" class="px-6 py-4 text-center tracking-wider">Days</th>
              <th scope="col" class="px-6 py-4 text-left tracking-wider whitespace-nowrap">Date Added</th>
              <th scope="col" class="px-6 py-4 text-center tracking-wider w-28">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-if="alldata.length === 0">
              <td colspan="6" class="py-10 text-center text-slate-500 text-sm">
                No qualifications found.
              </td>
            </tr>

            <tr
              v-for="(i, idx) in alldata"
              :key="i.id"
              class="hover:bg-slate-50 transition-colors item-anim"
              :style="{ animationDelay: `${Math.min(idx, 20) * 35}ms` }"
            >
              <td class="px-6 py-5 text-slate-800 font-medium">
                {{ checkIfEmpty(i.description) }}
              </td>
              <td class="px-6 py-5 text-slate-600">
                {{ i.category_id ? i.category_id.description : '-' }}
              </td>
              <td class="px-6 py-5 text-center text-slate-700 font-semibold tabular-nums">
                {{ checkIfEmpty(i.hrs) }}
              </td>
              <td class="px-6 py-5 text-center text-slate-700 font-semibold tabular-nums">
                {{ checkIfEmpty(i.days) }}
              </td>
              <td class="px-6 py-5 text-slate-600 whitespace-nowrap">
                {{ getDateTimeFormat(i.datetime_added) }}
              </td>
              <td class="px-6 py-5">
                <div class="flex items-center justify-center">
                  <button
                    class="p-2 rounded-xl hover:bg-slate-100 active:bg-slate-200 duration-150"
                    type="button"
                    @click="openModal('edit', i.id)"
                    aria-label="Edit"
                  >
                    <img src="../assets/icon_edit.png" class="h-4 w-auto" alt="">
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

    <AddQualification v-if="show_Modal_Add" @close-modal="show_Modal_Add = false" :refreshData="refreshData" :showNotification="showNotification" :item_data="item_data"/>
  
</template>

<script>

import AddQualification from '@/components/Modals/AddQualification.vue';
import axios from 'axios';
import moment from 'moment';

export default{
    components: {
        AddQualification,
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
            this.show_Modal_Add = true;
        },
        getAllData(search_value, type) {
            const params = {};

            if (search_value !== null && type) {
                params.value = search_value;
                params.type = type;
            }

            axios.get(
                `${process.env.VUE_APP_BASE_URL}/qualifications/get_all_by_page/${this.page}/${this.page_limit}`,
                { params }  
            )
            .then(res => {
                if (res.status === 200) {
                    this.alldata = res.data[0];
                    this.total_cnt = res.data[1];
                }
            });
        }
    }
}

</script>

<style scoped>
.page-anim{
  animation: pageFadeUp 520ms cubic-bezier(.2,.9,.2,1) both;
}

.item-anim{
  opacity: 0;
  transform: translateY(8px);
  animation: itemFadeUp 520ms cubic-bezier(.2,.9,.2,1) both;
  will-change: transform, opacity;
}

@keyframes pageFadeUp{
  from{ opacity: 0; transform: translateY(10px); }
  to{ opacity: 1; transform: translateY(0); }
}

@keyframes itemFadeUp{
  from{ opacity: 0; transform: translateY(10px); }
  to{ opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce){
  .page-anim, .item-anim{ animation: none !important; transform: none !important; opacity: 1 !important; }
}
</style>