<template>
  <div class="billing-record-page flex-auto flex flex-col min-h-0">
    <div class="billing-record-inner">
      <h1 class="billing-page-title animate__slideInUp">Billing Record</h1>

      <div class="billing-top-toolbar animate__slideInUp billing-animate-fill billing-animate-delay-1">
        <div class="billing-controls-stack">
          <div class="billing-tabs-wrap">
            <button
              v-for="tab in statusTabs"
              :key="tab.key"
              type="button"
              class="billing-tab"
              :class="{ 'billing-tab-active': activeTab === tab.key }"
              @click="onStatusTabClick(tab.key)"
            >
              {{ tab.label }}
            </button>
          </div>

          <div class="billing-search-outer">
            <div class="billing-search-wrap">
              <span class="billing-search-icon" aria-hidden="true">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="search"
                class="billing-search-input"
                placeholder="Search billing records..."
                autocomplete="off"
                @input="getAllData($event.target.value, 'search')"
              />
            </div>
          </div>
        </div>

        <div class="billing-pagination-wrap" v-if="billingRows.length > 0 && total_cnt > page_limit">
          <div class="pagination_cmp">
            <vue-awesome-paginate
              :total-items="total_cnt"
              :items-per-page="page_limit"
              v-model="page"
              @click="getAllData(null, null)"
            >
              <template #prev-button>
                <span class="px-2 text-sm">Prev</span>
              </template>
              <template #next-button>
                <span class="px-2 text-sm">Next</span>
              </template>
            </vue-awesome-paginate>
          </div>
        </div>
      </div>

      <div class="billing-table-card animate__slideInUp billing-animate-fill billing-animate-delay-2">
        <div class="billing-table-scroll">
          <table class="billing-table">
            <thead>
              <tr>
                <th scope="col">Training center</th>
                <th scope="col">Control #</th>
                <th scope="col">Batch</th>
                <th scope="col">Qualification</th>
                <th scope="col" class="billing-th-center">Status</th>
                <th scope="col" class="billing-th-center">Next billing</th>
                <th scope="col">Date added</th>
                <th scope="col" class="billing-th-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="billingRows.length === 0">
                <td colspan="8" class="billing-table-empty">
                  There are no files yet.
                </td>
              </tr>
              <tr
                v-for="i in billingRows"
                :key="i.id"
                class="billing-table-row"
              >
                <td class="billing-td-tc">{{ trainingCenterLabel(i) }}</td>
                <td class="billing-td-muted">{{ checkIfEmpty(i.ctrl_num) }}</td>
                <td class="billing-td-muted">{{ checkIfEmpty(i.batch_name) }}</td>
                <td class="billing-td-muted">{{ i.q_id ? i.q_id.description : '-' }}</td>
                <td class="billing-td-center">
                  <span class="billing-status-pill" :class="getStatusPillClass(i.status_id)">
                    {{ getStatus(i.status_id) }}
                  </span>
                </td>
                <td class="billing-td-center billing-td-muted">{{ nextBillingDisplay(i) }}</td>
                <td class="billing-td-muted">{{ getDateShort(i.datetime_added) }}</td>
                <td class="billing-td-actions">
                  <div class="billing-actions">
                    <button
                      type="button"
                      class="billing-icon-btn"
                      aria-label="View record"
                      @click="openModal('view', i.id)"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      class="billing-icon-btn"
                      aria-label="More actions"
                      @click.stop="toggleActionMenu(i.id)"
                    >
                      <svg class="w-5 h-5 billing-icon-ellipsis" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <circle cx="6" cy="12" r="2" />
                        <circle cx="12" cy="12" r="2" />
                        <circle cx="18" cy="12" r="2" />
                      </svg>
                    </button>
                    <div
                      v-if="actionMenuId === i.id"
                      class="billing-actions-popover"
                      @click.stop
                    >
                      <button type="button" class="billing-actions-popover-item" @click="onActionMenuView(i.id)">
                        View details
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div
        v-if="actionMenuId != null"
        class="billing-actions-backdrop"
        @click="actionMenuId = null"
        aria-hidden="true"
      />
    </div>

    <BillingInfoModal
      v-if="show_Modal_View"
      @close-modal="show_Modal_View = false"
      :refreshData="refreshData"
      :showNotification="showNotification"
      :item_data="item_data"
    />
  </div>
</template>

<script>
import BillingInfoModal from '@/components/Modals/BillingInfoModal.vue';
import axios from 'axios';
import moment from 'moment';

