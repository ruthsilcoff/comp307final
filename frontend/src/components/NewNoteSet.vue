<template>
    <v-app>

        <v-content>
            <Header/>
            <v-text-field label="Title" v-model="titleInput"></v-text-field>
            <v-text-field label="Description" v-model="descripInput"></v-text-field>
            <v-file-input counter multiple label="Input files"></v-file-input>

        </v-content>

    </v-app>
</template>