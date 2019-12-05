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
            <q-btn flat @click="inviteUser(group)">Invite User</q-btn>
            <q-btn flat @click="viewUsers(group)">View Users</q-btn>
            <q-btn flat @click="uploadResource(group)">Upload Resource</q-btn>
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

      <q-dialog v-model="invite" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">Enter User Email</div>
          </q-card-section>

          <q-card-section>
            <q-input dense v-model="email" autofocus @keyup.enter="prompt = false" />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn
              flat
              label="Invite"
              color="primary"
              v-close-popup
              @click="InviteUser(selectedGroup)"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="users" persistent>
        <q-card style="width: 700px; max-width: 80vw;">
          <q-card-section
            class="row justify-around"
            v-for="(user, index) in groupUsers"
            :key="index"
          >
            <div
              class="column text-h5"
            >{{user.First_Name?user.First_Name+" "+user.Last_Name:user.Email}}</div>
            <q-btn
              round
              color="red-10"
              icon="far fa-trash-alt"
              title="kick"
              v-close-popup
              @click="kickClicked(user)"
            />
          </q-card-section>
          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="OK" color="primary" @click="users=false" />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="secondDialog" persistent transition-show="scale" transition-hide="scale">
        <q-card>
          <q-card-section>
            <div
              class="text-h6"
            >Are you sure you want to kick {{selectedKickedUser.First_Name?selectedKickedUser.First_Name+" "+selectedKickedUser.Last_Name:selectedKickedUser.Email}} ?</div>
          </q-card-section>

          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn flat label="Yes" @click="kickUser" />
            <q-btn flat label="No" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>
 

<script>
/* eslint-disable */

import api from "../../store/api";
export default {
  name: "Groups",
  data() {
    return {
      confirm: false,
      selectedGroup: { Name: "First" },
      myGroups: [],
      invite: false,
      email: "",
      users: false,
      groupUsers: [],
      inception: false,
      secondDialog: false,
      selectedKickedUser: { Fitst_Name: "", Last_Name: "" }
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
    inviteUser(group) {
      this.selectedGroup = group;
      this.invite = true;
    },
    async DeleteGroup(selectedGroup) {
      var user_id = this.$store.getters.getUserData.id;
      console.log(this.email);
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
    },
    async InviteUser(selectedGroup) {
      var user_id = this.$store.getters.getUserData.id;
      console.log(this.email);
      await api()
        .post(`/groups/doctorInviteUser/${user_id}/${selectedGroup._id}`, {
          email: this.email
        })
        .then(res => {
          if (res.data.status == "success") {
            this.$q.notify({
              color: "teal",
              message: "User Invited Successfully",
              position: "top-right",
              timeout: 1000
            });
            this.$store.dispatch("fetchMyGroups");
            this.invite = false;
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
    },
    viewUsers(group) {
      this.groupUsers = [];
      this.$q.loading.show();
      this.selectedGroup = group;
      // hiding in 2s
      this.timer = setTimeout(() => {
        this.$q.loading.hide();
        this.timer = void 0;
      }, 1000);
      var user_id = this.$store.getters.getUserData.id;
      var group_id = group._id;
      api()
        .get(`/groups/getAllUsersInGroup/${user_id}/${group_id}`)
        .then(res => {
          if (res.data.status == "success") {
            this.groupUsers = res.data.data;
          }
        })
        .catch(() => {
          this.$q.notify({
            color: "red-10",
            message: "Error Occured , Try Again",
            position: "top-right",
            timeout: 1000
          });
        });
      this.users = true;
    },
    kickClicked(user) {
      this.selectedKickedUser = user;
      this.secondDialog = true;
    },
    kickUser() {
      var user_id = this.$store.getters.getUserData.id;
      var group_id = this.selectedGroup._id;
      console.log(group_id);
      var kick_id = this.selectedKickedUser._id;
      console.log(kick_id);
      var apiObject = {
        group_id: group_id,
        kick_id: kick_id
      };
      api()
        .delete(`/groups/doctorKickUser/${user_id}`, apiObject)
        .then(res => {
          if (res.data.status == "success") {
            this.$q.notify({
              color: "teal",
              message: "User Kicked Successfully",
              position: "top-right",
              timeout: 1000
            });
            this.selectedKickedUser = null;
            this.groupUsers = [];
            this.secondDialog = false;
            this.selectedGroup = null;
          }
        })
        .catch(() => {
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
