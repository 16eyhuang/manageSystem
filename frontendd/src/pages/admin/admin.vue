<template>
  <div class="admin">
    <div class="admin-left">
      <img src="~@/assets/images/stand.png" alt="">
    </div>
    <div class="admin-right">
      <p>这是只有管理员才能看到的页面</p>
      <span>只有管理员账户</span>
      <p class="admin-right-tips" @click="$router.push('/')">返回工作台</p>
      <p class="admin-right-tips" @click="$router.go(-1)">返回上一页</p>
    </div>
  </div>
</template>
<script>
  export default{};
</script>
<style lang="stylus" scoped>
  .admin{
    width 100%
    height 100%
    display flex
    justify-content center
    align-items center

    .admin-left{
      flex 1
      text-align center
      img{
        height 500px
      }
    }
    .admin-right{
      flex 1
      color #409EEF
      p{
        color #222
        font-size 20px
        line-height 24px
        margin-bottom 10px
        font-weight 700
      }
      .admin-right-tips{
        color #409eff;
        font-size 14px
        cursor pointer
        font-weight 100
        width 70px
      }
      span {
        font-size 13px
        line-height 21px
        color grey
        margin-bottom 30px
      }
    }
  }
</style>
