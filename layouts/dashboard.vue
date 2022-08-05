<template>
  <div class="layout-default">
    <b-row class="m-0">
      <b-col cols="2" class="p-0 pr-4"><Sidebar /></b-col>
      <b-col class="side-content" cols="10"><Nuxt /></b-col>
    </b-row>
  </div>
</template>

<script>
import admin from '~/middleware/admin'

export default {
  middleware: ["auth", admin],
};
</script>

<style lang="scss">
.layout-default {
  padding: 40px 20px;
  .side-content {
    width: 100%;
    min-height: 90vh;
  }
}
</style>
