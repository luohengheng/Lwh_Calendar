<template>
    <div class="container">
        <MyCalendar
            :maxMonth="3"
        />
    </div>
</template>

<script>
    import MyCalendar from '../my_calendar/MyCalendar.vue'
    export default {
        name: "Lwh_Calendar",
        components: {
            MyCalendar
        }
    }
</script>

<style scoped lang="less">
    .container{
        width: 100%;
        margin: auto;
    }
</style>
