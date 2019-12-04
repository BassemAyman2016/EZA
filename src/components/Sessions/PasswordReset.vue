<template>
  <div class="row reset-password justify-center">
    <div class="col-shrink content-center">
      <div class="row content-center" style="height:100%;">
        <div class="col">
          <q-card class="my-card-3 row justify-center">
            <div class="col">
              <div class="row justify-center">
                <div class="col-shrink">
                  <q-card-section class="title">Password Reset</q-card-section>
                </div>
              </div>

              <div class="row justify-center field-margin">
                <div class="col-7">
                  <q-input outlined v-model="Password" label="Password" type="password" />
                </div>
              </div>
              <div class="row justify-center field-margin-1">
                <div class="col-7">
                  <q-input
                    outlined
                    v-model="ConfirmedPassword"
                    label="Confirm Password"
                    type="password"
                  />
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
import api from "../../store/api";
export default {
  name: "Login",
  props: {
    resetToken: {
      required: true
    }
  },
  data() {
    return {
      Password: "",
      ConfirmedPassword: null
    };
  },
  methods: {
    submitForm() {
      if (this.Password === this.ConfirmedPassword) {
        const token = this.resetToken;
        api()
          .put(`/sessions/resetPassword/${token}`, {
            Password: this.Password,
            confirmPassword: this.ConfirmedPassword
          })
          .then(res => {
            if (res.data.status == "success") {
              this.$q.notify({
                color: "teal",
                message: "Password reset was Successful , Please Login",
                position: "top-right",
                timeout: 1000
              });
              setTimeout(() => {
                this.$router.push("/");
              }, 2000);
            }
          })
          .catch(e => {
            alert(e);
            this.$q.notify({
              color: "red-10",
              message: "Error Occured , Try Again",
              position: "top-right",
              timeout: 1000
            });
          });
      } else {
        this.$q.notify({
          color: "red-10",
          message: "Password doesn't match the Confirmed Password",
          position: "top-right",
          timeout: 1000
        });
      }
    }
  }
};
</script>

<style coped>
.reset-password {
  height: 100vh;
}
.my-card-3 {
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
