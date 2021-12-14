<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <div
        class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2"
      >
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">Simple web</a>
          </li>
        </ul>
      </div>
      <ul class="navbar-nav ml-auto">
        <li
          class="nav-item"
          style="padding-right: 30px; cursor: pointer"
          @click="logOut"
        >
          <p class="nav-link">Logout</p>
        </li>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script src="./js/home.js"></script>
