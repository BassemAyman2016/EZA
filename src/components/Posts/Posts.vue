<template>
  <div>
    <div class="row q-gutter-md">
      <div class="col-3 q-gutter-md">
        <q-card class="my-card">
          <q-card-actions class="row justify-center">
            <q-btn
              color="green-8"
              label="View Group Resources"
              @click="showResources"
              icon="far fa-copy"
            />
          </q-card-actions>
        </q-card>
      </div>
      <q-dialog v-model="resourcesDialogFlag" persistent>
        <q-card style="width: 500px; max-width: 80vw;">
          <q-card-section
            class="row justify-around"
            v-for="(resource, index) in resourcesArray"
            :key="index"
          >
            <div class="column text-h10">{{resource.name}}</div>
            <div class="row q-gutter-sm">
              <a :href="resource.data" download>
                <q-btn round color="blue-10" icon="fas fa-file-download" title="download" />
              </a>

              <q-btn
                round
                color="red-10"
                icon="fas fa-times"
                title="delete file"
                @click="deleteFile(resource)"
                v-if="currentGroup.Created_By==$store.getters.getUserData.id"
              />
            </div>
          </q-card-section>
          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="OK" color="primary" @click="resourcesDialogFlag=false" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
    <div class="row justify-center q-gutter-md">
      <div class="col-3 q-gutter-md">
        <q-card class="my-card">
          <q-card-section>
            <q-input
              rounded
              outlined
              v-model="postText"
              label="Write Post"
              @keyup.enter="submitPost"
            />
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
/* eslint-disable */
import api from "../../store/api";
export default {
  name: "Groups",
  data() {
    return {
      confirm: false,
      selectedGroup: { Name: "First" },
      postText: null,
      resourcesDialogFlag: false,
      resourcesArray: [],
      currentGroup: null
    };
  },
  created() {
    var group_id = this.$store.getters.getCurrentGroup._id;
    this.currentGroup = this.$store.getters.getCurrentGroup;
    this.$store.dispatch("fetchGroupPosts", group_id);
    // this.resourcesArray=[]
    this.fetchResources(group_id);
  },
  methods: {
    SelectGroup(group) {
      this.selectedGroup = group;
      this.confirm = true;
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
      this.$store.commit("clearCurrentPost");
      this.$store.commit("setCurrentPost", post);
      this.$router.push("/replies");
      this.$store.dispatch("fetchPostReplies");
    },
    showResources() {
      this.resourcesDialogFlag = true;
    },
    fetchResources(group_id) {
      api()
        .get(`/resources/${group_id}`)
        .then(res => {
          if (res.data.status == "success") {
            this.resourcesArray = res.data.resource;
          }
        })
        .catch(err => console.log(err.response.data));
    },
    deleteFile(file) {
      console.log(file);
      api()
        .delete(`/resources/${file._id}/groups/${file.group_id}`)
        .then(res => {
          if (res.data.status == "success") {
            this.$q.notify({
              color: "teal",
              message: "Resource Deleted Successfully",
              position: "top-right",
              timeout: 1000
            });
            this.fetchResources(file.group_id);
          }
        })
        .catch(err => {
          this.$q.notify({
            color: "red-10",
            message: "Error Occured , Please Try Again",
            position: "top-right",
            timeout: 1000
          });
        });
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
  },
  watch: {
    MyPosts(newvalue, oldValue) {
      this.resourcesArray = [];
      this.fetchResources(this.$store.getters.getCurrentGroup._id);
    }
  }
};
</script>

<style></style>
