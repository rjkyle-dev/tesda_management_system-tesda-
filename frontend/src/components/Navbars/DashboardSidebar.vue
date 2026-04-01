<template>
  <div class="sidebar-root flex flex-col h-full min-h-0 text-slate-100">
    <!-- Brand -->
    <div class="sidebar-brand shrink-0 px-4 py-5 border-b border-slate-700/80">
      <div class="flex items-center gap-3" :class="openSidebar ? '' : 'justify-center'">
        <div class="sidebar-brand-icon shrink-0 w-11 h-11 rounded-xl bg-sky-500/25 border border-sky-400/30 flex items-center justify-center">
          <svg class="w-6 h-6 text-sky-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c0 1 2 3 6 3s6-2 6-3v-5" />
          </svg>
        </div>
        <div v-if="openSidebar" class="min-w-0">
          <p class="text-lg font-bold text-white tracking-tight leading-tight">OSMS</p>
          <p class="text-xs text-slate-400 leading-snug mt-0.5">TESDA Davao de Oro</p>
        </div>
      </div>
    </div>

    <div class="sidebar-scroll flex-1 min-h-0 overflow-y-auto overflow-x-hidden scrollbar py-3 px-2">
      <nav class="space-y-1">
        <template v-for="(i, index) in alldata" :key="i.id">
          <p
            v-if="openSidebar && isFirstUtilityParent(i)"
            class="px-3 pt-4 pb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500"
          >
            Utilities
          </p>

          <div class="rounded-xl" :class="i.show_children == 1 ? 'bg-slate-800/40' : ''">
            <button
              type="button"
              class="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-left transition-colors duration-200"
              :class="[$route.path === i.um_id.link ? parentActiveClass : parentInactiveClass]"
              @click="changePage(i, index)"
            >
              <img
                :src="getImgUrl(i.um_id.profile_pic)"
                class="w-9 h-9 rounded-lg object-cover shrink-0 bg-slate-800 opacity-90"
                :class="openSidebar ? '' : 'mx-auto'"
                alt=""
              />
              <div v-if="openSidebar" class="flex-1 min-w-0 flex items-center gap-1">
                <span class="text-sm font-medium truncate">{{ i.um_id.name }}</span>
                <span v-if="i.children != null" class="text-slate-500 text-xs ml-auto">▾</span>
              </div>
            </button>

            <div
              class="overflow-hidden transition-all duration-200"
              :class="i.show_children == 1 ? 'max-h-[600px] opacity-100 pb-2' : 'max-h-0 opacity-0'"
            >
              <div v-for="i2 in i.children" :key="i2.id" class="pl-2 pr-1">
                <button
                  v-if="i.show_children == 1"
                  type="button"
                  :class="[$route.path === i2.um_id.link ? childActiveClass : childInactiveClass]"
                  class="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm mt-0.5"
                  @click="changePage(i2, index)"
                >
                  <img :src="getImgUrl(i2.um_id.profile_pic)" class="w-7 h-7 rounded-md object-cover shrink-0" alt="" />
                  <span v-if="openSidebar" class="truncate">{{ i2.um_id.name }}</span>
                </button>
              </div>
            </div>
          </div>

          <!-- <div v-if="i.um_id && i.um_id.name === 'Reports' && !menuHasAnalytics()" class="mt-1">
            <button
              type="button"
              :class="[$route.path === '/analytics' ? parentActiveClass : parentInactiveClass]"
              class="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-left transition-colors duration-200"
              @click="$router.push('/analytics')"
            >
              <span class="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 text-xs font-bold shrink-0">A</span>
              <span v-if="openSidebar" class="text-sm font-medium">Analytics</span>
            </button>
          </div> -->
        </template>
      </nav>
    </div>

    <!-- User footer -->
    <div class="shrink-0 sidebar-user-footer border-t border-slate-700/80 p-3">
      <div class="flex items-center gap-3 rounded-xl bg-slate-800/60 px-3 py-2.5 border border-slate-700/50">
        <div class="w-9 h-9 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
          {{ userInitials }}
        </div>
        <div v-if="openSidebar" class="min-w-0 flex-1">
          <p class="text-sm font-semibold text-white truncate">{{ sidebarUserName }}</p>
          <p class="text-xs text-slate-400 truncate">{{ sidebarUserRole }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import * as arrayToTree from 'array-to-tree';

const UTILITY_PARENT_NAMES = ['Billing Types', 'Assign User Type', 'Assign User Menu', 'Utility User Menu', 'Categories', 'Security'];

export default {
  props: {
    openSidebar: Boolean,
  },
  data() {
    return {
      alldata: [],
      parentActiveClass: 'bg-blue-600 text-white shadow-lg shadow-blue-900/40',
      parentInactiveClass: 'text-slate-300 hover:bg-slate-800 hover:text-white',
      childActiveClass: 'bg-slate-700 text-white font-medium',
      childInactiveClass: 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-100',
      padding: ['pl-0', 'pl-4', 'pl-8'],
    };
  },
  computed: {
    sidebarUserName() {
      const u = this.$store.state.user;
      if (!u) return 'User';
      const fn = u.fname || '';
      const ln = u.lname || '';
      const s = `${fn} ${ln}`.trim();
      return s || u.username || 'User';
    },
    sidebarUserRole() {
      const d = this.$store.state.user?.ut_id?.description;
      return d || 'User';
    },
    userInitials() {
      const u = this.$store.state.user;
      if (!u) return 'U';
      const a = (u.fname || '?')[0] || '';
      const b = (u.lname || '?')[0] || '';
      return (a + b).toUpperCase() || 'U';
    },
  },
  methods: {
    isFirstUtilityParent(item) {
      if (!item?.um_id?.name) return false;
      if (!UTILITY_PARENT_NAMES.includes(item.um_id.name)) return false;
      const idx = this.alldata.findIndex((x) => UTILITY_PARENT_NAMES.includes(x.um_id?.name));
      return idx !== -1 && this.alldata[idx].id === item.id;
    },
    changePage(data, index) {
      if (data.children != null) {
        for (let i = 0; i < this.alldata.length; i++) {
          if (this.alldata[i].id == this.alldata[index].id) continue;
          this.alldata[i].show_children = 0;
        }
        if (data.show_children == 0) this.alldata[index].show_children = 1;
        else this.alldata[index].show_children = 0;
      } else {
        if (data.parent_id != 0) this.$router.push({ path: data.um_id.link, params: { name: data.um_id.link } });
        else this.$router.push(data.um_id.link);
      }
    },
    getImgUrl(imagePath) {
      return process.env.VUE_APP_BASE_URL + '/user_menu/get_file/' + imagePath + '/png';
    },
    menuHasAnalytics() {
      const hasAnalyticsInItems = (items) => {
        if (!Array.isArray(items)) return false;
        for (let idx = 0; idx < items.length; idx++) {
          const item = items[idx];
          if (item?.um_id?.name === 'Analytics' || item?.um_id?.link === '/analytics') return true;
          if (item?.children && hasAnalyticsInItems(item.children)) return true;
        }
        return false;
      };
      return hasAnalyticsInItems(this.alldata);
    },
    getAll() {
      axios.get(process.env.VUE_APP_BASE_URL + '/user_type_menu/get_menu/' + this.$store.state.user.ut_id.id).then((res) => {
        if (res.status == 200) {
          this.alldata = [];
          res.data.forEach((para) => {
            if (para.isMenu === 0) return;
            this.alldata.push({
              id: para.id,
              ut_id: para.ut_id,
              um_id: para.um_id,
              datetime_added: para.datetime_added,
              order_num: para.order_num,
              parent_id: para.parent_id,
              position: para.position,
              show_children: 0,
            });
          });
          this.alldata = arrayToTree(this.alldata);
          const itemFilter = (items) =>
            items
              .map((item) => (item.children ? { ...item, children: itemFilter(item.children) } : item))
              .filter((item) => item.position);
          const itemSorter = (items) =>
            items
              .map((item) => (item.children ? { ...item, children: itemSorter(item.children) } : item))
              .sort((i1, i2) => i1.order_num - i2.order_num);
          this.alldata = itemSorter(itemFilter(this.alldata));
        }
      });
    },
    goToProfile() {
      this.$router.push('/profile');
    },
  },
  mounted() {
    this.getAll();
  },
};
</script>

<style scoped>
.sidebar-root {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
}

.sidebar-scroll {
  overscroll-behavior: contain;
}

.scrollbar::-webkit-scrollbar {
  width: 6px;
}
.scrollbar::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.35);
  border-radius: 999px;
}
</style>
