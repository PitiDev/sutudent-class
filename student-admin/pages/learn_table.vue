<template>
    <div>
        <v-container fluid>
            <h1>ຈັດການຕາລາງການສອນ {{ searchClassName }}</h1>
            <br>
            <v-row>
                <v-col cols="12" md="3">
                    <v-select v-model="class_name" :items="classData" item-text="name" item-value="name" label="ຊັ້ນຮຽນ"
                        :rules="[(v) => !!v || 'is required']" outlined></v-select>

                </v-col>

                <v-col cols="12" md="9" class="text-right">
                    <v-btn @click="dialog = true; btnStatus = 'add'" rounded elevation="0"
                        color="primary"><b>ເພີ່ມຕາລາງການສອນ</b></v-btn>
                </v-col>
                <br>

            </v-row>
            <br>
            <h2>ຕາຕະລາງສຳລັບອາຈານ</h2>
            <br>

            <table>
                <thead>
                    <tr class="text-center">
                        <th class="text-center">ວັນ</th>
                        <th class="text-center">ວິຊາຮຽນ</th>
                        <th class="text-center">ວິຊາຮຽນ</th>
                        <th class="text-center">ວິຊາຮຽນ</th>
                        <th class="text-center">ວິຊາຮຽນ</th>
                        <th class="text-center">ຫ້ອງຮຽນ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="schedule in schedules" :key="schedule.class_name">
                        <!-- <td>{{ schedule.teacher_first_name }} {{ schedule.teacher_last_name }}</td>
                        <td>{{ schedule.subject_name }}</td> -->
                        <td class="text-center"><b>{{ schedule.day_of_week }}</b></td>
                        <td class="text-center">

                            <b v-if="schedule.morning_schedule_1 != null">{{ subData(schedule.morning_schedule_1)[3] }}
                                <br> {{
                subData(schedule.morning_schedule_1)[1] }} {{ subData(schedule.morning_schedule_1)[2]
                                }} <br>
                                <v-btn @click="deleteTable(subData(schedule.morning_schedule_1)[0])" color="red" text>
                                    <v-icon>mdi mdi-delete-empty-outline</v-icon>
                                </v-btn>
                            </b>
                        </td>
                        <td class="text-center">
                            <b v-if="schedule.morning_schedule_2 != null">{{ subData(schedule.morning_schedule_2)[3] }}
                                <br> {{
                subData(schedule.morning_schedule_2)[1] }} {{ subData(schedule.morning_schedule_2)[2]
                                }}
                                <br>
                                <v-btn @click="deleteTable(subData(schedule.morning_schedule_2)[0])" color="red" text>
                                    <v-icon>mdi mdi-delete-empty-outline</v-icon>
                                </v-btn>
                            </b>
                        </td>
                        <td class="text-center">
                            <b v-if="schedule.afternoon_schedule_1 != null">{{ subData(schedule.afternoon_schedule_1)[3]
                                }} <br> {{
                subData(schedule.afternoon_schedule_1)[1] }} {{
                subData(schedule.afternoon_schedule_1)[2] }}
                                <br>

                                <v-btn @click="deleteTable(subData(schedule.afternoon_schedule_1)[0])" color="red" text>
                                    <v-icon>mdi mdi-delete-empty-outline</v-icon>
                                </v-btn>
                            </b>

                        </td>
                        <td class="text-center">
                            <b v-if="schedule.afternoon_schedule_2 != null">{{ subData(schedule.afternoon_schedule_2)[3]
                                }} <br> {{
                subData(schedule.afternoon_schedule_2)[1] }} {{
                subData(schedule.afternoon_schedule_2)[2] }}
                                <br>

                                <v-btn @click="deleteTable(subData(schedule.afternoon_schedule_2)[0])" color="red" text>
                                    <v-icon>mdi mdi-delete-empty-outline</v-icon>
                                </v-btn>
                            </b>

                        </td>

                        <td class="text-center">{{ schedule.class_name }}</td>

                    </tr>
                </tbody>
            </table>

            <br>
            <br>

            <v-divider></v-divider>
            <br>
            <v-row>
                <v-col cols="12" md="3">
                    <h2>ຕາຕະລາງສຳລັບນັກຮຽນ</h2>
                </v-col>

                <v-col cols="12" md="9" class="text-right">
                    <v-btn @click="dialogPrint = true" color="primary">ພີມຕາລາງຮຽນ</v-btn>
                </v-col>
                <br>

            </v-row>



            <br>
            <div>
                <h2 class="text-center"><b>ຕາຕະລາງຮຽນຫ້ອງ {{ class_name }}</b></h2>
                <br>
                <table>
                    <thead>
                        <tr class="text-center">
                            <th class="text-center">ວັນ</th>
                            <th class="text-center">ວິຊາຮຽນ</th>
                            <th class="text-center">ວິຊາຮຽນ</th>
                            <th class="text-center">ວິຊາຮຽນ</th>
                            <th class="text-center">ວິຊາຮຽນ</th>
                            <th class="text-center">ຫ້ອງຮຽນ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="schedule in schedules" :key="schedule.class_name">

                            <td class="text-center"><b>{{ schedule.day_of_week }}</b></td>
                            <td class="text-center">

                                <b v-if="schedule.morning_schedule_1 != null">{{ subData(schedule.morning_schedule_1)[3]
                                    }}
                                    <br> {{
                subData(schedule.morning_schedule_1)[1] }} {{
                subData(schedule.morning_schedule_1)[2]
            }}
                                </b>
                            </td>
                            <td class="text-center">
                                <b v-if="schedule.morning_schedule_2 != null">{{ subData(schedule.morning_schedule_2)[3]
                                    }}
                                    <br> {{
                subData(schedule.morning_schedule_2)[1] }} {{
                subData(schedule.morning_schedule_2)[2]
            }}

                                </b>
                            </td>
                            <td class="text-center">
                                <b v-if="schedule.afternoon_schedule_1 != null">{{
                subData(schedule.afternoon_schedule_1)[3]
            }} <br> {{
                    subData(schedule.afternoon_schedule_1)[1] }} {{
                subData(schedule.afternoon_schedule_1)[2] }}

                                </b>

                            </td>
                            <td class="text-center">
                                <b v-if="schedule.afternoon_schedule_2 != null">{{
                subData(schedule.afternoon_schedule_2)[3]
            }} <br> {{
                    subData(schedule.afternoon_schedule_2)[1] }} {{
                subData(schedule.afternoon_schedule_2)[2] }}



                                </b>

                            </td>

                            <td class="text-center">{{ schedule.class_name }}</td>

                        </tr>
                    </tbody>
                </table>

            </div>


        </v-container>

        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">ເພີ່ມຂໍ້ມູນຕາຕະລາງການຮຽນການສອນ</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-select v-model="add_schedule.subject_id" :items="subjectsData"
                                    item-text="subject_name" item-value="subject_id" label="ຊຶ່ວິຊາຮຽນ"
                                    :rules="[(v) => !!v || 'is required']" outlined></v-select>
                            </v-col>
                            <v-col cols="12">
                                <v-select v-model="add_schedule.teacher_id" :items="teacherData" item-text="first_name"
                                    item-value="tc_id" label="ອາຈານສອນ" :rules="[(v) => !!v || 'is required']"
                                    outlined></v-select>
                            </v-col>

                            <v-col cols="12">
                                <v-select v-model="add_schedule.class_name" :items="classData" item-text="name"
                                    item-value="name" label="ຊັ້ນຮຽນ" :rules="[(v) => !!v || 'is required']"
                                    outlined></v-select>
                            </v-col>
                            <v-col cols="12">

                                <v-select v-model="add_schedule.day_of_week" :items="dayData" item-text="dayData"
                                    item-value="dayData" label="ວັນຮຽນ" :rules="[(v) => !!v || 'is required']"
                                    outlined></v-select> </v-col>
                            <v-col cols="12">
                                <v-text-field type="time" label="ເວລາເລີ່ມຮຽນ" v-model="add_schedule.start_time"
                                    required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field type="time" label="ເວລາຢຸດຮຽນ" v-model="add_schedule.end_time"
                                    required></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">ຍົກເລີກ</v-btn>
                    <v-btn color="blue darken-1" text @click="addSchedule()">ເພີ່ມ</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogPrint" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <div class="mb-10 no-printme">
                    <br>
                    <v-btn color="error" class="mr-5 ml-5" @click="dialogPrint = false">ປິດໜ້າຕ່າງ</v-btn>
                    <v-btn @click="printTable" color="primary">ພີມຕາລາງຮຽນ</v-btn>
                    <br>
                </div>
                <div>

                    <img class="text-center mb-2 center"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Emblem_of_Laos.svg/1200px-Emblem_of_Laos.svg.png"
                        width="5%" alt="" srcset="">
                    <h3 class="text-center">ສາທາລະນະລັດ ປະຊາທິປະໄຕ ປະຊາຊົນລາວ</h3>
                    <h3 class="text-center">ສັນຕິພາບ ເອກະລາດ ປະຊາທິປະໄຕ ເອກະລາດ ພັດທະນະຖາວອນ</h3>
                    <br>
                    <h2 class="text-center"><b>ຕາຕະລາງຮຽນຫ້ອງ: {{ class_name }}</b></h2>

                </div>
                <br>
                <div>
                    <table>
                        <thead>
                            <tr class="text-center">
                                <th class="text-center">ວັນ</th>
                                <th class="text-center">ວິຊາຮຽນ</th>
                                <th class="text-center">ວິຊາຮຽນ</th>
                                <th class="text-center">ວິຊາຮຽນ</th>
                                <th class="text-center">ວິຊາຮຽນ</th>
                                <th class="text-center">ຫ້ອງຮຽນ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="schedule in schedules" :key="schedule.class_name">

                                <td class="text-center"><b>{{ schedule.day_of_week }}</b></td>
                                <td class="text-center">

                                    <b v-if="schedule.morning_schedule_1 != null">{{
                subData(schedule.morning_schedule_1)[3]
            }}
                                        <br> {{
                    subData(schedule.morning_schedule_1)[1] }} {{
                subData(schedule.morning_schedule_1)[2]
            }}
                                    </b>
                                </td>
                                <td class="text-center">
                                    <b v-if="schedule.morning_schedule_2 != null">{{
                subData(schedule.morning_schedule_2)[3]
            }}
                                        <br> {{
                    subData(schedule.morning_schedule_2)[1] }} {{
                subData(schedule.morning_schedule_2)[2]
            }}

                                    </b>
                                </td>
                                <td class="text-center">
                                    <b v-if="schedule.afternoon_schedule_1 != null">{{
                                        subData(schedule.afternoon_schedule_1)[3]
                                        }} <br> {{
                                        subData(schedule.afternoon_schedule_1)[1] }} {{
                                        subData(schedule.afternoon_schedule_1)[2] }}

                                    </b>

                                </td>
                                <td class="text-center">
                                    <b v-if="schedule.afternoon_schedule_2 != null">{{
                                        subData(schedule.afternoon_schedule_2)[3]
                                        }} <br> {{
                                        subData(schedule.afternoon_schedule_2)[1] }} {{
                                        subData(schedule.afternoon_schedule_2)[2] }}



                                    </b>

                                </td>

                                <td class="text-center">{{ schedule.class_name }}</td>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
