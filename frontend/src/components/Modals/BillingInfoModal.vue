<template>

   <div class="fixed inset-0 z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  
  <!-- Background overlay -->
  <div class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

  <!-- Modal container -->
  <div class="absolute inset-0 flex items-center justify-center overflow-y-auto">
    
    <div 
      class="w-full h-full flex items-center justify-center animate__animated animate__slideInUp" 
      ref="modal"
    >
      <div class="bg-white shadow w-full h-full overflow-auto">
        
        <!-- Top Tab Bar -->
        <div class="flex justify-between items-center p-4 border-b bg-primary-600">
          <h2 class="text-lg font-medium text-white">{{ title }}</h2>
          <button 
            @click="closeModal"
            class="text-white hover:text-red-600 text-xl font-bold focus:outline-none"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <!-- Modal content -->
        <div class="p-6">

           <!-- Shared Wrapper (Optional) -->
            <div class="w-full px-4">

            <!-- Stepper Wrapper -->
            <div class="max-w-5xl mx-auto overflow-x-auto py-6 bg-white rounded-xl shadow">
                <div class="flex items-center w-full px-4">
                <template v-for="(item, index) in sortedBtypes" :key="item.bt_id.id">
                    
                    <!-- Step -->
                    <div class="flex flex-col items-center min-w-[80px] z-10">
                    <div
                    class="flex items-center justify-center w-10 h-10 rounded-full font-semibold shadow bg-opacity-80"
                    :class="{
                        'bg-green-600 text-white': item.status == 1,   // Completed
                        'bg-red-500 text-white': item.status == 2,     // Denied
                        'bg-orange-400 text-white': item.status == 3,  // Revised
                        'bg-gray-200 text-gray-600': !item.status      // Default
                    }"
                    >
                    {{ item.order_num }}
                    </div>
                    <div class="mt-2 text-sm font-medium text-gray-800 text-center truncate w-max">
                        {{ item.bt_id.abbre }}
                    </div>

                    <div class="mt-2 text-sm font-medium text-gray-800 text-center truncate w-max">
                        <span
                        class="px-2 py-1 rounded-full text-xs font-semibold"
                        :class="getStatusBadgeClass(item.status)"
                    >
                        {{ getStatusMainText(item.status) }}
                    </span>
                    </div>

                    <div class="mt-2 text-sm font-medium text-gray-800 text-center truncate w-max">
                        {{ getDateTimeFormat(item.datetime_actioned) }}
                    </div>
                    </div>

                    <!-- Connector -->
                    <div
                    v-if="index < sortedBtypes.length - 1"
                    class="flex-1 h-0.5 mx-2" :class="item.status > 0 ? 'bg-green-600' : 'bg-gray-200'"
                    ></div>

                </template>
                </div>
            </div>

            <!-- Details Container -->
            <div class="max-w-5xl mx-auto bg-white rounded-xl shadow p-6 mt-6 space-y-4">
                <!-- Title -->
                <div class="flex items-center gap-2">
                    <h2 class="flex-none text-2xl font-bold text-gray-800 mb-4">
                    {{ data.tc_id ? data.tc_id.description : '-' }}
                    </h2>
                    <div class="flex-auto"></div>
                    <button class="flex-none px-4 py-2 my-2 rounded-lg duration-300 text-sm bg-blue-500 text-white" @click="getSummaryTrainees">
                        Review Billing Statements
                    </button>
                </div>

                <!-- Detail Rows -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm text-gray-700">
                
                <div>
                    <div class="font-semibold text-gray-600">PQM Code:</div>
                    <div class="mt-1">{{ data.ctrl_num ? data.ctrl_num : '-' }}</div>
                </div>

                <div>
                    <div class="font-semibold text-gray-600">Status:</div>
                    <div class="mt-1">
                    <span
                        class="px-2 py-1 rounded-full text-xs font-semibold"
                        :class="getStatusBadgeClass(data.status_id)"
                    >
                        {{ getStatusMainText(data.status_id) }}
                    </span>
                    </div>
                </div>

                <div>
                    <div class="font-semibold text-gray-600">Batch name:</div>
                    <div class="mt-1">{{ data.batch_name ? data.batch_name : '-' }}</div>
                </div>

                <div>
                    <div class="font-semibold text-gray-600">Scholarship Type:</div>
                    <div class="mt-1">{{ data.sc_id ? data.sc_id.description : '-' }}</div>
                </div>

                <div>
                    <div class="font-semibold text-gray-600">Qualification:</div>
                    <div class="mt-1">{{ data.q_id ? data.q_id.description : '-' }}</div>
                </div>

                <div>
                    <div class="font-semibold text-gray-600">No. of Slots:</div>
                    <div class="mt-1">{{ data.num_pax ? data.num_pax : '-' }}</div>
                </div>

                <div>
                    <div class="font-semibold text-gray-600">No. of Hours:</div>
                    <div class="mt-1">{{ data.q_id ? data.q_id.hrs : '-' }}</div>
                </div>

                <div>
                    <div class="font-semibold text-gray-600">Training Duration:</div>
                    <div class="mt-1">{{ data.date_start ? getDateFormat(data.date_start) : '-' }} - {{ data.date_end ? getDateFormat(data.date_end) : '-' }}</div>
                </div>

                <div class="col-span-2" v-if="data.remarks">
                    <div class="font-semibold text-gray-600">Remarks:</div>
                    <div class="mt-1">
                        <div v-if="parsedRemarks.length">
                            <div v-for="(remark, index) in parsedRemarks" :key="index" class="mb-2 p-2 rounded-lg border">
                                <div class="flex items-center gap-1">
                                    <span>Status: </span>
                                    <span
                                        class="px-2 py-1 rounded-full text-xs font-semibold"
                                        :class="getStatusBadgeClassRemarks(remark.status)"
                                    >
                                        {{ remark.status }}
                                    </span>
                                </div>
                                
                                <div class="text-gray-700 my-2">"{{ remark.remarks ? remark.remarks : 'No remarks' }}"</div>
                                <div class="font-semibold text-gray-800 whitespace-pre-line"><span class="font-thin">by: </span> {{ remark.name }}</div>
                                <div class="text-gray-600 text-sm italic">{{ new Date(remark.datetime_added).toLocaleString() }}</div>
                                
                            </div>
                        </div>
                    </div>
                </div>
                

                </div>

                

                <!-- Update Form -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm text-gray-700" v-if="selectedStatus > 0">
                
                <div>
                    <div class="font-semibold text-gray-600">Remarks: (if any) </div>
                    <textarea v-model="remarks" rows="2" class="mt-1 rounded-lg border-gray-200 w-full"></textarea>
                </div>
                

                </div>

                <div class="flex items-center gap-2 justify-end" v-if="(data.status_id == 0 || data.status_id == 2) && $store.state.user.ut_id.description == 'PO Staff'">
                    <button class="px-4 py-2 my-2 rounded-lg duration-300 text-sm" @click="showUpdateForm(1)" :class="selectedStatus == 1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800'" :disabled="isSubmitting">
                        Approve
                    </button>
                    <button class="px-4 py-2 my-2 rounded-lg duration-300 text-sm" @click="showUpdateForm(2)" :class="selectedStatus == 2 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-800'" :disabled="isSubmitting">
                        Disapprove
                    </button>
                    <button class="px-4 py-2 my-2 rounded-lg duration-300 text-sm" @click="showUpdateForm(3)" :class="selectedStatus == 3 ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-800'" :disabled="isSubmitting">
                        Revise
                    </button>

                    <button class="px-4 py-2 my-2 rounded-lg duration-300 text-sm bg-blue-500 text-white" v-if="selectedStatus > 0" @click="updateStatus">
                        Submit
                    </button>
                </div>
            </div>

            <!--Trainees Table Modal-->
            <div v-if="showTraineesTable" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-6xl relative overflow-auto max-h-[90vh]">
                <h3 class="text-lg font-semibold mb-4">{{ billing_data.bt_id.description }}</h3>

                <!-- Your form goes here -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 text-sm text-gray-700">

                     <div v-if="student_rows.length" class="mt-6 overflow-y-auto max-h-80">
                        <table class="min-w-full border-collapse text-xs">
                            <thead class="bg-gray-100 sticky top-0 z-10">
                            <tr>
                                <th class="px-4 py-2 border">#</th>
                                <th class="px-4 py-2 border">First Name</th>
                                <th class="px-4 py-2 border">Last Name</th>
                                <th class="px-4 py-2 border">Extension</th>
                                <th class="px-4 py-2 border">Middle Name</th>
                                <th class="px-4 py-2 border">SG Number</th>
                                <th class="px-4 py-2 border">{{ billing_data.bt_id.description }}</th>
                                <th class="px-4 py-2 border">Status</th>
                                <th class="px-4 py-2 border">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(row, index) in student_rows" :key="index">
                                <td class="border px-4 py-2 text-center">{{ index + 1 }}</td>
                                <td class="border px-4 py-2">
                                <input type="text" v-model="row.fname" class="w-full border rounded px-2 py-1 text-xs" />
                                </td>
                                <td class="border px-4 py-2">
                                <input type="text" v-model="row.lname" class="w-full border rounded px-2 py-1 text-xs" />
                                </td>
                                <td class="border px-4 py-2">
                                <input type="text" v-model="row.extension" class="w-full border rounded px-2 py-1 text-xs" />
                                </td>
                                <td class="border px-4 py-2">
                                <input type="text" v-model="row.mname" class="w-full border rounded px-2 py-1 text-xs" />
                                </td>
                                <td class="border px-4 py-2">
                                <input type="text" v-model="row.sg_number" class="w-full border rounded px-2 py-1 text-xs" />
                                </td>
                                <td class="border px-4 py-2 text-center">
                                <input type="number" v-model.number="row.payment" class="w-full text-right border rounded px-2 py-1 text-xs" />
                                </td>
                                <td class="border px-4 py-2">
                                <input type="text" v-model="row.status" class="w-full border rounded px-2 py-1 text-xs" />
                                </td>
                                <td class="border px-4 py-2 text-center">
                                <button
                                    @click="deleteRow(index)"
                                    class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>

                        <!-- Add Row Button -->
                        <div class="mt-2">
                            <button
                            @click="addRow"
                            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                            + Add Row
                            </button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
           

            <!-- Trainee Summary Modal -->

            <div v-if="showSummaryTrainee" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" @click="showSummaryTrainee = false">
                <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-6xl relative overflow-auto max-h-[90vh]">

                    <table class="min-w-full border-collapse text-xs">
                    <thead class="bg-gray-100 sticky top-0 z-10">
                        <tr>
                        <th class="px-4 py-2 border">#</th>
                        <th class="px-4 py-2 border">Fullname</th>

                        <!-- Main BTs -->
                        <th class="px-4 py-2 border" v-for="h in main_headers" :key="h.id">{{ h.description }}</th>

                        <!-- Main Status -->
                         <th class="px-4 py-2 border">Status</th>
                        <th class="px-4 py-2 border">Date dropped</th>
                        

                        <!-- AC columns -->
                        <template v-if="ac_headers.length">
                        <th class="px-4 py-2 border" v-for="ac in ac_headers" :key="ac.id">{{ ac.description }}</th>
                        <th class="px-4 py-2 border" v-for="ac in ac_headers" :key="'ac-status-'+ac.id">Status</th>
                        </template>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="(row, index) in list_summary_trainees" :key="index"
                            :class="computedStatus(row) === 'dropped' ? 'bg-red-300 text-gray-800 bg-opacity-50' : 'bg-white text-gray-800'">
                        <td class="border px-4 py-2 text-center">{{ index + 1 }}</td>
                        <td class="border px-4 py-2">{{ row.fullName }}</td>

                        <!-- Main BT values -->
                        <td class="border px-4 py-2" v-for="h in main_headers" :key="h.id">{{ formatPeso(row[h.id]) }}</td>

                        <!-- Main Status -->
                        <td class="border px-4 py-2 text-center">
                            <span :class="getStatusBadgeClass(computedStatus(row))">
                            {{ computedStatus(row) }}
                            </span>
                        </td>

                        <td class="border px-4 py-2 text-center">
                            <span>
                            {{ getDateFormat(row.date_dropped) }}
                            </span>
                        </td>

                        <!-- AC values -->
                        <template v-if="ac_headers.length">
                        <td class="border px-4 py-2" v-for="ac in ac_headers" :key="ac.id">{{ formatPeso(row[ac.id]) }}</td>
                        <td class="border px-4 py-2 text-center" v-for="ac in ac_headers" :key="'ac-status-'+ac.id">
                            <span :class="getStatusBadgeClass(getACStatus(ac.id, row))">{{ getACStatus(ac.id, row) }}</span>
                        </td>
                        </template>
                        </tr>

                        <!-- Totals row -->
                        <tr class="bg-gray-200 font-bold">
                        <td class="border px-4 py-2" colspan="2">Total</td>

                        <!-- Main BT totals -->
                        <td class="border px-4 py-2" v-for="h in main_headers" :key="'total-'+h.id">
                            {{ formatPeso(list_summary_trainees.reduce((sum,row)=>sum+(row[h.id]||0),0)) }}
                        </td>

                        <!-- Main Status placeholder -->
                        <td class="border px-4 py-2">-</td>

                        <!-- AC totals -->
                        <template v-if="ac_headers.length">
                            <td class="border px-4 py-2" v-for="ac in ac_headers" :key="'total-ac-'+ac.id">
                            {{ formatPeso(list_summary_trainees.reduce((sum,row)=>sum+(row[ac.id]||0),0)) }}
                            </td>
                            <td class="border px-4 py-2">-</td>
                        </template>
                        </tr>

                    </tbody>
                    </table>

                </div>
            </div>

            <!-- Inner Modal (Billing Upload Form) -->

            <div v-if="showUpdateBilling" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-6xl relative overflow-auto max-h-[90vh]">
                <h3 class="text-lg font-semibold mb-4">{{ billing_data.bt_id.description }}</h3>

                <!-- Your form goes here -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 text-sm text-gray-700">
                    <!-- File Upload (spans 2 columns) -->
                    <!-- <div class="sm:col-span-2">
                    <label class="block font-semibold text-gray-600 mb-1">Upload Billing File</label>

                    <div
                        class="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-400 transition"
                        @dragover.prevent
                        @drop.prevent="handleFileDrop"
                        @click="triggerFileInput"
                    >
                        <svg class="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M7 16V4a1 1 0 011-1h8a1 1 0 011 1v12m-4 4h-4a1 1 0 01-1-1v-2a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1z" />
                        </svg>
                        <p class="text-gray-500 text-sm text-center">
                        Drag and drop your file here or <span class="text-blue-500 font-medium underline">click to upload</span>
                        </p>
                        <input type="file" ref="fileInput" id="fileInput" class="hidden" @change="handleFileChange"
                        accept=".pdf, .xls, .xlsx" />
                    </div>

                    <div v-if="selectedFile" class="mt-2 text-gray-600 text-sm">
                        Selected File: <strong>{{ selectedFile.name }}</strong>
                    </div>
                    </div> -->

                    <!-- File Upload Students (spans 2 columns) -->
                      <div class="sm:col-span-2">
                        <label class="font-semibold text-gray-600 mb-1 hidden">Upload Trainees</label>

                        <!-- Upload Area -->
                        <!--flex flex-col-->
                        <div
                        class="items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-400 transition hidden"
                        @dragover.prevent
                        @drop.prevent="handleFileDropStudents"
                        @click="triggerFileInputStudents"
                        >
                        <svg
                            class="w-10 h-10 text-gray-400 mb-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M7 16V4a1 1 0 011-1h8a1 1 0 011 1v12m-4 4h-4a1 1 0 01-1-1v-2a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1z"
                            />
                        </svg>

                        <p class="text-gray-500 text-sm text-center">
                            Drag and drop your file here or
                            <span class="text-blue-500 font-medium underline">click to upload</span>
                        </p>

                        <input
                            type="file"
                            ref="fileInputStudents"
                            id="fileInputStudents"
                            class="hidden"
                            @change="handleFileChangeStudents"
                            accept=".xls, .xlsx"
                        />
                        </div>

                        <!-- Selected File -->
                        <div v-if="selectedFileStudent" class="mt-2 text-gray-600 text-sm">
                        Selected File:
                        <strong>{{ selectedFileStudent.name }}</strong>
                        </div>

                        <!-- Display Parsed Data -->
                        <div class="mt-6 overflow-y-auto max-h-80">
                       <table class="min-w-full border-collapse text-xs">
                        <thead class="bg-gray-100 sticky top-0 z-10">
                            <tr>
                            <th class="px-4 py-2 border">#</th>
                            <th class="px-4 py-2 border">First Name</th>
                            <th class="px-4 py-2 border">Last Name</th>
                            <th class="px-4 py-2 border">Extension</th>
                            <th class="px-4 py-2 border">Middle Name</th>
                            <th class="px-4 py-2 border">SG Number</th>
                            <th class="px-4 py-2 border">{{ billing_data.bt_id.description }}</th>
                            <th class="px-4 py-2 border">Status</th>
                            <!-- <th class="px-4 py-2 border">Action</th> -->
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                            v-for="(row, index) in student_rows"
                            :key="index"
                            :class="row.status === 'dropped' || row.status === 'absent' ? 'bg-red-300 text-gray-800 bg-opacity-50' : 'bg-white text-gray-800'"
                            >
                            <td class="border px-4 py-2 text-center">{{ index + 1 }}</td>
                            <td class="border px-4 py-2">
                                <input type="text" v-model="row.fname" class="w-full border rounded px-2 py-1 text-xs" />
                            </td>
                            <td class="border px-4 py-2">
                                <input type="text" v-model="row.lname" class="w-full border rounded px-2 py-1 text-xs" />
                            </td>
                            <td class="border px-4 py-2">
                                <input type="text" v-model="row.extension" class="w-full border rounded px-2 py-1 text-xs" />
                            </td>
                            <td class="border px-4 py-2">
                                <input type="text" v-model="row.mname" class="w-full border rounded px-2 py-1 text-xs" />
                            </td>
                            <td class="border px-4 py-2">
                                <input type="text" v-model="row.sg_number" class="w-full border rounded px-2 py-1 text-xs" />
                            </td>
                            <td class="border px-4 py-2 text-center">
                                <input type="number" v-model.number="row.payment" class="w-full text-right border rounded px-2 py-1 text-xs" />
                            </td>
                            <td class="border px-4 py-2">
                                <!-- Status Dropdown -->
                                <select v-model="row.status" @change="recalculatePayments" class="w-full border rounded px-2 py-1 text-xs">
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option v-if="billing_data.bt_id.description == 'Assessment Cost'" value="competent">Competent</option>
                                <option v-if="billing_data.bt_id.description == 'Assessment Cost'" value="nyc">Not yet competent</option>
                                <option value="dropped">Dropped</option>
                                <option value="absent">Absent</option>
                                </select>
                            </td>
                            <!-- <td class="border px-4 py-2 text-center">
                                <button
                                @click="deleteRow(index)"
                                class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                Delete
                                </button>
                            </td> -->
                            </tr>
                        </tbody>
                        </table>




                        <!-- Add Row Button -->
                        <!-- <div class="mt-2">
                            <button
                            @click="addRow"
                            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                            + Add Row
                            </button>
                        </div> -->
                        </div>

                    </div>


                    <div class="col-span-2">
                    <div class="font-semibold text-gray-600">Total Approved Budget</div>
                    <h2 class="text-2xl">{{ formatPeso(billing_data.total_payment ) }}</h2>
                    </div>

                    <!-- Utilized Budget -->
                    <div class="mt-4">
                    <div class="font-semibold text-gray-600">Utilized Budget</div>
                    <input 
                        :value="totalUtilized.toFixed(2)" 
                        type="number" 
                        step="0.01"
                        class="mt-1 rounded-lg border-gray-200 w-full" 
                        disabled
                    />
                    </div>

                    <!-- Unutilized Budget -->
                    <div class="mt-4">
                    <div class="font-semibold text-gray-600">Unutilized Budget</div>
                    <input 
                        :value="totalUnutilized.toFixed(2)" 
                        type="number" 
                        step="0.01"
                        class="mt-1 rounded-lg border-gray-200 w-full" 
                        disabled
                    />
                    </div>

                    <div>
                    <div class="font-semibold text-gray-600">Dropped Trainees</div>
                    <input 
                        :value="totalDropped" 
                        type="number" 
                        class="mt-1 rounded-lg border-gray-200 w-auto" 
                        disabled
                    />
                    </div>

                    <div>
                    <div class="font-semibold text-gray-600">Due Date</div>
                    <input 
                        v-model="billing_data.datetime_due"
                        type="date" 
                        class="mt-1 rounded-lg border-gray-200 w-auto" 
                    />
                    </div>

                    <!-- Due Date -->
                    <!-- <div>
                    <div class="font-semibold text-gray-600">Due Date</div>
                    <input v-model="billing_data.datetime_due" type="date"
                        class="mt-1 rounded-lg border-gray-200 w-full" />
                    </div> -->
                </div>

                <!-- Submit and Close -->
                <div class="flex items-center gap-2 justify-end mt-6">
                    <button @click="updateBillingData" class="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm">
                    Submit
                    </button>
                    <button @click="showUpdateBilling = false" class="text-gray-600 hover:text-gray-800 text-sm">
                    Cancel
                    </button>
                </div>

                <!-- Close inner modal -->
                <button @click="showUpdateBilling = false" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                    ✕
                </button>
                </div>
            </div>

            <!-- Billing Period Container -->
           <template v-for="(item, index) in sortedBPeriods" :key="item.id">
            <div 
            class="relative max-w-5xl mx-auto rounded-xl shadow p-6 mt-6 overflow-hidden space-y-6 transition-all duration-300"
            :class="[
                item.status === 1 ? 'bg-green-100' :
                item.status === 2 ? 'bg-red-100' :
                item.status === 3 ? 'bg-orange-100' :
                'bg-white',
                !canEditBillingItem(item, index) ? 'opacity-50 pointer-events-none cursor-not-allowed' : ''
            ]"
            >
                
                
                <!-- Title -->
                <div class="flex items-center gap-4 flex-wrap mb-2">

                <!-- Circle with Number -->
                <div class="h-6 w-6 rounded-full bg-primary-600 text-white flex items-center justify-center text-xs font-semibold">
                    {{ item.order_num }}
                </div>

                <!-- Title -->
                <h2 class="text-2xl font-bold text-gray-800">
                    {{ item.bt_id ? item.bt_id.description : '-' }}
                </h2>


                <!-- Icon -->
                <img 
                src="../../assets/action_icon_edit.png" 
                class="h-5 w-5" 
                @click="showUpdateBillingModal(item)" 
                v-if="$store.state.user.ut_id.description === 'TC Staff' && (canEditBillingItem(item, index) && item.status != 1)" 
                />

                <div v-if="item.status == 1" class="flex flex-auto justify-end">
                    <button class="flex-none px-4 py-2 my-2 rounded-lg duration-300 text-sm bg-green-500 text-white" @click="exportExcel(item)">
                        Export as Excel
                    </button>
                </div>

                </div>

                <!-- Detail Rows -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm text-gray-700">
                <div>
                    <div class="font-semibold text-gray-600">Due date:</div>
                    <div class="mt-1">{{ item.datetime_due ? getDateFormat(item.datetime_due) : '-' }}</div>
                </div>

                <div>
                    <div class="font-semibold text-gray-600">Date and time submitted:</div>
                    <div class="mt-1">{{ item.datetime_submit ? getDateTimeFormat(item.datetime_submit) : '-' }}</div>
                </div>

                <div>
                    <div class="font-semibold text-gray-600">Status:</div>
                    <div class="mt-1">
                    <span
                        class="px-2 py-1 rounded-full text-xs font-semibold"
                        :class="getStatusBadgeClass(item.status)"
                    >
                        {{ getStatusText(item.status) }}
                    </span>
                    </div>
                </div>

                 <div>
                    <div class="font-semibold text-gray-600">Dropped Trainees:</div>
                    <div class="mt-1">{{ item.total_dropped ? item.total_dropped : '-' }}</div>
                </div>

                <div class="col-span-2">
                    <div class="font-semibold text-gray-600">Total Budget:</div>
                    <h2 class="text-2xl">{{ item.total_payment ? formatPeso(item.total_payment) : '-' }}</h2>
                </div>

                <div>
                    <div class="font-semibold text-gray-600">Utilized Budget:</div>
                    <div class="mt-1">{{ item.total_utilized ? formatPeso(item.total_utilized) : '-' }}</div>
                </div>

                <div>
                    <div class="font-semibold text-gray-600">Unutilized Budget:</div>
                    <div class="mt-1">{{ item.total_unutilized ? formatPeso(item.total_unutilized) : '-' }}</div>
                </div>

                <div>
                    <div class="font-semibold text-gray-600">Date and time actioned:</div>
                    <div class="mt-1">{{ item.datetime_actioned ? getDateTimeFormat(item.datetime_actioned) : '-' }}</div>
                </div>

                <!-- <div>
                    <div>
                        <button class="font-semibold text-gray-600 hover:text-blue-600 focus:outline-none">
                        File
                        </button>
                    </div>
                    <div class="mt-1">
                        <span @click="openFile(item.uploaded_file)" :class="item.uploaded_file ? 'cursor-pointer hover:text-blue-600 duration-300 underline' : 'cursor-default'">{{ item.uploaded_file ? item.uploaded_file : 'No attached file yet' }}</span>
                    </div>
                </div> -->

                <div class="col-span-2">
                    <div class="font-semibold text-gray-600">Remarks: ({{ parseBillingRemarks(item.remarks).length }})</div>
                    <div class="mt-1 overflow-y-auto h-auto max-h-40">
                        <div>
                            <!-- Render parsed remarks for this item -->
                            <div v-if="parseBillingRemarks(item.remarks).length">
                            <div
                                v-for="(remark, index) in parseBillingRemarks(item.remarks)"
                                :key="index"
                                class="mb-2 p-2 rounded-lg border bg-white"
                            >
                                <div class="flex items-center gap-1">
                                <span>Status:</span>
                                <span
                                    class="px-2 py-1 rounded-full text-xs font-semibold"
                                    :class="getStatusBadgeClassRemarks(remark.status)"
                                >
                                    {{ remark.status }}
                                </span>
                                </div>

                                <div class="text-gray-700 my-2">
                                {{ remark.remarks ? remark.remarks : 'No remarks' }}
                                </div>

                                <div class="font-semibold text-gray-800 whitespace-pre-line">
                                <span class="font-thin">by:</span> {{ remark.name }}
                                </div>

                                <div class="text-gray-600 text-sm italic">
                                {{ formatDate(remark.datetime_added) }}
                                </div>
                            </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="col-span-2">
                    <div class="font-semibold text-gray-600">Trainees: ({{ item.list_trainees.length }})</div>
                    <div v-if="item.list_trainees" class="mt-6 overflow-y-auto max-h-80 bg-white">
                      <table class="min-w-full border-collapse text-xs">
                        <thead class="bg-gray-100 sticky top-0 z-10">
                            <tr>
                                <th class="px-4 py-2 border">#</th>
                                <th class="px-4 py-2 border">First Name</th>
                                <th class="px-4 py-2 border">Last Name</th>
                                <th class="px-4 py-2 border">Extension</th>
                                <th class="px-4 py-2 border">Middle Name</th>
                                <th class="px-4 py-2 border">SG Number</th>
                                <th class="px-4 py-2 border">Cost</th>
                                <th class="px-4 py-2 border">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(row, index) in item.list_trainees" :key="index" :class="row.status === 'dropped' || row.status === 'absent' ? 'bg-red-300 text-gray-800 bg-opacity-50' : 'bg-white text-gray-800'">
                                <td class="border px-4 py-2 text-center">{{ index + 1 }}</td>
                                <td class="border px-4 py-2">
                                    <span class="w-full text-xs">{{ row.fname }}</span>
                                </td>
                                <td class="border px-4 py-2">
                                    <span class="w-full text-xs">{{ row.lname }}</span>
                                </td>
                                <td class="border px-4 py-2">
                                    <span class="w-full text-xs">{{ row.extension }}</span>
                                </td>
                                <td class="border px-4 py-2">
                                    <span class="w-full text-xs">{{ row.mname }}</span>
                                </td>
                                <td class="border px-4 py-2">
                                    <span class="w-full text-center text-xs">{{ row.sg_number }}</span>
                                </td>
                                <td class="border px-4 py-2 text-center">
                                    <span class="w-full text-center text-xs">{{ row.training_cost }}</span>
                                </td>
                                <td class="border px-4 py-2 text-center">
                                    <span
                                        class="px-2 py-1 rounded-full text-xs font-semibold m-auto"
                                        :class="getStatusBadgeClassTrainees(row.status)"
                                    >
                                        {{ row.status }}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                        </div>
                </div>


                </div>

                <!-- Disabled Message -->
                <div v-if="!canEditBillingItem(item, index)" class="text-xs text-red-600 italic">
                Complete and approve the previous billing period to enable this one.
                </div>

                 <!-- Update Form -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm text-gray-700" v-if="item.status == 0 && $store.state.user.ut_id.description == 'PO Staff'">
                
                       
                <div>
                    <div class="font-semibold text-gray-600">Remarks: (if any) </div>
                    <textarea v-model="item.tempRemark" rows="2" class="mt-1 rounded-lg border-gray-200 w-full"></textarea>
                </div>
                

                </div>

                <div class="flex items-center gap-2 justify-start" v-if="item.status == 0 && $store.state.user.ut_id.description == 'PO Staff'">
                    <button class="px-4 py-2 my-2 rounded-lg duration-300 text-sm bg-gray-200 text-gray-800 hover:text-white" :class="isSubmitting ? 'bg-gray-100' : 'hover:bg-green-500 bg-gray-200'" @click="updateBillingStatement(item, 1)" :disabled="isSubmitting">
                        Approve
                    </button>
                    <button class="px-4 py-2 my-2 rounded-lg duration-300 text-sm bg-gray-200 text-gray-800 hover:text-white" :class="isSubmitting ? 'bg-gray-100' : 'hover:bg-red-500 bg-gray-200'" @click="updateBillingStatement(item, 2)" :disabled="isSubmitting">
                        Disapprove
                    </button>
                    <button class="px-4 py-2 my-2 rounded-lg duration-300 text-sm bg-gray-200 text-gray-800 hover:text-white" :class="isSubmitting ? 'bg-gray-100' : 'hover:bg-orange-500 bg-gray-200'" @click="updateBillingStatement(item, 3)" :disabled="isSubmitting">
                        Revise
                    </button>

                </div>
            </div>
            </template>
           

            

            </div>



          <!-- Your modal content here -->
        </div>

      </div>
    </div>

  </div>
