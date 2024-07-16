<template>
    <div>
        <v-container fluid>
            <h1>ຈັດການຂໍ້ມູນອາຈານ</h1>
            <br>
            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="ຄົ້ນຫາ" single-line hide-details
                        outlined dense></v-text-field>
                </v-col>
                <v-col cols="12" md="8" class="text-right">
                    <v-btn @click="dialog = true; btnStatus = 'add'" rounded elevation="0"
                        color="primary"><b>ເພີ່ມຂໍ້ມູນອາຈານ</b></v-btn>
                </v-col>
                <br>

            </v-row>
            <v-data-table :search="search" :headers="headers" :items="teacherData" :loading="loading">
                <template v-slot:item="row">
                    <tr>
                        <td>{{ row.index + 1 }}</td>
                        <td>{{ row.item.first_name }}</td>
                        <td>{{ row.item.last_name }}</td>
                        <td>{{ row.item.level }}</td>
                        <td>{{ row.item.class_room }}</td>
                        <td>{{ row.item.position }}</td>
                        <td>{{ row.item.age }}</td>
                        <td>{{ row.item.gender }}</td>
                        <td>
                            <v-btn @click="getTeacherUpdate(row.item)" color="primary" text>
                                <v-icon>mdi mdi-account-edit-outline</v-icon>
                            </v-btn>
                            <v-btn @click="deleteTeacher(row.item.tc_id)" color="red" text>
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
                <v-card-title v-if="btnStatus == 'add'">ເພີ່ມຂໍ້ມູນອາຈານ</v-card-title>
                <v-card-title v-if="btnStatus == 'update'">ອັບເດດຂໍ້ມູນອາຈານ</v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="tch.first_name" label="ຊື່ແທ້"
                                    :rules="[(v) => !!v || 'is required']" outlined required></v-text-field>
                                <v-text-field v-model="tch.last_name" label="ນາມສະກຸນ"
                                    :rules="[(v) => !!v || 'is required']" outlined required></v-text-field>



                                <v-text-field type="number" v-model="tch.age" label="ອາຍຸ"
                                    :rules="[(v) => !!v || 'is required']" outlined required></v-text-field>
                                <v-radio-group v-model="tch.gender" :rules="[(v) => !!v || 'is required']" row>
                                    <v-radio label="Male" value="Male"></v-radio>
                                    <v-radio label="Female" value="Female"></v-radio>
                                </v-radio-group>


                                <v-select v-model="tch.level" :items="leveldata" item-text="leveldata"
                                    item-value="leveldata" label="ບຸດທີການສືກສາ" :rules="[(v) => !!v || 'is required']"
                                    outlined></v-select>

                                <v-text-field v-model="tch.class_room" label="ປະຈຳຫ້ອງ ຕົວຢ່າງ: 1/1"
                                    :rules="[(v) => !!v || 'is required']" outlined required></v-text-field>

                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="tch.position" label="ຕຳແຫນ່ງ"
                                    :rules="[(v) => !!v || 'is required']" outlined required></v-text-field>
                                <v-text-field v-model="tch.address" label="ທີ່ຢູ່"
                                    :rules="[(v) => !!v || 'is required']" outlined required></v-text-field>
                                <v-text-field v-model="tch.phone" label="ເບີໂທ" :rules="[(v) => !!v || 'is required']"
                                    placeholder="20xxxxxxxx" outlined required></v-text-field>
                            </v-col>
                        </v-row>

                        <v-card-actions>
                            <v-btn v-if="btnStatus == 'add'" @click="addTeacher"
                                color="primary">ເພີ່ມຂໍ້ມູນອາຈານ</v-btn>
                            <v-btn v-if="btnStatus == 'update'" @click="updateTeacher"
                                color="primary">ອັບເດດຂໍ້ມູນອາຈານ</v-btn>
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
                    text: 'ບຸດທີການສືກສາ',
                    align: 'start',
                    sortable: false,
                    value: 'level',
                },
                {
                    text: 'ປະຈຳຫ້ອງຮຽນ',
                    align: 'start',
                    sortable: false,
                    value: 'class_room',
                },
                {
                    text: 'ຕຳແຫນ່ງ',
                    align: 'start',
                    sortable: false,
                    value: 'position',
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
                    text: 'ຈັດການ',
                    align: 'start',
                    sortable: false,
                    value: 'action',
                },
            ],
            teacherData: [],
            leveldata: ['ຊັ້ນກາງ', 'ຊັ້ນສູງ', 'ປະຣີນຍາຕິ', 'ປະຣີນຍາໂທ'],
            tch: {
                first_name: '',
                last_name: '',
                level: '',
                class_room: '',
                position: '',
                age: '',
                gender: '',
                address: '',
                phone: ''
            },
            classData: [],
            userId: '',
        }
    },
    mounted() {
        this.getTeacher();
        this.getClass();
    },
    methods: {
        async getTeacher() {
            const data = await this.$axios.get("/teacher", this.form);
            console.log('class: ', data.data);
            this.teacherData = data.data;
        },
        async getClass() {
            const data = await this.$axios.get("/class", this.form);
            console.log('class: ', data.data);
            this.classData = data.data;
        },
        async addTeacher() {
            const data = await this.$axios.post("/add_teacher", this.tch);
            console.log('class: ', data.data);
            this.getTeacher();
            this.closeBtn();

        },
        getTeacherUpdate(item) {
            this.dialog = true;
            this.btnStatus = 'update';
            this.userId = item.tc_id;
            this.tch.first_name = item.first_name;
            this.tch.last_name = item.last_name;
            this.tch.level = item.level;
            this.tch.class_room = item.class_room;
            this.tch.position = item.position;
            this.tch.age = item.age;
            this.tch.gender = item.gender;
            this.tch.address = item.address;
            this.tch.phone = item.phone;
        },
        async updateTeacher() {
            const data = await this.$axios.put(`/update_teacher/${this.userId}`, this.tch);
            console.log('class: ', data.data);
            this.getTeacher();
            this.closeBtn();
        },
        async deleteTeacher(id) {

            this.$swal({
                title: "Are you sure?",
                text: "ລົບຂໍ້ມູນອາຈານ",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then((result) => {
                console.log('result: ', result.value);
                if (result.value) {
                    this.teacherDelete(id);
                    this.$swal("Deleted!", "Your Account has been deleted.", "success");
                }
            });

        

        },
       async teacherDelete(id) {
            const data = await this.$axios.delete(`/delete_teacher/${id}`);
            console.log('class: ', data.data);
            this.getTeacher();
        },
        closeBtn() {
            this.dialog = false;
            this.tch = {};
        }

    }
}
</script>
<style scoped>
table.v-table thead th {
    font-size: 18px !important;
}
</style>