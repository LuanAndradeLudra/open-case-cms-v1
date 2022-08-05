<template>
  <div class="page-dashboard">
    <div class="box">Dashboard</div>
    <div class="box mt-3">
      <b-row>
        <b-col>
          <div class="my-card">
            <div class="content">
                <div class="number-value">13</div>
                <span>Caixas</span>
            </div>
            <div class="footer">Teste</div>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="scss">
.page-dashboard {
  .my-card {
    width: 100%;
    height: 150px;
    background-color: #000000c9;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .content {
      padding: 12px;
      color: rgb(179, 179, 179);
      .number-value{
        font-size: 32px;
        color: #ffffff;
        font-weight: bold;
      }
    }
    .footer {
      min-height: 50px;
      background: #161622;
      padding: 12px;
      border-radius: 0 0 8px 8px;
    }
  }
}
</style>
