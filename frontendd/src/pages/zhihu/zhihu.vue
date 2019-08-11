<template>
  <div class="zhihu" id="orderFullScreen">
    <div class="zhihu-left"></div>
    <div class="zhihu-right" ref="zhihu-right">
      <div class="right1">
        <div class="right1-box1">
          <div class="right1-box1-item">
            <i class="el-icon-tickets" style="margin-bottom: 10px;"></i>
            <span style="font-size:16px;">写回答</span>
          </div>
          <div class="right1-box1-item">
            <i class="el-icon-edit-outline" style="margin-bottom: 10px;"></i>
            <span style="font-size:16px;">写文章</span>
          </div>
          <div class="right1-box1-item">
            <i class="el-icon-news" style="margin-bottom: 10px;"></i>
            <span>写文章</span>
          </div>
        </div>
        <div class="right1-box2">
          <div class="right1-box2-item">
            <el-button type="text" icon="el-icon-time" class="button">我的稍后答</el-button>
          </div>
        </div>
        <div class="right1-box2" style="margin-top: 5px;margin-bottom: 10px;">
          <div class="right1-box2-item">
            <el-button type="text" icon="el-icon-time" class="button">我的草稿</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    mounted() {
      document.getElementById('orderFullScreen').addEventListener('scroll', this.handleScroll, true)
    },
    methods: {
      // 获取滚动条高度
      handleScroll() {
        console.log(document.getElementById('orderFullScreen').scrollTop)
      },
    }
  }
</script>

<style lang="stylus" scoped>
  .zhihu {
    display flex
    font-size 16px
  }

  .zhihu-left {
    flex 0 1 74%
    height 2000px
    background-color #ff00ff
  }

  .zhihu-right {
    flex 0 0 auto
    width 300px
    position fixed
    right 50px
    height 600px
    display flex
    flex-direction column
    justify-content content

    .right1{
      width: 100%;
      display flex
      background #ffffff
      flex-direction column
      box-shadow: 0 0 15px #888888;

      .right1-box1{
        display flex

        .right1-box1-item{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 33.3%;
          cursor: pointer;
          margin-top: 30px;
        }
        .right1-box1-item:hover{
          color blue
        }
      }

      .right1-box2{
        margin-top: 20px;

        .right1-box2-item{
          width: 280px;
          padding-left: 20px;

          .button{
            color: #000
          }
          .button:hover{
            color blue
          }
        }
        .right1-box2-item:hover{
          background rgb(245,247,249);
        }
      }
    }
  }

</style>
