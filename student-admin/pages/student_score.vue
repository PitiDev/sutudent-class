<template>
    <div>
        <v-container fluid>
            <h1>ຈັດການຂໍ້ມູນຄະແນນ {{ searchClassName }}</h1>
            <br>
            <v-row>
                <v-col cols="12" md="3">
                    <v-select v-model="class_name" :items="classData" item-text="name" item-value="name"
                        label="ເລືອກຫ້ອງຮຽນ" outlined></v-select>
                </v-col>

                <v-col cols="12" md="3">
                    <v-select v-model="month" :items="months" item-text="month" item-value="month" label="ເລຶອກເດືອນ"
                        outlined></v-select>
                </v-col>

                <br>

            </v-row>
            <br>

            <br>
            <v-simple-table>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th width="2%">
                                <div class="fonts-s">ດ/ລ</div>
                            </th>
                            <th class="text-center" width="10%">
                                <div class="fonts-s">ຊື່ ແລະ ນາມສະກຸນ</div>
                            </th>

                            <th width="2%">
                                <div class="vertical-text ma-1">ຄະນິດສາດ</div>
                            </th>
                            <th width="2%">
                                <div class="vertical-text ma-1">ຟິສິກສາດ</div>
                            </th>
                            <th width="2%">
                                <div class="vertical-text ma-1">ເຄມີສາດ</div>
                            </th>
                            <th width="2%">
                                <div class="vertical-text ma-1">ພາສາລາວ</div>
                            </th>
                            <th width="2%">
                                <div class="vertical-text ma-1">ພູມສາດ</div>
                            </th>
                            <th width="2%">
                                <div class="vertical-text ma-1">ປະຫວັດສາດ</div>
                            </th>
                            <th width="2%">
                                <div class="vertical-text ma-1">ຊີວະສາດ</div>
                            </th>
                            <th width="2%">
                                <div class="vertical-text ma-1">ສືກສາພົນລະເມືອງ</div>
                            </th>
                            <th width="2%">
                                <div class="vertical-text ma-1">ອັງກິດ</div>
                            </th>
                            <th width="2%">
                                <div class="fonts-s">ອັບເດດຄະແນນ</div>
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in studentData" :key="item.id">
                            <td>{{ index + 1 }}</td>
                            <td class="text-left"> <b v-if="item.gender == `Male`">ທ. {{ item.first_name }} {{
                item.last_name }}</b> <b v-if="item.gender == `Female`">ນ. {{ item.first_name }} {{
                item.last_name }}</b> </td>
                            <td><v-text-field class="text-center mt-3" placeholder="ຄະແນນ" v-model="item.maths" outlined
                                    dense></v-text-field></td>
                            <td><v-text-field class="text-center mt-3" placeholder="ຄະແນນ" v-model="item.physics"
                                    outlined dense></v-text-field></td>
                            <td><v-text-field class="text-center mt-3" placeholder="ຄະແນນ" v-model="item.chemistry"
                                    outlined dense></v-text-field></td>
                            <td><v-text-field class="text-center mt-3" placeholder="ຄະແນນ" v-model="item.laolanguage"
                                    outlined dense></v-text-field></td>
                            <td><v-text-field class="text-center mt-3" placeholder="ຄະແນນ" v-model="item.phoumsath"
                                    outlined dense></v-text-field></td>
                            <td><v-text-field class="text-center mt-3" placeholder="ຄະແນນ" v-model="item.history"
                                    outlined dense></v-text-field></td>
                            <td><v-text-field class="text-center mt-3" placeholder="ຄະແນນ" v-model="item.biology"
                                    outlined dense></v-text-field></td>
                            <td><v-text-field class="text-center mt-3" placeholder="ຄະແນນ" v-model="item.laostudy"
                                    outlined dense></v-text-field></td>
                            <td><v-text-field class="text-center mt-3" placeholder="ຄະແນນ" v-model="item.english"
                                    outlined dense></v-text-field></td>
                            <td>
                                <v-btn @click="addScore(item)" color="primary">ບັນທືກ</v-btn>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>

            <br>
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
            month: '',
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

            ],
            months: [
                '01/2024',
                '02/2024',
                '03/2024',
                '04/2024',
                '05/2024',
                '06/2024',
                '07/2024',
                '08/2024',
                '09/2024',
                '10/2024',
                '11/2024',
                '12/2024',
            ]
        }
    },
    computed: {
        searchClassName: function () {
            this.searchStudent();
        },
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
        async searchStudent() {
            const body = {
                class_name: this.class_name
            }
            const data = await this.$axios.post(`/search_student_by_class_name/`, body);
            console.log('searchStudent: ', data.data);
            this.studentData = data.data;
        },
        async addScore(item) {

            const filteredStudent = (({ maths, physics, chemistry, laolanguage, phoumsath, history, biology, laostudy, english }) => ({
                maths, physics, chemistry, laolanguage, phoumsath, history, biology, laostudy, english

            }))(item);

            console.log('filteredStudent: ', filteredStudent);

            console.log('addScore: ', item);

            const body = Object.keys(filteredStudent).map((key, index) => {
                return {
                    student_id: item.id,
                    subject_id: (index + 1),
                    score: filteredStudent[key],
                    month: this.month
                }
            });
            console.log('body: ', body);

            if (this.month != '') {
                for (const score of body) {
                    const data = await this.$axios.post(`/add_score/`, score);
                    console.log('add_score: ', data.data);
                }
                await this.$toast.success("Successfully", {
                icon: "fa-check-circle",
            });
            }else{
                await this.$toast.error("ກະລຸນາເລືອກເດືອນ", {
                icon: "fa-check-circle",
            });
            }



            // const data = await this.$axios.post(`/add_score/`, body);

            // console.log('add_score: ', data.data);

          


        },

        async updateScore(id, subjectId, sub_score) {
            const body = {
                student_id: id,
                subject_id: subjectId,
                score: sub_score,
                month: this.month
            }
            const data = await this.$axios.post(`/update_score/`, body);
            console.log('updateScore: ', data.data);
            this.studentData = data.data;
        }

    }
}
</script>

<style scoped>
.vertical-text {
    writing-mode: vertical-rl;
    /* Rotate text vertically */
    transform: rotate(180deg);
    /* Optional: Rotate text for browser compatibility */
    text-align: center;
    /* Optional: Center text horizontally */
    font-size: 16px;
    /* Set font size */
}

.fonts-s {
    font-size: 16px;
}

table {
    border-collapse: collapse;
    /* Ensures borders are shared between cells */
    width: 100%;
    /* Optional: Full width table */
}

th,
td {
    border: 1px solid black;
    /* Add border to table header and cells */
    padding: 0px;
    /* Optional: Add padding for better spacing */
    text-align: center;
    /* Optional: Center align text */
}

thead th {
    background-color: #f2f2f2;
    /* Optional: Background color for header */
}
</style>