<template>
  <div class="analytics-page p-5 h-full overflow-y-auto page-anim">
    <div class="analytics-header mb-4">
      <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
        <div class="min-w-0">
          <div class="flex items-center gap-2">
            <span class="header-mark" aria-hidden="true"></span>
            <h1 class="text-2xl font-semibold text-slate-900">Descriptive Analytics</h1>
          </div>
          <p class="text-slate-500 text-sm mt-1">
            Statistical overview of scholarship programs and scholar performance across Davao de Oro
          </p>
        </div>

        <div v-show="$store.state.user.ut_id.description == 'Admin'" class="year-select-wrap">
          <div class="year-select-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" class="w-4 h-4">
              <path
                d="M7 2v2M17 2v2M4.5 7.5h15M6 5h12a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
              />
              <path
                d="M8 11h3M8 15h3M13 11h3M13 15h3"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
              />
            </svg>
          </div>
          <select v-model="selectedFiscalYear" class="year-select" aria-label="Select year">
            <option v-for="fy in years" :key="fy" :value="fy">
              {{ fy }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
      <div class="stat-card stat-card--blue card-anim" :style="{ animationDelay: '40ms' }">
        <div class="stat-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" class="w-5 h-5">
            <path
              d="M17 20a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
            />
            <path
              d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
              stroke="currentColor"
              stroke-width="1.8"
            />
            <path
              d="M22 20a3.5 3.5 0 0 0-2.5-3.35"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
            />
            <path
              d="M18.5 4.65A3.5 3.5 0 0 1 20 8"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
            />
          </svg>
        </div>
        <div class="stat-meta">
          <span class="stat-badge">+18%</span>
        </div>
        <p class="stat-label">Training Centers</p>
        <p class="stat-value">{{ stats.total_tc }}</p>
      </div>

      <div class="stat-card stat-card--green card-anim" :style="{ animationDelay: '85ms' }">
        <div class="stat-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" class="w-5 h-5">
            <path
              d="M3 17l6-6 4 4 7-9"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M3 7v10h10"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div class="stat-meta">
          <span class="stat-badge">+5.3%</span>
        </div>
        <p class="stat-label">Avg Budget Utilization</p>
        <p class="stat-value">{{ avgBURDisplay }}%</p>
      </div>

      <div class="stat-card stat-card--indigo card-anim" :style="{ animationDelay: '130ms' }">
        <div class="stat-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" class="w-5 h-5">
            <path
              d="M12 3l9 5-9 5-9-5 9-5Z"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linejoin="round"
            />
            <path
              d="M3 8v8l9 5 9-5V8"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div class="stat-meta">
          <span class="stat-badge">+{{ stats.list_tc.length || 0 }}</span>
        </div>
        <p class="stat-label">Centers Evaluated</p>
        <p class="stat-value">{{ stats.list_tc.length || 0 }}</p>
      </div>

      <div class="stat-card stat-card--orange card-anim" :style="{ animationDelay: '175ms' }">
        <div class="stat-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" class="w-5 h-5">
            <path
              d="M12 21s7-4.35 7-11a7 7 0 1 0-14 0c0 6.65 7 11 7 11Z"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 10.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
              stroke="currentColor"
              stroke-width="1.8"
            />
          </svg>
        </div>
        <div class="stat-meta">
          <span class="stat-badge">100%</span>
        </div>
        <p class="stat-label">Qualifications</p>
        <p class="stat-value">{{ stats.total_q }}</p>
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
              <th class="px-3 py-2 text-left">Training Center</th>
              <th class="px-3 py-2 text-center">BUR (%)</th>
              <th class="px-3 py-2 text-center">Billing Compliance (%)</th>
              <th class="px-3 py-2 text-center">Enrollment Rate (%)</th>
              <th class="px-3 py-2 text-center">Completion Rate (%)</th>
              <th class="px-3 py-2 text-center">Assessment Rate (%)</th>
              <th class="px-3 py-2 text-center">Weighted Score</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in trainingCenterTableRowsRanked"
              :key="item.logoKey || item.abbre || index"
              class="border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition-colors item-anim"
              :style="{ animationDelay: `${Math.min(index, 24) * 28}ms` }"
              @click="openTrainingCenterModal(item)"
            >
              <td class="px-3 py-2 text-gray-800 font-semibold tabular-nums">
                <span :class="['rank-pill', item.rank === 1 ? 'rank-pill--gold' : '', item.rank === 2 ? 'rank-pill--silver' : '', item.rank === 3 ? 'rank-pill--bronze' : '']">
                  {{ item.rank }}
                </span>
              </td>
              <td class="px-3 py-2 font-medium text-gray-800">
                <span class="block">{{ item.abbre || item.trainingCenter }}</span>
                <span v-if="item.abbre && item.trainingCenter" class="text-xs text-gray-500 font-normal">{{ item.trainingCenter }}</span>
              </td>
              <td class="px-3 py-2 text-center text-gray-700 tabular-nums">{{ formatBurPercent(item.BUR) }}</td>
              <td class="px-3 py-2 text-center text-gray-700 tabular-nums">{{ formatBscPercent(item.BSC) }}</td>
              <td class="px-3 py-2 text-center text-gray-700 tabular-nums">{{ formatOptionalPercent(item.ENR) }}</td>
              <td class="px-3 py-2 text-center text-gray-700 tabular-nums">{{ formatOptionalPercent(item.CRR) }}</td>
              <td class="px-3 py-2 text-center text-gray-700 tabular-nums">{{ formatOptionalPercent(item.ASR) }}</td>
              <td class="px-3 py-2 text-center text-gray-800 font-medium tabular-nums">{{ formatWps(item.WPS) }}</td>
            </tr>
            <tr v-if="!trainingCenterTableRowsRanked.length">
              <td colspan="8" class="px-3 py-8 text-center text-gray-500">
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
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-75 backdrop-blur-[2px]"
      @click.self="closeTrainingCenterModal"
    >
      <div class="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div class="modal-header px-5 py-4 flex items-start justify-between gap-3">
          <div class="flex items-start gap-4 min-w-0">
            <div class="relative shrink-0">
              <div class="tc-logo !w-14 !h-14 !rounded-2xl" :style="{ background: tcLogoGradient(selectedTrainingCenter?.id) }">
                <span class="tc-logo-initials !text-base">{{ selectedTrainingCenter ? tcLogoInitials(selectedTrainingCenter) : 'TC' }}</span>
              </div>
              <div class="absolute -left-2 -bottom-2">
                <span class="rank-pill rank-pill--gold" v-if="selectedTrainingCenter?.rank === 1">1</span>
                <span class="rank-pill rank-pill--silver" v-else-if="selectedTrainingCenter?.rank === 2">2</span>
                <span class="rank-pill rank-pill--bronze" v-else-if="selectedTrainingCenter?.rank === 3">3</span>
                <span class="rank-pill" v-else>{{ selectedTrainingCenter?.rank ?? '—' }}</span>
              </div>
            </div>

            <div class="min-w-0">
              <p class="text-xs uppercase tracking-wider text-white text-opacity-85">Training Center Analytics</p>
              <h3 class="text-xl sm:text-2xl font-semibold text-white truncate">
                {{ selectedTrainingCenter?.trainingCenter || selectedTrainingCenter?.abbre || 'Training Center' }}
              </h3>
              <p class="text-xs sm:text-sm text-white/80 mt-1 truncate">
                Fiscal Year, {{ fiscalYearToYearLabel(selectedFiscalYear) || selectedFiscalYear }}
              </p>
            </div>
          </div>

          <button class="text-white hover:text-gray-200 text-2xl leading-none px-2" @click="closeTrainingCenterModal" aria-label="Close modal">
            &times;
          </button>
        </div>

        <div class="p-5">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div class="lg:col-span-7 modal-wps">
              <div class="modal-wps-inner">
                <p class="modal-wps-value tabular-nums">
                  {{ selectedTrainingCenter ? (numericWpsForRank(selectedTrainingCenter.WPS) * 100).toFixed(2) : '0.00' }}
                </p>
                <div class="modal-wps-meta">
                  <span :class="['status-badge', selectedTrainingCenter ? getStatusClass(selectedTrainingCenter) : 'status-critical']">
                    {{ selectedTrainingCenter ? getStatus(selectedTrainingCenter) : 'N/A' }}
                  </span>
                  <p class="text-sm font-semibold text-white/90 mt-2">Weighted Performance Score</p>
                </div>

                <p class="text-xs text-white/80 mt-4 leading-relaxed">
                  {{ selectedInsights?.wps || selectedInsights?.bur || selectedInsights?.bsc || '—' }}
                </p>
              </div>
            </div>

            <div class="lg:col-span-5 grid grid-cols-2 gap-3">
              <div class="modal-mini">
                <p class="modal-mini-value tabular-nums">{{ selectedTrainingCenter ? formatBurPercent(selectedTrainingCenter.BUR) : '—' }}</p>
                <p class="modal-mini-label">Budget Utilization Rate</p>
              </div>
              <div class="modal-mini">
                <p class="modal-mini-value tabular-nums">{{ selectedTrainingCenter ? formatBscPercent(selectedTrainingCenter.BSC) : '—' }}</p>
                <p class="modal-mini-label">Billing Compliance</p>
              </div>
              <div class="modal-mini">
                <p class="modal-mini-value tabular-nums">{{ selectedTrainingCenter ? formatOptionalPercent(selectedTrainingCenter.ENR) : '—' }}</p>
                <p class="modal-mini-label">Enrollment Rate</p>
              </div>
              <div class="modal-mini">
                <p class="modal-mini-value tabular-nums">{{ selectedTrainingCenter ? formatOptionalPercent(selectedTrainingCenter.CRR) : '—' }}</p>
                <p class="modal-mini-label">Completion Rate</p>
              </div>
              <div class="modal-mini col-span-2">
                <p class="modal-mini-value tabular-nums">{{ selectedTrainingCenter ? formatOptionalPercent(selectedTrainingCenter.ASR) : '—' }}</p>
                <p class="modal-mini-label">Assessment Rate</p>
              </div>
            </div>
          </div>

          <div class="mt-4 border border-slate-200 rounded-xl overflow-hidden">
            <div class="overflow-x-auto">
              <table class="min-w-full text-xs">
                <thead>
                  <tr class="bg-slate-100 text-slate-700">
                    <th class="px-3 py-2 text-left whitespace-nowrap">Training Center</th>
                    <th class="px-3 py-2 text-center whitespace-nowrap">Allocated Budget</th>
                    <th class="px-3 py-2 text-center whitespace-nowrap">Utilized Budget</th>
                    <th class="px-3 py-2 text-center whitespace-nowrap">Billable Submissions</th>
                    <th class="px-3 py-2 text-center whitespace-nowrap">On-Time/Correct</th>
                    <th class="px-3 py-2 text-center whitespace-nowrap">Approved Slots</th>
                    <th class="px-3 py-2 text-center whitespace-nowrap">Enrolled</th>
                    <th class="px-3 py-2 text-center whitespace-nowrap">Completed</th>
                    <th class="px-3 py-2 text-center whitespace-nowrap">Dropped</th>
                    <th class="px-3 py-2 text-center whitespace-nowrap">Assessed</th>
                    <th class="px-3 py-2 text-center whitespace-nowrap">Competent</th>
                    <th class="px-3 py-2 text-center whitespace-nowrap">Not Yet Competent</th>
                    <th class="px-3 py-2 text-center whitespace-nowrap">Absent</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b border-slate-100">
                    <td class="px-3 py-2 font-semibold text-slate-800 whitespace-nowrap">
                      {{ selectedTrainingCenter?.abbre || selectedTrainingCenter?.trainingCenter || '—' }}
                    </td>
                    <td class="px-3 py-2 text-center tabular-nums">{{ formatCurrency(modalStats?.total_payment) }}</td>
                    <td class="px-3 py-2 text-center tabular-nums">{{ formatCurrency(modalStats?.total_utilized) }}</td>
                    <td class="px-3 py-2 text-center tabular-nums">{{ formatCount(selectedTrainingCenter?.totalBillableSubmissions) }}</td>
                    <td class="px-3 py-2 text-center tabular-nums">{{ formatCount(selectedTrainingCenter?.onTimeCorrectSubmissions) }}</td>
                    <td class="px-3 py-2 text-center tabular-nums">{{ formatCount(selectedTrainingCenter?.approvedSlots) }}</td>
                    <td class="px-3 py-2 text-center tabular-nums">—</td>
                    <td class="px-3 py-2 text-center tabular-nums">—</td>
                    <td class="px-3 py-2 text-center tabular-nums">—</td>
                    <td class="px-3 py-2 text-center tabular-nums">—</td>
                    <td class="px-3 py-2 text-center tabular-nums">—</td>
                    <td class="px-3 py-2 text-center tabular-nums">—</td>
                    <td class="px-3 py-2 text-center tabular-nums">—</td>
                  </tr>
                  <tr class="bg-slate-50">
                    <td class="px-3 py-2 font-bold text-slate-800 whitespace-nowrap">TOTAL</td>
                    <td class="px-3 py-2 text-center font-semibold tabular-nums">{{ formatCurrency(modalStats?.total_payment) }}</td>
                    <td class="px-3 py-2 text-center font-semibold tabular-nums">{{ formatCurrency(modalStats?.total_utilized) }}</td>
                    <td class="px-3 py-2 text-center font-semibold tabular-nums">{{ formatCount(selectedTrainingCenter?.totalBillableSubmissions) }}</td>
                    <td class="px-3 py-2 text-center font-semibold tabular-nums">{{ formatCount(selectedTrainingCenter?.onTimeCorrectSubmissions) }}</td>
                    <td class="px-3 py-2 text-center font-semibold tabular-nums">{{ formatCount(selectedTrainingCenter?.approvedSlots) }}</td>
                    <td class="px-3 py-2 text-center font-semibold tabular-nums">—</td>
                    <td class="px-3 py-2 text-center font-semibold tabular-nums">—</td>
                    <td class="px-3 py-2 text-center font-semibold tabular-nums">—</td>
                    <td class="px-3 py-2 text-center font-semibold tabular-nums">—</td>
                    <td class="px-3 py-2 text-center font-semibold tabular-nums">—</td>
                    <td class="px-3 py-2 text-center font-semibold tabular-nums">—</td>
                    <td class="px-3 py-2 text-center font-semibold tabular-nums">—</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-if="modalStatsLoading" class="px-4 py-3 text-xs text-slate-500 border-t border-slate-200">Loading summary…</div>
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
        wps: '',
      },
      loadingInsights: false,
      loadingInsightsTable: false,
      insightsTableError: null,
      modalInsightRows: [],
      modalStatsLoading: false,
      modalStats: null,
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
        const enr = this.firstNumber(row, ['ENR', 'enrollment_rate', 'enrollmentRate', 'enrollment']);
        const crr = this.firstNumber(row, ['CRR', 'completion_rate', 'completionRate', 'completion']);
        const asr = this.firstNumber(row, ['ASR', 'assessment_rate', 'assessmentRate', 'assessment']);
        const totalBillableSubmissions = this.firstNumber(row, ['totalBillableSubmissions', 'total_submissions', 'totalSubmissions', 'billableSubmissions']);
        const onTimeCorrectSubmissions = this.firstNumber(row, ['onTimeCorrectSubmissions', 'onTimeSubmissions', 'on_time_submissions', 'onTime']);
        const approvedSlots = this.firstNumber(row, ['approvedSlots', 'approved_slots', 'slots']);
        return {
          id: center.id != null ? center.id : null,
          logoKey: center.id != null ? center.id : abbre || ky,
          abbre,
          trainingCenter: centerName,
          BUR: Number(row.BUR ?? 0),
          BSC: Number(row.BSC ?? 0),
          WPS: Number(row.WPS ?? 0),
          ENR: enr,
          CRR: crr,
          ASR: asr,
          totalBillableSubmissions,
          onTimeCorrectSubmissions,
          approvedSlots,
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
    fiscalYearToYearLabel(fy) {
      const raw = String(fy || '').trim();
      if (!raw) return '';
      const parts = raw.split('-').map((p) => p.trim()).filter(Boolean);
      if (parts.length === 2 && /^\d{4}$/.test(parts[1])) return parts[1];
      return parts[0] || raw;
    },
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
      document.body.style.overflow = 'hidden';
      this.insightsTableError = null;
      this.modalInsightRows = [];
      this.modalStats = null;
      await this.loadInsightsForTrainingCenter(item);
      await this.loadTrainingCenterStats(item);
    },
    closeTrainingCenterModal() {
      this.isTrainingCenterModalOpen = false;
      document.body.style.overflow = '';
      this.selectedTrainingCenter = null;
      this.selectedInsights = { bur: '', bsc: '', wps: '' };
      this.modalInsightRows = [];
      this.loadingInsights = false;
      this.loadingInsightsTable = false;
      this.modalStatsLoading = false;
      this.modalStats = null;
    },
    async loadTrainingCenterStats(item) {
      this.modalStatsLoading = true;
      try {
        const fiscalYear = this.selectedFiscalYear || `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`;
        const tcId = item?.id;
        if (!tcId) {
          this.modalStats = null;
          return;
        }
        const res = await axios.get(`${process.env.VUE_APP_BASE_URL}/billing_periods/get_statistics/${tcId}/${fiscalYear}`);
        if (res.status === 200 && res.data && typeof res.data === 'object') {
          this.modalStats = res.data;
        } else {
          this.modalStats = null;
        }
      } catch (e) {
        this.modalStats = null;
      } finally {
        this.modalStatsLoading = false;
      }
    },
    async loadInsightsForTrainingCenter(item) {
      this.loadingInsights = true;
      this.loadingInsightsTable = true;
      this.insightsTableError = null;
      this.selectedInsights = { bur: '', bsc: '', wps: '' };
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
        this.selectedInsights.wps = wpsRow?.description ?? '';

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
    formatOptionalPercent(value) {
      const n = Number(value);
      if (!Number.isFinite(n)) return '—';
      return `${this.dashboardRatePercent(n).toFixed(2)}%`;
    },
    firstNumber(obj, keys) {
      if (!obj || typeof obj !== 'object') return null;
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        if (Object.prototype.hasOwnProperty.call(obj, k)) {
          const v = Number(obj[k]);
          if (Number.isFinite(v)) return v;
        }
      }
      return null;
    },
    formatCurrency(value) {
      const n = Number(value);
      if (!Number.isFinite(n)) return '—';
      return new Intl.NumberFormat('en-PH', { maximumFractionDigits: 0 }).format(n);
    },
    formatCount(value) {
      const n = Number(value);
      if (!Number.isFinite(n)) return '—';
      return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(n);
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
  background: linear-gradient(180deg, #f6f9ff 0%, #eff7ff 55%, #f7fbff 100%);
}

.analytics-header {
  padding: 0.25rem 0.25rem 0;
}

.header-mark {
  width: 18px;
  height: 18px;
  border-radius: 6px;
  background: linear-gradient(145deg, #0ea5e9, #2563eb);
  box-shadow: 0 6px 18px rgba(37, 99, 235, 0.22);
  flex: 0 0 auto;
}

.year-select-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.5rem;
  border-radius: 9999px;
  background: rgba(226, 232, 240, 0.85);
  border: 1px solid rgba(148, 163, 184, 0.35);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
}

.year-select-icon {
  width: 34px;
  height: 34px;
  border-radius: 9999px;
  display: grid;
  place-items: center;
  background: rgba(255, 255, 255, 0.75);
  color: #334155;
  box-shadow: inset 0 0 0 1px rgba(148, 163, 184, 0.25);
  flex: 0 0 auto;
}

.year-select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: 0;
  outline: none;
  background: #1d4ed8;
  color: #fff;
  font-weight: 700;
  padding: 0.55rem 2.1rem 0.55rem 1rem;
  border-radius: 9999px;
  font-size: 0.95rem;
  line-height: 1;
  cursor: pointer;
  box-shadow: 0 12px 22px rgba(29, 78, 216, 0.22);
}

