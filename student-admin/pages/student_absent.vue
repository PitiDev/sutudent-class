<template>
    <div>
        <v-container fluid>
            <h1>ຈັດການຂໍ້ມູນການຂາດຮຽນ {{ searchClassName }}</h1>
            <br>
            <v-row>
                <v-col cols="12" md="3">
                    <v-select v-model="class_name" :items="classData" item-text="name" item-value="name" label="ຊັ້ນຮຽນ"
                        outlined></v-select>
                </v-col>
                <v-col cols="12" md="3" class="text-right">
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="ຄົ້ນຫາ" single-line hide-details
                        outlined></v-text-field>
                </v-col>

                <br>

            </v-row>

            <v-row>
                <v-col cols="12" md="6">
                    <v-card>
                        <v-card-text>
                            <h2>ໝາຍຂາດນັກຮຽນ {{ absent }}</h2>
                            <br>

                            <v-data-table :search="search" :headers="headers" :items="studentData" :loading="loading">
                                <template v-slot:item="row">
                                    <tr>
                                        <td>{{ row.index + 1 }}</td>
                                        <td>{{ row.item.first_name }}</td>
                                        <td>{{ row.item.last_name }}</td>

                                        <td>
                                            <v-select class="mt-5" v-model="row.item.absent" :items="absentData"
                                                item-text="name" item-value="name" label="ໝາຍຂາດ" outlined
                                                dense></v-select>
                                        </td>
                                        <td>
                                            <v-btn @click="updateAbsent(row.item.id, row.item.absent)"
                                                color="primary">ອັບເດດ</v-btn>
                                        </td>

                                    </tr>
                                </template>
                            </v-data-table>

                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" md="6">
                    <v-card>
                        <v-card-text>
                            <h2 class="red--text">ລາຍງານມື້ຂາດບໍ່ມີເຫດຜົນ</h2>
                            <br>
                            <v-data-table :search="search" :headers="headersAbsent" :items="absentDataAbsent"
                                :loading="loading">
                                <template v-slot:item="row">
                                    <tr>
                                        <td>{{ row.index + 1 }}</td>
                                        <td>{{ row.item.first_name }}</td>
                                        <td>{{ row.item.last_name }}</td>

                                        <td>
                                            <b> {{ row.item.absent_count }} ມື້</b>
                                        </td>


                                    </tr>
                                </template>
                            </v-data-table>
                            <br>
                            <h2 class="blue--text">ລາຍງານມື້ຂາດບໍ່ສະບາຍ</h2>
                            <br>
                            <v-data-table :search="search" :headers="headersAbsent" :items="absentDataSick"
                                :loading="loading">
                                <template v-slot:item="row">
                                    <tr>
                                        <td>{{ row.index + 1 }}</td>
                                        <td>{{ row.item.first_name }}</td>
                                        <td>{{ row.item.last_name }}</td>

                                        <td>
                                            <b> {{ row.item.absent_count }} ມື້</b>
                                        </td>

                                    </tr>
                                </template>
                            </v-data-table>
                            <br>
                            <h2 class="orange--text">ລາຍງານມາຊ້າ</h2>
                            <br>
                            <v-data-table :search="search" :headers="headersAbsent" :items="absentDataLate"
                                :loading="loading">
                                <template v-slot:item="row">
                                    <tr>
                                        <td>{{ row.index + 1 }}</td>
                                        <td>{{ row.item.first_name }}</td>
                                        <td>{{ row.item.last_name }}</td>

                                        <td>
                                            <b> {{ row.item.absent_count }} ມື້</b>
                                        </td>

                                    </tr>
                                </template>
                            </v-data-table>
                        </v-card-text>
                    </v-card>
                </v-col>

            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            studentData: [],
            classData: [],
            class_name: '',
            search: '',
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
                    text: 'ເລືອກສະຖານະ',
                    align: 'start',
                    sortable: false,
                    value: 'status_register',
                    width: '10%'
                },
                {
                    text: 'ອັບເດດ',
                    align: 'start',
                    sortable: false,
                    value: 'status_register',
                    width: '10%'
                },
            ],
            headersAbsent: [
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
                    text: 'ລວມມື້',
                    align: 'start',
                    sortable: false,
                    value: 'status_register',
                    width: '10%'
                },

            ],
            absentData: [
                'come',
                'late',
                'absent',
                'sick',
            ],
            absent: '',
            absentDataAbsent: [],
            absentDataSick: [],
            absentDataLate: [],
            absentDataCome: [],


        }
    },
    mounted() {
        this.getClass();
        this.getAbsent();
    },
    computed: {
        searchClassName: function () {
            this.searchStudent();
            this.getAbsent();
            this.getAbsentLate();
            this.getAbsentSick();
        },
    },
    methods: {
        async getClass() {
            const data = await this.$axios.get("/class", this.form);
            console.log('class: ', data.data);
            this.classData = data.data;
        },
        async searchStudent() {
            const body = {
                class_name: this.class_name
            }
            const data = await this.$axios.post(`/search_student_by_class_name/`, body);
            console.log('searchStudent: ', data.data);
            this.studentData = data.data;
        },
        async updateAbsent(idSt, absentAdd) {
            const body = {
                student_id: idSt,
                status: absentAdd,
                desc: '',
            }

            console.log('updateAbsent: ', body);

            const data = await this.$axios.post(`/add_absent/`, body);
            console.log('updateAbsent: ', data.data);
            await this.$toast.success("ອັບເດດວັນຂາດສຳເລັດ", {
                icon: "fa-check-circle",
            });

            this.getAbsent();
            this.getAbsentLate();
            this.getAbsentSick();

        },

        async getAbsent() {
            const body = {
                class_name: this.class_name,
            }
            const data = await this.$axios.post(`/get_absent_group_by_student/`, body);
            console.log('getAbsent: ', data.data);
            this.absentDataAbsent = data.data;
        },

        async getAbsentLate() {
            const body = {
                class_name: this.class_name,
            }
            const data = await this.$axios.post(`/get_late_group_by_student/`, body);
            console.log('getAbsentLate: ', data.data);
            this.absentDataLate = data.data;
        },

        async getAbsentSick() {
            const body = {
                class_name: this.class_name,
            }
            const data = await this.$axios.post(`/get_sick_group_by_student/`, body);
            console.log('getAbsentSick: ', data.data);
            this.absentDataSick = data.data;
        },

    }
}
</script>