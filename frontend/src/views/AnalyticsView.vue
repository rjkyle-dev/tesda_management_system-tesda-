<template>
  <div class="analytics-page p-5 h-full overflow-y-auto">
    <div class="analytics-hero rounded-xl p-5 mb-4">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 class="text-2xl font-semibold text-white">Descriptive Analytics</h1>
          <p class="text-white text-opacity-90 text-sm mt-1">
            Budget utilization and billing submission trends across training centers.
          </p>
        </div>
        <div
          v-show="$store.state.user.ut_id.description == 'Admin'"
          class="bg-white bg-opacity-20 rounded-lg px-3 py-2 self-start md:self-auto"
        >
          <label class="text-xs text-white text-opacity-90 mr-2">Fiscal year</label>
          <select v-model="selectedFiscalYear" class="rounded-md text-gray-800 px-2 py-1 text-sm">
            <option v-for="fy in years" :key="fy" :value="fy">
              {{ fy }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <div class="metric-card">
        <p class="metric-label">Training Centers</p>
        <p class="metric-value">{{ stats.total_tc }}</p>
      </div>
      <div class="metric-card">
        <p class="metric-label">Qualifications</p>
        <p class="metric-value">{{ stats.total_q }}</p>
      </div>
      <div class="metric-card">
        <p class="metric-label">Avg Budget Utilization</p>
        <p class="metric-value">{{ avgBURDisplay }}%</p>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm p-4 mb-4">
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-base font-semibold text-gray-800">Line Chart: Performance by Training Center</h2>
        <div class="text-xs text-gray-500">Blue: Budget Utilization Rate (%) | Green: Billing Submission Compliance Rate (%)</div>
      </div>

      <svg v-if="chartPoints.length" viewBox="0 0 1000 360" class="w-full h-72">
        <line x1="70" y1="40" x2="70" y2="300" stroke="#CBD5E1" stroke-width="2" />
        <line x1="70" y1="300" x2="950" y2="300" stroke="#CBD5E1" stroke-width="2" />

        <line
          v-for="tick in [0, 25, 50, 75, 100]"
          :key="'tick-' + tick"
          :x1="70"
          :x2="950"
          :y1="valueToY(tick)"
          :y2="valueToY(tick)"
          stroke="#EEF2FF"
          stroke-width="1"
        />
        <text
          v-for="tick in [0, 25, 50, 75, 100]"
          :key="'tick-text-' + tick"
          x="55"
          :y="valueToY(tick) + 4"
          text-anchor="end"
          class="fill-gray-500 text-[11px]"
        >
          {{ tick }}%
        </text>

        <polyline
          :points="burLinePoints"
          fill="none"
          stroke="#3B82F6"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <polyline
          :points="wpsLinePoints"
          fill="none"
          stroke="#10B981"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />

        <g v-for="point in chartPoints" :key="'bur-' + point.id">
          <circle :cx="point.x" :cy="point.burY" r="4" fill="#3B82F6" />
        </g>
        <g v-for="point in chartPoints" :key="'wps-' + point.id">
          <circle :cx="point.x" :cy="point.wpsY" r="4" fill="#10B981" />
        </g>

        <text
          v-for="(point, index) in chartPoints"
          :key="'label-' + point.id"
          :x="point.x"
          y="322"
          text-anchor="middle"
          class="fill-gray-500 text-[10px]"
        >
          {{ index + 1 }}
        </text>
      </svg>

      <div v-else class="text-sm text-gray-500 py-10 text-center">
        No analytics data available.
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm p-4">
      <h2 class="text-base font-semibold text-gray-800 mb-3">Training Center Analytics Table</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead>
            <tr class="bg-gray-50 text-gray-600">
              <th class="px-3 py-2 text-left w-14">Rank</th>
              <th class="px-3 py-2 text-center w-16">Logo</th>
              <th class="px-3 py-2 text-left">Training Center</th>
              <th class="px-3 py-2 text-left">Budget Utilization Rate</th>
              <th class="px-3 py-2 text-left">Billing Submission Compliance</th>
              <th class="px-3 py-2 text-left">Weighted Performance Score</th>
              <th class="px-3 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in trainingCenterTableRowsRanked"
              :key="item.logoKey || item.abbre || index"
              class="border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition-colors"
              @click="openTrainingCenterModal(item)"
            >
              <td class="px-3 py-2 text-gray-800 font-semibold tabular-nums">
                <span :class="['rank-pill', item.rank === 1 ? 'rank-pill--gold' : '', item.rank === 2 ? 'rank-pill--silver' : '', item.rank === 3 ? 'rank-pill--bronze' : '']">
                  {{ item.rank }}
                </span>
              </td>
              <td class="px-3 py-2 text-center">
                <div
                  class="tc-logo mx-auto"
                  :style="{ background: tcLogoGradient(item.id) }"
                  :title="item.abbre || item.trainingCenter"
                >
                  <span class="tc-logo-initials">{{ tcLogoInitials(item) }}</span>
                </div>
              </td>
              <td class="px-3 py-2 font-medium text-gray-800">
                <span class="block">{{ item.trainingCenter }}</span>
                <span v-if="item.abbre" class="text-xs text-gray-500 font-normal">{{ item.abbre }}</span>
              </td>
              <td class="px-3 py-2 text-gray-700 tabular-nums">{{ formatBurPercent(item.BUR) }}</td>
              <td class="px-3 py-2 text-gray-700 tabular-nums">{{ formatBscPercent(item.BSC) }}</td>
              <td class="px-3 py-2 text-gray-800 font-medium tabular-nums">{{ formatWps(item.WPS) }}</td>
              <td class="px-3 py-2">
                <span :class="['status-badge', getStatusClass(item)]">{{ getStatus(item) }}</span>
              </td>
            </tr>
            <tr v-if="!trainingCenterTableRowsRanked.length">
              <td colspan="7" class="px-3 py-8 text-center text-gray-500">
                <span v-if="!stats.list_tc.length">No performance evaluation data for this fiscal year (same source as Dashboard PE chart).</span>
                <span v-else>No rows to display.</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div
      v-if="isTrainingCenterModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-60"
      @click.self="closeTrainingCenterModal"
    >
      <div class="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div class="modal-header px-5 py-4 flex items-start justify-between">
          <div>
            <p class="text-xs uppercase tracking-wider text-white text-opacity-85">Training Center Insight</p>
            <h3 class="text-xl font-semibold text-white">{{ selectedTrainingCenter?.trainingCenter }}</h3>
          </div>
          <button
            class="text-white hover:text-gray-200 text-2xl leading-none px-2"
            @click="closeTrainingCenterModal"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <div class="p-5">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            <div class="modal-stat">
              <p class="modal-stat-label">Budget Utilization Rate</p>
              <p class="modal-stat-value tabular-nums">{{ selectedTrainingCenter ? formatBurPercent(selectedTrainingCenter.BUR) : '0.00%' }}</p>
            </div>
            <div class="modal-stat">
              <p class="modal-stat-label">Billing Submission Compliance Rate</p>
              <p class="modal-stat-value tabular-nums">{{ selectedTrainingCenter ? formatBscPercent(selectedTrainingCenter.BSC) : '0.00%' }}</p>
            </div>
            <div class="modal-stat">
              <p class="modal-stat-label">Weighted Performance Score</p>
              <p class="modal-stat-value tabular-nums">{{ selectedTrainingCenter ? formatWps(selectedTrainingCenter.WPS) : '0.000' }}</p>
            </div>
            <div class="modal-stat">
              <p class="modal-stat-label">Overall Status</p>
              <p class="modal-stat-value text-base">
                <span :class="['status-badge', selectedTrainingCenter ? getStatusClass(selectedTrainingCenter) : 'status-critical']">
                  {{ selectedTrainingCenter ? getStatus(selectedTrainingCenter) : 'N/A' }}
                </span>
              </p>
            </div>
          </div>

          <!-- <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="insight-card">
              <p class="insight-title">Budget Utilization Insight</p>
              <p v-if="loadingInsights" class="insight-description">Loading insight...</p>
              <p v-else class="insight-description">{{ selectedInsights.bur || 'No insight description found for this score.' }}</p>
            </div>

            <div class="insight-card">
              <p class="insight-title">Billing Submission Insight</p>
              <p v-if="loadingInsights" class="insight-description">Loading insight...</p>
              <p v-else class="insight-description">{{ selectedInsights.bsc || 'No insight description found for this score.' }}</p>
            </div>
          </div> -->

          <div class="mt-4 insight-card">
            <div class="flex items-center justify-between gap-2 mb-2">
              <div>
                <p class="insight-title mb-0">Insights for this training center</p>
                <p class="text-xs text-slate-500 mt-1">
                  Rows from <code class="bg-slate-100 px-1 rounded">insights</code> matched to this center’s scores (Budget Utilization for Training Centers &amp; Billing Submission Compliance).
                </p>
              </div>
              <span v-if="loadingInsightsTable" class="text-xs text-slate-500 shrink-0">Loading…</span>
            </div>
            <p v-if="insightsTableError" class="text-xs text-red-600 mb-2">{{ insightsTableError }}</p>
            <div class="overflow-x-auto max-h-72">
              <table class="min-w-full text-xs">
                <thead>
                  <tr class="bg-slate-100 text-slate-700">
                    <th class="px-2 py-2 text-left">ID</th>
                    <th class="px-2 py-2 text-left">Report Name</th>
                    <th class="px-2 py-2 text-left">From Score</th>
                    <th class="px-2 py-2 text-left">To Score</th>
                    <th class="px-2 py-2 text-left">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(insight, idx) in modalInsightRows"
                    :key="insight.id != null ? insight.id : 'ins-' + idx"
                    class="border-b border-slate-100"
                  >
                    <td class="px-2 py-2 whitespace-nowrap">{{ insight.id }}</td>
                    <td class="px-2 py-2">{{ insight.report_name }}</td>
                    <td class="px-2 py-2 whitespace-nowrap">{{ insight.from_score }}</td>
                    <td class="px-2 py-2 whitespace-nowrap">{{ insight.to_score }}</td>
                    <td class="px-2 py-2">{{ insight.description }}</td>
                  </tr>
                  <tr v-if="!loadingInsightsTable && !modalInsightRows.length">
                    <td colspan="5" class="px-2 py-4 text-center text-slate-500">
                      No matching insight rows for this center’s current metrics.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedFiscalYear: '',
      years: [],
      stats: {
        total_tc: 0,
        total_q: 0,
        list_tc: [],
        training_centers: [],
      },
      isTrainingCenterModalOpen: false,
      selectedTrainingCenter: null,
      selectedInsights: {
        bur: '',
        bsc: '',
      },
      loadingInsights: false,
      loadingInsightsTable: false,
      insightsTableError: null,
      modalInsightRows: [],
    };
  },
  computed: {
    avgBUR() {
      if (!this.stats.list_tc.length) return 0;
      const total = this.stats.list_tc.reduce((sum, item) => sum + Number(item.BUR || 0), 0);
      return total / this.stats.list_tc.length;
    },
    avgBURDisplay() {
      return this.avgBUR.toFixed(2);
    },
    chartPoints() {
      if (!this.stats.list_tc.length) return [];
      const count = this.stats.list_tc.length;
      const spacing = count > 1 ? 880 / (count - 1) : 0;
      return this.stats.list_tc.map((item, index) => {
        const x = 70 + index * spacing;
        const bur = this.dashboardRatePercent(item.BUR);
        const bsc = this.dashboardRatePercent(item.BSC);
        return {
          id: item.trainingCenter || index,
          x,
          burY: this.valueToY(bur),
          wpsY: this.valueToY(bsc),
        };
      });
    },
    burLinePoints() {
      return this.chartPoints.map((point) => `${point.x},${point.burY}`).join(' ');
    },
    wpsLinePoints() {
      return this.chartPoints.map((point) => `${point.x},${point.wpsY}`).join(' ');
    },
    /**
     * Same data as Dashboard Performance Evaluation: rows come from GET performance_scores/:fiscal_yr
     * (trainingCenter = tc abbreviation from API). Enrich with master list for id & full description.
     */
    trainingCenterTableRows() {
      if (!this.stats.list_tc.length) return [];

      const centerByAbbre = {};
      this.stats.training_centers.forEach((c) => {
        const k = this.normalizeName(c.abbre);
        if (k) centerByAbbre[k] = c;
      });

      return this.stats.list_tc.map((row) => {
        const abbre = String(row.trainingCenter ?? '').trim();
        const ky = this.normalizeName(abbre);
        const center = centerByAbbre[ky] || {};
        const centerName = (center.description || center.name || abbre || '—').trim();
        return {
          id: center.id != null ? center.id : null,
          logoKey: center.id != null ? center.id : abbre || ky,
          abbre,
          trainingCenter: centerName,
          BUR: Number(row.BUR ?? 0),
          BSC: Number(row.BSC ?? 0),
          WPS: Number(row.WPS ?? 0),
        };
      });
    },
    trainingCenterTableRowsRanked() {
      const rows = [...this.trainingCenterTableRows];
      rows.sort((a, b) => {
        const wpsB = this.numericWpsForRank(b.WPS);
        const wpsA = this.numericWpsForRank(a.WPS);
        return wpsB - wpsA;
      });
      return rows.map((row, idx) => ({
        ...row,
        rank: idx + 1,
      }));
    },
  },
  watch: {
    selectedFiscalYear() {
      this.getStats();
    },
  },
  created() {
    const currentYear = new Date().getFullYear();
    const startYear = 2020;
    const endYear = currentYear + 1;
    this.years = [];
    for (let y = endYear; y >= startYear + 1; y--) {
      this.years.push(`${y - 1}-${y}`);
    }
    this.selectedFiscalYear = this.years[0] || `${currentYear}-${currentYear + 1}`;
    this.getStats();
  },
  methods: {
    async getStats() {
      await Promise.allSettled([
        this.getCounts(),
        this.getTrainingCenters(),
        this.getTrainingCenterMasterList(),
      ]);
    },
    async getCounts() {
      try {
        const [tcRes, qRes] = await Promise.all([
          axios.get(process.env.VUE_APP_BASE_URL + '/training_centers/get_count/'),
          axios.get(process.env.VUE_APP_BASE_URL + '/qualifications/get_count/'),
        ]);
        if (tcRes.status === 200) this.stats.total_tc = tcRes.data.total_cnt;
        if (qRes.status === 200) this.stats.total_q = qRes.data.total_cnt;
      } catch (error) {
        console.error('Failed to load analytics counts:', error);
      }
    },
    async getTrainingCenters() {
      const fiscalYear = this.selectedFiscalYear || `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`;
      try {
        const res = await axios.get(
          `${process.env.VUE_APP_BASE_URL}/billing_periods/performance_scores/${fiscalYear}`,
        );
        if (res.status === 200) {
          this.stats.list_tc = Array.isArray(res.data) ? res.data : [];
          return;
        }
      } catch (error) {
        console.error('performance_scores fetch failed:', error);
        try {
          const fallbackRes = await axios.get(
            `${process.env.VUE_APP_BASE_URL}/billing_periods/performance_scores_by_tc/${fiscalYear}`,
          );
          if (fallbackRes.status === 200) {
            this.stats.list_tc = Array.isArray(fallbackRes.data) ? fallbackRes.data : [];
            return;
          }
        } catch (fallbackError) {
          console.error('Fallback performance_scores_by_tc failed:', fallbackError);
        }
      }
      this.stats.list_tc = [];
    },
    async getTrainingCenterMasterList() {
      try {
        const res = await axios.get(process.env.VUE_APP_BASE_URL + '/training_centers/get_all');
        if (res.status === 200) {
          this.stats.training_centers = Array.isArray(res.data) ? res.data : [];
          return;
        }
      } catch (error) {
        console.error('Failed to load training centers master list:', error);
      }
      this.stats.training_centers = [];
    },
    normalizeName(value) {
      return String(value || '').trim().toLowerCase();
    },
    async openTrainingCenterModal(item) {
      this.selectedTrainingCenter = item;
      this.isTrainingCenterModalOpen = true;
      this.insightsTableError = null;
      this.modalInsightRows = [];
      await this.loadInsightsForTrainingCenter(item);
    },
    closeTrainingCenterModal() {
      this.isTrainingCenterModalOpen = false;
      this.selectedTrainingCenter = null;
      this.selectedInsights = { bur: '', bsc: '' };
      this.modalInsightRows = [];
      this.loadingInsights = false;
      this.loadingInsightsTable = false;
    },
    async loadInsightsForTrainingCenter(item) {
      this.loadingInsights = true;
      this.loadingInsightsTable = true;
      this.insightsTableError = null;
      this.selectedInsights = { bur: '', bsc: '' };
      this.modalInsightRows = [];

      const burScore = this.toInsightScore(item.BUR);
      const bscScore = this.toInsightScore(item.BSC);
      const wpsRaw = Number(item.WPS ?? 0);
      const wpsScore = wpsRaw > 1 ? Number((wpsRaw / 100).toFixed(4)) : Number(wpsRaw.toFixed(4));

      try {
        const [burRow, bscRow, wpsRow] = await Promise.all([
          this.fetchInsightRecord(burScore, 'Budget Utilization Rate for Training Centers'),
          this.fetchInsightRecord(bscScore, 'Billing Submission Compliance'),
          wpsRaw > 0
            ? this.fetchInsightRecord(wpsScore, 'Weighted Performance Score')
            : Promise.resolve(null),
        ]);

        this.selectedInsights.bur = burRow?.description ?? '';
        this.selectedInsights.bsc = bscRow?.description ?? '';

        const rows = [burRow, bscRow, wpsRow].filter(Boolean);
        const seen = new Set();
        this.modalInsightRows = rows.filter((r) => {
          const key = r.id != null ? `id:${r.id}` : `${r.report_name}|${r.from_score}|${r.to_score}`;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
      } catch (error) {
        console.error('Failed to load insights for training center:', error);
        this.insightsTableError = 'Could not load insight records. Check API /insights/find_description/…';
      } finally {
        this.loadingInsights = false;
        this.loadingInsightsTable = false;
      }
    },
    async fetchInsightRecord(score, reportName) {
      const encodedReport = encodeURIComponent(reportName);
      try {
        const res = await axios.get(
          `${process.env.VUE_APP_BASE_URL}/insights/find_description/${score}/${encodedReport}`,
        );
        if (res.status === 200 && res.data && typeof res.data === 'object') {
          return this.normalizeInsightRow(res.data);
        }
      } catch (error) {
        console.error(`find_description failed for ${reportName}:`, error);
      }
      return null;
    },
    normalizeInsightRow(row) {
      if (!row || typeof row !== 'object') return null;
      const id = row.id;
      const from_score = row.from_score ?? row.fromScore;
      const to_score = row.to_score ?? row.toScore;
      const description = row.description;
      const report_name = row.report_name ?? row.reportName;
      if (description === undefined && report_name === undefined) return null;
      return {
        id,
        from_score,
        to_score,
        description: description ?? '',
        report_name: report_name ?? '',
      };
    },
    toInsightScore(value) {
      const numeric = Number(value || 0);
      if (numeric > 1) return Number((numeric / 100).toFixed(4));
      return Number(numeric.toFixed(4));
    },
    toPercent(value) {
      return Number(value || 0) * 100;
    },
    /** Values from `/billing_periods/performance_scores/` (Dashboard PE): BUR & BSC are 0–100; fallback legacy 0–1 ratios. */
    dashboardRatePercent(value) {
      const n = Number(value || 0);
      return n > 1 ? n : n * 100;
    },
    formatBurPercent(value) {
      return `${this.dashboardRatePercent(value).toFixed(2)}%`;
    },
    formatBscPercent(value) {
      return `${this.dashboardRatePercent(value).toFixed(2)}%`;
    },
    formatWps(value) {
      const n = Number(value ?? 0);
      const wps = n > 1 ? n / 100 : n;
      return wps.toFixed(3);
    },
    formatPercent(value) {
      return this.toPercent(value).toFixed(2);
    },
    valueToY(value) {
      const minY = 40;
      const maxY = 300;
      const bounded = Math.max(0, Math.min(100, value));
      return maxY - ((bounded / 100) * (maxY - minY));
    },
    getStatus(item) {
      const bur = this.dashboardRatePercent(item.BUR);
      const bsc = this.dashboardRatePercent(item.BSC);
      if (bur >= 85 && bsc >= 85) return 'Excellent';
      if (bur >= 70 && bsc >= 70) return 'Good';
      if (bur >= 50 && bsc >= 50) return 'Needs Attention';
      return 'Critical';
    },
    getStatusClass(item) {
      const status = this.getStatus(item);
      if (status === 'Excellent') return 'status-excellent';
      if (status === 'Good') return 'status-good';
      if (status === 'Needs Attention') return 'status-attention';
      return 'status-critical';
    },
    /** WPS from API is 0–1 (e.g. 0.983); normalize for descending rank sort. */
    numericWpsForRank(wps) {
      const n = Number(wps ?? 0);
      return n > 1 ? n / 100 : n;
    },
    tcLogoInitials(item) {
      const raw = (item.abbre || item.trainingCenter || 'TC').trim();
      const parts = raw.split(/\s+/).filter(Boolean);
      if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return raw.slice(0, 2).toUpperCase() || 'TC';
    },
    tcLogoGradient(key) {
      let n = Number(key);
      if (Number.isNaN(n) || n === 0) {
        n = String(key || '')
          .split('')
          .reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
      }
      const pairs = [
        ['#1d4ed8', '#0ea5e9'],
        ['#7c3aed', '#a855f7'],
        ['#059669', '#34d399'],
        ['#c2410c', '#f97316'],
        ['#be185d', '#ec4899'],
        ['#0f766e', '#14b8a6'],
      ];
      const [a, b] = pairs[n % pairs.length];
      return `linear-gradient(145deg, ${a}, ${b})`;
    },
  },
};
</script>

<style scoped>
.analytics-page {
  background: linear-gradient(180deg, #f5f7ff 0%, #eef8ff 100%);
}

.analytics-hero {
  background: linear-gradient(120deg, #1e3a8a 0%, #2563eb 45%, #06b6d4 100%);
}

.metric-card {
  background: #ffffff;
  border-radius: 0.75rem;
  padding: 1rem;
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.08);
}

.metric-label {
  color: #64748b;
  font-size: 0.8rem;
}

.metric-value {
  color: #0f172a;
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 0.2rem;
}

.status-badge {
  font-size: 0.75rem;
  padding: 0.2rem 0.55rem;
  border-radius: 9999px;
  font-weight: 600;
}

.status-excellent {
  background: #dcfce7;
  color: #166534;
}

.status-good {
  background: #dbeafe;
  color: #1d4ed8;
}

.status-attention {
  background: #fef3c7;
  color: #92400e;
}

.status-critical {
  background: #fee2e2;
  color: #991b1b;
}

.modal-header {
  background: linear-gradient(120deg, #1e40af 0%, #2563eb 55%, #0891b2 100%);
}

.modal-stat {
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 0.75rem;
  background: #f8fbff;
}

.modal-stat-label {
  color: #64748b;
  font-size: 0.75rem;
}

.modal-stat-value {
  color: #0f172a;
  font-size: 1.25rem;
  font-weight: 700;
  margin-top: 0.25rem;
}

.insight-card {
  border-radius: 0.75rem;
  padding: 0.9rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
}

.insight-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 0.45rem;
}

.insight-description {
  font-size: 0.85rem;
  color: #334155;
  line-height: 1.5;
}

.tc-logo {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.65rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.12);
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.tc-logo-initials {
  font-size: 0.7rem;
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.02em;
  line-height: 1;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
}

.rank-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.75rem;
  height: 1.75rem;
  padding: 0 0.35rem;
  border-radius: 9999px;
  background: #e2e8f0;
  color: #475569;
  font-size: 0.8rem;
}

.rank-pill--gold {
  background: linear-gradient(145deg, #fcd34d, #f59e0b);
  color: #78350f;
}

.rank-pill--silver {
  background: linear-gradient(145deg, #e2e8f0, #94a3b8);
  color: #1e293b;
}

.rank-pill--bronze {
  background: linear-gradient(145deg, #fdba74, #ea580c);
  color: #431407;
}
</style>