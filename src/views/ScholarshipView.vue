<template>
  <div class="flex-auto flex flex-col p-5 page-anim">
    <div class="flex items-start justify-between gap-4 mb-4">
      <div class="min-w-0">
        <h1 class="text-2xl font-semibold text-slate-900">Scholarships</h1>
      </div>
      <button
        type="button"
        class="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 rounded-xl shadow-sm duration-200 whitespace-nowrap"
        @click="openModal('add', 0)"
      >
        <span class="text-lg leading-none">+</span>
        <span class="font-semibold text-sm">Add Scholarship</span>
      </button>
    </div>

    <div class="flex items-center justify-end mb-4" v-if="alldata.length > page_limit">
      <div class="pagination_cmp sm:px-3">
        <vue-awesome-paginate
          :total-items="total_cnt"
          :items-per-page="page_limit"
          v-model="page"
          @click="getAllData()"
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

    <div v-if="alldata.length === 0" class="text-slate-500 text-sm py-16 text-center">
      No scholarships found.
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <div
        v-for="(i, idx) in alldata"
        :key="i.id"
        class="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden card-anim"
        :style="{ animationDelay: `${Math.min(idx, 20) * 45}ms` }"
      >
        <div class="p-5">
          <div class="flex items-start justify-between gap-3">
            <div class="inline-flex items-center gap-3 min-w-0">
              <div class="sch-badge">
                {{ scholarshipInitials(i) }}
              </div>
              <div class="min-w-0">
                <p class="text-slate-800 font-semibold leading-snug truncate">
                  {{ checkIfEmpty(i.description) }}
                </p>
                <p class="text-xs text-slate-500 mt-0.5">
                  {{ checkIfEmpty(i.abbre) }}
                </p>
              </div>
            </div>

            <button
              class="p-2 rounded-xl hover:bg-slate-100 active:bg-slate-200 duration-150"
              type="button"
              @click="openModal('edit', i.id)"
              aria-label="Edit"
            >
              <img src="../assets/icon_edit.png" class="h-4 w-auto" alt="">
            </button>
          </div>
        </div>

        <div class="px-5 py-3 border-t border-slate-100 text-xs text-slate-500">
          Added {{ getDateTimeFormat(i.datetime_added) }}
        </div>
      </div>
    </div>
  </div>

    <AddScholarship v-if="show_Modal_Add" @close-modal="show_Modal_Add = false" :refreshData="refreshData" :showNotification="showNotification" :item_data="item_data"/>
  
</template>

<script>

import AddScholarship from '@/components/Modals/AddScholarship.vue';
import axios from 'axios';
import moment from 'moment';

export default{
    components: {
        AddScholarship,
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
        scholarshipInitials(item){
            const abbre = String(item?.abbre || '').trim();
            if (abbre) return abbre.slice(0, 3).toUpperCase();
            const name = String(item?.description || '').trim();
            if (!name) return 'SCH';
            const parts = name.split(/\s+/).filter(Boolean);
            if (parts.length >= 2) return (parts[0][0] + parts[1][0] + (parts[2]?.[0] || '')).toUpperCase().slice(0, 3);
            return name.replace(/[^A-Za-z0-9]/g, '').slice(0, 3).toUpperCase() || 'SCH';
        },
        getAllData(){

            try{
                axios.get(process.env.VUE_APP_BASE_URL + '/scholarships/get_all_by_page/' + this.page + '/' + this.page_limit)
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

<style scoped>
.page-anim{
  animation: pageFadeUp 520ms cubic-bezier(.2,.9,.2,1) both;
}

.card-anim{
  opacity: 0;
  transform: translateY(10px);
  animation: cardFadeUp 560ms cubic-bezier(.2,.9,.2,1) both;
  will-change: transform, opacity;
}

.sch-badge{
  width: 44px;
  height: 44px;
  border-radius: 0.9rem;
  display: grid;
  place-items: center;
  background: #0ea5e9;
  color: #fff;
  font-weight: 800;
  font-size: 0.75rem;
  letter-spacing: 0.04em;
  box-shadow: 0 10px 24px rgba(14, 165, 233, 0.28);
  flex: 0 0 auto;
}

@keyframes pageFadeUp{
  from{ opacity: 0; transform: translateY(10px); }
  to{ opacity: 1; transform: translateY(0); }
}

@keyframes cardFadeUp{
  from{ opacity: 0; transform: translateY(14px); }
  to{ opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce){
  .page-anim, .card-anim{ animation: none !important; transform: none !important; opacity: 1 !important; }
}
</style>