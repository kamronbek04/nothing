<template>
  <div class="completed-task">
    {{ tasks }}
  </div>
</template>
<script>
export default {
  props: {
    tasks: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style></style>
