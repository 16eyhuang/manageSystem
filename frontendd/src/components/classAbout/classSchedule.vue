<template>
  <div class="class-schedule" style="width: 100px;height: 100px;border: 1px solid red">

  </div>
</template>

<script>
  export default {
    props:{
      data:Array
    },
    mounted() {
      console.log(this.data);
    }
  }
</script>
