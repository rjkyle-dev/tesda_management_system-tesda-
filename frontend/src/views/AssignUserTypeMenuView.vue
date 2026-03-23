<template>
    <div class="h-auto">

      <div class="sm:flex items-center sm:space-x-4 space-y-4 sm:space-y-0">
        <p class="flex-auto font-bold text-lg text-gray-700">Assign User Menu</p>


      </div>
  
      
  
  
  <div class="bg-white p-2 rounded-md mt-4 min-h-full">

    <select v-model="ut_id" @change="refreshData" class="pl-2 pr-8 py-1 mx-2 my-2 rounded-lg text-md">
            <option v-for="i in allusertypes" v-bind:key="i.id" v-bind:value="i.id">{{ i.description }}</option>
          </select>

          <button v-if="assignOnProgress" @click="resetSelect" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg">
            Clear
          </button>

    
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 p-2">

        <div>

            <p class="flex-auto font-bold text-lg text-gray-700 my-2">Assigned Modules <span class="text-green-600">({{ alldata.length }})</span></p>

            <div class="h-96 overflow-y-auto border space-y-2 p-4">

            <div v-for="i in alldata" v-bind:key="i.id" class="flex items-center hover:border-green-600 border p-2">
              <div class="flex-auto text-gray-700" :class="i.parent_id == 0 ? 'pl-4' : padding[i.position-1]">
                {{i.um_id.name}} - ({{i.um_id.title}})
              </div>
              <div class="flex-none flex items-center space-x-2">
                <img v-if="assignOnProgress && i.parent_id == 0" src="../assets/action_icon_drop_item.png" @click="setItem(i,1)" class="h-4 w-auto cursor-pointer hover:animate-bounce hover:h-6">
                <img v-if="i.parent_id == 0 && !assignOnProgress" src="../assets/action_icon_select.png" @click="selectItem(i)" class="h-4 w-auto cursor-pointer">
                <img v-if="i.parent_id > 0 && !assignOnProgress" src="../assets/action_icon_delete.png" @click="setItem(i, 0)" class="h-4 w-auto cursor-pointer">
                <img v-if="!assignOnProgress" src="../assets/action_icon_swap.png" @click="swapItem(i.id, 'remove')" class="h-4 w-auto cursor-pointer">
              </div>

            </div>
            </div>

        </div>

        <div>

            <p class="flex-auto font-bold text-lg text-gray-700 my-2">Available Modules <span class="text-green-600">({{ allusermenu.length }})</span></p>

            <div class="h-96 overflow-y-auto border space-y-2 p-4">

              <div v-for="i in allusermenu" v-bind:key="i.id" class="flex items-center hover:border-green-600 border p-2">
                <div class="flex-auto text-gray-700" :class="i.isTitle == 1 ? 'font-bold' : 'font-normal'">
                  {{i.name}} - ({{i.title}})
                </div>
                <div class="flex-none items-center">
                  <img src="../assets/action_icon_swap.png" @click="swapItem(i.id, 'add')" class="h-4 w-auto cursor-pointer">
                </div>

            </div>
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
      allusertypes : '',
      allusermenu : '',
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
        this.allusermenu.splice(0);
        this.alldata.splice(0);
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