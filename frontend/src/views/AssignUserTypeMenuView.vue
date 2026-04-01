<template>
  <div class="flex-auto flex flex-col px-6 py-5">
    <div class="flex items-center gap-3">
      <p class="text-2xl font-bold text-slate-800">Assign User Menu</p>
    </div>

    <!-- User type selector -->
    <div class="mt-4 bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
      <div class="flex flex-col sm:flex-row sm:items-center gap-3">
        <div class="flex items-center gap-3">
          <span class="text-sm font-semibold text-slate-500">User Type</span>
          <select v-model="ut_id" @change="refreshData" class="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
            <option v-for="i in allusertypes" :key="i.id" :value="i.id">{{ i.description }}</option>
          </select>
        </div>

        <button v-if="assignOnProgress" type="button" @click="resetSelect" class="w-fit bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-xl duration-200 shadow-sm">
          Clear
        </button>
      </div>
    </div>

    <div class="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Assigned -->
      <div>
        <div class="flex items-baseline justify-between mb-3">
          <p class="text-lg font-bold text-slate-800">
            Assigned Modules <span class="text-emerald-600">({{ alldata.length }})</span>
          </p>
        </div>

        <div class="h-[520px] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-3 space-y-3">
          <div
            v-for="i in alldata"
            :key="i.id"
            class="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm hover:border-primary-300 hover:shadow transition"
          >
            <div class="flex-1 min-w-0 text-slate-800 font-semibold" :class="i.parent_id == 0 ? 'pl-4' : padding[i.position-1]">
              <span class="truncate block">
                {{ i.um_id.name }} <span class="text-slate-400 font-medium">– ({{ i.um_id.title }})</span>
              </span>
            </div>

            <div class="shrink-0 flex items-center gap-3">
              <img
                v-if="assignOnProgress && i.parent_id == 0"
                src="../assets/action_icon_drop_item.png"
                @click="setItem(i, 1)"
                class="h-4 w-auto cursor-pointer"
                alt=""
              />
              <img
                v-if="i.parent_id == 0 && !assignOnProgress"
                src="../assets/action_icon_select.png"
                @click="selectItem(i)"
                class="h-4 w-auto cursor-pointer"
                alt=""
              />
              <img
                v-if="i.parent_id > 0 && !assignOnProgress"
                src="../assets/action_icon_delete.png"
                @click="setItem(i, 0)"
                class="h-4 w-auto cursor-pointer"
                alt=""
              />
              <img v-if="!assignOnProgress" src="../assets/action_icon_swap.png" @click="swapItem(i.id, 'remove')" class="h-4 w-auto cursor-pointer" alt="" />
            </div>
          </div>
        </div>
      </div>

      <!-- Available -->
      <div>
        <div class="flex items-baseline justify-between mb-3">
          <p class="text-lg font-bold text-slate-800">
            Available Modules <span class="text-emerald-600">({{ allusermenu.length }})</span>
          </p>
        </div>

        <div class="h-[520px] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-3 space-y-3">
          <div
            v-for="i in allusermenu"
            :key="i.id"
            class="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm hover:border-primary-300 hover:shadow transition"
          >
            <div class="flex-1 min-w-0 text-slate-800" :class="i.isTitle == 1 ? 'font-bold' : 'font-semibold'">
              <span class="truncate block">
                {{ i.name }} <span class="text-slate-400 font-medium">– ({{ i.title }})</span>
              </span>
            </div>

            <div class="shrink-0 flex items-center">
              <img src="../assets/action_icon_swap.png" @click="swapItem(i.id, 'add')" class="h-4 w-auto cursor-pointer" alt="" />
            </div>
          </div>
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
      allusertypes : [],
      allusermenu : [],
      activeClass : 'bg-green-600 text-white',
      inactiveClass : 'bg-none text-gray-600',
      page: 1,
    total_cnt: 0,
    total_pages : 0,
    page_list : [],
    page_limit : 25,
    show_UserModal : true,
    show_toggle_txt : 'Show numbers',

    ut_id : '',
    

      //data
      item_data : {
        id: '',
        action: '',
      },
      prompt_data : {
        data : '',
        type : '',
      },

      padding : ['sm:pl-8','sm:pl-16','sm:pl-24','sm:pl-32','sm:pl-40','sm:pl-48','sm:pl-56'],

      //toggles
      show_PromptModal : false,
      show_AddModal : false,

      assignOnProgress : false,
      select_data : {
        id : 0,
        parent_id : 0,
        type : 0,
        position : 0,
      }
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
    resetSelect(){
      this.assignOnProgress = false;
      this.select_data.id = 0;
      this.select_data.parent_id = 0;
      this.select_data.position = 0;
      this.select_data.type = 0;
    },
    selectItem(i){
      this.assignOnProgress = true;

      this.select_data.id = i.id;
      this.select_data.position = i.position;
    },
    setItem(i,type){
      this.assignOnProgress = false;
      this.select_data.type = type;

      if(type == 0){
        this.select_data.id = i.id;
        this.select_data.parent_id = 0;
        this.select_data.position = 1;
      }
      else{
        this.select_data.parent_id = i.id;
        this.select_data.position = i.position + 1;
      }


      axios.post(process.env.VUE_APP_BASE_URL + '/user_type_menu/assign_item', this.select_data)
      .then((res)=>{

          if(res.status == 201){

            this.select_data.id = 0;
            this.select_data.parent_id = 0;
            this.select_data.position = 0;
            this.select_data.type = 0;

            this.refreshData();
            this.showNotification(1,"Success","Menu assigned!");
              
          }
          
      });


      

    },
    getImgUrl(imagePath) {
      return process.env.VUE_APP_BASE_URL + "/user_menu/get_file/"+imagePath+"/png";
    },
    refreshData(){
      this.allusermenu = [];
      this.alldata = [];
      this.getAll();
    },
  getUserTypes(){
//
axios.get(process.env.VUE_APP_BASE_URL + '/user_types/get_user_types')
  .then((res)=>{
  
    if(res.status == 200){
  
      this.allusertypes = res.data;

      this.ut_id = res.data[0].id;
      this.getAll();
  
    }
    
  })

  },
  getUserMenu(){
//
axios.get(process.env.VUE_APP_BASE_URL + '/user_menu/get_all')
  .then((res)=>{
  
    if(res.status == 200){

      this.allusermenu = res.data;

      for(var i = 0; i < this.alldata.length; i++){
        for(var j = 0; j < this.allusermenu.length; j++){

            if(this.alldata[i].um_id.id == this.allusermenu[j].id){
                this.allusermenu.splice(j, 1);
                break;
            }
        }
      }


  
    }
    
  })

  },
  swapItem(id,action){

    const today = new Date();
      const date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const timestamp = date + ' ' + time;

    var data = {
        ut_id : this.ut_id,
        um_id : id,
        datetime_added : timestamp
    };

    if(action == 'remove'){
        axios.post(process.env.VUE_APP_BASE_URL + '/user_type_menu/delete', {id : id})
        .then((res)=>{

            if(res.status == 201){

                this.showNotification(1,"Success","Menu removed!");
                this.refreshData();
            }
            
        });
    }
    else{
        axios.post(process.env.VUE_APP_BASE_URL + '/user_type_menu/add', data)
        .then((res)=>{

            if(res.status == 201){

                this.showNotification(1,"Success","Menu added!");
                this.refreshData();
            }
            
        });
    }
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
      return moment(value).format('MMMM DD, YYYY HH:MM:SS a');
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
  getAll(){
  
  axios.get(process.env.VUE_APP_BASE_URL + '/user_type_menu/get_menu/' + this.ut_id)
  .then((res)=>{
  
    if(res.status == 200){
  
      this.alldata = arrayToTree(res.data);

      const itemFilter = items => items
            .map(item => item.children 
                ? { ...item, children: itemFilter(item.children) }
                : item
            )
            .filter(item => item.position);
            
            const itemSorter = items => items
            .map(item => item.children
                ? { ...item, children: itemSorter(item.children) }
                : item
            )
            .sort((i1, i2) => i1.order_num - i2.order_num);

            this.alldata = itemSorter(itemFilter(this.alldata))


      const flatten = (array) => array.flatMap(({id,ut_id,um_id,datetime_added,order_num,parent_id, position, children}) => [
      { id,ut_id,um_id,datetime_added,order_num,parent_id, position },
      ...flatten(children || []) 
      ])
      ;


      this.alldata = flatten(this.alldata);

      this.getUserMenu();
  
    }
    
  })
  },
  },
  mounted: function(){
    // this.refreshData();
    this.getUserTypes();
  }
  }
  
  </script>