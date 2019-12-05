<template>
  <div>
    <div class="fit column wrap justify-start items-start content-start q-gutter-md">
      <div class="row q-gutter-md">
        <q-card class="my-card bg-green-3" >
          <q-card-section>
            <div
              class="text-subtitle5"
            >{{currentPost.group_id.Name}} {{currentPost.user_id.User_Category=='Doctor'?'Dr':''}}</div>
            <div
              class="text-subtitle1"
              v-if="UserID!==currentPost.user_id._id"
            >{{currentPost.user_id.First_Name?currentPost.user_id.First_Name+" "+currentPost.user_id.Last_Name:currentPost.user_id.Email}}</div>
            <div class="text-subtitle1" v-else>You</div>
            <div class="text-h4 ">{{ currentPost.Message }}</div>
            <!-- <div class="text-subtitle2">by John Doe</div> -->
          </q-card-section>
          
        </q-card>
      </div>
      <div class="row q-gutter-md" v-for="(reply, index) in Replies" :key="index">
        <q-card class="my-card" :class="{'bg-yellow-8':reply.user_id.User_Category=='Doctor'}">
          <q-card-section>
            <!-- <div
              class="text-subtitle5"
            >{{group.group_id.Name}} {{group.user_id.User_Category=='Doctor'?'Dr':''}}</div> -->
            <div
              class="text-subtitle1"
              v-if="UserID!==reply.user_id._id"
            >{{reply.user_id.First_Name?reply.user_id.First_Name+" "+reply.user_id.Last_Name:reply.user_id.Email}} replied:</div>
            <div class="text-subtitle9" v-else>You replied:</div>
            <div class="text-h6 ">{{ reply.Message }}</div>
            <!-- <div class="text-subtitle2">by John Doe</div> -->
          </q-card-section>
          <q-card-actions class="row justify-center">
            
           
            <q-btn
              round
              color="red-10"
              icon="far fa-trash-alt"
              title="delete"
              v-if="UserID == reply.user_id._id||Role=='Doctor'"
              @click="deleteReply(reply)"
            />
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-3 q-gutter-md" style="margin-bottom:20px;">
        <q-card class="my-card">
          <q-card-section>
            <q-input rounded outlined v-model="replyText" label="Write Reply" @keyup.enter="submitReply" />
          </q-card-section>
          <q-card-actions class="row justify-center">
            <q-btn color="primary" label="Submit" @click="submitReply" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import api from "../../store/api";
export default {
  name: "Replies",
  data() {
    return {
      confirm: false,
      selectedGroup: { Name: "First" },
      replyText: null
    };
  },
  created() {
    var group_id = this.$store.getters.getCurrentGroup._id;
    this.$store.dispatch("fetchGroupPosts", group_id);
  },
  methods: {
    SelectGroup(group) {
      this.selectedGroup = group;
      this.confirm = true;
    },
    async DeleteGroup(selectedGroup) {
      var user_id = this.$store.getters.getUserData.id;
      await api()
        .delete(`/groups/deleteGroup/${user_id}`, {
          Name: selectedGroup.Name
        })
        .then(res => {
          if (res.data.status == "success") {
            this.$q.notify({
              color: "teal",
              message: "Group Deleted Successfully",
              position: "top-right",
              timeout: 1000
            });
            this.confirm = false;
            this.selectedGroup = {};
          }
        })
        .catch(err => {
          console.log(err.response);
          this.$q.notify({
            color: "red-10",
            message: "Error Occured , Try Again",
            position: "top-right",
            timeout: 1000
          });
        });
    },
    async submitReply() {
      var post_id = this.$store.getters.getCurrentPost._id;
      await api()
        .post(`/replies/createReply/${post_id}`, {
          Message: this.replyText
        })
        .then(res => {
          if (res.data.status == "success") {
            this.$q.notify({
              color: "teal",
              message: "Reply Created Successfully",
              position: "top-right",
              timeout: 1000
            });
            this.replyText = null;
            this.$store.dispatch("fetchPostReplies");
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
    },
    async deleteReply(selectedReply) {
      var user_id = this.$store.getters.getUserData.id;
      var reply_id = selectedReply._id;
      api()
        .put(`/replies/deleteReply/${user_id}/${reply_id}`)
        .then(res => {
          if (res.data.status == "success") {
            this.$q.notify({
              color: "teal",
              message: "Reply Deleted Successfully",
              position: "top-right",
              timeout: 1000
            });
            this.$store.dispatch("fetchPostReplies");
          }
        })
        .catch(err => {
          console.log(err);
          this.$q.notify({
            color: "red-10",
            message: "Error",
            position: "top-right",
            timeout: 1000
          });
        });
    },
    postClicked(post) {
        console.log(post)
      this.$store.commit("setCurrentPost", post);
      this.$router.push("/replies");
      this.$store.dispatch("fetchPostReplies");
    }
  },
  computed: {
    Replies() {
      return this.$store.getters.getPostReplies;
    },
    Role() {
      return sessionStorage.getItem("role");
    },
    UserID() {
      return this.$store.getters.getUserData.id;
    },
    currentPost(){
        return this.$store.getters.getCurrentPost
    }
  }
};
</script>

<style></style>
