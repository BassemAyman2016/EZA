<template>
  <div class="row login justify-center">
    <div class="col-shrink content-center">
      <div class="row content-center" style="height:100%;">
        <div class="col">
          <q-card class="my-card row justify-center">
            <div class="col">
              <div class="row justify-center">
                <div class="col-shrink">
                  <q-card-section style="font-size:30px; padding:45px;">Login</q-card-section>
                </div>
              </div>
              <div class="row justify-center field-margin">
                <div class="col-7">
                  <q-input outlined v-model="Email" label="Email" />
                </div>
              </div>
              <div class="row justify-center field-margin-1">
                <div class="col-7">
                  <q-input
                    outlined
                    v-model="Password"
                    label="Password"
                    @keyup.enter="submitForm"
                    type="password"
                  />
                </div>
              </div>
              <div class="row justify-center link-padding">
                <div class="col-7">
                  <div
                    class="forgot-password"
                    @click="$router.push('/forgot')"
                  >Forgot Password ? Click here to reset</div>
                </div>
              </div>
              <div class="row justify-center field-margin-1">
                <div class="col-7">
                  <div
                    class="forgot-password"
                    @click="$router.push('/registration')"
                  >Not a Member ? Click here to register</div>
                </div>
              </div>
              <div class="row justify-center" style="margin-bottom:20px">
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
import api from "../../store/api";
export default {
  name: "Login",
  data() {
    return {
      Email: "",
      Password: ""
    };
  },
  methods: {
    submitForm() {
      api()
        .post("/sessions/login", {
          Email: this.Email,
          Password: this.Password
        })
        .then(res => {
          if (res.data.status == "success") {
            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem("role", res.data.role);
            delete res.data.status;
            this.$store.commit("setUserData", res.data);
            this.$store.dispatch("fetchAllGroups");
            if (res.data.role == "Student") {
              this.$store.dispatch("fetchStudentGroups");
            }
            this.$router.push("/home");
          } else {
            this.$q.notify({
              color: "red-10",
              message: "Error Occured , Try Again",
              position: "top-right",
              timeout: 1000
            });
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
.login {
  height: 100vh;
}
.my-card {
  width: 400px;
  height: 500px;
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
</style>
