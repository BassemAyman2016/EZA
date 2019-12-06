<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-card style="max-width: 400px;">
      <q-form class="q-gutter-md">
        <q-input filled v-model="name" label="Group Name" />

        <div class="row justify-center" style="padding-bottom:10px;">
          <q-btn
            label="Submit"
            type="submit"
            color="primary"
            @click="submitCreate"
          />
        </div>
      </q-form>
    </q-card>
  </div>
</template>

<script>
import api from "../../store/api";
export default {
  name: "CreateGroup",
  data() {
    return {
      name: null
    };
  },
  methods: {
    async submitCreate() {
      var user_id = this.$store.getters.getUserData.id;
      await api()
        .post(`/groups/creategroup/${user_id}`, {
          Name: this.name,
          Created_By: user_id
        })
        .then(res => {
          if (res.data.status == "success") {
            this.$q.notify({
              color: "teal",
              message: "Group Created Successfully",
              position: "top-right",
              timeout: 1000
            });
            this.name = "";
          }
        })
        .catch(err => {
          if (err.response.status == 400) {
            this.$q.notify({
              color: "red-10",
              message: "Name Already Exists",
              position: "top-right",
              timeout: 1000
            });
          } else {
            this.$q.notify({
              color: "red-10",
              message: "Error Occured",
              position: "top-right",
              timeout: 1000
            });
          }
        });
    }
  }
};
</script>

<style></style>
