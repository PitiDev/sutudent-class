<template>
    <div>
        <h2>ຈັດການຜູ້ໃຊ້ລະບົບ</h2>
        <br>
        <v-row>
            <v-col cols="12" md="4">
                <v-text-field v-model="search" append-icon="mdi-magnify" label="ຄົ້ນຫາ" single-line hide-details
                    outlined dense></v-text-field>
            </v-col>
            <v-col cols="12" md="8" class="text-right">
                <v-btn @click="dialog = true; btnStatus = 'add'" rounded elevation="0"
                    color="primary"><b>ເພີ່ມຜູ້ໃຊ້ລະບົບ</b></v-btn>
            </v-col>
        </v-row>
        <br>

        <v-data-table :search="search" :headers="headers" :items="dataUser" :loading="loading">
            <template v-slot:item="row">
                <tr>
                    <td>{{ row.index + 1 }}</td>
                    <td>{{ row.item.username }}</td>
                    <td>********</td>

                    <td>
                        <v-btn @click="getUserUpdate(row.item)" color="primary" text>
                            <v-icon>mdi mdi-account-edit-outline</v-icon>
                        </v-btn>
                        <v-btn @click="deleteUser(row.item.id)" color="red" text>
                            <v-icon>mdi mdi-delete-empty-outline</v-icon>
                        </v-btn>
                    </td>
                </tr>
            </template>
        </v-data-table>

        <v-dialog v-model="dialog" max-height="500px" max-width="1000">
            <v-card>
                <v-card-title v-if="btnStatus == 'add'">Add User</v-card-title>
                <v-card-title v-if="btnStatus == 'update'">Update User</v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-row>
                            <v-col cols="12" md="6">

                                <v-text-field v-model="user.username" label="Username"
                                    :rules="[(v) => !!v || 'is required']" outlined required></v-text-field>
                                <v-text-field v-model="user.password" label="Password"
                                    :rules="[(v) => !!v || 'is required']" outlined required></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-select v-model="user.role" :items="itemsRole" item-text="name" item-value="id" s
                                    outlined></v-select>
                            </v-col>
                        </v-row>

                        <v-card-actions>
                            <v-btn v-if="btnStatus == 'add'" @click="addUser" color="primary">Add User</v-btn>
                            <v-btn v-if="btnStatus == 'update'" @click="updateUser" color="primary">Update User</v-btn>
                            <v-btn @click="closeBtn" color="error">Cancel</v-btn>
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
                    value: 'name',
                },
                {
                    text: 'Username',
                    align: 'start',
                    sortable: false,
                    value: 'username',
                },
                {
                    text: 'Password',
                    align: 'start',
                    sortable: false,
                    value: 'password',
                },
                {
                    text: 'Action',
                    align: 'start',
                    sortable: false,
                    value: 'action',
                },
            ],
            dataUser: [],
            loading: false,
            pagination: {},
            user: {
                username: '',
                password: '',
                role: '',
            },
            btnStatus: '',
            userId: '',
            itemsRole: [
                {
                    id: 'admin',
                    name: 'Admin',
                },
                {
                    id: 'teacher',
                    name: 'Teacher',
                },
                {
                    id: 'student',
                    name: 'Student',
                },
                {
                    id: 'director',
                    name: 'Director',
                }
            ]
        }
    },
    mounted() {
        this.getAllUser();
        // this.getRole();
    },
    methods: {
        closeBtn() {
            this.dialog = false;
            this.user = {};
        },
        async getAllUser() {
            let res = await this.$axios.$get(`/user/get_user/`);
            console.log('res: ', res);
            this.dataUser = res;
        },

        async addUser() {
            try {
                this.btnStatus = 'add';
                console.log('user: ', this.user);
                if (this.$refs.form.validate() == true) {
                    let res = await this.$axios.$post(`/user/register/`, this.user);
                    console.log('User Add: ', res);
                    this.dialog = false;
                    this.$swal('SUCCESS ', 'Add user', 'success');
                    this.getAllUser();
                    this.user = {};
                }
            } catch (e) {
                this.$toast.global.my_error(`${e}`);

            }

        },
        async getUserUpdate(userData) {
            this.btnStatus = 'update';
            this.dialog = true;
            this.userId = userData.id;
            console.log('user id: ', userData.id);
            this.user = userData;

        },
        async updateUser() {
            try {
                let res = await this.$axios.$put(`/admin/users/${this.userId}`, this.user);
                console.log('User Update: ', res);
                this.getAllUser('');
                this.$swal('SUCCESS ', 'Update user', 'success');
                this.dialog = false;
                this.getAllUser();
            } catch (e) {
                this.$toast.global.my_error(`${e}`);
            }

        },
        async deleteUser(id) {
            try {
                this.$swal({
                    title: "Are you sure?",
                    text: `Delete userId: ${id}`,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
                }).then((result) => {
                    console.log('delete: ', result.value);
                    if (result.value == true) {
                        let res = this.$axios.$delete(`/user/delete_user/${id}`);
                        console.log('User Delete: ', res);
                        this.$swal('SUCCESS ', 'Your user has been deleted.', 'success');
                        this.getAllUser();
                    }
                });


            } catch (e) {
                this.$toast.global.my_error(`${e}`);
            }

        }
    }
}
</script>