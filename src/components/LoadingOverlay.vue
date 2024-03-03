<template>
  <div class="overlay-container">
    <slot></slot>
    <div v-if="isVisible" class="loading-overlay">
      <div class="spinner"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingOverlay',
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped>
.overlay-container {
  position: relative;
  /* Ensure the container fits the content */
  width: 100%;
  height: 100%;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.7); /* Semi-transparent white */
  z-index: 10; /* Ensure it's above other content */
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #09f;
  animation: spin 1s ease infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
