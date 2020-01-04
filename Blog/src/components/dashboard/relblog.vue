<template>
  <Editor v-model="article.content"/>
</template>
<script>
  import Editor from './UE'
  export default {
    components: {
      Editor
    },
    data() {
      return {
        article: {
          content: '',
        }
      }
    }
  }
</script>
<style>

</style>
