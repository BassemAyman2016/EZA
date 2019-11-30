<template>
  <div class="row registeration justify-center">
    <div class="col-shrink content-center">
      <div class="row content-center" style="height:100%;">
        <div class="col">
          <q-card class="my-card row justify-center">
            <div class="col">
              <div class="row justify-center">
                <div class="col-shrink">
                  <q-card-section style="font-size:30px; padding:45px;"
                    >Registeration</q-card-section
                  >
                </div>
              </div>
              <div class="row justify-center field-margin">
                <div class="col-7">
                  <q-input outlined v-model="Email" label="Email" />
                </div>
              </div>
              <div class="row justify-center field-margin-1">
                <div class="col-7">
                  <q-input outlined v-model="Password" label="Password" />
                </div>
              </div>
              <div class="row justify-center field-margin-1">
                <div class="col-7">
                  <q-btn-dropdown
                    color="primary"
                    :label="
                      SelectedCategory ? SelectedCategory : 'User Category'
                    "
                  >
                    <q-list>
                      <q-item clickable v-close-popup @click="onItemClick">
                        <q-item-section>
                          <q-item-label>Photos</q-item-label>
                        </q-item-section>
                      </q-item>

                      <q-item clickable v-close-popup @click="onItemClick">
                        <q-item-section>
                          <q-item-label>Videos</q-item-label>
                        </q-item-section>
                      </q-item>

                      <q-item clickable v-close-popup @click="onItemClick">
                        <q-item-section>
                          <q-item-label>Articles</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-btn-dropdown>
                </div>
              </div>
              <div class="row justify-center link-padding">
                <div class="col-7">
                  <div class="forgot-password" @click="$router.push('/forgot')">
                    Forgot Password ? Click here to reset
                  </div>
                </div>
              </div>
              <div class="row justify-center field-margin-1">
                <div class="col-7">
                  <div class="forgot-password">
                    Not a Member ? Click here to register
                  </div>
                </div>
              </div>
              <div class="row justify-center" style="margin-bottom:20px">
                <div class="col-7">
                  <q-btn
                    color="primary"
                    label="Submit"
                    class="full-width"
                    @click="$router.push('/1')"
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
export default {
  name: "Login",
  data() {
    return {
      Email: "",
      Password: "",
      SelectedCategory: null
    };
  }
};
</script>

<style coped>
.registeration {
  height: 100vh;
}
.my-card {
  width: 400px;
  height: 600px;
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
