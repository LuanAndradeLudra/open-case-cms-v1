<template>
  <div class="layout-default">
    <b-overlay :show="overlay" rounded="sm" variant="transparent">
      <template #overlay>
        <div class="text-center">
          <div class="position-absolute" style="top: 200px">
            <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
            <p id="cancel-label">Please wait...</p>
          </div>
        </div>
      </template>
      <div class="side-button" v-b-toggle.sidebar-main>
        <div class="hamburguer"></div>
        <div class="hamburguer"></div>
        <div class="hamburguer"></div>
      </div>
      <div v-if="!overlay">
        <b-sidebar
          ref="sidebar"
          id="sidebar-main"
          no-header
          shadow
          bg-variant="none"
        >
          <template #default="{ hide }">
            <Sidebar @page="changePage" :hide="hide" />
          </template>
        </b-sidebar>
        <div class="side-content" cols="10">
          <div v-if="page === '/'" class="box">Dashboard</div>
          <weaponForm
            v-if="page === '/weapon/create' || page === '/weapon/edit'"
            :param="param"
            @page="changePage"
          />
          <weaponList v-if="page === '/weapon/list'" @page="changePage" />
          <boxForm
            v-if="page === '/box/create' || page === '/box/edit'"
            :param="param"
            @page="changePage"
          />
          <boxList v-if="page === '/box/list'" @page="changePage" />
        </div>
      </div>
    </b-overlay>
  </div>
</template>

<script>
import admin from "~/middleware/admin";
import boxForm from "~/components/box/Form";
import boxList from "~/components/box/List";
import weaponForm from "~/components/weapon/Form";
import weaponList from "~/components/weapon/List";

export default {
  middleware: ["auth", admin],
  components: {
    boxForm,
    boxList,
    weaponForm,
    weaponList,
  },
  data() {
    return {
      overlay: false,
      page: "/",
      param: "",
    };
  },
  methods: {
    async changePage(event) {
      this.overlay = true;
      this.$refs.sidebar.hide();
      try {
        await this.$auth.fetchUser();
        this.page = "/";
        setTimeout(() => {
          this.param = "";
          if (event.param) this.param = event.param;
          this.page = event.page;
          this.overlay = false;
        }, 100);
      } catch (e) {
        this.$auth.logout();
      }
    },
  },
};
</script>

<style lang="scss">
.layout-default {
  padding: 40px 20px;
  .side-button {
    width: 2em;
    display: flex;
    flex-direction: column;
    gap: 4px;
    cursor: pointer;
    margin-bottom: 14px;
    .hamburguer {
      width: 2em;
      height: 4px;
      background-color: rgba(255, 255, 255, 0.671);
    }
  }
  .side-content {
    width: 100%;
  }
}
</style>
