<template>
    <div>

      <div class="sm:flex items-center sm:space-x-4 space-y-4 sm:space-y-0">
        <p class="flex-auto font-bold text-lg text-gray-700">User Menu</p>

          <button @click="showAddModal(0, 'add')" class="bg-green-500 border rounded-3xl px-6 py-2 text-sm sm:flex-none sm:w-auto text-white font-medium hover:bg-green-600">
            + Add Menu
        </button>

      </div>
  
      
  
  
  <div class="bg-white p-2 rounded-md mt-4">

    <div class="flex items-center justify-between bg-white px-4 py-3 sm:px-6" >
  <div class="flex flex-1 justify-between sm:hidden">
    <span @click="changePageByClick('minus')" class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">Previous</span>
    <span @click="changePageByClick('add')" class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">Next</span>
  </div>
  <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
    <div>
      <p class="text-sm text-gray-700">
        Showing
        <span class="font-medium">1</span>
        to
        <span>
          <select v-model="page_limit" @change="refreshData" class="text-sm pl-2 pr-8 py-1 mx-2 rounded-lg">
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="250">250</option>
            <option value="500">500</option>
          </select>

        </span>
        of
        <span class="font-bold">{{total_cnt}}</span>
        results
      </p>
    </div> 

    <div v-if="alldata.length > 0">
      <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
        <span @click="changePageByClick('minus')" class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer">
          <span class="sr-only">Previous</span>
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
          </svg>
        </span>
        <span v-for="i in page_list" v-bind:key="i.id" aria-current="page" class="relative z-10 inline-flex items-center px-4 py-2 text-xs font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:cursor-pointer" :class="page == i.id ? 'bg-green-500 focus-visible:outline-green-600 text-white' : 'bg-white text-gray-700 ring-gray-300 ring-1 ring-inset'" @click="changePage(i.id)">{{ i.id }}</span>

        <!-- <span v-if="allmyrecords.length > 7" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span> -->

        <span @click="changePageByClick('add')" class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer">
          <span class="sr-only">Next</span>
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
          </svg>
        </span>
      </nav>
    </div>

  </div>
</div>

    <table class="min-w-full divide-y divide-gray-300">
                          <thead class="bg-white">
                          <tr class="text-white">
                            <th scope="col" class="py-4 px-4 text-gray-500 font-bold text-center text-sm w-auto">Icon</th>
                              <th scope="col" class="py-4 px-4 text-gray-500 font-bold text-left text-sm sm:pl-4 w-auto">Name</th>
                              <th scope="col" class="py-4 px-4 text-gray-500 font-bold text-left text-sm sm:pl-4 w-auto">Title</th>
                              <th scope="col" class="py-4 px-4 text-gray-500 font-bold text-left text-sm sm:pl-4 w-auto">Link</th>
                              <th scope="col" class="py-4 px-4 text-gray-500 font-bold text-left text-sm sm:pl-4 w-auto">Type</th>
                              <th scope="col" class="py-4 px-4 text-gray-500 font-bold text-left text-sm sm:pl-4 w-auto">Date & Time Added</th>
                              
                              <th scope="col" class="py-4 px-4 text-gray-500 font-bold text-center text-sm w-auto">Actions</th>
                          </tr>
                          </thead>
                          <tbody class="divide-y divide-gray-200 bg-white">
                          <tr v-for="i in alldata" v-bind:key="i.id" class="hover:bg-gray-200">
  
                            <td class="py-4 px-4 text-sm text-gray-500 bg-gray-200 text-center">
                            <img :src="getImgUrl(i.profile_pic)" class="bi bi-house px-2 text-xl text-center w-10 mx-auto">
                          </td>
                            <td class="py-4 px-4 text-sm text-gray-500">{{i.name}}</td>
                            <td class="py-4 px-4 text-sm text-gray-500">{{i.title}}</td>
                            <td class="py-4 px-4 text-sm text-gray-500">{{i.link}}</td>
                            <td class="py-4 px-4 text-sm text-gray-500">{{checkTitle(i.isTitle)}}</td>
                            <td class="py-4 px-4 text-sm text-gray-500">{{getDateTimeFormat(i.datetime_added)}}</td>
                              <td class="py-4 px-4 flex items-center justify-center space-x-2">
                                  <img src="../assets/action_icon_edit.png" @click="showAddModal(i.id, 'edit')" class="h-4 w-auto cursor-pointer">
                                  <img src="../assets/action_icon_delete.png" @click="showSubModal(i,'delete menu')" class="h-4 w-auto cursor-pointer">
                              </td>
                          </tr>
  
                          </tbody>
                      </table>

                      <div class="flex items-center justify-between bg-white px-4 py-3 sm:px-6" >
  <div class="flex flex-1 justify-between sm:hidden">
    <span @click="changePageByClick('minus')" class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">Previous</span>
    <span @click="changePageByClick('add')" class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">Next</span>
  </div>
  <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
    <div>
      <p class="text-sm text-gray-700">
        Showing
        <span class="font-medium">1</span>
        to
        <span>
          <select v-model="page_limit" @change="refreshData" class="text-sm pl-2 pr-8 py-1 mx-2 rounded-lg">
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="250">250</option>
            <option value="500">500</option>
          </select>
        </span>
        of
        <span class="font-bold">{{total_cnt}}</span>
        results
      </p>
    </div>

    <div v-if="alldata.length > 0">
      <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
        <span @click="changePageByClick('minus')" class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer">
          <span class="sr-only">Previous</span>
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
          </svg>
        </span>
        <span v-for="i in page_list" v-bind:key="i.id" aria-current="page" class="relative z-10 inline-flex items-center px-4 py-2 text-xs font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:cursor-pointer" :class="page == i.id ? 'bg-green-500 focus-visible:outline-green-600 text-white' : 'bg-white text-gray-700 ring-gray-300 ring-1 ring-inset'" @click="changePage(i.id)">{{ i.id }}</span>

        <!-- <span v-if="allmyrecords.length > 7" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span> -->

        <span @click="changePageByClick('add')" class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer">
          <span class="sr-only">Next</span>
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
          </svg>
        </span>
      </nav>
    </div>

  </div>
</div>

  </div>
  
  <PromptModal v-if="show_PromptModal" @close-modal="show_PromptModal = false" :refreshData="refreshData" :prompt_data="prompt_data" :showNotification="showNotification"/>
  <AddMenuModal v-if="show_AddModal" @close-modal="show_AddModal = false" :refreshData="refreshData" :item_data="item_data" :showNotification="showNotification"/>
  
    </div>
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
      alldata : '',
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