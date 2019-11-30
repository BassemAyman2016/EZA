<template>
  <div class="row forgot justify-center">
    <div class="col-shrink content-center">
      <div class="row content-center" style="height:100%;">
        <div class="col">
          <q-card class="my-card1 row justify-center">
            <div class="col">
              <div class="row justify-center">
                <div class="col-shrink">
                  <q-card-section style="font-size:30px; padding:45px;"
                    >Reset Password</q-card-section
                  >
                </div>
              </div>
              <div class="row justify-center field-margin">
                <div class="col-7">
                  <q-input outlined v-model="Email" label="Email" />
                </div>
              </div>

              <div class="row justify-center" style="margin-bottom:20px">
                <div class="col-7">
                  <q-btn
                    color="primary"
                    label="Submit"
                    class="full-width"
                    @click="showNotif('top-right')"
                  />
                </div>
              </div>
            </div>

            <!-- <div class="row justify-center">
              <div class="col-shrink">
                <q-card-section style="font-size:30px;">Login</q-card-section>
              </div>
            </div>

            <div class="row justify-center">
              <div class="col-shrink">
                <q-input
                  v-model="ph"
                  label="Email"
                  placeholder="Placeholder"
                  hint="With placeholder"
                />
              </div>
            </div>
            <div class="row justify-center">
              <div class="col-shrink">
                <q-input
                  v-model="ph"
                  label="Password"
                  placeholder="Placeholder"
                  hint="With placeholder"
                />
              </div>
            </div>-->
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      Email: "",
      Password: "",
      message: {
        color: "teal",
        message: "Password Reset Email Sent!!"
      }
    };
  },
  methods: {
    showNotif(position) {
      const { color, textColor, multiLine, message, avatar } = this.message;
      this.$q.notify({
        color,
        textColor,
        message,
        position,
        avatar,
        multiLine,
        timeout: 1000
      });
    }
  }
};
</script>

<style coped>
.forgot {
  height: 100vh;
}
.my-card1 {
  width: 400px;
  height: 340px;
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
