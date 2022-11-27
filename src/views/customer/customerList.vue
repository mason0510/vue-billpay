<template>
    <Item_customer
            v-for="customer in data"
            :key="customer.code"
            :customer="customer"
            @click.native="goToDetail('/detail?code='+customer.code)" >
    </Item_customer>
</template>

<script>
    import Item_customer from "./item_customer";
    export default {
        name: "CustomerList",
        props:['data'],
        components: {Item_customer},
        methods:{
            goToDetail(path){
                // /detail?code=123
                this.$router.push(path);
            }
        }
    }
</script>

<style scoped>

</style>