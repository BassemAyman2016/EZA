<template>
  <div>
    <div class="row justify-center q-gutter-md">
      <div class="col-3 q-gutter-md" v-for="(group, index) in MyGroups" :key="index">
        <q-card class="my-card">
          <q-card-section>
            <div class="text-h6">{{ group.Name }}</div>
            <!-- <div class="text-subtitle2">by John Doe</div> -->
          </q-card-section>
          <q-card-actions>
            <q-btn flat @click="SelectGroup(group)">Delete Group</q-btn>
          </q-card-actions>
        </q-card>
      </div>
      <q-dialog v-model="confirm" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <span class="q-ml-sm">Are you sure you want to delete {{ selectedGroup.Name }} ?</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              flat
              label="Yes"
              color="primary"
              v-close-popup
              @click="DeleteGroup(selectedGroup)"
            />
            <q-btn flat label="No" color="primary" v-close-popup @click="selectedGroup = {}" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import api from "../../store/api";
export default {
  name: "Groups",
  data() {
    return {
      confirm: false,
      selectedGroup: { Name: "First" },
      myGroups: []
    };
  },
  created() {
    this.$store.dispatch("fetchMyGroups");
  },
  methods: {
    SelectGroup(group) {
      this.selectedGroup = group;
      this.confirm = true;
    },
    async DeleteGroup(selectedGroup) {
      var user_id = this.$store.getters.getUserData.id;

      await api()
        .delete(`/groups/deleteGroup/${user_id}/${selectedGroup._id}`)
        .then(res => {
          if (res.data.status == "success") {
            this.$q.notify({
              color: "teal",
              message: "Group Deleted Successfully",
              position: "top-right",
              timeout: 1000
            });
            this.$store.dispatch("fetchMyGroups");
            this.confirm = false;
            this.selectedGroup = {};
          }
        })
        .catch(err => {
          console.log(err);
          this.$q.notify({
            color: "red-10",
            message: "Error Occured , Try Again",
            position: "top-right",
            timeout: 1000
          });
        });
    }
  },
  computed: {
    MyGroups() {
      return this.$store.getters.getMyGroups;
    },
    Role() {
      return sessionStorage.getItem("role");
    }
  }
};
</script>

<style></style>
