<template>
    <div class="flex-auto flex flex-col page-anim">

        <div class="px-6 pt-6">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <h1 class="text-2xl font-semibold text-slate-900">Training Centers</h1>

                <div class="flex items-center gap-2">
                    <button
                        class="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 rounded-lg duration-200 shadow-sm"
                        @click="openModal('add',0)"
                    >
                        <span class="text-base leading-none">+</span>
                        <span class="text-sm font-semibold">Add Training Center</span>
                    </button>

                    <button
                        class="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg duration-200 shadow-sm"
                        @click="generateSummary()"
                    >
                        <svg viewBox="0 0 24 24" fill="none" class="w-4 h-4">
                            <path
                                d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"
                                stroke="currentColor"
                                stroke-width="1.8"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M14 3v5h5"
                                stroke="currentColor"
                                stroke-width="1.8"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M8 13h8M8 17h6"
                                stroke="currentColor"
                                stroke-width="1.8"
                                stroke-linecap="round"
                            />
                        </svg>
                        <span class="text-sm font-semibold">Generate Summary</span>
                    </button>
                </div>
            </div>

            <div class="mt-4">
                <div class="relative max-w-xl">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <svg viewBox="0 0 24 24" fill="none" class="w-4 h-4">
                            <path
                                d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
                                stroke="currentColor"
                                stroke-width="1.8"
                            />
                            <path
                                d="M21 21l-4.35-4.35"
                                stroke="currentColor"
                                stroke-width="1.8"
                                stroke-linecap="round"
                            />
                        </svg>
                    </span>
                    <input
                        type="text"
                        class="w-full rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 px-10 py-2.5 shadow-sm"
                        placeholder="Search training center..."
                        @input="getAllData($event.target.value, 'search')"
                    >
                </div>
            </div>
        </div>

        <div class="bg-white mx-6 my-5 rounded-2xl shadow-sm border border-slate-100">
        <div class="relative scrollbar sm:rounded-2xl overflow-hidden">

        <table class="w-full text-sm text-left text-gray-500">
            <thead class="text-xs text-slate-500 uppercase bg-slate-50">
                <tr>
                    <th scope="col" class="px-6 py-4 text-left">
                    Name
                    </th>
                    <th scope="col" class="px-6 py-4 w-24 text-center">
                    Abbr
                    </th>
                    <th scope="col" class="px-6 py-4 w-64 text-left">
                    Type
                    </th>
                    <th scope="col" class="px-6 py-4 text-left">
                    Address
                    </th>
                    <th scope="col" class="px-6 py-4 w-56 text-left">
                    Date Added
                    </th>
                    <!-- <th scope="col" class="px-6 py-3 text-center">
                    Approval Status
                    </th> -->
                    <!-- <th scope="col" class="px-6 py-3 text-center w-10">
                    Released
                    </th> -->
                    <th scope="col" class="px-6 py-4 text-center w-28">
                    Actions
                    </th>
                </tr>
            </thead>
            <tbody>

            <tr v-if="alldata.length == 0">
                <td colspan="6" class="py-8 text-center text-gray-500 text-sm">
                There are no files yet.
                </td>
            </tr>

                <tr
                    v-for="(i, idx) in alldata"
                    v-bind:key="i.id"
                    class="border-b border-slate-100 hover:bg-slate-50 transition item-anim"
                    :style="{ animationDelay: `${Math.min(idx, 20) * 30}ms` }"
                >
                    <td class="py-5 px-6 text-left font-semibold text-slate-800">
                    {{checkIfEmpty(i.description)}}
                    </td>
                    <td class="py-5 px-6 text-center font-medium text-slate-600">
                    {{checkIfEmpty(i.abbre)}}
                    </td>
                    <td class="py-5 px-6 text-left text-slate-600">
                    {{i.tc_type_id ? i.tc_type_id.description : '-'}}
                    </td>
                    <td class="py-5 px-6 text-left text-slate-500">
                    {{i.address ? i.address + ', ' + i.province : '-'}}
                    </td>
                    <td class="px-6 py-5 text-left text-slate-500">
                    {{getDateTimeFormat(i.datetime_added)}}
                    </td>
                    <td class="px-6 py-5 text-center w-auto">
                        <div class="inline-flex items-center justify-center">
                            <img
                                src="../assets/icon_edit.png"
                                class="h-4 w-auto cursor-pointer opacity-70 hover:opacity-100 transition"
                                alt=""
                                role="button"
                                tabindex="0"
                                @click="openModal('edit', i.id)"
                                @keydown.enter="openModal('edit', i.id)"
                                @keydown.space.prevent="openModal('edit', i.id)"
                            />
                            <span class="mx-3 h-4 w-px bg-slate-200"></span>
                            <img
                                src="../assets/action_icon_view.png"
                                class="h-4 w-auto cursor-pointer opacity-70 hover:opacity-100 transition"
                                alt=""
                                role="button"
                                tabindex="0"
                                @click="openModal('view', i.id)"
                                @keydown.enter="openModal('view', i.id)"
                                @keydown.space.prevent="openModal('view', i.id)"
                            />
                            <span class="mx-3 h-4 w-px bg-slate-200"></span>
                            <img
                                src="../assets/action_icon_list.png"
                                class="h-4 w-auto cursor-pointer opacity-70 hover:opacity-100 transition"
                                alt=""
                                role="button"
                                tabindex="0"
                                @click="openSQModal('edit', i.id)"
                                @keydown.enter="openSQModal('edit', i.id)"
                                @keydown.space.prevent="openSQModal('edit', i.id)"
                            />
                        </div>
                    </td>
                </tr>
                
            </tbody>
        </table>
                        
        </div>

        <div class="px-6 py-4 flex items-center justify-end" v-if="alldata.length > page_limit">
            <div class="pagination_cmp">
                <vue-awesome-paginate 
                :total-items="total_cnt" 
                :items-per-page="page_limit"
                v-model="page"
                @click="getAllData(null,null)">
                <template #prev-button>
                    <span>
                    Prev
                    </span>
                </template>

                <template #next-button>
                    <span>
                    Next
                    </span>
                </template>
                </vue-awesome-paginate>
            </div>
        </div>



