<template>
  <div>安全退出</div>
</template>

<script>
  export default {
    name: "out",
    created() {
      this.layout()
    },
    methods: {
      layout() {
        this.axio.get("/blog_back/admin/logout").then(res => {
          this.$router.push('/login');
        }).catch(err => {
          console.log("退出异常:" + err)
        })
      }
    }
  }
</script>

<style scoped>

</style>
