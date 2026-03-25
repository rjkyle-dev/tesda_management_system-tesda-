<template>
  <div class="flex items-center px-4 sm:px-6 lg:px-8 py-3.5 gap-4 lg:gap-6">
    <div class="flex-none">
      <button
        type="button"
        class="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
        aria-label="Toggle menu"
        @click="$parent.openCloseSidebar"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>

    <div class="flex-none min-w-0 max-w-[min(100%,28rem)]">
      <p class="text-base sm:text-lg font-semibold text-slate-900 truncate">
        Welcome, {{ fullname || '…' }}
      </p>
      <p class="text-xs sm:text-sm text-slate-500 mt-0.5 truncate">
        {{ provinceLine }}
        <span class="text-slate-300 mx-1">·</span>
        <span class="tabular-nums">{{ dateTime }}</span>
        <span class="text-slate-300 mx-1">·</span>
        <span class="tabular-nums">{{ time }}</span>
      </p>
    </div>

    <div class="flex-auto" />

    <div class="flex-none relative">
      <button
        type="button"
        class="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
        aria-label="Notifications"
        @click="toggleNotifications"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        <span v-if="hasUnreadNotifications" class="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border border-white" />
        </span>
      </button>

      <div
        v-show="notificationDropdown"
        class="fadeInSlide origin-top-right absolute right-0 mt-2 w-80 rounded-xl shadow-xl bg-white z-40 border border-slate-200 overflow-hidden"
      >
        <div class="px-4 py-3 border-b border-slate-100 font-semibold text-slate-900 text-sm">Notifications</div>
        <div v-if="notifications.length > 0" class="max-h-80 overflow-y-auto">
          <div
            v-for="i in notifications"
            :key="i.id"
            class="px-4 py-3 hover:bg-slate-50 cursor-pointer border-b border-slate-50"
          >
            <p class="text-sm font-medium text-slate-800">{{ i.title }}</p>
            <p class="text-xs text-slate-500">{{ i.message }}</p>
            <p class="text-xs text-slate-400 mt-1">{{ getDateTimeFormat(i.datetime_created) }}</p>
            <span v-if="i.is_read === 0" class="text-red-600 text-xs font-medium">Unread</span>
          </div>
          <div class="px-4 py-3 hover:bg-slate-50 cursor-pointer text-sm text-blue-600 font-medium" @click="goToNotifications">
            Show all notifications
          </div>
        </div>
        <div v-else class="p-6 text-center text-slate-500 text-sm">No notifications yet</div>
      </div>
    </div>

    <div class="flex-none relative">
      <button
        type="button"
        class="flex items-center gap-2 pl-1 pr-3 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-sm"
        @click="showProfileDropDown()"
      >
        <span class="sr-only">Open user menu</span>
        <img
          v-if="profilePreview"
          :src="profilePreview"
          class="h-9 w-9 rounded-full object-cover ring-2 ring-slate-100"
          alt=""
        />
        <div
          v-else
          class="h-9 w-9 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold"
        >
          {{ profileInitials }}
        </div>
        <span class="hidden sm:inline text-sm font-semibold text-slate-800 max-w-[7rem] truncate">
          {{ shortRoleLabel }}
        </span>
        <svg class="w-4 h-4 text-slate-400 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        v-show="profileDropdown"
        class="fadeInSlide origin-top-right absolute right-0 mt-2 w-52 rounded-xl shadow-xl py-1.5 bg-white z-40 border border-slate-200"
        role="menu"
      >
        <router-link
          class="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
          to="/profile"
          @click="profileDropdown = false"
          >Your Profile</router-link
        >
        <router-link
          class="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
          to="/security"
          @click="profileDropdown = false"
          >Settings</router-link
        >
        <button type="button" class="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50" @click="logoutAccount()">
          Log out
        </button>
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
      time: '',
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
      return this.notifications.some((n) => Number(n.is_read) === 0);
    },
    provinceLine() {
      const tc = this.$store.state.user?.tc_id?.description;
      return tc || 'TESDA Davao de Oro Provincial Province';
    },
    shortRoleLabel() {
      const d = this.$store.state.user?.ut_id?.description;
      if (d === 'Admin') return 'Admin';
      return d || 'Account';
    },
    profileInitials() {
      const u = this.$store.state.user;
      if (!u) return 'U';
      const a = (u.fname || '?')[0];
      const b = (u.lname || '?')[0];
      return (a + b).toUpperCase();
    },
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
      if (!value) return '-';
      const m = moment(value);
      return m.isValid() ? m.fromNow() : '-';
    },
    getDateTime() {
      const today = new Date();
      this.dateTime = moment(today).format('MMMM DD, YYYY');
      this.interval = setInterval(() => {
        this.time = Intl.DateTimeFormat(navigator.language, {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: true,
        }).format();
      }, 1000);
    },
    async logoutAccount() {
      localStorage.removeItem('token');
      localStorage.clear();
      this.$router.push('/');
    },
    async getUserInfo() {
      try {
        const res = await axios.get(`${process.env.VUE_APP_BASE_URL}/user/find_user/${this.$store.state.user.id}`);
        if (res.status === 200) {
          this.data = res.data;
          this.fullname = `${this.data.user_profile.fname} ${this.data.user_profile.lname}`;
          this.profilePreview = this.data.profile_pic
            ? `${process.env.VUE_APP_BASE_URL}/user/get_img/${this.data.profile_pic}/img`
            : null;
          await this.getNotifications();
        }
      } catch (e) {
        console.error(e);
      }
    },
    async getNotifications() {
      try {
        const res = await axios.get(
          `${process.env.VUE_APP_BASE_URL}/notifications/get_data/${this.page}/${this.limit}/${this.$store.state.user.id}`,
        );
        if (res.status === 200) {
          const [rawNotifications, totalCount] = res.data;
          this.notifications = rawNotifications.map((n) => ({
            id: n.id,
            title: n.title,
            message: n.message,
            datetime_created: n.datetime_added,
            is_read: n.nr?.is_read ?? 0,
          }));
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
  },
};
</script>
