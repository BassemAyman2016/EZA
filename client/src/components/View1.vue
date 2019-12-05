<template>
  <q-layout view="lhh Lpr lff">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>EZA</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="left" side="left" behavior="mobile" elevated>
      <!-- drawer content -->
      <div class="row">
        <label class="col">Test</label>
      </div>
      <label>Test 2</label>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      left: false
    };
  }
};
</script>
