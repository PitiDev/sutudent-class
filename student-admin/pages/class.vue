<template>
    <div>
        <v-container fluid>
            <h1>ຈັດການຂໍ້ມູນຫ້ອງ</h1>
            <br>
            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="ຄົ້ນຫາ" single-line hide-details
                        outlined dense></v-text-field>
                </v-col>
                <v-col cols="12" md="8" class="text-right">
                    <v-btn @click="dialog = true; btnStatus = 'add'" rounded elevation="0"
                        color="primary"><b>ເພີ່ມຂໍ້ມູນຫ້ອງ</b></v-btn>
                </v-col>


            </v-row>
            <br>
            <br>
            <v-data-table :search="search" :headers="headers" :items="classData" :loading="loading">
                <template v-slot:item="row">
                    <tr>
                        <td>{{ row.index + 1 }}</td>
                        <td>{{ row.item.level_class }}</td>
                        <td>{{ row.item.name }}</td>
                        <td>{{ row.item.teacher_name }}</td>

                        <td>
                            <v-btn @click="getClassUpdate(row.item)" color="primary" text>
                                <v-icon>mdi mdi-account-edit-outline</v-icon>
                            </v-btn>
                            <v-btn @click="deleteClass(row.item.id)" color="red" text>
                                <v-icon>mdi mdi-delete-empty-outline</v-icon>
                            </v-btn>
                        </td>
                    </tr>
                </template>
            </v-data-table>
            <br>
        </v-container>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span v-if="btnStatus == 'add'" class="headline">ເພີ່ມຂໍ້ມູນຫ້ອງ</span>
                    <span v-else class="headline">ແກ້ໄຂຂໍ້ມູນຫ້ອງ</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="form.level_class" label="ຊື່ຊັ້ນຮຽນ" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="form.name" label="ຊື່ຫ້ອງ" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="form.teacher_name" label="ອາຈານປະຈຳຫ້ອງ" required></v-text-field>
                            </v-col>

                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn v-if="btnStatus == 'add'" @click="saveClass" color="primary">ເພີ່ມຂໍ້ມູນຫ້ອງ</v-btn>
                    <v-btn v-if="btnStatus == 'update'" @click="updateClass" color="primary">ອັບເດດຂໍ້ມູນຫ້ອງ</v-btn>
                    <v-btn @click="closeBtn" color="error">ປິດx</v-btn>
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
            headers: [
                {
                    text: '#',
                    align: 'start',
                    sortable: false,
                    value: 'ລະຫັດຫ້ອງ',
                },
                {
                    text: 'ຊື່ຊັ້ນຮຽນ',
                    align: 'start',
                    sortable: false,
                    value: 'level_class',
                },
                {
                    text: 'ຊື່ຫ້ອງ',
                    align: 'start',
                    sortable: false,
                    value: 'class_name',
                },
                {
                    text: 'ອາຈານປະຈຳຫ້ອງ',
                    align: 'start',
                    sortable: false,
                    value: 'level',
                },

                {
                    text: 'ຈັດການ',
                    align: 'start',
                    sortable: false,
                    value: 'action',
                },
            ],
            classData: [],
            form: {
                level_class: '',
                name: '',
                teacher_name: '',
            },
            userId: '',
        }
    },
    mounted() {
        this.getClass();
    },
    methods: {
        async getClass() {
            const data = await this.$axios.get("/class", this.form);
            console.log('class: ', data.data);
            this.classData = data.data;
        },

        async saveClass() {
            const data = await this.$axios.post("/add_class", this.form);
            console.log('class: ', data);
            this.dialog = false;
            this.getClass();
        },

        async updateClass() {
            const data = await this.$axios.put(`/update_class/${this.userId}`, this.form);
            console.log('class: ', data);
            this.dialog = false;
            this.getClass();
        },

        getClassUpdate(item) {
            this.btnStatus = 'update';
            this.dialog = true;
            this.userId = item.id;
            this.form.level_class = item.level_class;
            this.form.name = item.name;
            this.form.teacher_name = item.teacher_name;
        },



        async deleteClass(id) {
            this.$swal({
                title: "Are you sure?",
                text: "ລົບຂໍ້ມູນຫ້ອງຮຽນ",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then((result) => {
                console.log('result: ', result.value);
                if (result.value) {
                    this.classDelete(id);
                    this.$swal("Deleted!", "Your Account has been deleted.", "success");
                }
            });

        },

        async classDelete(id) {
            const data = await this.$axios.delete(`/delete_class/${id}`);
            console.log('class: ', data);
            this.dialog = false;
            this.getClass();
        },

        closeBtn() {
            this.dialog = false;
            this.form.level_class = '';
            this.form.name = '';
            this.form.teacher_name = '';
            this.btnStatus = '';
        },

    }
}
</script>
<style scoped>
table.v-table thead th {
    font-size: 18px !important;
}
</style>