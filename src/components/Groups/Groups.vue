<template>
  <div>
    <div class="row justify-center q-gutter-md">
      <div
        class="col-3 q-gutter-md"
        v-for="(group, index) in Groups"
        :key="index"
      >
        <q-card class="my-card" :class="getRandomColor()">
          <q-card-section>
            <div class="text-h6">{{ group.Name }}</div>
            <!-- <div class="text-subtitle2">by John Doe</div> -->
          </q-card-section>
          <q-card-actions>
            <q-btn flat @click="SelectGroup(group)" v-if="Role != 'Doctor'"
              >Join Group</q-btn
            >
          </q-card-actions>
        </q-card>
      </div>
      <q-dialog v-model="confirm" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <span class="q-ml-sm"
              >Are you sure you want to join {{ selectedGroup.Name }} ?</span
            >
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              flat
              label="Yes"
              color="primary"
              v-close-popup
              @click="JoinGroup(selectedGroup)"
            />
            <q-btn
              flat
              label="No"
              color="primary"
              v-close-popup
              @click="selectedGroup = {}"
            />
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
      selectedGroup: { Name: "First" }
    };
  },
  created() {
    this.$store.dispatch("fetchAllGroups");
  },
  methods: {
    getRandomColor() {
      var number = Math.floor(Math.random() * 100);
      if (number % 7 == 0) return " bg-pink-5 text-white";
      if (number % 10 == 0) return " bg-light-blue-4 text-white";
      if (number % 9 == 0) return " bg-deep-purple-6 text-white";
      if (number % 3 == 0) return " bg-red-6 text-white";
      if (number % 4 == 0) return "bg-green-10 text-white";
      if (number % 2 == 0) return "bg-primary text-white";
      return "bg-yellow-8 text-white";
    },
    SelectGroup(group) {
      this.selectedGroup = group;
      this.confirm = true;
    },
    async JoinGroup(selectedGroup) {
      var user_id = this.$store.getters.getUserData.id;
      var token = sessionStorage.getItem("token");
      await api()
        .post(`/groups/joinRequest/${user_id}`, {
          Name: selectedGroup.Name
        })
        .then(res => {
          if (res.data.status == "success") {
            this.$q.notify({
              color: "teal",
              message: "Join Request Submitted",
              position: "top-right",
              timeout: 1000
            });
            this.confirm = false;
            this.selectedGroup = {};
          }
        })
        .catch(err => {
          console.log(err);
          if (err.message == "You  Already  Requested to Enter This Group") {
            this.$q.notify({
              color: "red-10",
              message: "You  Already Requested to Enter This Group",
              position: "top-right",
              timeout: 1000
            });
          } else {
            this.$q.notify({
              color: "red-10",
              message: "Error Occured , Try Again",
              position: "top-right",
              timeout: 1000
            });
          }
        });
    }
  },
  computed: {
    Groups() {
      return this.$store.getters.getAllGroups;
    },
    Role() {
      return sessionStorage.getItem("role");
    }
  }
};
</script>

<style></style>
