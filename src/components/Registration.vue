<template>
  <div class="row registeration justify-center">
    <div class="col-shrink content-center">
      <div class="row content-center" style="height:100%;">
        <div class="col">
          <q-card class="my-card2 row justify-center">
            <div class="col">
              <div class="row justify-center">
                <div class="col-shrink">
                  <q-card-section class="title">Registeration</q-card-section>
                </div>
              </div>
              <div class="row justify-center field-margin">
                <div class="col-7">
                  <q-input outlined v-model="Email" label="Email" />
                </div>
              </div>
              <div class="row justify-center field-margin">
                <div class="col-7">
                  <q-input outlined v-model="Password" label="Password" />
                </div>
              </div>
              <div class="row justify-center field-margin-1" v-if="studentFlag">
                <div class="col-7">
                  <q-input outlined v-model="StudentID" label="Student ID" />
                </div>
              </div>
              <div class="row justify-center field-margin-1">
                <div class="col-7">
                  <q-btn-dropdown
                    color="blue-2"
                    text-color="grey-10"
                    :label="
                      SelectedCategory ? SelectedCategory : 'User Category'"
                    class="full-width"
                  >
                    <q-list>
                      <q-item clickable v-close-popup @click="dataFilled('Student')">
                        <q-item-section>
                          <q-item-label>Student</q-item-label>
                        </q-item-section>
                      </q-item>

                      <q-item clickable v-close-popup @click="dataFilled('TA')">
                        <q-item-section>
                          <q-item-label>TA</q-item-label>
                        </q-item-section>
                      </q-item>

                      <q-item clickable v-close-popup @click="dataFilled('Doctor')">
                        <q-item-section>
                          <q-item-label>Doctor</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-btn-dropdown>
                </div>
              </div>

              <div class="row justify-center" style="margin-bottom:50px">
                <div class="col-7">
                  <q-btn color="primary" label="Submit" class="full-width" @click="submitForm" />
                </div>
              </div>
            </div>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      Email: "",
      Password: "",
      SelectedCategory: null,
      studentFlag: false,
      StudentID: ""
    };
  },
  methods: {
    dataFilled(value) {
      this.SelectedCategory = value;
      if (value == "Student") {
        this.studentFlag = true;
      } else {
        this.studentFlag = false;
      }
    },

    submitForm() {
      axios
        .post(
          "http://localhost:3000/api/users/registration",
          this.studentFlag
            ? {
                Email: this.Email,
                Password: this.Password,
                User_Category: this.SelectedCategory,
                student_id: this.StudentID
              }
            : {
                Email: this.Email,
                Password: this.Password,
                User_Category: this.SelectedCategory
              }
        )
        .then(res => {
          if (res.data.status == "success") {
            this.$q.notify({
              color: "teal",
              message: "Registration was Successful , Please Login",
              position: "top-right",
              timeout: 1000
            });
            setTimeout(() => {
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
  padding: 45px 150px;
}
</style>
