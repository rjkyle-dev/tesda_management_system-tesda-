<template>
  <div class="flex items-center px-8 py-4 gap-8">
    <div class="flex-none">
      <img @click="this.$parent.openCloseSidebar" src="../../assets/menu.png" class="h-6 w-6 cursor-pointer"/>
    </div>

    <div class="flex-none">
      <p class="font-bold">Welcome, {{ fullname }}</p>
      <div class="flex items-center gap-2">
        <span class="tracking-tight">
          {{ $store.state.user.tc_id ? $store.state.user.tc_id.description : 'TESDA Davao de Oro Provincial Province' }}
        </span> |
        <span>{{ dateTime }}</span> |
        <span>{{ time }}</span>
      </div>
    </div>

    <div class="flex-auto"></div>

    <!-- Notifications Bell -->
    <div class="flex-none relative">
      <div class="relative cursor-pointer" @click="toggleNotifications">
        <img src="../../assets/icon_bell.png" class="h-6 w-6" />
        <span v-if="hasUnreadNotifications" class="absolute -top-1 -right-1 flex h-3 w-3">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
      </div>

      <div 
        v-show="notificationDropdown"
        class="fadeInSlide origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white z-40 border border-gray-200"
      >
        <div class="p-4 border-b font-semibold">Notifications</div>

        <div v-if="notifications.length > 0" class="max-h-80 overflow-y-auto">
          <div 
            v-for="i in notifications" 
            :key="i.id"
            class="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b"
          >
            <p class="text-sm font-medium">{{ i.title }}</p>
            <p class="text-xs text-gray-500">{{ i.message }}</p>
            <p class="text-xs text-gray-400 mt-1">{{ getDateTimeFormat(i.datetime_created) }}</p>
            <span v-if="i.is_read === 0" class="text-red-500 text-xs">Unread</span>
          </div>

          <div @click="goToNotifications" class="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b text-sm">
            Show all notifications
          </div>
        </div>

        <div v-else class="p-6 text-center text-gray-500 text-sm">
          No notifications yet
        </div>
      </div>
    </div>

    <!-- User Profile -->
    <div class="flex-none relative">
      <button @click="showProfileDropDown()" type="button" class="duration-300 max-w-xs bg-none flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
        <span class="sr-only">Open user menu</span>
        <div class="hidden flex-col sm:flex sm:flex-row items-center text-left pr-4">
          <div class="flex items-center gap-4">
            <img :src="profilePreview" class="h-8 w-8 rounded-full object-cover"/>
            <p class="uppercase font-bold">{{ fullname }}</p>
          </div>
        </div>
      </button>

      <div v-show="profileDropdown" class="fadeInSlide origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white z-40" role="menu">
        <router-link @click="profileDropdown = false" to="/profile" class="block px-4 py-2 text-sm text-gray-700">Your Profile</router-link>
        <router-link @click="profileDropdown = false" to="/security" class="block px-4 py-2 text-sm text-gray-700">Settings</router-link>
        <b @click="logoutAccount()" class="block px-4 py-2 text-sm text-red-700 hover:cursor-pointer">Log out</b>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import axios from 'axios';

export default {
  data() {
    return {
      data: null,
      profilePreview: null,
      fullname: null,
      dateTime: '',
      interval: null,
      time: '00:00:00 AA', 
      profileDropdown: false,
      notificationDropdown: false,
      notifications: [],
      totalNotifications: 0,
      page: 1,
      limit: 5,
    };
  },
  computed: {
    hasUnreadNotifications() {
      return this.notifications.some(n => Number(n.is_read) === 0);
    }
  },
  methods: {
    goToNotifications() {
      this.$router.replace('/notifications');
    },
    toggleNotifications() {
      this.notificationDropdown = !this.notificationDropdown;
      if (this.notificationDropdown) this.profileDropdown = false;
    },
    showProfileDropDown() {
      if (this.notificationDropdown) this.notificationDropdown = false;
      this.profileDropdown = !this.profileDropdown;
    },
    getDateTimeFormat(value) {
      if (!value) return "-";
      const m = moment(value);
      return m.isValid() ? m.fromNow() : "-";
    },
    getDateTime() {
      const today = new Date();
      this.dateTime = moment(today).format('MMMM DD, YYYY');
      this.interval = setInterval(() => {
        this.time = Intl.DateTimeFormat(navigator.language, { hour: 'numeric', minute: 'numeric', second: 'numeric' }).format();
      }, 1000);
    },
    async logoutAccount() {
      localStorage.removeItem('token');
      localStorage.clear();
      this.$router.push('/');
    },
    getImage() {
      return `${process.env.VUE_APP_BASE_URL}/user/get_img/${this.$store.state.user.profile_pic}/img`;
    },
    async getUserInfo() {
      try {
        const res = await axios.get(`${process.env.VUE_APP_BASE_URL}/user/find_user/${this.$store.state.user.id}`);
        if (res.status === 200) {
          this.data = res.data;
          this.fullname = `${this.data.user_profile.fname} ${this.data.user_profile.lname}`;
          this.profilePreview = this.data.profile_pic ? `${process.env.VUE_APP_BASE_URL}/user/get_img/${this.data.profile_pic}/img` : null;
          await this.getNotifications();
        }
      } catch (e) {
        console.error(e);
      }
    },
    async getNotifications() {
  try {
    const res = await axios.get(
      `${process.env.VUE_APP_BASE_URL}/notifications/get_data/${this.page}/${this.limit}/${this.$store.state.user.id}`
    );

    if (res.status === 200) {
      const [rawNotifications, totalCount] = res.data;

      const newNotifications = rawNotifications.map(n => ({
        id: n.id,
        title: n.title,
        message: n.message,
        datetime_created: n.datetime_added,
        is_read: n.nr?.is_read ?? 0, // depends on join alias
      }));

      this.notifications = newNotifications;
      this.totalNotifications = totalCount;
    } else {
      this.notifications = [];
      this.totalNotifications = 0;
    }
  } catch (e) {
    console.error(e);
    this.notifications = [];
    this.totalNotifications = 0;
  }
},
  },
  mounted() {
    this.getDateTime();
    this.getUserInfo();
  }
};
</script>
