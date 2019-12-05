<template>
  <div>
    <div class="row justify-center q-gutter-md">
      <div class="col-3 q-gutter-md">
        <q-card class="my-card">
          <q-card-section>
            <q-input rounded outlined v-model="postText" label="Write Post" />
            <!-- <div class="text-subtitle2">by John Doe</div> -->
          </q-card-section>
          <q-card-actions class="row justify-center">
            <q-btn color="primary" label="Submit" @click="submitPost" />
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-3 q-gutter-md" v-for="(group, index) in MyPosts" :key="index">
        <q-card class="my-card" :class="{'bg-yellow-8':group.user_id.User_Category=='Doctor'}">
          <q-card-section>
            <div
              class="text-subtitle5"
            >{{group.group_id.Name}} {{group.user_id.User_Category=='Doctor'?'Dr':''}}</div>
            <div
              class="text-subtitle1"
              v-if="UserID!==group.user_id._id"
            >{{group.user_id.First_Name?group.user_id.First_Name+" "+group.user_id.Last_Name:group.user_id.Email}}</div>
            <div class="text-subtitle1" v-else>You</div>
            <div class="text-h6">{{ group.Message }}</div>
            <!-- <div class="text-subtitle2">by John Doe</div> -->
          </q-card-section>
          <q-card-actions class="row justify-center">
            <!-- <q-btn
              round
              color="primary"
              icon="fas fa-thumbs-up"
              @click="SelectGroup(group)"
              title="like"
            />
            <q-btn
              round
              color="red-8"
              icon="fas fa-thumbs-down"
              title="dislike"
            />-->
            <q-btn
              round
              color="green"
              icon="fas fa-comment-dots"
              title="comment"
              @click="postClicked(group)"
            />
            <q-btn
              round
              color="red-10"
              icon="far fa-trash-alt"
              title="delete"
              v-if="UserID == group.user_id._id||Role=='Doctor'"
              @click="deletePost(group)"
            />
          </q-card-actions>
        </q-card>
      </div>
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
      postText: null
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
    async submitPost() {
      var user_id = this.$store.getters.getUserData.id;
      var group_id = this.$store.getters.getCurrentGroup._id;
      await api()
        .post(`/posts/createPost/${user_id}/${group_id}`, {
          Message: this.postText
        })
        .then(res => {
          if (res.data.status == "success") {
            this.$q.notify({
              color: "teal",
              message: "Post Created Successfully",
              position: "top-right",
              timeout: 1000
            });
            this.postText = null;
            this.$store.dispatch("fetchGroupPosts", group_id);
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
    async deletePost(selectedPost) {
      var user_id = this.$store.getters.getUserData.id;
      var post_id = selectedPost._id;
      var group_id = this.$store.getters.getCurrentGroup._id;
      api()
        .put(`/posts/deletePost/${user_id}/${post_id}`)
        .then(res => {
          if (res.data.status == "success") {
            this.$q.notify({
              color: "teal",
              message: "Post Deleted Successfully",
              position: "top-right",
              timeout: 1000
            });
            this.$store.commit("clearGroupPosts");
            this.$store.dispatch("fetchGroupPosts", group_id);
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
      this.$store.commit('clearCurrentPost');
      this.$store.commit("setCurrentPost", post);
      this.$router.push("/replies");
      this.$store.dispatch("fetchPostReplies");
    }
  },
  computed: {
    MyPosts() {
      return this.$store.getters.getGroupPosts;
    },
    Role() {
      return sessionStorage.getItem("role");
    },
    UserID() {
      return this.$store.getters.getUserData.id;
    }
  }
};
</script>

<style></style>