export default {
  components: {
    BillingInfoModal,
  },
  mounted() {
    const statusFromQuery = this.$route.query.status;

    if (statusFromQuery) {
      this.activeTab = statusFromQuery;
    } else {
      this.updateStatusQuery(this.activeTab);
    }
    document.addEventListener('keydown', this.onDocKeydown);
    this.refreshData();
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.onDocKeydown);
  },
  props: {
    showNotification: Function,
  },
  data() {
    return {
      activeTab: 'pending',
      statusTabs: [
        { key: 'pending', label: 'Pending' },
        { key: 'approved', label: 'Approved' },
        { key: 'denied', label: 'For Revision' },
        { key: 'completed', label: 'Finished' },
      ],
      isWorkback: null,
      alldata: '',
      page: 1,
      total_cnt: 0,
      total_pages: 0,
      page_limit: 25,
      show_Modal_View: false,
      actionMenuId: null,

      item_data: {
        id: 0,
        isWorkback: null,
      },
    };
  },
  computed: {
    billingRows() {
      return Array.isArray(this.alldata) ? this.alldata : [];
    },
  },
  methods: {
    onDocKeydown(e) {
      if (e.key === 'Escape') this.actionMenuId = null;
    },
    trainingCenterLabel(i) {
      const tc = i?.tc_id;
      if (!tc) return '-';
      return tc.description || tc.abbre || '-';
    },
    getDateShort(value) {
      if (!value) return '—';
      return moment(value).format('MMM D, YYYY');
    },
    getStatusPillClass(val) {
      if (val == 0) return 'billing-status-pending';
      if (val == 1) return 'billing-status-approved';
      if (val == 2) return 'billing-status-revision';
      if (val == 3) return 'billing-status-completed';
      return 'billing-status-pending';
    },
    nextBillingDisplay(i) {
      if (i.current_billing && i.current_billing.status !== 1 && i.current_billing.datetime_due) {
        return this.getDateShort(i.current_billing.datetime_due);
      }
      return '—';
    },
    toggleActionMenu(id) {
      this.actionMenuId = this.actionMenuId === id ? null : id;
    },
    onActionMenuView(id) {
      this.actionMenuId = null;
      this.openModal('view', id);
    },
    refreshData() {
      this.getParamType();
    },
    onStatusTabClick(status) {
      if (this.activeTab === status) return;
      this.actionMenuId = null;
      this.activeTab = status;
      this.updateStatusQuery(status);
      this.getAllData(null, null);
    },

    updateStatusQuery(status) {
      this.$router.push({
        query: {
          ...this.$route.query,
          status,
        },
      });
    },
    getDateFormat(value) {
      return moment(value).format('MMMM DD, YYYY');
    },
    getStatus(val) {
      if (val == 0) return 'Pending';
      if (val == 1) return 'Approved';
      if (val == 2) return 'For Revision';
      if (val == 3) return 'Finished';
      return '-';
    },
    getParamType() {
      this.isWorkback = this.$route.params.isWorkback;
      this.getAllData(null, null);
    },
    getDateTimeFormat(value) {
      return moment(value).format('MMMM DD, YYYY h:mm a');
    },
    checkIfEmpty(val) {
      if (val) return val;
      return '-';
    },
    formatUserName(i) {
      if (i != null) {
        return `${i.lname}, ${i.fname} ${i.mname} ${i.suffix}`;
      }
      return '-';
    },
    openModal(action, id) {
      this.actionMenuId = null;
      this.item_data.action = action;
      this.item_data.id = id;
      this.show_Modal_View = true;
    },
    getAllData(search_value, type) {
      const status_id = (() => {
        if (this.activeTab == 'pending') return 0;
        if (this.activeTab == 'approved') return 1;
        if (this.activeTab == 'denied') return 2;
        if (this.activeTab == 'completed') return 3;
        return null;
      })();

      const params = {};
      if (search_value !== null && search_value !== undefined && type) {
        params.value = search_value;
        params.type = type;
      }

      axios
        .get(
          `${process.env.VUE_APP_BASE_URL}/billing_records/get_all_by_page/${this.page}/${this.page_limit}/${status_id}`,
          { params },
        )
        .then((res) => {
          if (res.status === 200) {
            this.alldata = res.data[0];
            this.total_cnt = res.data[1];
          }
        });
    },
  },
  watch: {
    '$route.query.status'(newStatus) {
      if (newStatus && newStatus !== this.activeTab) {
        this.activeTab = newStatus;
        this.refreshData();
      }
    },
  },
};
</script>

<style scoped>
.billing-record-page {
  background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
}

.billing-record-inner {
  padding: 1.25rem 1.5rem 2rem;
  max-width: 100%;
}

@media (min-width: 1024px) {
  .billing-record-inner {
    padding: 1.5rem 2rem 2.5rem;
  }
}

.billing-page-title {
  margin: 0 0 1.25rem;
  font-size: 1.75rem;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.02em;
}

