<template>
    <div>
        <v-container fluid>
            <h1>ຂໍ້ມູນລົງທະບຽນຂອງນັກຮຽນ</h1>

            <br>
            <v-row>
                <v-col cols="12" md="3">
                    <v-select v-model="class_name" :items="classData" item-text="name" item-value="name" label="ຊັ້ນຮຽນ"
                        :rules="[(v) => !!v || 'is required']" outlined></v-select>


                </v-col>
                <v-col cols="12" md="3" class="text-right">
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="ຄົ້ນຫາ" single-line hide-details
                        outlined></v-text-field>
                        
                </v-col>
                <v-col>
                    <v-btn  color="primary" @click="getStudent()" x-large>
                      ດືງຂໍ້ມູນທັງໝົດ
                    </v-btn>
                </v-col>
                <br>

            </v-row>
            <br>

            <v-data-table :search="search" :headers="headers" :items="studentData" :loading="loading"  class="elevation-5 rounded-xl">
                <template v-slot:item="row">
                    <tr>
                        <td>{{ row.index + 1 }}</td>
                        <td>{{ row.item.first_name }}</td>
                        <td>{{ row.item.last_name }}</td>
                        <td>ມ {{ row.item.class_name }}</td>
                        <td>{{ row.item.year }}</td>
                        <td><b>{{ formatCurrency(row.item.pay_amount) }} ກີບ</b></td>
                        <td>
                            <v-chip v-if="row.item.status_register == 'pending'" class="ma-2" color="orange" outlined>
                                <v-icon class="mr-2">mdi mdi-receipt-clock</v-icon>ລໍຖ້າລົງທະບຽນ
                            </v-chip>
                            <v-chip v-if="row.item.status_register == 'success'" class="ma-2" color="green" outlined>
                                <v-icon class="mr-2">mdi mdi-account-check</v-icon>ລົງທະບຽນແລ້ວ
                            </v-chip>
                        </td>
                        <td>
                            <v-btn @click="updateRegister(row.item)" color="primary" text>
                                <v-icon>mdi mdi-account-edit-outline</v-icon>
                            </v-btn>

                        </td>
                    </tr>
                </template>
            </v-data-table>

        </v-container>

        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">ແກ້ໄຂຂໍ້ມູນລົງທະບຽນ {{ searchClassName }}</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="form.first_name" label="ຊື່" readonly></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="form.last_name" label="ນາມສະກຸນ" readonly></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="form.class_name" label="ຊັ້ນຮຽນ" readonly></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="form.year" label="ສົກຮຽນ" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                                <v-select v-model="form.status_register" :items="statusData" item-text="statusData"
                                    item-value="statusData" label="ສະຖານະລົງທະບຽນ"
                                    :rules="[(v) => !!v || 'is required']" outlined></v-select>
                                <v-text-field v-model="form.pay_amount" label="ເງິນລົງທະບຽນ" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="form.remark" label="ໝາຍເຫດ" required></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" @click="dialog = false">
                        ຍົກເລີກ
                    </v-btn>
                    <v-btn color="primary" @click="saveRegister()">
                        ບັນທຶກ
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
export default {
    data() {
        return {
            dialog: false,
            valid: false,
            search: '',
            btnStatus: '',
            statusData: ['pending', 'success'],
            headers: [
                {
                    text: '#',
                    align: 'start',
                    sortable: false,
                    value: '#',
                    width: '2%'
                },

                {
                    text: 'ຊື່',
                    align: 'start',
                    sortable: false,
                    value: 'first_name',
                    width: '10%'
                },
                {
                    text: 'ນາມສະກຸນ',
                    align: 'start',
                    sortable: false,
                    value: 'last_name',
                    width: '10%'
                },
                {
                    text: 'ຫ້ອງຮຽນ',
                    align: 'start',
                    sortable: false,
                    value: 'class_name',
                },
                {
                    text: 'ສົກຮຽນ',
                    align: 'start',
                    sortable: false,
                    value: 'year',
                },
                {
                    text: 'ເງິນລົງທະບຽນ',
                    align: 'start',
                    sortable: false,
                    value: 'pay_amount',
                },
                {
                    text: 'ສະຖານະລົງທະບຽນ',
                    align: 'start',
                    sortable: false,
                    value: 'status_register',
                    width: '10%'
                },
                {
                    text: 'ອັບເດດລົງທະບຽນ',
                    align: 'start',
                    sortable: false,
                    value: 'status_register',
                    width: '10%'
                },

            ],
            studentData: [],
            classData: [],
            class_name: '',
            form: {
                first_name: '',
                last_name: '',
                class_name: '',
                year: '',
                pay_amount: '',
                status_register: '',
                id: '',
                remark: ''
            },


        }
    },
    mounted() {
        this.getStudent();
        this.getClass();
    },
    computed: {
        searchClassName: function () {
           this.searchStudent();
        },
    },
    methods: {
        async getStudent() {
            const data = await this.$axios.get("/student", this.form);
            console.log('getStudent: ', data.data);
            this.studentData = data.data;
        },
        async getClass() {
            const data = await this.$axios.get("/class", this.form);
            console.log('class: ', data.data);
            this.classData = data.data;
        },
        formatCurrency(value) {
            let val = (value / 1).toFixed(0).replace(",", ".");
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        updateRegister(item) {
            this.dialog = true;
            this.form.first_name = item.first_name;
            this.form.last_name = item.last_name;
            this.form.class_name = item.class_name;
            this.form.year = item.year;
            this.form.pay_amount = item.pay_amount;
            this.form.status_register = item.status_register;
            this.form.id = item.id;
        },
        async saveRegister() {
            const data = await this.$axios.put(`/status_register/${this.form.id}`, this.form);
            console.log('saveRegister: ', data);
            this.dialog = false;
            this.getStudent();
            await this.$toast.success("ອັບເດດການລົງທະບຽນສຳເລັດແລ້ວ", {
                icon: "fa-check-circle",
            });
        },
        async searchStudent() {
            const body = {
                class_name: this.class_name
            }
            const data = await this.$axios.post(`/search_student_by_class_name/`,body);
            console.log('searchStudent: ', data.data);
            this.studentData = data.data;
        },
    }
}
</script>

<style scoped>
.v-data-table > .v-data-table__wrapper > table > tbody > tr > th,
.v-data-table > .v-data-table__wrapper > table > thead > tr > th,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
   font-size: 25pt !important;
   font-weight: bold !important;
}
</style>