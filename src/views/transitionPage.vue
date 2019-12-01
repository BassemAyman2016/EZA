<template>
  <div data-v-35ea163e data-v-4289441e class="container">
    <div data-v-14623e48 data-v-4289441e class="carousel carousel-fade" data-v-35ea163e>
      <div data-v-14623e48 class="carousel-inner">
        <div data-v-14623e48 class="items-container w-100" style="height: 1086px;">
          <div data-v-14623e48 class="item animated fadeIn" style="z-index: 2;">
            <div data-v-14623e48>
              <div data-v-14623e48 class="view">
                <!---->
                <!---->
                <!---->
                <video data-v-14623e48 autoplay="true" loop="loop" class="video-fluid d-block">
                  <source
                    data-v-14623e48
                    src="https://mdbootstrap.com/img/video/Lines.mp4"
                    type="video/mp4"
                  />
                </video>
                <div data-v-457711ef data-v-14623e48 class="mask rgba-black-light">
                  <!---->
                </div>
                <h1 class="font-weight-bold text-uppercase info-header">Welcome To EZA+</h1>
                <a
                  target="_blank"
                  href="https://mdbootstrap.com/getting-started/"
                  class="btn btn-unique btn-lg btn-rounded mr-0 waves-effect waves-light"
                >Sign up!</a>
                <a
                  target="_blank"
                  href="https://mdbootstrap.com/getting-started/"
                  class="btn btn-login btn-lg btn-rounded"
                >Log In</a>
              </div>
              <!---->
            </div>
          </div>
        </div>
        <div data-v-14623e48>
          <a data-v-14623e48 class="carousel-control-prev" style="z-index: 1000;">
            <span data-v-14623e48 aria-hidden="true" class="carousel-control-prev-icon"></span>
            <span data-v-14623e48 class="sr-only">Prev</span>
          </a>
          <a data-v-14623e48 class="carousel-control-next" style="z-index: 1000;">
            <span data-v-14623e48 aria-hidden="true" class="carousel-control-next-icon"></span>
            <span data-v-14623e48 class="sr-only">Next</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VideoPage",
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn-unique {
  background-color: #880e4f !important;
  color: #fff;
  text-decoration: none;
}
.info-header {
  position: absolute;
  font-size: 4rem;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: #fff;
  display: block;
  font-weight: bold;
  top: 30%;
  left: 35%;
}
.btn-login {
  background-color: #00bcd4 !important;
  color: #fff;
  text-decoration: none;
  padding-left: 3rem !important;
  padding-right: 3rem !important;
  margin-left: 10%;
}
.btn.btn-lg {
  padding: 1rem 2.4rem;
}
.btn {
  position: absolute;
  font-size: large;
  font-weight: bold;
  top: 50%;
  left: 45%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  background-color: #555;
  color: white;
  font-size: 16px;
  padding: 12px 24px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}
.btn-rounded {
  -webkit-border-radius: 10em;
  border-radius: 10em;
}
</style>