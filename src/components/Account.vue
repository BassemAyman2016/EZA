<template>
  <div class="row registeration justify-center">
    <div class="col-shrink content-center">
      <div class="row content-center" style="height:100%;">
        <div class="col">
          <q-card class="my-card2 row justify-center">
            <div class="col">
              <div class="row justify-center">
                <div class="col-shrink">
                  <q-card-section class="title">Edit Profile</q-card-section>
                </div>
              </div>
              <div class="row justify-center field-margin q-gutter-sm">
                <div class="col-5">
                  <q-input outlined v-model="Email" label="Email" />
                </div>
                <div class="col-5">
                  <q-input outlined v-model="phone_number" label="Phone Number" />
                </div>
              </div>
              <div class="row justify-center field-margin q-gutter-sm">
                <div class="col-5">
                  <q-input outlined v-model="first_name" label="First Name" />
                </div>
                <div class="col-5">
                  <q-input outlined v-model="last_name" label="Last Name" />
                </div>
              </div>
              <div class="row justify-center field-margin q-gutter-sm">
                <div class="col-5">
                  <q-input outlined v-model="date" mask="date" :rules="['date']" hint="Birth Date">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          ref="qDateProxy"
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date v-model="date" @input="() => $refs.qDateProxy.hide()" />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <div class="col-5" v-if="Role=='Student'">
                  <q-input outlined v-model="student_id" label="Student ID" type="text" />
                </div>
              </div>
              <div class="row justify-center q-gutter-sm" style="margin-bottom:50px">
                <div class="col-7">
                  <q-btn
                    color="primary"
                    label="Submit Edit"
                    class="full-width"
                    @click="submitEdit"
                  />
                </div>
                <div class="col-7">
                  <q-btn
                    color="red-10"
                    label="Deactivate Profile"
                    class="full-width"
                    @click="deactivateClicked"
                  />
                </div>
              </div>
              <q-dialog v-model="dialogFlag" persistent>
                <q-card>
                  <q-card-section class="row items-center">
                    <span class="q-ml-sm">Are you sure you want to delete deactivate your account ?</span>
                  </q-card-section>

                  <q-card-actions align="right">
                    <q-btn
                      flat
                      label="Yes"
                      color="primary"
                      v-close-popup
                      @click="deactivatAccount"
                    />
                    <q-btn
                      flat
                      label="No"
                      color="primary"
                      v-close-popup
                      @click="dialogFlag = false"
                    />
                  </q-card-actions>
                </q-card>
              </q-dialog>
            </div>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */

import api from "../store/api";
export default {
  name: "Account",
  data() {
    return {
      Email: "",
      date: "",
      phone_number: null,
      first_name: null,
      last_name: null,
      student_id: null,
      dialogFlag: false
    };
  },
  computed: {
    Role() {
      return sessionStorage.getItem("role");
    }
  },
  methods: {
    async fetchUserInfo() {
      var user_id = this.$store.getters.getUserData.id;
      await api()
        .get(`/users/getUserInfo/${user_id}`)
        .then(res => {
          if (res.data.status == "success") {
            var userData = res.data.data;
            this.first_name = userData.First_Name;
            this.last_name = userData.Last_Name;
            this.date = userData.Birth_Date.substring(0, 10) + "";
            this.phone_number = userData.phone_number;
            this.Email = userData.Email;
            if (userData.User_Category == "Student");
            this.student_id = userData.student_id;
          }
        })
        .catch(() => {
          this.setUserData;
        });
    },
    setUserData() {
      var userData = this.$store.getters.getUserData;
      this.First_Name = userData.First_Name;
      this.last_name = userData.Last_Name;
      this.data = userData.Birth_Date.substring(0, 10);
      this.phone_number = userData.phone_number;
      this.Email = userData.Email;
      if (userData.User_Category == "Student");
      this.student_id = userData.student_id;
    },
    submitEdit() {
      var user_id = this.$store.getters.getUserData.id;
      var apiObject = {
        Email: this.Email,
        phone_number: this.phone_number,
        First_Name: this.first_name,
        Last_Name: this.last_name,
        Birth_Date: this.date
      };
      if (this.student_id) apiObject.student_id = this.student_id;
      if (
        this.Email &&
        this.phone_number &&
        this.first_name &&
        this.last_name &&
        this.date
      ) {
        api()
          .put(`/users/updateProfile/${user_id}`, apiObject)
          .then(res => {
            if (res.data.status == "success") {
              this.$q.notify({
                color: "teal",
                message: "Profile Updated Successfully",
                position: "top-right",
                timeout: 1000
              });
            }
          })
          .catch(() => {
            this.$q.notify({
              color: "red-10",
              message: "Error Occured Please Try Again",
              position: "top-right",
              timeout: 1000
            });
          });
      } else {
        this.$q.notify({
          color: "red-10",
          message: "Please Fill all Fields",
          position: "top-right",
          timeout: 1000
        });
      }
    },
    deactivateClicked() {
      this.dialogFlag = true;
    },
    deactivatAccount() {
      var user_id = this.$store.getters.getUserData.id;
      console.log(user_id);
      api()
        .put(`/sessions/deactivate/${user_id}`)
        .then(res => {
          if (res.data.status == "success") {
            this.$q.notify({
              color: "teal",
              message: "Profile Deactivated Successfully , Goodbye",
              position: "top-right",
              timeout: 1000
            });
            setTimeout(() => {
              this.$store.commit("clearUserData");
              this.$router.push("/");
            }, 2000);
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
  created() {
    if (typeof this.$store.getters.getUserData.First_Name === "undefined") {
      this.Email = this.$store.getters.getUserData.email;
      this.fetchUserInfo();
    } else this.setUserData();
  }
};
</script>

<style coped>
.registeration {
  height: 100vh;
}
.my-card2 {
  width: auto;
  height: auto;
}
.field-margin {
  margin-bottom: 30px;
}
.field-margin-1 {
  margin-bottom: 45px;
}
.forgot-password {
  font-size: 12px;
  color: rgb(108, 176, 202);
  text-decoration: underline;
}
.forgot-password:hover {
  cursor: pointer;
  color: skyblue;
}
.link-padding {
  padding-bottom: 10px;
}
.title {
  font-size: 30px;
  padding: 45px 200px;
}
</style>
