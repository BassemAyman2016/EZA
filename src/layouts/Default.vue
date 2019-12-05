<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="fas fa-bars"
        />

        <q-toolbar-title>EZA+</q-toolbar-title>

        <q-icon name="fas fa-user" class="account-icon" @click="logout" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered content-class="bg-grey-1">
      <q-list>
        <q-item-label header>Navigation</q-item-label>
        <q-item to="/groups" exact>
          <q-item-section avatar>
            <q-icon name="fas fa-home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Groups</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/mygroups" exact v-if="Role == 'Doctor'">
          <q-item-section avatar>
            <q-icon name="fas fa-info" />
          </q-item-section>
          <q-item-section>
            <q-item-label>My Groups</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/createGroup" exact v-if="Role == 'Doctor'">
          <q-item-section avatar>
            <q-icon name="fas fa-plus" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Create Group</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/account" exact>
          <q-item-section avatar>
            <q-icon name="fas fa-user" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Account</q-item-label>
          </q-item-section>
        </q-item>

        <q-item-label header>My Groups</q-item-label>
        <q-item clickable v-for="(group, index) in MyGroups" :key="index" @click="groupClicked(group)">
          <q-item-section avatar>
            <q-icon name="fas fa-graduation-cap" />
          </q-item-section>
          <q-item-section >
            <q-item-label >
              {{
              group.Name
              }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "LayoutDefault",

  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    };
  },
  computed: {
    Role() {
      return sessionStorage.getItem("role");
    },
    MyGroups() {
      if (this.Role == "Doctor") {
        return this.$store.getters.getMyGroups;
      } else {
        return this.$store.getters.getStudentGroups;
      }
    }
  },
  methods: {
    logout() {
      sessionStorage.removeItem("token");
      this.$router.push("/");
    },
    groupClicked(group) {
      this.$store.commit("clearGroupPosts");
      this.$store.commit('clearPostReplies')
      this.$store.commit("setCurrentGroup", group);
      this.$store.dispatch("fetchGroupPosts", group._id);
      if (this.$route.fullPath != "/posts") this.$router.push("/posts");
    }
  },
  created() {
    this.$store.dispatch("fetchAllGroups");
    this.$store.dispatch("fetchMyGroups");
    this.$store.dispatch("fetchStudentGroups");
  }
};
</script>
<style scoped>
.account-icon {
  font-size: 20px;
}
.account-icon:hover {
  cursor: pointer;
}
</style>
