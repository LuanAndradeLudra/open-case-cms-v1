<template>
  <div class="page-dashboard">
    <div class="box">Dashboard</div>
    <div class="box mt-3">
      <b-overlay :show="overlay" rounded="sm" variant="transparent" blur="1px">
        <b-row>
          <b-col>
            <div class="my-card">
              <div class="content">
                <div class="number-value">{{ info.weapons }}</div>
                <span>Weapons</span>
              </div>
              <div class="footer cursor-pointer">Conferir</div>
            </div>
          </b-col>
          <b-col>
            <div class="my-card">
              <div class="content">
                <div class="number-value">{{ info.box }}</div>
                <span>Caixas</span>
              </div>
              <div class="footer cursor-pointer">Conferir</div>
            </div>
          </b-col>
          <b-col>
            <div class="my-card">
              <div class="content">
                <div class="number-value">{{ info.categories }}</div>
                <span>Categorias</span>
              </div>
              <div class="footer cursor-pointer">Conferir</div>
            </div>
          </b-col>
        </b-row>
      </b-overlay>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      overlay: true,
      info: {
        weapons: 0,
        box: 0,
        categories: 0,
      },
    };
  },
  created(){
    this.loadData()
  },
  methods: {
    async loadData (){
      try {
        const weaponsResponse = await this.$axios.get("weapon/list")
        this.info.weapons = weaponsResponse.data.data.length
        const boxResponse = await this.$axios.get("box/list")
         this.info.box = boxResponse.data.data.length
        const cateogiesResponse = await this.$axios.get("categories/list")
         this.info.categories = cateogiesResponse.data.data.length
        this.overlay = false
      } catch (err) {
        this.overlay = false
        this.$toast.open({
          message: "Erro ao carregar itens!",
          type: "error",
          position: "top-right",
          duration: 4000,
        });
      }
    }
  }
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
      .number-value {
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
