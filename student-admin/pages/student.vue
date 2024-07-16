<template>
    <div>
        <v-container fluid>
            <h1>ຈັດການຂໍ້ມູນນັກຮຽນ {{ searchClassName }}</h1>
            <br>
            <v-row>
                <v-col cols="12" md="3">
                    <v-select v-model="class_name" :items="classData" item-text="name" item-value="name" label="ຊັ້ນຮຽນ"
                        :rules="[(v) => !!v || 'is required']" outlined></v-select>


                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="ຄົ້ນຫາ" single-line hide-details
                        outlined></v-text-field>
                </v-col>
                <v-col cols="12" md="6" class="text-right">
                    <v-btn @click="dialog = true; btnStatus = 'add'" rounded elevation="0"
                        color="primary"><b>ເພີ່ມຂໍ້ມູນນັກຮຽນ</b></v-btn>
                </v-col>
                <br>

            </v-row>
            <br>
            <v-data-table :search="search" :headers="headers" :items="studentData" :loading="loading">
                <template v-slot:item="row">
                    <tr>
                        <td>{{ row.index + 1 }}</td>
                        <td>{{ row.item.first_name }}</td>
                        <td>{{ row.item.last_name }}</td>
                        <td>{{ row.item.level }}</td>
                        <td>{{ row.item.class_name }}</td>
                        <td>{{ row.item.age }}</td>
                        <td>{{ row.item.gender }}</td>
                        <td>{{ row.item.address }}</td>
                        <td>
                            <v-btn @click="getUserUpdate(row.item)" color="primary" text>
                                <v-icon>mdi mdi-account-edit-outline</v-icon>
                            </v-btn>
                            <v-btn @click="deleteStudent(row.item.id)" color="red" text>
                                <v-icon>mdi mdi-delete-empty-outline</v-icon>
                            </v-btn>
                        </td>
                    </tr>
                </template>
            </v-data-table>
            <br>
        </v-container>

        <v-dialog v-model="dialog" persistent max-height="500px" max-width="1000">
            <v-card>
                <v-card-title v-if="btnStatus == 'add'">ເພີ່ມຂໍ້ມູນນັກຮຽນ</v-card-title>
                <v-card-title v-if="btnStatus == 'update'">ອັບເດດຂໍ້ມູນນັກຮຽນ</v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="std.first_name" label="ຊື່ແທ້"
                                    :rules="[(v) => !!v || 'is required']" outlined required></v-text-field>
                                <v-text-field v-model="std.last_name" label="ນາມສະກຸນ"
                                    :rules="[(v) => !!v || 'is required']" outlined required></v-text-field>

                                <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                    transition="scale-transition" offset-y min-width="auto">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field v-model="std.date_of_birth" label="ວັນເດືອນປີເກີດ"
                                            prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" outlined
                                            required></v-text-field>
                                    </template>
                                    <v-date-picker v-model="std.date_of_birth" :active-picker.sync="activePicker"
                                        :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substring(0, 10)"
                                        min="1950-01-01" @change="save"></v-date-picker>
                                </v-menu>


                                <v-text-field type="number" v-model="std.age" label="ອາຍຸ"
                                    :rules="[(v) => !!v || 'is required']" outlined required></v-text-field>
                                <v-radio-group v-model="std.gender" :rules="[(v) => !!v || 'is required']" row>
                                    <v-radio label="Male" value="Male"></v-radio>
                                    <v-radio label="Female" value="Female"></v-radio>
                                </v-radio-group>


                                <v-select v-model="std.level" :items="classData" item-text="level_class"
                                    item-value="level_class" label="ຊັ້ນຮຽນ" :rules="[(v) => !!v || 'is required']"
                                    outlined></v-select>

                                <v-text-field v-model="std.class_name" label="ຫ້ອງຮຽນ ຕົວຢ່າງ: 1/1"
                                    :rules="[(v) => !!v || 'is required']" outlined required></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="std.address" label="ທີ່ຢູ່"
                                    :rules="[(v) => !!v || 'is required']" outlined required></v-text-field>
                                <v-text-field v-model="std.parent" label="ຊື່ຜູ້ປົກຄອງ"
                                    :rules="[(v) => !!v || 'is required']" outlined required></v-text-field>
                                <v-text-field v-model="std.phone_parent" label="ເບີໂທຜູ້ປົກຄອງ"
                                    :rules="[(v) => !!v || 'is required']" outlined required></v-text-field>
                                <v-text-field v-model="std.phone" label="ເບີໂທນັກຮຽນ"
                                    :rules="[(v) => !!v || 'is required']" outlined required></v-text-field>
                            </v-col>
                        </v-row>

                        <v-card-actions>
                            <v-btn v-if="btnStatus == 'add'" @click="addStudent"
                                color="primary">ເພີ່ມຂໍ້ມູນນັກຮຽນ</v-btn>
                            <v-btn v-if="btnStatus == 'update'" @click="updateStudent"
                                color="primary">ອັບເດດຂໍ້ມູນນັກຮຽນ</v-btn>
                            <v-btn @click="closeBtn" color="error">ປິດx</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card-text>
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
            headers: [
                {
                    text: '#',
                    align: 'start',
                    sortable: false,
                    value: 'first_name',
                },
                {
                    text: 'ຊື່',
                    align: 'start',
                    sortable: false,
                    value: 'first_name',
                },
                {
                    text: 'ນາມສະກຸນ',
                    align: 'start',
                    sortable: false,
                    value: 'last_name',
                },
                {
                    text: 'ຂັ້ນຮຽນ',
                    align: 'start',
                    sortable: false,
                    value: 'level',
                },
                {
                    text: 'ຫ້ອງຮຽນ',
                    align: 'start',
                    sortable: false,
                    value: 'class_room',
                },
                {
                    text: 'ອາຍຸ',
                    align: 'start',
                    sortable: false,
                    value: 'age',
                },
                {
                    text: 'ເພດ',
                    align: 'start',
                    sortable: false,
                    value: 'gender',
                },
                {
                    text: 'ທີ່ຢູ່',
                    align: 'start',
                    sortable: false,
                    value: 'gender',
                },
                {
                    text: 'ຈັດການ',
                    align: 'start',
                    sortable: false,
                    value: 'action',
                },
            ],
            studentData: [],
            classData: [],
            userId: '',
            std: {
                first_name: '',
                last_name: '',
                date_of_birth: null,
                age: '',
                gender: '',
                level: '',
                class_name: '',
                address: '',
                parent: '',
                phone_parent: '',
                phone: '',
            },
            activePicker: null,
            menu: false,
            class_name: '',
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
    watch: {
        menu(val) {
            val && setTimeout(() => (this.activePicker = 'YEAR'))
        },
    },
    methods: {
        save(date) {
            this.$refs.menu.save(date)
        },
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
        async addStudent() {
            const data = await this.$axios.post("/add_student", this.std);
            console.log('addStudent: ', data.data);
            if (data.status) {
                await this.$toast.success("Successfully", {
                    icon: "fa-check-circle",
                });
                this.getStudent();
                this.closeBtn();
            }
        },
        async getUserUpdate(userData) {
            this.btnStatus = 'update';
            this.dialog = true;
            this.userId = userData.id;

            this.std = userData;
            console.log('user id: ', this.std);

        },
        async updateStudent() {
            const data = await this.$axios.put(`/update_student/${this.userId}`, this.std);
            console.log('updateStudent: ', this.std);
            if (data.status) {
                await this.$toast.success("Successfully", {
                    icon: "fa-check-circle",
                });
                this.getStudent();
                this.closeBtn();
            }
        },
        async deleteStudent(id) {

            this.$swal({
                title: "Are you sure?",
                text: "ລົບຂໍ້ມູນນັກຮຽນ",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then((result) => {
                console.log('result: ', result.value);
                if (result.value) {
                    this.studentDelete(id);
                    this.$swal("Deleted!", "Your Account has been deleted.", "success");
                }
            });


        },
       async studentDelete(id) {
            const data = await this.$axios.delete(`/delete_student/${id}`);
            console.log('deleteStudent: ', data.data);
            if (data.status) {
                await this.$toast.success("Successfully", {
                    icon: "fa-check-circle",
                });
                this.getStudent();
                this.closeBtn();
            }
        },
        closeBtn() {
            this.dialog = false;
            this.std = {};
        },

        async searchStudent() {
            const body = {
                class_name: this.class_name
            }
            const data = await this.$axios.post(`/search_student_by_class_name/`, body);
            console.log('searchStudent: ', data.data);
            this.studentData = data.data;
        }

    }
}
</script>
<style scoped>
table.v-table thead th {
    font-size: 18px !important;
}
</style>