<template>
  <div class="videoBx">
    <video controls>
      <source src="../public/video/Sample.mp4" type="video/mp4">
    </video>
  </div>
</template>

<script>
export default {
  name: "SampleDemo"
}
</script>

<style scoped lang="scss">
  .videoBx {
    video {
      width: 100%;
    }
  }
</style>