export default {
    data() {
        return {
            dialog: false,
            dialogPrint: false,
            valid: false,
            btnStatus: '',
            schedules: [],
            classData: [],
            morning_schedules: [],
            afternoon_schedules: [],
            class_name: '',
            teacherData: [],
            subjectsData: [],
            dayData: ['ວັນຈັນ', 'ວັນຄານ', 'ວັນພຸດ', 'ວັນພະຫັດ', 'ວັນສຸກ'],
            add_schedule: {
                teacher_id: '',
                subject_id: '',
                class_name: '',
                day_of_week: '',
                start_time: '',
                end_time: ''
            }
        }
    },
    mounted() {
        this.getLearnTable();
        this.getClass();
        this.getTeacher();
        this.getSubject();
    },
    computed: {
        searchClassName: function () {
            this.getLearnTable();
        },
    },
    methods: {
        async getLearnTable() {
            let body = {
                class_name: this.class_name
            }
            const data = await this.$axios.post("/class-schedules", body);
            console.log('student_schedules: ', data.data);
            this.schedules = data.data;
        },
        async getClass() {
            const data = await this.$axios.get("/class", this.form);
            console.log('class: ', data.data);
            this.classData = data.data;
        },

        async getTeacher() {
            const data = await this.$axios.get("/teacher", this.form);
            console.log('teacher: ', data.data);
            this.teacherData = data.data;
        },
        async getSubject() {
            const data = await this.$axios.get("/subjects", this.form);
            console.log('subjects: ', data.data);
            this.subjectsData = data.data;
        },
        async addSchedule() {
            const data = await this.$axios.post("/add_schedule", this.add_schedule);
            console.log('add_schedule: ', data.data);
            this.getLearnTable();
            this.dialog = false;

            await this.$toast.success("Successfully", {
                icon: "fa-check-circle",
            });
        },
        printTable() {
            window.print();
        },
        async deleteTable(id) {

            this.$swal({
                title: "Are you sure?",
                text: "ລົບຂໍ້ມູນຕາລາງຮຽນ",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then((result) => {
                console.log('result: ', result.value);
                if (result.value) {
                  this.deleteDataTable(id);
                    this.$swal("Deleted!", "Your Account has been deleted.", "success");
                }
            });



        },
        async deleteDataTable(id) {
            const data = await this.$axios.delete(`/delete_schedule/${id}`);
            this.getLearnTable();
            await this.$toast.success("Successfully", {
                icon: "fa-check-circle",
            });
        },
        subData(data) {
            const parts = data.split(", ");
            return parts;
        }
    }
}
</script>

<style scoped>
table {
    border-collapse: collapse;
    /* Ensures borders are shared between cells */
    width: 100%;
    /* Optional: Full width table */
}

th {
    border: 1px solid black;
    padding: 8px;
    text-align: center;
    color: #000;
    font-weight: bold;
    font-size: 14pt;
}

td {
    border: 1px solid black;
    padding: 8px;
    text-align: left;
    font-weight: bold;
    font-size: 11pt;
}

@media print {
    .no-printme {
        display: none !important;
    }

    .printme {
        display: block;
    }
}

.center {
    display: block;
    margin-left: auto;
    margin-right: auto;
}
</style>