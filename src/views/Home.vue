<template>
    <v-container>
        <v-card>
            <v-card-title>Home <v-spacer></v-spacer> <v-btn color="blue" text><v-icon>mdi-refresh</v-icon></v-btn></v-card-title>
            <v-card-text>
                <v-data-table :headers="headers" :items="tableData">

                </v-data-table>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
export default {
    data(){
        return {
            tableData: [],
            headers:[{text: 'Nombre', value: 'name'}]
        }
    }
}
</script>