/* Same motion as Dashboard (global .animate__slideInUp in index.css) */
.billing-animate-fill {
  animation-fill-mode: backwards;
}

.billing-animate-delay-1 {
  animation-delay: 0.06s;
}

.billing-animate-delay-2 {
  animation-delay: 0.12s;
}

.billing-top-toolbar {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

@media (min-width: 768px) {
  .billing-top-toolbar {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  }
}

.billing-controls-stack {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.65rem;
}

.billing-tabs-wrap {
  display: inline-flex;
  flex-wrap: wrap;
  width: fit-content;
  max-width: 100%;
  gap: 0.3rem;
  padding: 0.35rem;
  background: #f3f4f6;
  border-radius: 9999px;
  border: 1px solid #e5e7eb;
  box-shadow: none;
}

.billing-tab {
  flex: 0 0 auto;
  padding: 0.5rem 0.9rem;
  border: none;
  border-radius: 9999px;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #6b7280;
  background: transparent;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
  white-space: nowrap;
}

.billing-tab:hover {
  color: #374151;
  background: rgba(255, 255, 255, 0.7);
}

.billing-tab-active {
  background: #2563eb;
  color: #fff;
  box-shadow: 0 1px 4px rgba(37, 99, 235, 0.35);
}

.billing-tab-active:hover {
  background: #1d4ed8;
  color: #fff;
}

.billing-search-outer {
  width: fit-content;
  max-width: min(100%, 22rem);
}

.billing-search-wrap {
  position: relative;
  width: 100%;
  min-width: 14rem;
}

.billing-search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  pointer-events: none;
  display: flex;
}

.billing-search-input {
  width: 100%;
  padding: 0.6rem 1rem 0.6rem 2.65rem;
  border-radius: 0.65rem;
  border: 1px solid #e5e7eb;
  background: #fff;
  font-size: 0.875rem;
  color: #111827;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
}

.billing-search-input::placeholder {
  color: #9ca3af;
}

.billing-search-input:focus {
  outline: none;
  border-color: #93c5fd;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.billing-pagination-wrap {
  flex-shrink: 0;
}

.billing-table-card {
  background: #fff;
  border-radius: 1rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.06);
  overflow: hidden;
}

.billing-table-scroll {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.billing-table {
  width: 100%;
  min-width: 56rem;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.billing-table thead {
  background: #f9fafb;
}

.billing-table th {
  padding: 0.875rem 1rem;
  text-align: left;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #64748b;
  border-bottom: 1px solid #f1f5f9;
  white-space: nowrap;
}

.billing-th-center {
  text-align: center;
}

.billing-th-right {
  text-align: right;
}

.billing-table tbody tr {
  background: #fff;
}

.billing-table-row:hover {
  background: #fafafa;
}

.billing-table td {
  padding: 1rem;
  vertical-align: middle;
  border-bottom: 1px solid #f1f5f9;
}

.billing-table-empty {
  text-align: center;
  padding: 2.5rem 1rem;
  color: #6b7280;
  font-size: 0.9375rem;
}

.billing-td-tc {
  font-weight: 600;
  color: #1e293b;
  max-width: 14rem;
}

.billing-td-muted {
  color: #64748b;
  font-weight: 400;
}

.billing-td-center {
  text-align: center;
}

.billing-td-actions {
  text-align: right;
  width: 1%;
  white-space: nowrap;
}

.billing-status-pill {
  display: inline-block;
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.billing-status-pending {
  background: #ffedd5;
  color: #c2410c;
}

.billing-status-approved {
  background: #d1fae5;
  color: #047857;
}

.billing-status-revision {
  background: #ffe4e6;
  color: #be123c;
}

.billing-status-completed {
  background: #e0e7ff;
  color: #4338ca;
}

.billing-actions {
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.15rem;
  position: relative;
}

.billing-icon-ellipsis {
  transform: translateY(1px);
}

.billing-icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.35rem;
  border: none;
  border-radius: 0.5rem;
  background: transparent;
  color: #6b7280;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
}

.billing-icon-btn:hover {
  background: #f3f4f6;
  color: #374151;
}

.billing-actions-popover {
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 0.25rem;
  min-width: 9rem;
  padding: 0.35rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.65rem;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.12);
  z-index: 50;
}

.billing-actions-popover-item {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.5rem 0.65rem;
  border: none;
  border-radius: 0.4rem;
  background: transparent;
  font-size: 0.8125rem;
  color: #374151;
  cursor: pointer;
}

.billing-actions-popover-item:hover {
  background: #f3f4f6;
}

.billing-actions-backdrop {
  position: fixed;
  inset: 0;
  z-index: 40;
  background: transparent;
}
</style>