</div>
        
    
    
    <LoadingView v-if="loadingViewShown"/>
        
    </template>
    
    <script>
    import axios from 'axios';
    import moment from 'moment';
    import * as XLSX from "xlsx";
    import LoadingView from '@/views/LoadingView.vue';

    export default{
        components: {
            LoadingView
        },
        props: {
            item_data : Object,
            refreshData : Function,
            showNotification : Function,
        },
        computed: {
        columnTotals() {
            const totals = {};

            // totals for first set (Full TSF, 50% TSF, TC)
            for (const header of this.list_summary_headers) {
                totals[header.id] = this.list_summary_trainees.reduce(
                    (sum, row) => sum + Number(row[header.id] || 0), 0
                );
            }

            // totals for AC headers
            for (const ac of this.ac_headers) {
                totals[ac.id] = this.list_summary_trainees.reduce(
                    (sum, row) => sum + Number(row[ac.id] || 0), 0
                );
            }

            return totals;
        },
        totalDropped() {
        // Count rows where status is "dropped"
        return this.student_rows.filter(row => row.status.toLowerCase() === "dropped").length;
        },
      totalUtilized() {
        return this.student_rows.reduce((sum, row) => {
            if (row.status === 'dropped' || row.status === 'absent') {
            row.payment = 0; // set payment to 0 for these rows
            }
            return sum + Number(row.payment || 0);
        }, 0);
        },
        totalUnutilized() {
        // Difference from total budget
        return this.billing_data.total_payment - this.totalUtilized;
        },
        parsedRemarks() {
            try {
                const remarks = JSON.parse(this.data.remarks || '[]');
                return remarks.sort((a, b) => new Date(b.datetime_added) - new Date(a.datetime_added));
            } catch (err) {
                return [];
            }
        },
         sortedBtypes() {
            return this.all_btypes
            ? this.all_btypes.map((bt) => {
                const match = this.all_billing_periods.find(
                    (bp) => bp.bt_id.id === bt.bt_id.id
                );

                let status = null;
                let datetime_actioned = null;
                if (match) {
                    status = match.status;
                    datetime_actioned = match.datetime_actioned;
                }
                

                return {
                    ...bt,
                    status,
                    datetime_actioned,
                };
                }).sort((a, b) => a.order_num - b.order_num)
            : [];
        },
        sortedBPeriods() {
            return this.all_billing_periods
                ? this.all_billing_periods
                    .slice() // clone to avoid mutation
                    .sort((a, b) => a.order_num - b.order_num)
                    .map(item => ({
                        ...item,
                        tempRemark: item.tempRemark || '' // attach UI-only field
                    }))
                : [];
        }
        },
        data(){
            return{
                loadingViewShown : false,
                title : '',
                action : '',
                remarks : null,
                data : {
                    id : 0,
                    ctrl_num : null,
                    tc_id : null,
                    sc_id : null,
                    q_id : null,
                    batch_name : null,
                    num_pax : null,
                    billed_amount : null,
                    isWorkback : null,
                    remarks : null,
                    status_id : 1,
                    datetime_received : null,
                    datetime_billed : null,
                    datetime_added : '',
                    uploaded_by : this.$store.state.user.id,
                },
                all_btypes : [],
                all_billing_periods : [],
                selectedStatus : null,
                inputted_code : null ,

                // Track the uploaded file
                selectedFile: null,
                selectedFileStudent: null,
                student_rows : [],
                // Your data model for form
                billing_data: {
                    id : null,
                    ctrl_num : null,
                    sc_id : null,
                    bt_id : null,
                    order_num : null,
                    datetime_actioned : null,
                    status : 0,
                    remarks : null,
                    user_id : this.$store.state.user.id,
                    total_payment: null,
                    datetime_due: null,
                    uploaded_file : null,
                    total_utilized : null,
                    total_unutilized : null,
                    total_dropped : null,
                    file_data: null, // This will store the actual file object
                },
                showForm: true, // Whether to show the form or not
                currentBillingName: '', // Name of the current Billing
                showUpdateBilling : false, 
                isSubmitting : false,
                showSummaryTrainee : false,
                list_summary_trainees : [],
                list_summary_headers: [],
                ac_headers : [],
                main_headers: [],
            }   
        },
        methods: {
            arrayBufferToBase64(buffer) {
            let binary = '';
            const bytes = new Uint8Array(buffer);
            const len = bytes.byteLength;

            for (let i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }

            return window.btoa(binary);
            },
            async exportExcel(data) {
                this.loadingViewShown = true;

                let sf_name = null;
                let admin_name = null;
                let e_sign_sf = null;
                let e_sign_admin = null;

                try {
                const res = await axios.get(
                    `${process.env.VUE_APP_BASE_URL}/user/find_user/${this.data.uploaded_by}`
                );

                if (res.status === 200) {
                    res.data;

                    sf_name = this.formatUserName(res.data.user_profile);

                    if (res.data.e_sign) {
                    const esignRes = await axios.get(
                        `${process.env.VUE_APP_BASE_URL}/user/get_img/${res.data.e_sign}/esign`,
                        { responseType: 'arraybuffer' }
                    );

                    const esignBase64 = this.arrayBufferToBase64(esignRes.data);
                    e_sign_sf = `data:image/png;base64,${esignBase64}`;
                    }

                } else {
                    return '-';
                }

                } catch (e) {
                console.error(e);
                return '-';
                }

                try {
                const res = await axios.get(
                    `${process.env.VUE_APP_BASE_URL}/user/find_user/${data.user_id}`
                );

                if (res.status === 200) {
                    res.data;

                    admin_name = this.formatUserName(res.data.user_profile);

                    if (res.data.e_sign) {
                    const esignRes = await axios.get(
                        `${process.env.VUE_APP_BASE_URL}/user/get_img/${res.data.e_sign}/esign`,
                        { responseType: 'arraybuffer' }
                    );

                    const esignBase64 = this.arrayBufferToBase64(esignRes.data);
                    e_sign_admin = `data:image/png;base64,${esignBase64}`;
                    }

                } else {
                    return '-';
                }

                } catch (e) {
                console.error(e);
                return '-';
                }


            try {
                const merged_data = {
                billing_record: [this.data],
                billing_period: [data],
                prepared_by: sf_name,
                prepared_by_pos: 'Scholarship Focal',
                e_sign_sf : e_sign_sf,
                approved_by: admin_name,
                approved_by_pos: 'Administrator',
                e_sign_admin : e_sign_admin,
                };

                const res = await axios.post(
                `${process.env.VUE_APP_BASE_URL}/billing_periods/export_excel`,
                {
                    type: 'custom_billing_export',
                    data: merged_data,
                }
                );

                this.loadingViewShown = false;

                const fileName = res.data.fileName;

                const fileUrl = `${process.env.VUE_APP_BASE_URL}/billing_periods/get_exported_excel_file/${fileName}`;

                window.open(fileUrl, '_blank');
            } catch (error) {
                console.error('Excel export failed:', error);
            } 
            },
            getACStatus(acId, row) {
                const value = row[acId];
                // If AC value is 0 or missing, mark dropped, otherwise Competent/NYC
                if (!value || Number(value) === 0) return '-'; // Or dropped if you want
                return row[acId + '_status'] || 'Competent'; // Default to Competent if no specific status
            },
            getRowTotal(row) {
                let total = 0;
                for (const header of this.list_summary_headers) {
                    const key = header.id;      // bt_18, bt_19, bt_20
                    total += Number(row[key] || 0);
                }
                return total;
            },
           computedStatus(row) {
                // Combine main_headers and ac_headers into a single array for iteration
                const headersToCheck = [...this.main_headers, ...this.ac_headers];

                for (const header of headersToCheck) {
                    const value = row[header.id];

                    // If value is 0, null, undefined, or "0", mark as dropped
                    if (!value || Number(value) === 0) {
                        return 'dropped';
                    }
                }

                return row.status; // default trainee status
            },
            getSummaryTrainees(){
                this.showSummaryTrainee = true;

                axios.get(process.env.VUE_APP_BASE_URL + '/trainees/get_trainees_summary/' + this.data.ctrl_num)
                .then((res)=>{
                
                    if(res.status == 200){

                        this.ac_headers = res.data.headers.filter(h => h.description === 'AC');
                        this.main_headers = res.data.headers.filter(h => h.description !== 'AC');

                        this.list_summary_trainees = res.data.data;

                    }
                    
                })
                .catch(err => {
                    console.error(err);
                    this.showNotification('Error fetching trainee summary', 'error');
                });
                
            },
            addRow() {
            this.student_rows.push({
                fname: "",
                lname: "",
                extension: "",
                mname: "",
                sg_number: "",
                payment: 0,
                status: "active", 
            });
            this.recalculatePayments();
            },
            deleteRow(index) {
            this.student_rows.splice(index, 1);
            this.recalculatePayments();
            },
            recalculatePayments() {
            if (!this.student_rows.length) return;
            const perRow = this.billing_data.total_payment / this.student_rows.length;
            this.student_rows.forEach((row) => (row.payment = perRow));
            },
             triggerFileInputStudents() {
            this.$refs.fileInputStudents.click();
            },

            handleFileChangeStudents(event) {
            const file = event.target.files[0];
            if (file) {
                this.selectedFileStudent = file;
                this.parseExcelFile(file);
            }
            },

            handleFileDropStudents(event) {
            const file = event.dataTransfer.files[0];
            if (file) {
                this.selectedFileStudent = file;
                this.parseExcelFile(file);
            }
            },
            parseExcelFile(file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: "array" });
                const sheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "" });

                const numRows = jsonData.length;
                const perRow = this.billing_data.total_payment / numRows;

                this.student_rows = jsonData.map((row) => ({
                fname: row["First Name"] || "",
                lname: row["Last Name"] || "",
                extension: row["Extension"] || "",
                mname: row["Middle Name"] || "",
                sg_number: row["SG Number"] || "",
                payment: perRow, // initialize payment
                status: row["Status"] || "active", // initialize payment
                }));
            };
            reader.readAsArrayBuffer(file);
            },
            parseBillingRemarksCount(remarks) {
                try {
                    const parsed = JSON.parse(remarks || '[]');
                    return parsed.length; // returns the number of rows
                } catch (err) {
                    console.error('Failed to parse remarks:', err);
                    return 0; // return 0 if parsing fails
                }
            },
            parseBillingRemarks(remarks) {
            try {
                const parsed = JSON.parse(remarks || '[]');

                // Sort by datetime_added descending (newest first)
                return parsed.sort((a, b) => new Date(b.datetime_added) - new Date(a.datetime_added));
                
                // ⬅️ If you want oldest first, reverse the comparison:
                // return parsed.sort((a, b) => new Date(a.datetime_added) - new Date(b.datetime_added));
            } catch (err) {
                console.error('Failed to parse remarks:', err);
                return [];
            }
            },
            formatDate(dateStr) {
                return new Date(dateStr).toLocaleString();
            },
            canEditBillingItem(item, index) {

                if(this.data.status_id === 1){
                    // If it's the first item (index 0), check if main record status is approved (status_id == 1)
                    if (index === 0 && this.data.status_id === 1) {
                        return true; // First item enabled if status_id is 1
                    }

                    // If any previous item has status null or is not approved, disable the current item
                    for (let i = 0; i < index; i++) {
                        const prevItem = this.sortedBPeriods[i];
                        if (prevItem.status === null || prevItem.status !== 1) {
                            return false; // Disable if any previous item is not approved
                        }
                    }

                    // Enable current item if all previous items are approved (status === 1)
                    return true;
                }
                
            }
            ,
            showUpdateBillingModal(data){
                this.billing_data = {};
                this.student_rows.splice(0);
                this.billing_data = data;
                this.billing_data.total_utilized = data.total_payment;  
                this.billing_data.datetime_due = data.datetime_due;
                this.getTrainees(this.data.ctrl_num,data.bt_id.id)
                this.showUpdateBilling = true;
            },
            openFile(path){
                window.open(process.env.VUE_APP_BASE_URL + '/billing_periods/get_file/' + encodeURIComponent(path));
            },

    // Handle form submission
    updateBillingData() {

        // if(this.billing_data.file_data == null){
        //     this.showNotification(0,"No attached file","Please upload file");
        //     return;
        // }
        if(this.student_rows.length <= 0){
            this.showNotification(0,"No attached students","Please upload students");
            return;
        }
        // else if(this.billing_data.total_dropped == null){
        //     this.showNotification(0,"No value for Total Dropped Trainees","Please input total dropped trainees");
        //     return;
        // }
        else{

            this.isSubmitting = true;

            const today = new Date();
            const date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const timestamp = date + ' ' + time;

            this.billing_data.status = 0;
            this.billing_data.datetime_submit = timestamp;
            this.billing_data.user_id = this.$store.state.user.id;


            this.billing_data.total_dropped = this.student_rows.filter(row => row.status.toLowerCase() === "dropped").length;
            this.billing_data.total_utilized = this.student_rows.reduce((sum, row) => sum + Number(row.payment || 0), 0);
            this.billing_data.total_unutilized = this.billing_data.total_payment - this.billing_data.total_utilized;
            this.billing_data.ctrl_num = this.data.ctrl_num;

                    
            axios.post(process.env.VUE_APP_BASE_URL + '/billing_periods/edit', this.billing_data)
            .then((res2)=>{

                if(res2.status == 201){

                    this.isSubmitting = false;

                    this.showNotification(1,"Success","Billing Record updated!");
                    this.refreshData();
                    this.findData();
                    this.selectedStatus = null;
                    this.showUpdateBilling = false;

            if (this.student_rows && this.student_rows.length > 0) {
            
                const updatePayload = this.student_rows.map(s => ({
                    id: s.id,                  // trainee DB id
                    ctrl_num: s.ctrl_num,
                    bt_id: s.bt_id,
                    fname: s.fname,
                    mname: s.mname,
                    lname: s.lname,
                    extension: s.extension,
                    sg_number: s.sg_number,
                    training_cost: s.payment,  // if you use .payment in your student_rows
                    status: s.status
                }));

                axios.put(`${process.env.VUE_APP_BASE_URL}/trainees/update_many`, updatePayload)
                    .then(res => {
                        console.log(res);
                        this.showNotification(1, "Success", "Trainees updated successfully!");
                        this.findData();
                        this.refreshData();
                    })
                    .catch(err => {
                        console.error(err);
                        this.showNotification(0, "Error", "Failed to update trainees");
                    });

            
            }

            if(this.billing_data.file_data){
                axios.post(process.env.VUE_APP_BASE_URL + '/billing_periods/upload_file', this.billing_data.file_data)
                .then((res)=>{
                    console.log(res);
                });
            }
                    
                }

                
            });

        }
       
    },
             // Handle file drop
            handleFileDrop(event) {
            const files = event.dataTransfer.files;
            if (files.length > 0) {
                this.selectedFile = files[0];
                var fileArray = this.selectedFile.name.split(".");
                var fileExt = fileArray[fileArray.length - 1].toLowerCase().trim();

                this.billing_data.uploaded_file = this.data.ctrl_num + "_" + this.billing_data.bt_id.abbre + "." + fileExt;  // Set the uploaded file name

                const formdata = new FormData();
                
                formdata.append("file", this.selectedFile, this.data.ctrl_num + "_" +  this.billing_data.bt_id.abbre + "." + fileExt);
                this.billing_data.file_data = formdata;
            }
            },

            // Trigger the hidden file input on click
            triggerFileInput() {
            this.$refs.fileInput.click();
            },

            // Handle file selection
            handleFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.selectedFile = file;

                var fileArray = this.selectedFile.name.split(".");
                var fileExt = fileArray[fileArray.length - 1].toLowerCase().trim();

                this.billing_data.uploaded_file = this.data.ctrl_num + "_" +  this.billing_data.bt_id.abbre + "." + fileExt;  // Set the uploaded file name

                const formdata = new FormData();
                
                formdata.append("file", this.selectedFile, this.data.ctrl_num + "_" +  this.billing_data.bt_id.abbre + "." + fileExt);
                this.billing_data.file_data = formdata;
            }
            },
            showUpdateForm(status){

                // const today = new Date();

                this.selectedStatus = status;
                // this.inputted_code = 'PQM-'+ today.getFullYear() +'-' + (this.data.sc_id ? this.data.sc_id.abbre : '') + '-CODE HERE-0000';
                // if(this.selectedStatus){
                //     //
                // }
            },
            updateBillingStatement(item, status) {
                this.isSubmitting = true;

                const newRemark = {
                    user_id: this.$store.state.user.id,
                    name: this.formatUserName(this.$store.state.user.user_info),
                    remarks: item.tempRemark || '', // use static input
                    status: this.getStatusText(status),
                    datetime_added: this.getDefaultTimeFormat(),
                };

                // Parse existing remarks
                let remarksArray = [];
                try {
                    if (item.remarks && typeof item.remarks === 'string') {
                        remarksArray = JSON.parse(item.remarks);
                    }
                } catch (err) {
                    remarksArray = [];
                }

                remarksArray.push(newRemark);

                const new_data = {
                    id: item.id,
                    status: status,
                    remarks: JSON.stringify(remarksArray),
                    datetime_actioned: this.getDefaultTimeFormat(),
                    user_id: this.data.uploaded_by
                };

                axios.post(process.env.VUE_APP_BASE_URL + '/billing_periods/update_status', new_data)
                    .then((res) => {
                        if (res.status === 201) {
                            this.isSubmitting = false;
                            this.showNotification(1, "Success", "Billing Statement updated!");
                            
                            this.refreshData();
                            this.findData();

                            // Clear temp remark
                            item.tempRemark = '';
                        }
                    });
            },
            updateStatus() {
                this.isSubmitting = true;

                const newRemark = {
                    user_id: this.$store.state.user.id, // assuming you store user ID here
                    name: this.formatUserName(this.$store.state.user.user_info), // assuming you store user name here
                    remarks: this.remarks,
                    status: this.getStatusText(this.selectedStatus),
                    datetime_added: this.getDefaultTimeFormat(),
                };

                // If remarks is a stringified JSON array, parse it. If not, initialize.
                let remarksArray = [];
                try {
                    if (this.data.remarks) {
                        remarksArray = JSON.parse(this.data.remarks);
                    }
                } catch (err) {
                    // handle invalid JSON
                    remarksArray = [];
                }

                // Push the new remark
                remarksArray.push(newRemark);

                const new_data = {
                    id: this.data.id,
                    status_id: this.selectedStatus,
                    sc_id: this.data.sc_id,
                    ctrl_num: this.inputted_code,
                    remarks: JSON.stringify(remarksArray), // save as stringified JSON
                };

                axios.post(process.env.VUE_APP_BASE_URL + '/billing_records/update_status', new_data)
                    .then((res) => {
                        if (res.status == 201) {
                            this.isSubmitting = false;
                            this.showNotification(1, "Success", "Record updated!");
                            this.refreshData();
                            this.findData();
                            this.selectedStatus = null;
                        }
                    });
            },
            formatPeso(value) {
                if (value == null || isNaN(value)){
                    return '-';
                }
                else if(value == 0){
                    return new Intl.NumberFormat('en-PH', {
                    style: 'currency',
                    currency: 'PHP',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                    }).format(0);
                }
                else{
                    return new Intl.NumberFormat('en-PH', {
                    style: 'currency',
                    currency: 'PHP',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                    }).format(value);
                }
            },
            getBookmarkTriangleClass(status) {
            let color = 'bg-gray-400';
            if (status === 1) color = 'bg-green-500';
            else if (status === 2) color = 'bg-red-500';
            else if (status === 3) color = 'bg-orange-400';

            return `w-0 h-0 border-t-[40px] border-t-transparent border-l-[40px] ${color} border-r-0 border-b-0`;
            },
            getStatusBadgeClassRemarks(status) {
                switch (status) {
                case 'Approved':
                    return 'bg-green-100 text-green-800';
                case 'Completed':
                    return 'bg-green-100 text-green-800';
                case 'Disapproved':
                    return 'bg-red-100 text-red-800';
                case 'Denied':
                    return 'bg-red-100 text-red-800';
                case 'Revised':
                    return 'bg-orange-100 text-orange-800';
                default:
                    return 'bg-gray-100 text-gray-600';
                }
            },
            getStatusBadgeClass(status) {
                switch (status) {
                case 1:
                    return 'bg-green-100 text-green-800';
                case 2:
                    return 'bg-red-100 text-red-800';
                case 3:
                    return 'bg-orange-100 text-orange-800';
                default:
                    return 'bg-gray-100 text-gray-600';
                }
            },
             getStatusBadgeClassTrainees(status) {
                switch (status) {
                case 'active':
                    return 'bg-green-100 text-green-800';
                case 'absent':
                    return 'bg-red-100 text-red-800';
                case 'dropped':
                    return 'bg-red-100 text-red-800';
                case 'inactive':
                    return 'bg-orange-100 text-orange-800';
                case 'nyc':
                    return 'bg-orange-100 text-orange-800';
                case 'competent':
                    return 'bg-orange-100 text-orange-800';
                default:
                    return 'bg-gray-100 text-gray-600';
                }
            },
            getStatusText(status) {
                switch (status) {
                case 0:
                    return 'Pending';
                case 1:
                    return 'Completed';
                case 2:
                    return 'Denied';
                case 3:
                    return 'Revised';
                default:
                    return 'No action yet';
                }
            },
            getStatusMainText(status) {
                switch (status) {
                case 1:
                    return 'Approved';
                case 2:
                    return 'Denied';
                case 3:
                    return 'Revised';
                default:
                    return 'Pending';
                }
            },
            getDefaultTimeFormat(){
                const today = new Date();
                const date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
                const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                const timestamp = date + ' ' + time;
                return timestamp;
            },
            getDateTimeFormat(value) {
                if (!value) return "-";

                const m = moment(value);
                if (!m.isValid()) return "-";

                return m.format("MMMM DD, YYYY h:mm a");
            },
            getDateFormat(value){
                if(value) return moment(value).format('MMMM DD, YYYY');
                else return null;
            },
            formatUserName(i){
                if(i != null){
                    return i.lname + ", " + i.fname + " " + (i.mname ? i.mname : '') + " " + (i.suffix ? i.suffix : '');
                }
                else return "-";
            },
            getBillingSetTypes(id){
                axios.get(process.env.VUE_APP_BASE_URL + '/billing_set_types/find_by_sc_id/' + id)
                .then((res)=>{
                
                    if(res.status == 200){
                        this.all_btypes = res.data;
                    }
                    
                })
                .catch(err => {
                    console.error(err);
                    this.showNotification('Error fetching bill types', 'error');
                });
            },
            getBillingPeriods(ctrl_num){
                axios.get(process.env.VUE_APP_BASE_URL + '/billing_periods/find_by_ctrl_num/' + ctrl_num)
                .then((res)=>{
                
                    if(res.status == 200){
                        this.all_billing_periods = res.data;
                    }
                    
                })
                .catch(err => {
                    console.error(err);
                    this.showNotification('Error fetching bill types', 'error');
                });
            },
            getTrainees(ctrl_num,bt_id){
                axios.get(process.env.VUE_APP_BASE_URL + '/trainees/get_trainees/' + ctrl_num + '/' + bt_id)
                .then((res)=>{
                
                    if(res.status == 200){


                        for(var i = 0; i < res.data.length; i++){
                            this.student_rows.push({
                                id : res.data[i].id,
                                fname : res.data[i].fname,
                                mname : res.data[i].mname,
                                lname : res.data[i].lname,
                                extension : res.data[i].extension,
                                sg_number : res.data[i].sg_number,
                                payment : res.data[i].training_cost,
                                ctrl_num : ctrl_num,
                                bt_id : bt_id,
                                status : res.data[i].status,
                            })
                        }
                    }
                    
                })
                .catch(err => {
                    console.error(err);
                    this.showNotification('Error fetching bill types', 'error');
                });
            },
            findData(){
                axios.get(process.env.VUE_APP_BASE_URL + '/billing_records/find/' + this.data.id)
                .then((res)=>{
                
                    if(res.status == 200){
                
                        this.data = res.data;
                        this.title = this.data.ctrl_num + ' - ' + this.data.batch_name;
                        this.getBillingSetTypes(this.data.sc_id.id);
                        this.getBillingPeriods(this.data.ctrl_num);
                
                    }
                    
                })
                .catch(err => {
                    console.error(err);
                    this.showNotification('Error fetching data', 'error');
                });
            },
            closeModal(){
                this.$refs.modal.classList.remove('animate__slideInUp');
                this.$refs.modal.classList.add('animate__slideOutDown');

                setTimeout(() => {
                    this.$emit('close-modal');
                }, 300)
            }
        },
        watch: {
            item_data: {
            handler(val){
                this.data.id = val.id;

                this.action = val.action;

                this.findData();
                
                
            },
            immediate:true
          },
        }
    }
        
    </script>

    <style>
/* Fade transition for steps */
.fade-enter-active, .fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>