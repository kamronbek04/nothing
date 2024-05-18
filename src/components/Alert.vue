<template>
  <div class="alert">
    <h3>Alert!!!</h3>
    <p>{{ message }}</p>
  </div>
</template>
<script>
export default {
  props: {
    message: String,
  },
};
</script>
<style scoped>
.alert {
  max-width: 250px;
  position: fixed;
  top: 10px;
  right: 10px;
  color: #fff !important;
  background-color: var(--bright-red);
  z-index: 1;
  border-radius: 10px;
  padding: 10px 30px 20px 30px;
  text-align: center;
  opacity: 0.8;
}
.alert h3,
.alert p {
  color: var(--white);
}
.alert h3 {
  font-size: 20px;
  border-bottom: 1px solid #fff;
}
.alert p {
  padding-top: 10px;
}
</style>
