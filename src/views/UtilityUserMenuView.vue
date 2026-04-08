<template>
  <div class="flex-auto flex flex-col px-6 py-5">
    <div class="flex items-center justify-between gap-3">
      <p class="text-2xl font-bold text-slate-800">User Menu</p>

      <button @click="showAddModal(0, 'add')" class="bg-primary-600 hover:bg-primary-500 rounded-xl px-5 py-2.5 text-sm text-white font-semibold shadow-sm flex items-center gap-2">
        <span class="inline-flex items-center justify-center w-5 h-5 rounded-md bg-white/15">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
        Add Menu
      </button>
    </div>

    <div class="mt-5 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <!-- Meta / controls row (matches screenshot style) -->
      <div class="px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white">
        <div class="text-sm text-slate-500">
          Showing <span class="font-semibold text-slate-700">1</span> to
          <select v-model="page_limit" @change="refreshData" class="ml-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="250">250</option>
            <option value="500">500</option>
          </select>
          <span class="ml-2">of <span class="font-bold text-slate-700">{{ total_cnt }}</span> results</span>
        </div>

        <div v-if="alldata.length > 0" class="flex items-center gap-2">
          <button type="button" @click="changePageByClick('minus')" class="h-9 w-9 rounded-full border border-slate-200 bg-white text-slate-500 hover:bg-slate-50">
            <span class="sr-only">Prev</span>
            ‹
          </button>
          <span class="h-9 w-9 rounded-full bg-primary-600 text-white flex items-center justify-center text-sm font-bold">{{ page }}</span>
          <button type="button" @click="changePageByClick('add')" class="h-9 w-9 rounded-full border border-slate-200 bg-white text-slate-500 hover:bg-slate-50">
            <span class="sr-only">Next</span>
            ›
          </button>
        </div>
      </div>

      <div class="overflow-x-auto">
  
  <!-- vertical scroll -->
  <div class="max-h-[420px] overflow-y-auto">
    
    <table class="min-w-full text-sm text-left text-slate-600">
      
      <!-- sticky header -->
      <thead class="text-[11px] text-slate-500 uppercase bg-slate-50 sticky top-0 z-10">
        <tr>
          <th scope="col" class="px-6 py-4 text-center w-24">Icon</th>
          <th scope="col" class="px-6 py-4 text-left">Name</th>
          <th scope="col" class="px-6 py-4 text-left">Title</th>
          <th scope="col" class="px-6 py-4 text-left">Link</th>
          <th scope="col" class="px-6 py-4 text-left w-24">Type</th>
          <th scope="col" class="px-6 py-4 text-left w-52">Date &amp; Time Added</th>
          <th scope="col" class="px-6 py-4 text-center w-28">Actions</th>
        </tr>
      </thead>

      <tbody class="divide-y divide-slate-100 bg-white">
        
        <tr
          v-for="i in alldata"
          :key="i.id"
          class="hover:bg-slate-50/80"
        >
          <!-- Icon -->
          <td class="py-4 px-6 text-center">
            <div class="max-h-20 overflow-hidden flex justify-center">
              <img :src="getImgUrl(i.profile_pic)" class="w-9 h-9 rounded-lg object-cover" alt="" />
            </div>
          </td>

          <!-- Name -->
          <td class="py-4 px-6 font-semibold text-slate-700">
            <div class="max-h-20 overflow-hidden leading-snug">
              {{ i.name }}
            </div>
          </td>

          <!-- Title -->
          <td class="py-4 px-6">
            <div class="max-h-20 overflow-hidden leading-snug">
              {{ i.title }}
            </div>
          </td>

          <!-- Link -->
          <td class="py-4 px-6 text-primary-700">
            <div class="max-h-20 overflow-hidden break-all">
              {{ i.link }}
            </div>
          </td>

          <!-- Type -->
          <td class="py-4 px-6">
            <div class="max-h-20 overflow-hidden">
              <span
                class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                :class="i.isTitle == 1 ? 'bg-slate-100 text-slate-700' : 'bg-sky-100 text-sky-700'"
              >
                {{ checkTitle(i.isTitle) }}
              </span>
            </div>
          </td>

          <!-- Date -->
          <td class="py-4 px-6 text-slate-500">
            <div class="max-h-20 overflow-hidden">
              {{ getDateTimeFormat(i.datetime_added) }}
            </div>
          </td>

          <!-- Actions -->
          <td class="py-4 px-6">
            <div class="flex items-center justify-center gap-3 max-h-20 overflow-hidden">
              <button
                type="button"
                class="text-slate-400 hover:text-primary-600"
                @click="showAddModal(i.id, 'edit')"
                aria-label="Edit"
              >
                <img src="../assets/action_icon_edit.png" class="h-4 w-auto" alt="" />
              </button>
              <button
                type="button"
                class="text-slate-400 hover:text-rose-600"
                @click="showSubModal(i, 'delete menu')"
                aria-label="Delete"
              >
                <img src="../assets/action_icon_delete.png" class="h-4 w-auto" alt="" />
              </button>
            </div>
          </td>

        </tr>

      </tbody>
    </table>

  </div>
