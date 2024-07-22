<template>
    <div>
        <v-container fluid>
            <h1>ລາຍງານຈັດອັນດັບທີ {{ searchClassName }}</h1>
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
            <v-btn class="mb-5" @click="dialog = true" rounded elevation="0" color="primary">ພີມໃບຄະແນນ</v-btn>
            <br>
            <v-simple-table>
                <template v-slot:default>
                    <thead>
                        <tr height="120px">
                            <th width="0.2%">
                                <div class="fonts-s">ດ/ລ</div>
                            </th>
                            <th class="text-center" width="5%">
                                <div class="fonts-s">ຊື່ ແລະ ນາມສະກຸນ</div>
                            </th>

                            <th width="0.2%">
                                <div class="vertical-text ma-1">ຄະນິດສາດ</div>
                            </th>
                            <th width="0.2%">
                                <div class="vertical-text ma-1">ຟິສິກສາດ</div>
                            </th>
                            <th width="0.2%">
                                <div class="vertical-text ma-1">ເຄມີສາດ</div>
                            </th>
                            <th width="0.2%">
                                <div class="vertical-text ma-1">ພາສາລາວ</div>
                            </th>
                            <th width="0.2%">
                                <div class="vertical-text ma-1">ພູມສາດ</div>
                            </th>
                            <th width="0.2%">
                                <div class="vertical-text ma-1">ປະຫວັດສາດ</div>
                            </th>
                            <th width="0.2%">
                                <div class="vertical-text ma-1">ຊີວະສາດ</div>
                            </th>
                            <th width="0.2%">
                                <div class="vertical-text ma-1">ສືກສາພົນລະເມືອງ</div>
                            </th>
                            <th width="0.2%">
                                <div class="vertical-text ma-1">ອັງກິດ</div>
                            </th>
                            <th width="0.2%">
                                <div class="vertical-text ma-1">ລວມຄະແນນ</div>
                            </th>
                            <th width="0.2%">
                                <div class="vertical-text ma-1">ຈັດອັນດັບທີ</div>
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in studentData" :key="item.id">
                            <td>{{ index + 1 }}</td>
                            <td class="text-left"> <b v-if="item.gender == `Male`">ທ. {{ item.first_name }} {{
                item.last_name }}</b> <b v-if="item.gender == `Female`">ນ. {{ item.first_name }} {{
                item.last_name }}</b> </td>
                            <td>{{ item.maths }}</td>
                            <td>{{ item.physics }}</td>
                            <td>{{ item.chemistry }}</td>
                            <td>{{ item.laolanguage }}</td>
                            <td>{{ item.phoumsath }}</td>
                            <td>{{ item.history }}</td>
                            <td>{{ item.biology }}</td>
                            <td>{{ item.laostudy }}</td>
                            <td>{{ item.english }}</td>
                            <td><b>{{ item.total_score }}</b></td>
                            <td><b>{{ index + 1 }}</b></td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>

            <br>
        </v-container>

        <v-row justify="center">
            <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-card>
                    <div class="mb-10 no-printme">
                        <br>
                        <v-btn color="error" class="mr-5 ml-5" @click="dialog = false">ປິດໜ້າຕ່າງ</v-btn>
                        <v-btn @click="printReport" color="primary">ພີມໃບຄະແນນ</v-btn>
                        <br>
                    </div>
                    <div>

                        <img class="text-center mb-2 center"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Emblem_of_Laos.svg/1200px-Emblem_of_Laos.svg.png"
                            width="5%" alt="" srcset="">
                        <h2 class="text-center">ສາທາລະນະລັດ ປະຊາທິປະໄຕ ປະຊາຊົນລາວ</h2>
                        <h2 class="text-center">ສັນຕິພາບ ເອກະລາດ ປະຊາທິປະໄຕ ເອກະລາດ ພັດທະນະຖາວອນ</h2>
                        <br>
                        <h1 class="text-center"><b>ຄະແນນ ແລະ ການຈັດອັນດັບຫ້ອງ {{ class_name }}</b></h1>
                        <h2 class="text-center">ປະຈຳເດືອນ: {{ month }}</h2>
                        <br>
                        <br>
                    </div>
                    <div class="student-print">
                        <v-simple-table>
                            <template v-slot:default>
                                <thead>
                                    <tr height="120px">
                                        <th width="0.2%">
                                            <div class="fonts-s">ດ/ລ</div>
                                        </th>
                                        <th class="text-center" width="5%">
                                            <div class="fonts-s">ຊື່ ແລະ ນາມສະກຸນ</div>
                                        </th>

                                        <th width="0.2%">
                                            <div class="vertical-text ma-1">ຄະນິດສາດ</div>
                                        </th>
                                        <th width="0.2%">
                                            <div class="vertical-text ma-1">ຟິສິກສາດ</div>
                                        </th>
                                        <th width="0.2%">
                                            <div class="vertical-text ma-1">ເຄມີສາດ</div>
                                        </th>
                                        <th width="0.2%">
                                            <div class="vertical-text ma-1">ພາສາລາວ</div>
                                        </th>
                                        <th width="0.2%">
                                            <div class="vertical-text ma-1">ພູມສາດ</div>
                                        </th>
                                        <th width="0.2%">
                                            <div class="vertical-text ma-1">ປະຫວັດສາດ</div>
                                        </th>
                                        <th width="0.2%">
                                            <div class="vertical-text ma-1">ຊີວະສາດ</div>
                                        </th>
                                        <th width="0.2%">
                                            <div class="vertical-text ma-1">ສືກສາພົນລະເມືອງ</div>
                                        </th>
                                        <th width="0.2%">
                                            <div class="vertical-text ma-1">ອັງກິດ</div>
                                        </th>
                                        <th width="0.2%">
                                            <div class="vertical-text ma-1">ລວມຄະແນນ</div>
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in studentData" :key="item.id">
                                        <td>{{ index + 1 }}</td>
                                        <td class="text-left"> <b v-if="item.gender == `Male`">ທ. {{ item.first_name }}
                                                {{
                item.last_name }}</b> <b v-if="item.gender == `Female`">ນ. {{
                item.first_name }}
                                                {{
                item.last_name }}</b> </td>
                                        <td>{{ item.maths }}</td>
                                        <td>{{ item.physics }}</td>
                                        <td>{{ item.chemistry }}</td>
                                        <td>{{ item.laolanguage }}</td>
                                        <td>{{ item.phoumsath }}</td>
                                        <td>{{ item.history }}</td>
                                        <td>{{ item.biology }}</td>
                                        <td>{{ item.laostudy }}</td>
                                        <td>{{ item.english }}</td>
                                        <td><b>{{ item.total_score }}</b></td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </div>
                </v-card>
            </v-dialog>
        </v-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialog: false,
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
                class_name: this.class_name,
                month: this.month
            }
            const data = await this.$axios.post(`/score_by_class_and_month/`, body);
            console.log('searchStudent: ', data.data);
            this.studentData = data.data;
        },
        printReport() {
            window.print();
        },

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
    padding: 8px;
    /* Optional: Add padding for better spacing */
    text-align: center;
    /* Optional: Center align text */
}


.student-print {
    position: relative;
    margin-left: 50px;
    margin-right: 50px;
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