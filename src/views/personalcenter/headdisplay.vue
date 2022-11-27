<template>
    <!--个人中心-->
    <div class="imginfo">
    <!-- left-->
        <div class="circle-set">
            <img  class=" bigimage img-circle img-thumbnail " src="../../../public/img/icon_img/icon_picture@2x.png"
                 alt=""/>
            <img class="smallimageset" src="../../../public/img/icon_img/icon_VIP.png">
        </div>

<!--        center-->
        <div class="nameset">
            <h class="name">
                平安保险杨少侠</h>
            <p class="name-hint">
                完善信息 让客户找到你</p>
        </div>

<!--        right-->
            <img class="name-edit" src="@/../public/img/icon_img/icon_edit.png" style="height:32px;width: 32px;"/>

    </div>
</template>

<script>
    export default {
        name: "headdisplay"
    }
</script>

<style scoped>
    .left{
        width:calc(120 / 750 * 100vw);
        height: calc(120 / 750 * 100vw);
    }

    .imginfo {
        display: inline-block;
        width: 100%;
    }

    .circle-set {
        position: relative;
        margin-top: calc(64 / 750 * 100vw);
        margin-left: calc(40 / 750 * 100vw);
        width: calc(120 / 750 * 100vw);
        height: calc(120 / 750 * 100vw);
        float: left;
    }
    .bigimage{
        width: calc(120 / 750 * 100vw);
        height: calc(120 / 750 * 100vw);
    }

    .smallimageset {
        width: calc(48 / 750 * 100vw);
        height: calc(48 / 750 * 100vw);
        position: absolute;
        right: 0;
        bottom: 0;
    }
    .nameset{
        margin-left: calc(32 / 750 * 100vw);
        float: left;
        margin-top:calc(76 / 750 * 100vw) ;
    }

    .name {
        font-family: PingFangSC-Medium, PingFang SC;
        font-size: calc(48 / 750 * 100vw);
        margin-top: calc(12 / 750 * 100vw);
        color:rgba(51,51,51,1);
        height: calc(48 / 750 * 100vw);
        width: calc(336 / 750 * 100vw);;
        font-weight:500;
    }

    .name-hint {
        width: calc(264 / 750 * 100vw);
        height: calc(24 / 750 * 100vw);
        font-size: calc(24 / 750 * 100vw);
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: calc(24 / 750 * 100vw);
    }

    .name-edit {
        position: absolute;
        margin-left: calc(150 / 750 * 100vw);
        margin-top: calc(108 / 750 * 100vw);
        margin-right: calc(40 / 750 * 100vw);
    }

</style>