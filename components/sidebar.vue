<template>
  <div class="sidebar">
    <div class="title">
      <img
        src="http://demos.creative-tim.com/nuxt-black-dashboard-pro/img/icon-nuxt.svg"
      />
      OPEN CASE CMS
    </div>
    <div class="divider"></div>
    <ul>
      <li>
        <span class="h5"
          ><b-icon icon="app-indicator" aria-hidden="true"></b-icon
        ></span>
        DASHBOARD
      </li>
      <li v-b-toggle.collapse-weapons>
        <span class="h5"
          ><b-icon icon="app-indicator" aria-hidden="true"></b-icon></span
        >WEAPONS<b-icon icon="caret-down-fill" aria-hidden="true"></b-icon>
      </li>
      <b-collapse id="collapse-weapons" class="mt-2 collapsed">
        <li>
          <span class="h5"
            ><b-icon icon="app-indicator" aria-hidden="true"></b-icon></span
          >CRIAR
        </li>
        <li>
          <span class="h5"
            ><b-icon icon="app-indicator" aria-hidden="true"></b-icon></span
          >Listar
        </li>
      </b-collapse>
      <li v-b-toggle.collapse-box>
        <span class="h5"
          ><b-icon icon="app-indicator" aria-hidden="true"></b-icon></span
        >CAIXAS<b-icon icon="caret-down-fill" aria-hidden="true"></b-icon>
      </li>
      <b-collapse id="collapse-box" class="mt-2 collapsed">
        <li>
          <span class="h5"
            ><b-icon icon="app-indicator" aria-hidden="true"></b-icon></span
          >CRIAR
        </li>
        <li>
          <span class="h5"
            ><b-icon icon="app-indicator" aria-hidden="true"></b-icon></span
          >Listar
        </li>
      </b-collapse>
    </ul>
  </div>
</template>

<style lang="scss">
.sidebar {
  background: #27293d;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  padding: 1rem;
  .title {
    padding-left: 0.5rem;
    font-size: 16px;
    img {
      width: 38px;
      height: 38px;
    }
  }
  ul {
    padding-left: 0.5rem;
    .with-margin {
      margin-bottom: 20px;
    }
    .collapse {
      padding-left: 1rem;
    }
    li {
      display: flex;
      align-items: center;
      cursor: pointer;
      font-size: 13px;
      font-weight: 500;
      gap: 12px;
      transition: 0.2s;
      outline: none;
      padding: 12px 6px;
      &:hover {
        background-color: rgba(255, 255, 255, 0.055);
        color: white;
        padding-left: 8px;
      }
      &.no-margin {
        margin-bottom: 0;
      }
      .h5 {
        margin: 0;
      }
    }
  }
}
</style>
