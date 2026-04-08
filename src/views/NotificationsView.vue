<template>
  <div class="min-h-screen bg-gray-50 p-6" ref="notificationContainer" @scroll="handleScroll">

    <!-- Header -->
    <div class="mx-auto mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Notifications</h1>
      <p class="text-sm text-gray-500">Stay updated with your latest activity</p>
    </div>

    <!-- Notification List Card -->
    <div class="mx-auto bg-white shadow rounded-lg border border-gray-200">

      <!-- List -->
      <div
        v-for="item in notifications"
        :key="item.id"
        class="p-4 hover:bg-gray-50 transition flex justify-between items-start cursor-pointer"
        :class="item.is_read === 0 ? 'bg-blue-50' : ''"
      >
        <div class="flex gap-3">
          <!-- Unread dot -->
          <div v-if="item.is_read == 0" class="mt-2 h-2 w-2 rounded-full bg-blue-500"></div>

          <div>
            <p class="font-semibold text-gray-800">{{ item.title }}</p>
            <p class="text-sm text-gray-600 mt-1">{{ item.message }}</p>
            <p class="text-xs text-gray-400 mt-2">{{ getDateTimeFormat(item.datetime_created) }}</p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="ml-4 flex-shrink-0 flex flex-col gap-2">
          <button
            v-if="item.is_read == 0"
            @click.stop="markAsRead(item)"
            class="px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 transition"
          >
            Mark as Read
          </button>

          <button
            @click.stop="openModal(item)"
            class="px-2 py-1 text-xs font-semibold text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition"
          >
            View
          </button>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loadingNotifications" class="p-4 text-center text-gray-400">
        Loading more notifications...
      </div>

      <!-- Empty State -->
      <div v-if="notifications.length === 0 && !loadingNotifications" class="p-10 text-center text-gray-400">
        <div class="text-4xl mb-3">🔔</div>
        <p class="font-medium">No notifications yet</p>
        <p class="text-sm">You're all caught up.</p>
      </div>

      <!-- End -->
      <div v-if="!hasMore && notifications.length > 0" class="p-4 text-center text-gray-400 text-sm">
        No more notifications
      </div>

    </div>

    <!-- Modal Overlay -->
    <div v-if="selectedNotification" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
      <div class="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 p-6 relative z-[1001]">
        <button @click="closeModal" class="absolute top-3 right-3 text-gray-400 hover:text-gray-600">✕</button>

        <h2 class="text-xl font-bold mb-2">{{ selectedNotification.title }}</h2>
        <p class="text-sm text-gray-600 mb-4">{{ selectedNotification.message }}</p>
        <p class="text-xs text-gray-400 mb-4">{{ getDateTimeFormat(selectedNotification.datetime_created) }}</p>

        <div class="text-sm text-gray-700">
          Status: {{ selectedNotification.is_read == 0 ? 'Unread' : 'Read' }}
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  data() {
    return {
      notifications: [],
      page: 1,
      limit: 10,
      hasMore: true,
      loadingNotifications: false,
      selectedNotification: null, // Modal selected notification
    };
  },

  methods: {
    getDateTimeFormat(value) {
      if (!value) return "-";
      const m = moment(value);
      return m.isValid() ? m.fromNow() : "-";
    },

   async markAsRead(notification) {
  if (notification.is_read === 1) return;

  try {
    // Only call backend for private notifications
    if (notification.nr) {
      const new_data = {
        user_id: this.$store.state.user.id,
        notification_id: notification.id,
      };
      await axios.post(
        `${process.env.VUE_APP_BASE_URL}/notifications_recipients/mark_as_read`,
        new_data
      );
    }

    // Mark as read on frontend
    notification.is_read = 1;

    // Save in localStorage for public notifications
    const readPublic = JSON.parse(localStorage.getItem("readPublicNotifications") || "[]");
    if (!notification.nr && !readPublic.includes(notification.id)) {
      readPublic.push(notification.id);
      localStorage.setItem("readPublicNotifications", JSON.stringify(readPublic));
    }
  } catch (e) {
    console.error("Failed to mark notification as read", e);
  }
},

   async getNotifications(reset = false) {
  if (this.loadingNotifications) return;
  if (!this.hasMore && !reset) return;

  try {
    this.loadingNotifications = true;

    if (reset) {
      this.page = 1;
      this.notifications = [];
      this.hasMore = true;
    }

    const res = await axios.get(
      `${process.env.VUE_APP_BASE_URL}/notifications/get_data/${this.page}/${this.limit}/${this.$store.state.user.id}`
    );

    const [rawNotifications] = res.data;

    // Load cached public read notifications
    const readPublic = JSON.parse(localStorage.getItem("readPublicNotifications") || "[]");

    const newData = rawNotifications.map(n => ({
      id: n.id,
      title: n.title,
      message: n.message,
      datetime_created: n.datetime_added,
      is_read: n.nr?.is_read ?? (readPublic.includes(n.id) ? 1 : 0),
      is_private: !!n.nr,
    }));

    if (newData.length < this.limit) this.hasMore = false;

    this.notifications = [...this.notifications, ...newData];
    this.page++;
  } catch (e) {
    console.error(e);
  } finally {
    this.loadingNotifications = false;
  }
},

    handleScroll() {
      const container = this.$refs.notificationContainer;
      if (!container) return;

      const bottomReached = container.scrollTop + container.clientHeight >= container.scrollHeight - 10;
      if (bottomReached) this.getNotifications();
    },

    openModal(notification) {
      this.selectedNotification = notification;
      if (notification.is_read === 0 && notification.is_private) this.markAsRead(notification);
    },

    closeModal() {
      this.selectedNotification = null;
    }
  },

  mounted() {
    this.getNotifications(true);
  }
};
</script>
