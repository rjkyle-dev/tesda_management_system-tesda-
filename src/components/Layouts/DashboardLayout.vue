<template>
  <div class="min-h-screen bg-slate-100 bodyTemp">
    <aside
      class="hidden md:flex fixed top-0 left-0 bottom-0 overflow-hidden transition-[width] duration-300 ease-out border-r border-slate-800 bg-slate-900 z-50"
      :class="openSidebar ? 'w-[260px]' : 'w-[84px]'"
    >
      <DashboardSidebar ref="sidebar" :openSidebar="openSidebar" class="flex-1 flex flex-col min-h-0" />
    </aside>

    <div class="flex flex-col min-w-0 min-h-screen transition-[padding] duration-300 ease-out" :class="openSidebar ? 'md:pl-[260px]' : 'md:pl-[84px]'">
      <header class="shrink-0 sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
        <DashboardNavbar />
      </header>
      <main class="flex-1 overflow-y-auto bg-slate-50">
        <router-view :showNotification="showNotification" />
      </main>
    </div>
  </div>
</template>

<script>
import DashboardNavbar from '../Navbars/DashboardNavbar.vue';
import DashboardSidebar from '../Navbars/DashboardSidebar.vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  name: 'DashboardLayout',
  data() {
    return {
      showDisablePage: false,
      showNotif: false,
      type: '',
      msg: '',
      msg_title: '',
      openSidebar: true,
    };
  },
  components: {
    DashboardNavbar,
    DashboardSidebar,
  },
  methods: {
    showNotification(type, msg_title, msg) {
      const msg_holder = '<b>' + msg_title + '</b><br>' + msg;
      if (type == 0) {
        toast(msg_holder, {
          autoClose: 3000,
          dangerouslyHTMLString: true,
          type: 'warning',
        });
      } else if (type == 1) {
        toast(msg_holder, {
          autoClose: 3000,
          dangerouslyHTMLString: true,
          type: 'success',
        });
      }
    },
    openCloseSidebar() {
      this.openSidebar = !this.openSidebar;
    },
  },
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');

.bodyTemp {
  font-family: 'DM Sans', system-ui, sans-serif;
}

.input-modern {
  @apply w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
}
</style>
