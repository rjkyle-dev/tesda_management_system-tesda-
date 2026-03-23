<template>
    <div class="flex-auto flex flex-col">

        <div class="bg-white border-b py-3">
        <div class="flex items-center w-full gap-3">
        <div class="flex-none sm:flex-none">
            <button class="bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 ml-2 my-2 rounded-lg duration-300" @click="openModal('add',0)">
                Add Training Center +
            </button>

            <button class="bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 mx-2 my-2 rounded-lg duration-300" @click="generateSummary()">
                Generate Summary
            </button>
        </div>
        <div class="flex-none sm:flex-auto">
            <input type="text" class="w-full rounded-md border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 px-3 py-2" placeholder="Search training center.." @input="getAllData($event.target.value, 'search')">
        </div>
        <div class="flex-auto sm:flex-none">
            <div class="pagination_cmp px-3" v-if="alldata.length > page_limit">
                <vue-awesome-paginate 
                :total-items="total_cnt" 
                :items-per-page="page_limit"
                v-model="page"
                @click="getAllData(null,null)">
                <template #prev-button>
                    <span>
                    <!-- <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="black"
                        width="8"
                        height="8"
                        viewBox="0 0 24 24"
                    >
                        <path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z" />
                    </svg> -->
                    Prev
                    </span>
                </template>

                <template #next-button>
                    <span>
                    Next
                    <!-- <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="black"
                        width="8"
                        height="8"
                        viewBox="0 0 24 24"
                    >
                        <path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z" />
                    </svg> -->
                    </span>
                </template>
                </vue-awesome-paginate>
            </div>
        </div>
    </div>
    </div>

        <div class="bg-white m-4 p-4 rounded-md shadow-sm">


        <div class="relative scrollbar sm:rounded-lg border">

        <table class="w-full text-sm text-left text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" class="px-6 py-3 w-16 text-left">
                    Name
                    </th>
                    <th scope="col" class="px-6 py-3 w-16 text-center">
                    Abbreviation
                    </th>
                    <th scope="col" class="px-6 py-3 w-16 text-center">
                    Type
                    </th>
                    <th scope="col" class="px-6 py-3 w-16 text-center">
                    Address
                    </th>
                    <th scope="col" class="py-3 text-center w-28">
                    Date & Time added
                    </th>
                    <!-- <th scope="col" class="px-6 py-3 text-center">
                    Approval Status
                    </th> -->
                    <!-- <th scope="col" class="px-6 py-3 text-center w-10">
                    Released
                    </th> -->
                    <th scope="col" class="px-6 py-3 text-center w-28">
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

                <tr v-for="i in alldata" v-bind:key="i.id" class="border-b hover:bg-gray-100 transition">
                    <td class="py-4 px-6 text-left w-16">
                    {{checkIfEmpty(i.description)}}
                    </td>
                    <td class="py-4 px-2 text-center w-16">
                    {{checkIfEmpty(i.abbre)}}
                    </td>
                    <td class="py-4 px-2 text-center w-16">
                    {{i.tc_type_id ? i.tc_type_id.description : '-'}}
                    </td>
                    <td class="py-4 px-2 text-center w-16">
                    {{i.address ? i.address + ', ' + i.province : '-'}}
                    </td>
                    <td class="px-2 py-4 text-center w-28">
                    {{getDateTimeFormat(i.datetime_added)}}
                    </td>
                    <td class="px-6 py-4 text-center w-auto">
                    <div class="flex items-center justify-center h-full"> 
                        <span class="flex items-center space-x-2">
                        <img src="../assets/icon_edit.png"
                            class="h-4 w-auto cursor-pointer"
                            @click="openModal('edit', i.id)" />
                        <img src="../assets/action_icon_view.png"
                            class="h-4 w-auto cursor-pointer"
                            @click="openModal('view', i.id)" />
                        <img src="../assets/action_icon_list.png"
                            class="h-4 w-auto cursor-pointer"
                            @click="openSQModal('edit', i.id)" />
                        </span>
                    </div>
                    </td>
                </tr>
                
            </tbody>
        </table>
                        
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
            alldata : '',
            page: 1,
            total_cnt: 0,
            total_pages : 0,
            page_limit : 25,
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