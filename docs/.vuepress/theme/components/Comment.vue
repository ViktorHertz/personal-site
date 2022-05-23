<template>
  <div>
<!--    <span class="waline-pageview-count"></span>-->
    <div id="waline">
    </div>
  </div>
</template>

<script>
export default {
  name: "Comment",
  mounted() {
    Waline.init({
      dark: 'auto',
      el: '#waline',
      serverURL: 'https://blog-comment-1ee13c0sk-viktorhertz.vercel.app',
      pageview: true, // 浏览量统计 选择器:waline-pageview-count
      // path: this.pageInfo.path,
    });
  },
  watch: {
    $route(newVal, oldVal) {
      Waline.init({
        dark: 'auto',
        el: '#waline',
        serverURL: 'https://blog-comment-1ee13c0sk-viktorhertz.vercel.app',
        pageview: true, // 浏览量统计 选择器:waline-pageview-count
        // path: this.pageInfo.path,
      });
    }
  }
}
</script>

<style scoped>

</style>