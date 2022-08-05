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
      <NuxtLink to="/">
        <li>
          <span class="h5"
            ><b-icon icon="app-indicator" aria-hidden="true"></b-icon
          ></span>
          DASHBOARD
        </li>
      </NuxtLink>
      <li v-b-toggle.collapse-weapons>
        <span class="h5"
          ><b-icon icon="app-indicator" aria-hidden="true"></b-icon></span
        >WEAPONS<b-icon icon="caret-down-fill" aria-hidden="true"></b-icon>
      </li>
      <b-collapse accordion="collapse-accordion" id="collapse-weapons" class="mt-2 collapsed">
        <NuxtLink to="/weapons/create">
          <li>
            <span class="h5"
              ><b-icon icon="app-indicator" aria-hidden="true"></b-icon></span
            >CRIAR
          </li></NuxtLink
        >
        <NuxtLink to="/weapons/list">
          <li>
            <span class="h5"
              ><b-icon icon="app-indicator" aria-hidden="true"></b-icon></span
            >Listar
          </li></NuxtLink
        >
      </b-collapse>
      <li v-b-toggle.collapse-box>
        <span class="h5"
          ><b-icon icon="app-indicator" aria-hidden="true"></b-icon></span
        >CAIXAS<b-icon icon="caret-down-fill" aria-hidden="true"></b-icon>
      </li>
      <b-collapse accordion="collapse-accordion" id="collapse-box" class="mt-2 collapsed">
        <NuxtLink to="/box/create">
          <li>
            <span class="h5"
              ><b-icon icon="app-indicator" aria-hidden="true"></b-icon></span
            >CRIAR
          </li>
        </NuxtLink>
        <NuxtLink to="/box/list">
          <li>
            <span class="h5"
              ><b-icon icon="app-indicator" aria-hidden="true"></b-icon></span
            >Listar
          </li>
        </NuxtLink>
      </b-collapse>
      <li @click="$auth.logout()">
        <span class="h5"
          ><b-icon icon="app-indicator" aria-hidden="true"></b-icon></span
        >Sair
      </li>
    </ul>
  </div>
</template>

<script></script>

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