</div>
    </div>
  </div>
  
  <PromptModal v-if="show_PromptModal" @close-modal="show_PromptModal = false" :refreshData="refreshData" :prompt_data="prompt_data" :showNotification="showNotification"/>
  <AddMenuModal v-if="show_AddModal" @close-modal="show_AddModal = false" :refreshData="refreshData" :item_data="item_data" :showNotification="showNotification"/>
  
  </template>
  
  <script>
  
  import axios from 'axios';
  import moment from 'moment';
  import PromptModal from '../components/Modals/PromptModal.vue';
  import AddMenuModal from '../components/Modals/AddMenuModal.vue';
  import * as arrayToTree from 'array-to-tree';

  export default{
  data(){
    return {
      alldata : [],
      activeClass : 'bg-green-600 text-white',
      inactiveClass : 'bg-none text-gray-600',
      selected_id : 0,
      page: 1,
    total_cnt: 0,
    total_pages : 0,
    page_list : [],
    page_limit : 25,
    show_UserModal : true,
    show_toggle_txt : 'Show numbers',
    

      //data
      item_data : {
        id: '',
        action: '',
      },
      prompt_data : {
        data : '',
        type : '',
      },

      padding : ['sm:pl-16','sm:pl-24','sm:pl-32','sm:pl-40','sm:pl-48','sm:pl-56'],

      //toggles
      show_Numbers : false,
      show_PromptModal : false,
      show_AddModal : false,
      show_AddHeadModal : false,
      show_HeirarchyModal : false,
    }
  },
  props: {
    showNotification : Function
  },
  components : {
    PromptModal,
    AddMenuModal,
  },
  methods: {
    getImgUrl(imagePath) {
      // return require('@/assets/' + imagePath);
      return process.env.VUE_APP_BASE_URL + "/user_menu/get_file/"+imagePath+"/png";
      // return require('../../assets/' + imagePath);
    },
    refreshData(){
    this.getAll();
    this.getCountTotal();
  },
  checkTitle(value){
    if(value == 1) return "Title";
    else return "Module";
  },
  changePageByClick(type){
    if(type == "add"){
      if(this.page != this.total_pages){
        this.page++;
        this.refreshData();
      }
      
    }
    else if(type == "minus"){
      if(this.page != 1){
        this.page--;
        this.refreshData();
      }
    }
  },
  changePage(val){
    this.page = val;
    this.refreshData();
  },
  generatePages(){
    if(this.page_list.length > 0) this.page_list.splice(0);

    this.total_pages = Math.ceil(this.total_cnt/this.page_limit);
    for(var i = 1; i <= this.total_pages; i++){
      this.page_list.push({
        id : i
      });
    }
  },
    getDateTimeFormat(value){
      return moment(value).format('MMMM DD, YYYY hh:mm a');
    },
    showSubModal(data,action){
      this.show_PromptModal = true;

      this.prompt_data = {
        data : data,
        action : action,
      };

    },
    showAddModal(id, action){
        this.item_data.id = id;
        this.item_data.action = action;
        this.show_AddModal = true;
    },
    getCountTotal(){
  
  axios.get(process.env.VUE_APP_BASE_URL + '/user_menu/get_count')
  .then((res)=>{
  
    if(res.status == 200){
  
      this.total_cnt = res.data.total_cnt;
      this.generatePages();
    }
    
  })
  },
  getAll(){
  
  axios.get(process.env.VUE_APP_BASE_URL + '/user_menu/get_all_page/' + this.page + '/' + this.page_limit)
  .then((res)=>{
  
    if(res.status == 200){
  
      this.alldata = arrayToTree(res.data);

      // const itemFilter = items => items
      //       .map(item => item.children 
      //           ? { ...item, children: itemFilter(item.children) }
      //           : item
      //       )
      //       .filter(item => item.position);
            
      //       const itemSorter = items => items
      //       .map(item => item.children
      //           ? { ...item, children: itemSorter(item.children) }
      //           : item
      //       )
      //       .sort((i1, i2) => i1.order_num - i2.order_num);

      //       this.alldata = itemSorter(itemFilter(this.alldata))


      // const flatten = (array) => array.flatMap(({id,name,title,link,datetime_added,order_num,parent_id, position, children}) => [
      // { id,name,title,link,datetime_added,order_num,parent_id, position },
      // ...flatten(children || []) 
      // ])
      // ;


      // this.alldata = flatten(this.alldata);
  
    }
    
  })
  },
  },
  mounted: function(){
    this.refreshData();
  }
  }
  
  </script>