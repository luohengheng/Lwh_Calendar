<template>
    <div class="mc-container">
        <div class="mc_header">
            <span class="mc_header_left" @click="preMonth" v-show="list.length == 1"><</span>
            <span class="mc_header_content">{{this.headtop}}</span>
            <span class="mc_header_right" @click="nextMonth" v-show="list.length == 1">></span>
        </div>
        <div class="my_content" v-for="(item, index) in list" :key="index">
            <span class="my_content_item"
              v-for="(iitem, index2) in item"
              :key="index2"
              :style="{'width': singleW+'px', 'height': singleW+'px'}"
              :class="{
               'width': singleW + 'px', 'height': singleW + 'px' ,
                my_item_grey: isGrey(iitem),
                my_item_today: iitem.isToday,
                my_item_check: judgeDate(iitem)
              }"
              @click="checkDay(iitem)"
            >
                {{iitem.id}}
            </span>
        </div>
    </div>
</template>

<script>
    import timeutil from './mycalendar'

    export default {
        name: "MyCalendar",
        data() {
            return {
              headtop: '',
              today: [],
              list: [],
              checkDate: false,
              chooseStart: '',
              chooseEnd: '',
              //屏幕宽度
              screenW: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
              //屏幕分7份，单份宽度
              singleW: 0,
            }
        },
        props: {
            maxMonth: {
                type: Number,
                default: 1
            }
        },
        mounted() {
            this.initData()
            this.singleW = this.screenW / 7
        },
        computed: {

        },
        methods: {
            initData() {
                for (let i = 0; i < this.maxMonth; i++) {
                    if(i == 0) {
                        this.today = new Date()
                        this.list[i] = this.getList(this.today)
                    }else {
                        this.today = timeutil.getOtherMonth(this.today, "nextMonth");
                        this.list[i] = this.getList(this.today)
                    }
                }
            },
            // 判断日期时候在选中期间
            judgeDate(item) {
                if(item.otherMonth === 'preMonth' || item.otherMonth === 'nextMonth') {
                    return false
                }
                if(this.chooseStart && this.chooseEnd) {
                    return timeutil.judgeTwoDate(this.chooseStart, item.date) &&
                        timeutil.judgeTwoDate(item.date, this.chooseEnd)
                }else if(this.chooseStart || this.chooseEnd){
                    return this.chooseStart === item.date || this.chooseEnd === item.date
                }
            },
            isGrey(item) {
                return item.otherMonth === 'preMonth' || item.otherMonth === 'nextMonth'
            },
            preMonth() {
                this.today = timeutil.getOtherMonth(this.today, "preMonth");
                this.list[0] = this.getList(this.today);
            },
            nextMonth() {
                this.today = timeutil.getOtherMonth(this.today, "nextMonth");
                this.list[0] = this.getList(this.today)
            },
            checkDay(item) {
                if(item.otherMonth === 'preMonth' || item.otherMonth === 'nextMonth') {
                    this.chooseStart = ''
                }else {
                    if(this.chooseStart == '') {
                        this.chooseStart = item['date']
                        console.error(this.chooseStart + '------chooseStart')
                    }else {
                        if(timeutil.judgeTwoDate(item['date'], this.chooseStart)) {
                            this.chooseStart = ''
                            this.chooseEnd = ''
                            return
                        }
                        this.chooseEnd = item['date']
                        console.error(this.chooseEnd + '------chooseEnd')
                    }
                }

                // (item.otherMonth === 'preMonth' || item.otherMonth === 'nextMonth') ? '' : this.$toast(item.date)
                if(!(item.otherMonth === 'preMonth' || item.otherMonth === 'nextMonth')) {
                  this.$toast(item.date)
                }
            },
            getList(date) {
                this.headtop = `${date.getFullYear()}年${date.getMonth() + 1}月`;
                return timeutil.getMonthList(date);

            }
        },
    }
</script>

<style scoped lang="less">
    .mc-container{
        width: 100%;
        .mc_header{
            width: 100%;
            height: 50px;
            background-color: lightcoral;
            display: flex;
            flex-direction: row;
            .mc_header_left, .mc_header_right{
                flex: 1;
                font-size: 15px;
                color: aquamarine;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .mc_header_content{
                flex: 3;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
        .my_content{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            margin-bottom: 1px;
            .my_content_item{
                line-height: 50px;
                font-size: 15px;
                background-color: white;
                text-align: center;
            }
            .my_item_grey{
                color: #dddddd;
            }
            .my_item_check{
                color: #0fc37c;
            }
            .my_item_today{
                color: red;
            }
        }
    }


</style>
