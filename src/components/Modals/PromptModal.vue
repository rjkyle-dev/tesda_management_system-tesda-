<template>

    <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
    
        <div class="fixed z-10 inset-0 overflow-y-auto my-4">
        
        <div class="flex items-center sm:items-center justify-center min-h-full px-8 py-2 sm:p-0 w-full max-w-1/3 mx-auto">
        
            <div class="bg-white shadow rounded-lg w-1/4 max-w-3xl fadeInSlide">

            <div class="flex items-center px-4 py-3">
                <div class="flex-auto text-lg font-bold leading-6 text-gray-900 text-left">{{title}}</div>
                <div class="flex-none">
                    <img src="../../assets/icon_close_red.png" class="p-2 w-auto h-8 cursor-pointer" @click="closeModal()"/>
                </div>
            </div>
            <div class="">
                <div class="mx-auto text-center px-4">
                    <img src="../../assets/modal_warning.png" class="w-1/6 h-auto mx-auto"/>
                </div>
                

                <div class="max-w-xl text-sm text-gray-700 p-4 text-justify">
                <div v-html="msg"></div>
                </div>

                <div class="mt-5 flex">
                    <button type="button" @click="closeModal" class="flex-1 inline-flex items-center justify-center rounded-bl-md border border-transparent bg-gray-100 px-4 py-4 font-bold text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm">CANCEL</button>
                    <button type="button" @click="confirmAction" class="flex-1 inline-flex items-center justify-center rounded-br-md border border-transparent bg-green-600 px-4 py-4 font-bold text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:text-sm">CONFIRM</button>
                    
                </div>
            </div>
            </div>

            
    
            </div>

        </div>
    
    </div> 
        
    
    
    <LoadingView v-if="loadingViewShown"/>
        
    </template>
    
    <script>
    import axios from 'axios';
    import LoadingView from '@/views/LoadingView.vue';

    export default{
        props: {
            prompt_data : Object,
            refreshData : Function,
            showNotification : Function,
            closeSecondModal : Function,
        },
        data(){
            return{
                title : '',
                msg : '',
                action : '',
                data : '',
                loadingViewShown : false,
            }
        },
        components: {
            LoadingView
        },
        methods: {
            removeCharacters(val){
                return val.replaceAll(",", '');
            },
            confirmAction(){


                const today = new Date();
                const date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
                const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                const timestamp = date + ' ' + time;

                var pass_data = '';

                var remark_data = '';
                var record_logs_data = '';

                var status_description = '';

                if(this.action == "delete office"){

                pass_data = {
                    id : this.data.id
                }

                axios.post(process.env.VUE_APP_BASE_URL + '/offices/delete', pass_data)
                .then((res)=>{

                    if(res.status == 201){
                        
                        this.showNotification(1,"Success!","Office has been deleted");
                        this.refreshData();
                        this.closeModal();

                    }
                    
                });

                }
                else if(this.action == "delete supplier"){

                pass_data = {
                    id : this.data.id
                }

                axios.post(process.env.VUE_APP_BASE_URL + '/suppliers/delete', pass_data)
                .then((res)=>{

                    if(res.status == 201){
                        
                        this.showNotification(1,"Success!","Supplier has been deleted");
                        this.refreshData();
                        this.closeModal();

                    }
                    
                });

                }
                else if(this.action == "delete finance type"){

                pass_data = {
                    id : this.data.id
                }

                axios.post(process.env.VUE_APP_BASE_URL + '/finance_types/delete', pass_data)
                .then((res)=>{

                    if(res.status == 201){
                        
                        this.showNotification(1,"Success!","Finance Type has been deleted");
                        this.refreshData();
                        this.closeModal();

                    }
                    
                });

                }

                else if(this.action == "delete payee type"){

                pass_data = {
                    id : this.data.id
                }

                axios.post(process.env.VUE_APP_BASE_URL + '/payee_types/delete', pass_data)
                .then((res)=>{

                    if(res.status == 201){
                        
                        this.showNotification(1,"Success!","Payee type has been deleted");
                        this.refreshData();
                        this.closeModal();

                    }
                    
                });

                }
                else if(this.action == "delete file type"){

                pass_data = {
                    id : this.data.id
                }

                axios.post(process.env.VUE_APP_BASE_URL + '/file_types/delete', pass_data)
                .then((res)=>{

                    if(res.status == 201){
                        
                        this.showNotification(1,"Success!","File type has been deleted");
                        this.refreshData();
                        this.closeModal();

                    }
                    
                });

                }
                else if(this.action == "delete menu"){

                pass_data = {
                    id : this.data.id
                }

                axios.post(process.env.VUE_APP_BASE_URL + '/user_menu/delete', pass_data)
                .then((res)=>{

                    if(res.status == 201){
                        
                        this.showNotification(1,"Success!","Menu has been deleted");
                        this.refreshData();
                        this.closeModal();

                    }
                    
                });

                }
                else if(this.action == "trash record"){

                    pass_data = {
                        id : this.data.id,
                        isTrash : 1
                    }
                    
                    axios.post(process.env.VUE_APP_BASE_URL + '/records/remove_record', pass_data)
                    .then((res)=>{

                        if(res.status == 201){
                            
                            this.refreshData();
                            this.closeModal();

                        }
                        
                    });

                }
                else if(this.action == "trash student file"){

                    pass_data = {
                        id : this.data.id,
                        isTrash : 1
                    }
                    
                    axios.post(process.env.VUE_APP_BASE_URL + '/registrar_files/trash', pass_data)
                    .then((res)=>{

                        if(res.status == 201){
                            this.showNotification(1,"Success","File has been transferred to trash");
                            this.refreshData();
                            this.closeModal();

                        }
                        
                    });

                }
                else if(this.action == "trash document"){

                pass_data = {
                    id : this.data.id,
                    isTrash : 1
                }

                axios.post(process.env.VUE_APP_BASE_URL + '/user_files/dispose_record', pass_data)
                .then((res)=>{

                    if(res.status == 201){
                        
                        this.refreshData();
                        this.closeModal();

                    }
                    
                });

                }
                else if(this.action == "trash all document"){

                for(var l = 0; l < this.data.length; l++){

                    pass_data = {
                        id : this.data[l].id,
                        isTrash : 1
                    }

                    axios.post(process.env.VUE_APP_BASE_URL + '/user_files/dispose_record', pass_data)
                    .then((res)=>{

                        if(res.status == 201){
                            
                            // this.insertToDisposalLogs(pass_data.id,this.$store.state.user.id,1);
                            this.refreshData();
                            this.closeModal();

                        }
                        
                    });

                }



                }
                else if(this.action == "dispose document"){

                pass_data = {
                    id : this.data.id,
                    isTrash : 2
                }

                axios.post(process.env.VUE_APP_BASE_URL + '/user_files/dispose_record', pass_data)
                .then((res)=>{

                    if(res.status == 201){
                        
                        this.refreshData();
                        this.closeModal();

                    }
                    
                });

                }
                else if(this.action == "dispose record"){

                pass_data = {
                    id : this.data.id,
                    isTrash : 2
                }

                axios.post(process.env.VUE_APP_BASE_URL + '/user_files/dispose_record', pass_data)
                .then((res)=>{

                    if(res.status == 201){
                        
                        this.refreshData();
                        this.closeModal();

                    }
                    
                });

                }
                else if(this.action == "dispose all document"){

                for(var x = 0; x < this.data.length; x++){

                    pass_data = {
                        id : this.data[x].id,
                        isTrash : 2
                    }

                    axios.post(process.env.VUE_APP_BASE_URL + '/user_files/dispose_record', pass_data)
                    .then((res)=>{

                        if(res.status == 201){
                            
                            this.insertToDisposalLogs(pass_data.id,this.$store.state.user.id,1);
                            this.refreshData();
                            this.closeModal();

                        }
                        
                    });

                }



                }
                else if(this.action == "dispose all record"){

                for(var j = 0; j < this.data.length; j++){

                    pass_data = {
                        id : this.data[j].id,
                        isTrash : 2
                    }

                    axios.post(process.env.VUE_APP_BASE_URL + '/user_files/dispose_record', pass_data)
                    .then((res)=>{

                        if(res.status == 201){
                            
                            this.insertToDisposalLogs(pass_data.id,this.$store.state.user.id,1);
                            this.refreshData();
                            this.closeModal();

                        }
                        
                    });

                }



                }
                else if(this.action == "restore record"){

                pass_data = {
                    id : this.data.id,
                    isTrash : 0
                }

                axios.post(process.env.VUE_APP_BASE_URL + '/records/remove_record', pass_data)
                .then((res)=>{

                    if(res.status == 201){
                        
                        this.refreshData();
                        this.closeModal();

                    }
                    
                });

                }
                else if(this.action == "restore all record"){

                for(var i = 0; i < this.data.length; i++){

                    pass_data = {
                        id : this.data[i].id,
                        isTrash : 0
                    }

                    axios.post(process.env.VUE_APP_BASE_URL + '/records/remove_record', pass_data)
                    .then((res)=>{

                        if(res.status == 201){
                            
                            this.refreshData();
                            this.closeModal();

                        }
                        
                    });

                }

                

                }
                else if(this.action == "restore document"){

pass_data = {
    id : this.data.id,
    isTrash : 0
}

axios.post(process.env.VUE_APP_BASE_URL + '/user_files/dispose_record', pass_data)
.then((res)=>{

    if(res.status == 201){
        
        this.refreshData();
        this.closeModal();

    }
    
});

}
else if(this.action == "restore all document"){

for(var i2 = 0; i2 < this.data.length; i2++){

    pass_data = {
        id : this.data[i2].id,
        isTrash : 0
    }

    axios.post(process.env.VUE_APP_BASE_URL + '/user_files/dispose_record', pass_data)
    .then((res)=>{

        if(res.status == 201){
            
            this.refreshData();
            this.closeModal();

        }
        
    });

}



}
                else if(this.action == "update status request form"){

                    axios.post(process.env.VUE_APP_BASE_URL + '/request_forms/update_status', this.data)
                    .then((res)=>{

                        if(res.status == 201){

                            var status_name = "";

                            if(this.data.status == 1) status_name = "approved";
                            else status_name = "disapproved";

                            this.insertToUserLogs(this.data.user_id,this.data.actioned_by,"Your requested document: " + this.data.document_name + " has been " + status_name + ". Please check the document. Thank you!");
                            
                            this.showNotification(1,"Success","Record has been updated");
                            this.refreshData();
                            this.closeModal();

                        }
                        
                    });
                }
                else if(this.action == "update status record as pres"){

                    if(this.data.remarks != ''){

                    remark_data = {
                        description : this.data.remarks,
                        datetime_added : timestamp,
                        user_id : this.$store.state.user.id,
                        record_id : this.data.id,
                    };
                    axios.post(process.env.VUE_APP_BASE_URL + '/remarks/add', remark_data)
                    .then((res)=>{
                        if(res.status == 201){
                    //
                        }
                    });
                    }

                    if(this.data.status == 1) status_description = "has approved " + this.data.subject;
                    else if(this.data.status == 2) status_description = "has been pending " + this.data.subject;

                    record_logs_data = {
                    description : status_description,
                    datetime_added : timestamp,
                    user_id : this.$store.state.user.id,
                    record_id : this.data.id,
                    }

                    axios.post(process.env.VUE_APP_BASE_URL + '/record_logs/add', record_logs_data)
                    .then((res)=>{
                    if(res.status == 201){
                    //
                    }
                    });

                    // var dh_data = {
                    //     id : this.data.note_id,
                    //     hasApproved : this.data.status,
                    //     datetime_approved : this.data.datetime_approved,
                    // }

                    // axios.post(process.env.VUE_APP_BASE_URL + '/tagged_notes/change_status', dh_data)
                    // .then((res)=>{
                    //     if(res.status == 201){}
                    // });


                        axios.post(process.env.VUE_APP_BASE_URL + '/records/update_status', this.data)
                        .then((res)=>{
                            if(res.status == 201){

                                var status_name = "";

                                if(this.data.status == 1) status_name = "approved";
                                else status_name = "disapproved";

                                this.insertToUserLogs(this.data.user_id,this.$store.state.user.id,"Your record: " + this.data.document_name + " has been " + status_name + ". Please check the record. Thank you!");


                                if(this.data.isCampusWide == 0){
                                    axios.get(process.env.VUE_APP_BASE_URL + '/records/get_max/' + this.data.ft_id + '/' + this.data.office_id + '/' + this.data.series_num + '/' + this.data.isCampusWide)
                                    .then((res)=>{

                                                if(res.status == 200){

                                                    var maxid = res.data.latest;
                                                    var str_code = maxid.toString();

                                                    if(str_code.length == 1) str_code = "00" + str_code;   
                                                    else if(str_code.length == 2) str_code = "0" + str_code;   

                                                    var data2 = {
                                                        id : this.data.id,
                                                        code : str_code,
                                                    };

                                                    axios.post(process.env.VUE_APP_BASE_URL + '/records/update_code', data2)
                                                    .then((res)=>{

                                                        if(res.status == 201){
                
                                                            this.showNotification(1,"Success!","Record has been updated");
                                                            this.refreshData();
                                                            this.closeModal();
                                                            this.closeSecondModal();

                                                        }
                                                        
                                                    });
                                    
                                    

                                                }

                                                });
                                }
                                else{
                                    this.showNotification(1,"Success!","Record has been updated");
                                    this.refreshData();
                                    this.closeModal();
                                    this.closeSecondModal();
                                }
                                
                                
                                            
                            }
                            
                        }); 
                    

                    

                }
                else if(this.action == "update status record as accountant"){

                if(this.data.remarks != ''){

                remark_data = {
                    description : this.data.remarks,
                    datetime_added : timestamp,
                    user_id : this.$store.state.user.id,
                    record_id : this.data.id,
                };
                axios.post(process.env.VUE_APP_BASE_URL + '/remarks/add', remark_data)
                .then((res)=>{
                    if(res.status == 201){
                //
                    }
                });
                }

                if(this.data.status == 1) status_description = "has approved " + this.data.subject;
                else if(this.data.status == 2) status_description = "has been pending " + this.data.subject;

                record_logs_data = {
                description : status_description,
                datetime_added : timestamp,
                user_id : this.$store.state.user.id,
                record_id : this.data.id,
                }

                axios.post(process.env.VUE_APP_BASE_URL + '/record_logs/add', record_logs_data)
                .then((res)=>{
                if(res.status == 201){
                //
                }
                });

                // var dh_data = {
                //     id : this.data.note_id,
                //     hasApproved : this.data.status,
                //     datetime_approved : this.data.datetime_approved,
                // }

                // axios.post(process.env.VUE_APP_BASE_URL + '/tagged_notes/change_status', dh_data)
                // .then((res)=>{
                //     if(res.status == 201){}
                // });

                axios.post(process.env.VUE_APP_BASE_URL + '/records/update_status', this.data)
                .then((res)=>{
                    if(res.status == 201){

                        var status_name = "";

                        if(this.data.status == 1) status_name = "approved";
                        else status_name = "disapproved";

                        this.insertToUserLogs(this.data.user_id,this.$store.state.user.id,"Your record: " + this.data.document_name + " has been " + status_name + ". Please check the record. Thank you!");
                        
                        this.showNotification(1,"Success!","Record has been updated");
                        this.refreshData();
                        this.closeModal();
                        this.closeSecondModal();
                                    
                    }
                    
                }); 

                }
                else if(this.action == "update status record as board sec"){

                    if(this.data.remarks != ''){

                    remark_data = {
                        description : this.data.remarks,
                        datetime_added : timestamp,
                        user_id : this.$store.state.user.id,
                        record_id : this.data.id,
                    }
                    axios.post(process.env.VUE_APP_BASE_URL + '/remarks/add', remark_data)
                    .then((res)=>{

                        if(res.status == 201){
                            //

                        }
                        
                    });
                    }

                    if(this.data.status == 1) status_description = "has approved " + this.data.subject;

                    
                        record_logs_data = {
                            description : status_description,
                            datetime_added : timestamp,
                            user_id : this.$store.state.user.id,
                            record_id : this.data.id,
                        }
                        axios.post(process.env.VUE_APP_BASE_URL + '/record_logs/add', record_logs_data)
                        .then((res)=>{

                            if(res.status == 201){
                                
//
                            }
                            
                        });

                    axios.post(process.env.VUE_APP_BASE_URL + '/records/update_status', this.data)
                    .then((res)=>{

                        if(res.status == 201){
                            
                            var status_name = "";

                            if(this.data.status == 1) status_name = "approved";
                            else status_name = "disapproved";

                            this.insertToUserLogs(this.data.user_id,this.$store.state.user.id,"Your record: " + this.data.document_name + " has been " + status_name + ". Please check the record. Thank you!");
                            this.showNotification(1,"Success!","Status has been updated");
                            this.refreshData();
                            this.closeModal();
                            this.closeSecondModal();
                            
                        }
                        
                    });

                }
                else if(this.action == "update status record as unit head"){

                if(this.data.remarks != ''){

                    remark_data = {
                        description : this.data.remarks,
                        datetime_added : timestamp,
                        user_id : this.$store.state.user.id,
                        record_id : this.data.id,
                    };
                    axios.post(process.env.VUE_APP_BASE_URL + '/remarks/add', remark_data)
                    .then((res)=>{
                        if(res.status == 201){
                //
                        }
                    });
                }

                if(this.data.status == 1) status_description = "has approved " + this.data.subject;
                else if(this.data.status == 2) status_description = "has been pending " + this.data.subject;

                record_logs_data = {
                    description : status_description,
                    datetime_added : timestamp,
                    user_id : this.$store.state.user.id,
                    record_id : this.data.id,
                }

                axios.post(process.env.VUE_APP_BASE_URL + '/record_logs/add', record_logs_data)
                .then((res)=>{
                    if(res.status == 201){
            //
                    }
                });

                    // var dh_data = {
                    //     id : this.data.note_id,
                    //     hasApproved : this.data.status,
                    //     datetime_approved : this.data.datetime_approved,
                    // }

                    // axios.post(process.env.VUE_APP_BASE_URL + '/tagged_notes/change_status', dh_data)
                    // .then((res)=>{
                    //     if(res.status == 201){}
                    // });

                    var status_name = "";

                    if(this.data.status == 1) status_name = "approved";
                    else status_name = "disapproved";

                    this.insertToUserLogs(this.data.user_id,this.$store.state.user.id,"Your record: " + this.data.document_name + " has been " + status_name + ". Please check the record. Thank you!");

                    axios.post(process.env.VUE_APP_BASE_URL + '/records/update_status', this.data)
                    .then((res)=>{
                        if(res.status == 201){

                            if(this.data.status == 2){

                                this.showNotification(1,"Success!","Record has been updated");
                                this.refreshData();
                                this.closeModal();
                                this.closeSecondModal();

                            }
                            else{

                                axios.get(process.env.VUE_APP_BASE_URL + '/records/get_max/' + this.data.ft_id + '/' + this.data.office_id + '/' + this.data.series_num + '/' + this.data.isCampusWide)
                            .then((res)=>{

                                        if(res.status == 200){

                                            var maxid = res.data.latest;
                                            var str_code = maxid.toString();

                                            if(str_code.length == 1) str_code = "00" + str_code;   
                                            else if(str_code.length == 2) str_code = "0" + str_code;   

                                            var data2 = {
                                                id : this.data.id,
                                                code : str_code,
                                            };

                                            axios.post(process.env.VUE_APP_BASE_URL + '/records/update_code', data2)
                                            .then((res)=>{

                                                if(res.status == 201){
        
                                                    this.showNotification(1,"Success!","Record has been updated");
                                                    this.refreshData();
                                                    this.closeModal();
                                                    this.closeSecondModal();

                                                }
                                                
                                            });
                            
                            

                                        }

                                        });


                            }
                            
                                        
                            }
                                    
                                }); 

                }
                else if(this.action == "release record"){


                   this.loadingViewShown = true;

                   var release_data = {
                        id : this.data.id,
                        isReleased : 1,
                        datetime_released : timestamp,
                        released_by : this.$store.state.user.id,
                    };

                    if(this.data.isCampusWide == 0){


                            axios.post(process.env.VUE_APP_BASE_URL + '/records/release_status', release_data)
                        .then((res)=>{

                            if(res.status == 201){

                                axios.post(process.env.VUE_APP_BASE_URL + '/records/generate_record', this.data)
                                .then((res)=>{

                                    if(res.status == 201){

                                        this.loadingViewShown = false;
                                        

                                        this.insertToUserLogs(this.data.user_id,this.$store.state.user.id,"Your record: " + this.data.document_name + " has been released. Please check the record. Thank you!");

                                        window.open(process.env.VUE_APP_BASE_URL + "/records/release_record/" + this.data.file_name);
                                        
                                        this.showNotification(1,"Success!","Record has been released");
                                        this.refreshData();
                                        this.closeModal();
                                        this.closeSecondModal();

                                    }
                                    
                                });
                    
                            }
                            
                        });

                    }
                    else{

                        axios.post(process.env.VUE_APP_BASE_URL + '/records/release_status', release_data)
                    .then((res)=>{
                        if(res.status == 201){
                            axios.get(process.env.VUE_APP_BASE_URL + '/records/get_max/' + this.data.ft_id + '/' + this.data.office_id + '/' + this.data.series_num + '/' + this.data.isCampusWide)
                            .then((res)=>{

                                        if(res.status == 200){

                                            var maxid = res.data.latest;
                                            var str_code = maxid.toString();

                                            if(str_code.length == 1) str_code = "00" + str_code;   
                                            else if(str_code.length == 2) str_code = "0" + str_code;   

                                            var data2 = {
                                                id : this.data.id,
                                                code : str_code,
                                            };

                                            axios.post(process.env.VUE_APP_BASE_URL + '/records/update_code', data2)
                                            .then((res)=>{

                                                if(res.status == 201){

                                                    var status_name = "";

                                                    if(this.data.status == 1) status_name = "approved";
                                                    else status_name = "disapproved";

                                                    this.insertToUserLogs(this.data.user_id,this.$store.state.user.id,"Your record: " + this.data.document_name + " has been " + status_name + ". Please check the record. Thank you!");

                                                    this.data.code = str_code;
                                                    this.data.file_name = this.removeCharacters(this.data.subject.toUpperCase()) + "_" + this.data.series_num + "_" + str_code + ".pdf"

                                                    axios.post(process.env.VUE_APP_BASE_URL + '/records/generate_record', this.data)
                                                    .then((res)=>{

                                                        if(res.status == 201){

                                                            this.loadingViewShown = false;
                                                            

                                                            this.insertToUserLogs(this.data.user_id,this.$store.state.user.id,"Your record: " + this.data.document_name + " has been released. Please check the record. Thank you!");

                                                            window.open(process.env.VUE_APP_BASE_URL + "/records/release_record/" + this.data.file_name);
                                                            
                                                            this.showNotification(1,"Success!","Record has been released");
                                                            this.refreshData();
                                                            this.closeModal();
                                                            this.closeSecondModal();

                                                            
                                                        }
                                                        
                                                    });
                                                    
                                                    

                                                }
                                                
                                            });
                            
                            

                                        }

                                        });
                                        
                                    }
                                    
                                }); 


                    }


                    



                    
                }
                else if(this.action == "trash finance transaction"){

                pass_data = {
                    id : this.data.id,
                    isTrash : 1
                }

                axios.post(process.env.VUE_APP_BASE_URL + '/transaction_finance/update_trash', pass_data)
                .then((res)=>{

                    if(res.status == 201){
                        
                        this.refreshData();
                        this.closeModal();

                    }
                    
                });

                }
                else if(this.action == "forward financial transaction"){

                    axios.post(process.env.VUE_APP_BASE_URL + '/transaction_finance_logs/add', this.data)
                        .then((res)=>{

                            if(res.status == 201){

                                    this.showNotification(1,"Success","Financial Transaction forwarded!");
                                    this.refreshData();
                                    this.closeModal();
                                    this.closeSecondModal();
                                

                            }
                            
                        });
                }
                else if(this.action == "communication out"){

                        axios.post(process.env.VUE_APP_BASE_URL + '/user_files_logs/add', this.data.data_logs)
                        .then((res)=>{

                            if(res.status == 201){

                            if(this.data.data_info.selected_file != null || this.data.data_info.selected_file != ''){

                                axios.post(process.env.VUE_APP_BASE_URL + '/user_files/upload', this.data.data_info.selected_file)
                                .then((res)=>{

                                    if(res.status == 201){

                                        //
                                    }
                                    
                                });

                            }

                            if(this.data.selected_users != null || this.data.selected_users.length > 0){


                                for(var x = 0; x < this.data.selected_users.length; x++){

                                pass_data = {
                                    id : 0,
                                    user_id : this.data.selected_users[x].id,
                                    file_id : this.data.data_logs.uf_id,
                                    privileges : 1,
                                    datetime_added : timestamp,
                                }

                                    axios.post(process.env.VUE_APP_BASE_URL + '/tagged_action_users/add', pass_data)
                                    .then((res)=>{

                                        if(res.status == 201){

                                            // 

                                        }
                                        
                                    });

                                }

                                
                            }

                                var edit_data = {
                                    id : this.data.data_logs.uf_id,
                                    filename : this.data.data_info.filename,
                                    remarks : this.data.data_info.remarks,
                                    isApproved : this.data.data_info.isApproved,
                                };

                                axios.post(process.env.VUE_APP_BASE_URL + '/user_files/edit_specific_item', edit_data)
                                .then((res)=>{

                                    if(res.status == 201){
                                        this.showNotification(1,"Success","Record transacted!");
                                        this.refreshData();
                                        this.closeModal();
                                        this.closeSecondModal();
                                    }
                                    
                                });
                            

                                

                                    
                                

                            }
                            
                        });
                    
                
                }
                else if(this.action == "workback add"){


                axios.post(process.env.VUE_APP_BASE_URL + '/records/create', this.data.record)
                .then((res)=>{

                    if(res.status == 201){

                        axios.get(process.env.VUE_APP_BASE_URL + '/records/get_record_by_code/' + this.data.record.code + '/' + this.data.record.series_num)
                            .then((res)=>{

                                        if(res.status == 200){

                                            this.data.attachment.record_id = res.data[0].id;
                                            this.data.attachment.datetime_added = this.data.record.datetime_released;

                                            if(this.data.attachment.file_name != ''){

                                                axios.post(process.env.VUE_APP_BASE_URL + '/records_attachment/add', this.data.attachment)
                                                .then((res)=>{

                                                    if(res.status == 201){
                                                    
                                                        axios.post(process.env.VUE_APP_BASE_URL + '/records_attachment/upload', this.data.attachment.file_attachment)
                                                        .then((res)=>{

                                                            if(res.status == 201){
                                                                //
                                                            }
                                                            
                                                        });

                                                    }
                                                    
                                                });

                                            }

                                            if(this.data.record.file_name != ''){

                                                axios.post(process.env.VUE_APP_BASE_URL + '/records/upload', this.data.record.file_file)
                                                .then((res)=>{

                                                    if(res.status == 201){
                                                        //
                                                    }
                                                    
                                                });

                                            }

                                            


                                            var new_list_personnel = [];

                                            for(var new_i = 0; new_i < this.data.list_selected_personnel.length; new_i++){
                                                new_list_personnel.push({
                                                    user_id : this.data.list_selected_personnel[new_i].id,
                                                    record_id : res.data[0].id,
                                                    hasReceived : 1,
                                                    toDisplay : 1,
                                                    datetime_added : this.data.record.datetime_released,
                                                    datetime_received : this.data.record.datetime_released,
                                                });
                                            }

                                                axios.post(process.env.VUE_APP_BASE_URL + '/tagged_users/add_users', new_list_personnel)
                                                .then((res)=>{

                                                if(res.status == 201){
                                                    //
                                                }

                                                });

                                            var new_list_offices = [];

                                            for(var new_j = 0; new_j < this.data.list_selected_involved_office.length; new_j++){
                                                new_list_offices.push({
                                                    office_id : this.data.list_selected_involved_office[new_j].id,
                                                    record_id : res.data[0].id,
                                                    hasReceived : 1,
                                                    datetime_added : this.data.record.datetime_released,
                                                });
                                            }

                                            axios.post(process.env.VUE_APP_BASE_URL + '/tagged_offices/add_offices', new_list_offices)
                                            .then((res)=>{

                                            if(res.status == 201){
                                                //
                                            }

                                            });

                                            if(this.data.list_selected_bot_resolutions != null){

                                                if(this.data.list_selected_bot_resolutions.length > 0){

                                                for(var new_k = 0; new_k < this.data.list_selected_bot_resolutions.length; new_k++){

                                                axios.post(process.env.VUE_APP_BASE_URL + '/records/update_parent', { id : this.data.list_selected_bot_resolutions[new_k].id, parent_id : res.data[0].id})
                                                .then((res)=>{

                                                if(res.status == 201){
                                                    //
                                                }

                                                });

                                                }

                                                }

                                            }
                                            
                                                    

                                            this.showNotification(1,"Success","Record submitted!");
                                            this.closeModal();
                                            this.refreshData();

                                        }

                                        });

                        
                    }
                    
                });
                }
                else if(this.action == "workback edit"){


                axios.post(process.env.VUE_APP_BASE_URL + '/records/update', this.data.record)
                .then((res)=>{

                    if(res.status == 201){

                        if(this.data.record.file_name != ''){

                        axios.post(process.env.VUE_APP_BASE_URL + '/records/upload', this.data.record.file_file)
                        .then((res)=>{

                            if(res.status == 201){
                                //
                            }
                            
                        });

                        }

                        this.showNotification(1,"Success","Record edited!");
                        this.closeModal();
                        this.closeSecondModal();
                        this.refreshData();
                        
                    }
                    
                });
                }
                else if(this.action == "create registrar file edit"){

                axios.post(process.env.VUE_APP_BASE_URL + '/registrar_files/update', this.data)
                .then((res)=>{

                    if(res.status == 201){

                        this.showNotification(1,"Success","Student File edited!");
                        this.closeModal();
                        this.closeSecondModal();
                        this.refreshData();
                        
                    }
                    
                });
                }
                else if(this.action == "create registrar file add"){

                axios.post(process.env.VUE_APP_BASE_URL + '/registrar_files/add', this.data)
                .then((res)=>{

                    if(res.status == 201){

                        if(this.data.file_name != ''){

                                axios.post(process.env.VUE_APP_BASE_URL + '/registrar_files/upload', this.data.file_attachment)
                                .then((res)=>{

                                    if(res.status == 201){
                                        //
                                    }
                                    
                                });

                        }

                        this.showNotification(1,"Success","Student File edited!");
                        this.closeModal();
                        // this.closeSecondModal();
                        this.refreshData();
                        
                    }
                    
                });
                }
                else if(this.action == "create document edit"){


                axios.post(process.env.VUE_APP_BASE_URL + '/records/update', this.data.record)
                .then((res)=>{

                    if(res.status == 201){

                        this.showNotification(1,"Success","Record edited!");
                        this.closeModal();
                        this.closeSecondModal();
                        this.refreshData();
                        
                    }
                    
                });
                }
                else if(this.action == "create student add"){

                axios.post(process.env.VUE_APP_BASE_URL + '/students/add', this.data)
                .then((res)=>{

                    if(res.status == 201){


                        this.showNotification(1,"Success","Student edited!");
                        this.closeModal();
                        // this.closeSecondModal();
                        this.refreshData();
                        
                    }
                    
                });
                }
                else if(this.action == "create student edit"){

                axios.post(process.env.VUE_APP_BASE_URL + '/students/edit', this.data)
                .then((res)=>{

                    if(res.status == 201){

                        this.showNotification(1,"Success","Student edited!");
                        this.closeModal();
                        this.closeSecondModal();
                        this.refreshData();
                        
                    }
                    
                });

                }
                else if(this.action == "create document add"){

                   

                    axios.post(process.env.VUE_APP_BASE_URL + '/records/create', this.data.record)
                .then((res)=>{

                    if(res.status == 201){
                        
                        if(this.data.record.forCreate == 1){

                            axios.get(process.env.VUE_APP_BASE_URL + '/records/find_latest/' + this.$store.state.user.id)
                            .then((res)=>{

                                        if(res.status == 200){

                                            var maxid = res.data.latest;

                                            this.data.attachment.record_id = maxid;
                                            this.data.attachment.datetime_added = timestamp;

                                            if(this.data.attachment.file_name != ''){

                                                axios.post(process.env.VUE_APP_BASE_URL + '/records_attachment/add', this.data.attachment)
                                                .then((res)=>{

                                                    if(res.status == 201){
                                                    
                                                        axios.post(process.env.VUE_APP_BASE_URL + '/records_attachment/upload', this.data.attachment.file_attachment)
                                                        .then((res)=>{

                                                            if(res.status == 201){
                                                                //
                                                            }
                                                            
                                                        });

                                                    }
                                                    
                                                });

                                            }

                                            var new_list_personnel = [];

                                            for(var new_i = 0; new_i < this.data.list_selected_personnel.length; new_i++){
                                                new_list_personnel.push({
                                                    user_id : this.data.list_selected_personnel[new_i].id,
                                                    record_id : maxid,
                                                    hasReceived : 0,
                                                    toDisplay : 0,
                                                    datetime_added : this.data.record.datetime_added,
                                                    datetime_received : null,
                                                });
                                            }

                                            if(this.data.record.isCampusWide == 0){
                                                new_list_personnel.push({
                                                    user_id : this.$store.state.user.id,
                                                    record_id : maxid,
                                                    hasReceived : 0,
                                                    toDisplay : 0,
                                                    datetime_added : this.data.record.datetime_added,
                                                    datetime_received : null,
                                                });
                                            }

                                                axios.post(process.env.VUE_APP_BASE_URL + '/tagged_users/add_users', new_list_personnel)
                                                .then((res)=>{

                                                if(res.status == 201){
                                                    //
                                                }

                                                });

                                            var new_list_offices = [];

                                            for(var new_j = 0; new_j < this.data.list_selected_involved_office.length; new_j++){
                                                new_list_offices.push({
                                                    office_id : this.data.list_selected_involved_office[new_j].id,
                                                    record_id : maxid,
                                                    hasReceived : 0,
                                                    datetime_added : this.data.record.datetime_released,
                                                });
                                            }

                                            if(this.data.record.isCampusWide == 0){
                                                new_list_offices.push({
                                                    office_id : this.$store.state.user.office_id.id,
                                                    record_id : maxid,
                                                    hasReceived : 0,
                                                    datetime_added : this.data.record.datetime_released,
                                                });
                                            }

                                            axios.post(process.env.VUE_APP_BASE_URL + '/tagged_offices/add_offices', new_list_offices)
                                            .then((res)=>{

                                            if(res.status == 201){
                                                //
                                            }

                                            });



                                            if(this.data.list_selected_bot_resolutions != null){

                                                if(this.data.list_selected_bot_resolutions.length > 0){

                                                for(var new_k = 0; new_k < this.data.list_selected_bot_resolutions.length; new_k++){

                                                axios.post(process.env.VUE_APP_BASE_URL + '/records/update_parent', { id : this.data.list_selected_bot_resolutions[new_k].id, parent_id : maxid})
                                                .then((res)=>{

                                                if(res.status == 201){
                                                    //
                                                }

                                                });

                                                }

                                                }

                                            }
                                                
                                                        



                                            this.showNotification(1,"Success","Record submitted!");
                                            this.closeModal();
                                            this.refreshData();

                                        }

                                        });



                        }
                        else{

                            axios.get(process.env.VUE_APP_BASE_URL + '/records/get_record_by_code/' + this.data.record.code + '/' + this.data.record.series_num)
                            .then((res)=>{

                                        if(res.status == 200){

                                            this.data.attachment.record_id = res.data[0].id;
                                            this.data.attachment.datetime_added = this.data.record.datetime_released;

                                            if(this.data.attachment.file_name != ''){

                                                axios.post(process.env.VUE_APP_BASE_URL + '/records_attachment/add', this.data.attachment)
                                                .then((res)=>{

                                                    if(res.status == 201){
                                                    
                                                        axios.post(process.env.VUE_APP_BASE_URL + '/records_attachment/upload', this.data.attachment.file_attachment)
                                                        .then((res)=>{

                                                            if(res.status == 201){
                                                                //
                                                            }
                                                            
                                                        });

                                                    }
                                                    
                                                });

                                            }

                                            if(this.data.record.file_name != ''){

                                                axios.post(process.env.VUE_APP_BASE_URL + '/records/upload', this.data.record.file_file)
                                                .then((res)=>{

                                                    if(res.status == 201){
                                                        //
                                                    }
                                                    
                                                });

                                            }

                                            


                                            var new_list_personnel = [];

                                            for(var new_i = 0; new_i < this.data.list_selected_personnel.length; new_i++){
                                                new_list_personnel.push({
                                                    user_id : this.data.list_selected_personnel[new_i].id,
                                                    record_id : res.data[0].id,
                                                    hasReceived : 1,
                                                    toDisplay : 1,
                                                    datetime_added : this.data.record.datetime_released,
                                                    datetime_received : this.data.record.datetime_released,
                                                });
                                            }

                                                axios.post(process.env.VUE_APP_BASE_URL + '/tagged_users/add_users', new_list_personnel)
                                                .then((res)=>{

                                                if(res.status == 201){
                                                    //
                                                }

                                                });

                                            var new_list_offices = [];

                                            for(var new_j = 0; new_j < this.data.list_selected_involved_office.length; new_j++){
                                                new_list_offices.push({
                                                    office_id : this.data.list_selected_involved_office[new_j].id,
                                                    record_id : res.data[0].id,
                                                    hasReceived : 1,
                                                    datetime_added : this.data.record.datetime_released,
                                                });
                                            }

                                            axios.post(process.env.VUE_APP_BASE_URL + '/tagged_offices/add_offices', new_list_offices)
                                            .then((res)=>{

                                            if(res.status == 201){
                                                //
                                            }

                                            });

                                            if(this.data.list_selected_bot_resolutions != null){

                                                if(this.data.list_selected_bot_resolutions.length > 0){

                                                for(var new_k = 0; new_k < this.data.list_selected_bot_resolutions.length; new_k++){

                                                axios.post(process.env.VUE_APP_BASE_URL + '/records/update_parent', { id : this.data.list_selected_bot_resolutions[new_k].id, parent_id : res.data[0].id})
                                                .then((res)=>{

                                                if(res.status == 201){
                                                    //
                                                }

                                                });

                                                }

                                                }

                                            }
                                            
                                                    

                                            this.showNotification(1,"Success","Record submitted!");
                                            this.closeModal();
                                            this.refreshData();

                                        }

                                        });


                        }

                       

                        
                    }
                    
                });

                }
                else if(this.action == "validate document"){

                    axios.post(process.env.VUE_APP_BASE_URL + '/records/validate_document', this.data)
                    .then((res)=>{

                        if(res.status == 201){

                            if(this.data.remarks){

                                remark_data = {
                                description : this.data.remarks,
                                datetime_added : timestamp,
                                user_id : this.$store.state.user.id,
                                record_id : this.data.id,
                                };
                                axios.post(process.env.VUE_APP_BASE_URL + '/remarks/add', remark_data)
                                .then((res)=>{

                                    if(res.status == 201){
                                        
        //
                                    }
                                    
                                });

                            }

                           

                            this.showNotification(1,"Success","Record submitted!");
                            this.closeModal();
                            this.closeSecondModal();
                            this.refreshData();

                        }
                        
                    });

                
                }
               
                
                
            },
            closeModal(){
                this.$emit('close-modal');
            },
            insertToDisposalLogs(record_id,user_id,description){

            const today = new Date();
            const date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const timestamp = date + ' ' + time;

            var log_data = {
                document_id : record_id,
                user_id : user_id,
                action : description,
                datetime_added : timestamp,
            };

            axios.post(process.env.VUE_APP_BASE_URL + '/disposal_logs/add', log_data)
            .then((res)=>{

                if(res.status == 201){
                    
                    // this.showNotification(1,"Success!","Status has been updated");
                    // this.refreshData();
                    // this.closeModal();
                    
                }
                
            });
            },
            insertToUserLogs(id,sender_id,description){

                const today = new Date();
                const date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
                const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                const timestamp = date + ' ' + time;

                var log_data = {
                    user_id : id,
                    sender_id : sender_id,
                    description : description,
                    datetime_added : timestamp,
                    hasRead : 0,
                };

                axios.post(process.env.VUE_APP_BASE_URL + '/notifications/add', log_data)
                .then((res)=>{

                    if(res.status == 201){
                        
                        // this.showNotification(1,"Success!","Status has been updated");
                        // this.refreshData();
                        // this.closeModal();
                        
                    }
                    
                });
            },
        },
        watch: {
            prompt_data: {
            handler(val){
                this.data = val.data;
                this.action = val.action;


                if(this.action == "delete file type"){
                    this.title = "File deletion";
                    this.msg = "Delete <b>" + this.data.title + " - " + this.data.description + "</b>? You cannot undo this process. Proceed?";
                }
                else if(this.action == "delete office"){
                    this.title = "Office deletion";
                    this.msg = "Delete <b>" + this.data.abbre + " - " + this.data.description + "</b>? You cannot undo this process. Proceed?";
                }
                else if(this.action == "delete menu"){
                    this.title = "Menu deletion";
                    this.msg = "Delete <b>" + this.data.name + "</b>? You cannot undo this process. Proceed?";
                }
                else if(this.action == "delete supplier"){
                    this.title = "Supplier deletion";
                    this.msg = "Delete <b>" + this.data.description + "</b>? You cannot undo this process. Proceed?";
                }
                else if(this.action == "delete finance type"){
                    this.title = "Finance Type deletion";
                    this.msg = "Delete <b>" + this.data.description + "</b>? You cannot undo this process. Proceed?";
                }
                else if(this.action == "delete payee type"){
                    this.title = "Payee Type deletion";
                    this.msg = "Delete <b>" + this.data.description + "</b>? You cannot undo this process. Proceed?";
                }
                else if(this.action == "trash record"){
                    this.title = "Record trash";
                    this.msg = "Transfer <b>" + this.data.subject + "</b> to trash? You can restore this anytime. Proceed?";
                }
                else if(this.action == "trash document"){
                    this.title = "Trash document";
                    this.msg = "Transfer <b>" + this.data.subject + "</b> to trash? Trashed documents can be restored. Proceed?";
                }
                else if(this.action == "trash all document"){
                    this.title = "Trash document";
                    this.msg = "Trash selected documents?  Trashed documents can be restored. Proceed?<br>";
                    this.msg += "<br>Selected documents:";
                    for(var l = 0; l < this.data.length; l++){
                        
                        this.msg += "<br><b>*" + this.data[l].description + "</b>";

                    }
                }
                else if(this.action == "dispose document"){
                    this.title = "Document disposing";
                    this.msg = "Dispose <b>" + this.data.description + "</b>? Disposed documents can no longer be accessible in the system to other users. Proceed?";
                }
                else if(this.action == "dispose record"){
                    this.title = "Document disposing";
                    this.msg = "Dispose <b>" + this.data.subject + "</b>? Disposed records can no longer be accessible in the system to other users. Proceed?";
                }
                else if(this.action == "dispose all document"){
                    this.title = "Document disposal";
                    this.msg = "Dispose selected documents? Disposed documents can no longer be accessible in the system to other users. Proceed?<br>";
                    this.msg += "<br>Selected files:";
                    for(var x = 0; x < this.data.length; x++){
                        
                        this.msg += "<br><b>*" + this.data[x].description + "</b>";

                    }
                }
                else if(this.action == "dispose all record"){
                    this.title = "Document disposal";
                    this.msg = "Dispose selected documents? Disposed documents can no longer be accessible in the system to other users. Proceed?<br>";
                    this.msg += "<br>Selected files:";
                    for(var j = 0; j < this.data.length; j++){
                        
                        this.msg += "<br><b>*" + this.data[j].description + "</b>";

                    }
                }
                else if(this.action == "restore record"){
                    this.title = "Record restoration";
                    this.msg = "Restore <b>" + this.data.subject + "</b>?";
                }
                else if(this.action == "restore all record"){
                    this.title = "Record restoration";
                    this.msg = "Restore all records?";
                }
                else if(this.action == "restore document"){
                    this.title = "Document restoration";
                    this.msg = "Restore <b>" + this.data.description + "</b>?";
                }
                else if(this.action == "restore all document"){
                    this.title = "Document restoration";
                    this.msg = "Restore all documents?";
                    this.msg += "<br>Selected files:";
                    for(var z = 0; z < this.data.length; z++){
                        
                        this.msg += "<br><b>*" + this.data[z].description + "</b>";

                    }
                }
                else if(this.action == "update status request form"){

                    
                    this.title = "Update status";
                    this.msg = "Proceed?";
                }
                else if(this.action == "update status record as pres"){

                    if(this.data.status == 1) {
                        this.title = "Record Approval";
                        this.msg = "Approve this record? This action cannot be undone. Proceed?";
                    }
                    else if(this.data.status == 2){
                        this.title = "Record Pending";
                        this.msg = "Set this record to pending? This action cannot be undone. Proceed?";
                    }
                    else{
                        this.title = "Record Revision";
                        this.msg = "Send this record back to the Board Secretary?";
                    }
                    
                }
                else if(this.action == "update status record as accountant"){

                if(this.data.status == 1) {
                    this.title = "Document Approval";
                    this.msg = "Approve this record? This action cannot be undone. Proceed?";
                }
                else if(this.data.status == 2){
                    this.title = "Document Pending";
                    this.msg = "Set this record to pending? This action cannot be undone. Proceed?";
                }

                }
                else if(this.action == "update status record as board sec"){
                    this.title = "Record Approval";
                    this.msg = "Approve this record? This action cannot be undone. Proceed?";
                }
                else if(this.action == "update status record as unit head"){

                    if(this.data.status == 1) {
                        this.title = "Document Approval";
                        this.msg = "Verify the document's accuracy before submitting.";
                    }
                    else if(this.data.status == 2){
                        this.title = "Document Disapproval";
                        this.msg = "Verify the document's accuracy before submitting.";
                    }
                    
                }
                else if(this.action == "release record"){
                    this.title = "Document release";
                    this.msg = "Proceed releasing document? This action cannot be undone. Continue?";
                }
                else if(this.action == "trash finance transaction"){
                    this.title = "Trash Finance Transaction";
                    this.msg = "Transfer <b>" + this.data.finance_id.description + " - " + this.data.num + "</b> to trash? You can restore this anytime. Proceed?";
                }
                else if(this.action == "forward financial transaction"){
                    this.title = "Forward Document";
                    this.msg = "Forward <b>" + this.data.tf_name + "</b>" + " to <b>" + this.data.office_name +"</b>? This action cannot be undone. Proceed?";
                }
                else if(this.action == "communication out"){
                    this.title = "Transact Record";
                    this.msg = "Out <b>" + this.data.data_info.description +"</b> to <b>"+ this.data.data_logs.to_office_name  +"</b>? This action cannot be undone. Proceed?";
                    if(this.data.selected_users.length > 0){
                        this.msg += "<br><br>Personnel involved:"
                        for(var n = 0; n < this.data.selected_users.length; n++){
                        
                            this.msg += "<br><b>" + this.data.selected_users[n].name + "</b>";

                        }
                    }
                }
                else if(this.action == "untag shared document"){
                    this.title = "Untag document";
                    this.msg = "Untag selected documents?";
                    this.msg += "<br>Selected files:";
                    for(var m = 0; m < this.data.length; m++){
                        
                        this.msg += "<br><b>*" + this.data[m].description + "</b>";

                    }
                }
                else if(this.action == "workback add"){
                    this.title = "Record Submission";
                    console.log(this.data);
                    this.msg = "Verify the document's accuracy before submitting.";
                }
                else if(this.action == "workback edit"){
                    this.title = "Edit Record";
                    this.msg = "Verify the document's accuracy before submitting.";
                }
                else if(this.action == "create document edit"){
                    this.title = "Edit Record";
                    this.msg = "Verify the document's accuracy before submitting.";
                }
                else if(this.action == "create document add"){
                    this.title = "Document Submission";
                    this.msg = "Verify the document's accuracy before submitting.";
                }
                else if(this.action == "validate document"){
                    this.title = "Document validation";
                    this.msg = "Verify the document's accuracy before submitting.";
                }
                else if(this.action == "create registrar file edit"){
                    this.title = "Edit Record";
                    this.msg = "Verify the document's accuracy before submitting.";
                }
                else if(this.action == "create registrar file add"){
                    this.title = "Document Submission";
                    this.msg = "Verify the document's accuracy before submitting.";
                }
                else if(this.action == "create student edit"){
                    this.title = "Update Student";
                    this.msg = "Verify the student's info before submitting.";
                }
                else if(this.action == "create student add"){
                    this.title = "Student Creation";
                    this.msg = "Verify the student's info before submitting.";
                }
                else if(this.action == "trash student file"){
                    this.title = "Trash Student File";
                    this.msg = "Transfer <b>" + this.data.description + "</b> to trash? You can restore this anytime. Proceed?";
                }
                
            },
            immediate:true
          }
        }
    }
        
    </script>