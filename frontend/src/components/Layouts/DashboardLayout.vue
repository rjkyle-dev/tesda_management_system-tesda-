<template>

<div class="flex bg-gray-100 bodyTemp">

  <div class="flex-none p-6 bg-white">
    <DashboardSidebar :openSidebar="openSidebar" :class="[openSidebar ? 'md:flex md:w-0' : 'hidden md:flex md:w-auto']" ref="sidebar" class="animate__slideInLeft"/>
  </div>

  <div class="flex-auto flex flex-col">
    <div class="flex-none border border-b-1 bg-white">
      <DashboardNavbar/>
    </div>

    <div class="flex-auto h-screen overflow-y-auto">
      <router-view :showNotification="showNotification"></router-view>
    </div>
    
    
  </div>


<!-- 
<div class="hidden md:flex flex-col w-auto bg-green-600 border-green-700 border-r-2">
    <DashboardSidebar :openSidebar="openSidebar" :class="[openSidebar ? 'md:flex md:w-0' : 'hidden md:flex md:w-auto']"/>
</div>

<div class="flex flex-col flex-1 overflow-y-auto">

    <div>
      <DashboardNavbar/>
    </div>

    <div class="p-4">
      <router-view :showNotification="showNotification" class="h-auto"></router-view>
    </div>
</div> -->

</div>

</template>

<script>
import DashboardNavbar from "../Navbars/DashboardNavbar.vue";
import DashboardSidebar from "../Navbars/DashboardSidebar.vue";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
// import axios from 'axios';


export default{
  name: "DashboardLayout",
  data(){
    return{
      showDisablePage : false,
      showNotif : false,
      type : '',
      msg : '',
      msg_title : '',

      openSidebar : true,
    }
  },
  components: {
    DashboardNavbar,
    DashboardSidebar
  },
  methods: {
    showNotification(type, msg_title, msg){

      var msg_holder = "<b>" + msg_title +"</b><br>" + msg;

    if(type == 0){
      toast(msg_holder, {
        autoClose: 3000,
        dangerouslyHTMLString: true,
        type : "warning"
      })
    }
    else if(type == 1){
      toast(msg_holder, {
        autoClose: 3000,
        dangerouslyHTMLString: true,
        type : "success"
      })
    }

    },  
    openCloseSidebar(){
      const sidebarRef = this.$refs.sidebar;
      const sidebarEl = sidebarRef && (sidebarRef.$el || sidebarRef);

      if (!sidebarEl || !sidebarEl.classList) {
        this.openSidebar = !this.openSidebar;
        return;
      }

      if (this.openSidebar) {
        sidebarEl.classList.remove('animate__slideInLeft');
        sidebarEl.classList.add('animate__slideOutLeft');
        this.openSidebar = false;
      }
      else {
        sidebarEl.classList.remove('animate__slideOutLeft');
        sidebarEl.classList.add('animate__slideInLeft');
        this.openSidebar = true;
      }
    },
  },
}

</script>
<style>

  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
  
  .bodyTemp{
    font-family: "Roboto";
  }

  .input-modern {
  @apply w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
         focus:outline-none focus:ring-2 focus:ring-blue-500
         focus:border-blue-500;
}

  </style>