.year-select:focus-visible {
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.25), 0 12px 22px rgba(29, 78, 216, 0.22);
}

.year-select-wrap::after {
  content: '';
  position: absolute;
  right: 16px;
  top: 50%;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 6px solid rgba(255, 255, 255, 0.95);
  transform: translateY(-35%);
  pointer-events: none;
}

.stat-card {
  position: relative;
  border-radius: 1rem;
  padding: 1rem 1.1rem;
  color: #fff;
  overflow: hidden;
  box-shadow: 0 18px 36px rgba(15, 23, 42, 0.12);
  min-height: 104px;
}

.stat-card::before {
  content: '';
  position: absolute;
  inset: -30% -20%;
  background: radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.35), transparent 55%);
  transform: rotate(-12deg);
}

.stat-icon {
  position: relative;
  width: 44px;
  height: 44px;
  border-radius: 0.9rem;
  display: grid;
  place-items: center;
  background: rgba(255, 255, 255, 0.18);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.18);
  color: #fff;
}

.stat-meta {
  position: absolute;
  right: 14px;
  top: 14px;
  z-index: 1;
}

.stat-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem 0.55rem;
  border-radius: 9999px;
  background: rgba(15, 23, 42, 0.2);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.18);
  font-size: 0.75rem;
  font-weight: 700;
  backdrop-filter: blur(10px);
}