</div>
        
    </div>

    <AddTrainingCenter v-if="show_Modal_Add" @close-modal="show_Modal_Add = false" :refreshData="refreshData" :showNotification="showNotification" :item_data="item_data"/>
    <AddTCScholarshipQualification v-if="show_Modal_SQ" @close-modal="show_Modal_SQ = false" :refreshData="refreshData" :showNotification="showNotification" :item_data="item_data"/>
  
</template>

<script>

import AddTrainingCenter from '@/components/Modals/AddTrainingCenter.vue';
import AddTCScholarshipQualification from '@/components/Modals/AddTCScholarshipQualification.vue';
import axios from 'axios';
import moment from 'moment';

export default{
    components: {
        AddTrainingCenter,
        AddTCScholarshipQualification
    },
    mounted(){
        this.refreshData();
    },
    props:{
        showNotification : Function
    },
    data(){
        return{
            alldata : [],
            page: 1,
            total_cnt: 0,
            total_pages : 0,
            page_limit : 25,
            isLoading: false,
            show_Modal_Add : false,
            show_Modal_SQ : false,

            item_data : {
                id : 0,
            }
        }
    },
    methods: {
        refreshData(){
            this.getAllData(null,null);
        },
        getDateTimeFormat(value){
        return moment(value).format('MMMM DD, YYYY h:mm a');
        },
        checkIfEmpty(val){
        if(val) return val;
        else return "-";
        },
        formatUserName(i){
            if(i != null){
                return i.lname + ", " + i.fname + " " + (i.mname ? i.mname : '') + " " + (i.suffix ? i.suffix : '');
            }
            else return "-";
        },
        openModal(action, id){
            this.item_data.action = action;
            this.item_data.id = id;
            this.show_Modal_Add = true;
        },
        openSQModal(action, id){
            this.item_data.action = action;
            this.item_data.id = id;
            this.show_Modal_SQ = true;
        },
        getAllData(search_value, type) {
            const params = {};

            if (search_value !== null && type) {
                params.value = search_value;
                params.type = type;
            }

            axios.get(
                `${process.env.VUE_APP_BASE_URL}/training_centers/get_all_by_page/${this.page}/${this.page_limit}`,
                { params }  
            )
            .then(res => {
                if (res.status === 200) {
                    this.alldata = res.data[0];
                    this.total_cnt = res.data[1];
                }
            });
        },
        formatName(data){
            const lname = data.lname ? data.lname : '';
            const fname = data.fname ? data.fname : '';
            const mname = data.mname ? data.mname : '';
            const extension = data.extension ? data.extension : '';

            return lname + ', ' + fname + ' ' + mname + ' ' + extension;
        },
         async generateSummary() {
        try {
            this.isLoading = true;

            let file_data = {};

            file_data = {
            prepared_by : this.formatName(this.$store.state.user.user_info),
            };

            file_data.file_name = new Date().getFullYear() + "_summary_training_centers";

            const response = await axios.post(
            `${process.env.VUE_APP_BASE_URL}/training_centers/generate_summary`,
            file_data
            );

            // ✅ Backend should ideally return { fileName: '...xlsx' }
            if (response.status === 200 || response.status === 201) {
            const fileName = response.data.fileName || file_data.file_name;

            const fileUrl = `${process.env.VUE_APP_BASE_URL}/training_centers/get_summary/${fileName}`

            // Open or download the file
            window.open(fileUrl, '_blank');
            }

        } catch (error) {
            console.error('Error generating report:', error);
        } finally {
            this.isLoading = false;
        }
        },
    }
}

</script>

<style scoped>
.page-anim{
  animation: pageFadeUp 520ms cubic-bezier(.2,.9,.2,1) both;
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

@keyframes itemFadeUp{
  from{ opacity: 0; transform: translateY(10px); }
  to{ opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce){
  .page-anim, .item-anim{ animation: none !important; transform: none !important; opacity: 1 !important; }
}
</style>