.stat-label {
  position: relative;
  margin-top: 0.75rem;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.92);
}

.stat-value {
  position: relative;
  margin-top: 0.15rem;
  font-size: 1.7rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.stat-card--blue {
  background: linear-gradient(110deg, #0ea5e9 0%, #2563eb 60%, #1d4ed8 100%);
}

.stat-card--green {
  background: linear-gradient(110deg, #22c55e 0%, #10b981 55%, #059669 100%);
}

.stat-card--indigo {
  background: linear-gradient(110deg, #6366f1 0%, #3b82f6 60%, #2563eb 100%);
}

.stat-card--orange {
  background: linear-gradient(110deg, #f59e0b 0%, #f97316 55%, #ea580c 100%);
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

.modal-wps {
  border-radius: 1rem;
  background: linear-gradient(120deg, #0ea5e9 0%, #2563eb 55%, #1d4ed8 100%);
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.18);
  overflow: hidden;
}

.modal-wps-inner {
  padding: 1.15rem 1.25rem;
  position: relative;
}

.modal-wps-value {
  font-size: 3.25rem;
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.03em;
  line-height: 1;
}

.modal-wps-meta {
  margin-top: 0.35rem;
}

.modal-mini {
  border: 1px solid #e2e8f0;
  border-radius: 0.9rem;
  padding: 0.85rem 0.9rem;
  background: #ffffff;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);
}

.modal-mini-value {
  font-size: 1.8rem;
  font-weight: 800;
  color: #0ea5e9;
  line-height: 1;
}

.modal-mini-label {
  margin-top: 0.45rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #0f172a;
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

<style scoped>
.page-anim{
  animation: pageFadeUp 520ms cubic-bezier(.2,.9,.2,1) both;
}

.card-anim{
  opacity: 0;
  transform: translateY(10px);
  animation: cardFadeUp 560ms cubic-bezier(.2,.9,.2,1) both;
  will-change: transform, opacity;
}

.item-anim{
  opacity: 0;
  transform: translateY(8px);
  animation: itemFadeUp 520ms cubic-bezier(.2,.9,.2,1) both;
  will-change: transform, opacity;
}

@keyframes pageFadeUp{
  from{ opacity: 0; transform: translateY(10px); }
  to{ opacity: 1; transform: translateY(0); }
}

@keyframes cardFadeUp{
  from{ opacity: 0; transform: translateY(14px); }
  to{ opacity: 1; transform: translateY(0); }
}

@keyframes itemFadeUp{
  from{ opacity: 0; transform: translateY(10px); }
  to{ opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce){
  .page-anim, .card-anim, .item-anim{ animation: none !important; transform: none !important; opacity: 1 !important; }
}
</style>