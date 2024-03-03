<template>
  <div class="image-picker-container">
    <input type="file"
           class="image-preview-input"
           accept="image/*"
           @change="imagePicked"
           ref="fileInput"
           :disabled="active">
    <div ref="imagePreview" class="image-preview">
    </div>
  </div>
</template>

<script>
export default {
  name: "ImagePicker",
  props: {
    active: {
      type: Boolean,
      default: false
    },
    defaultImage: {
      type: String,
      default: null
    }
  },
  methods: {
    imagePicked(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.$refs.imagePreview.style.backgroundImage = `url(${e.target.result})`;
        };
        reader.readAsDataURL(file);
      }
    },
  }
}
</script>

<style scoped lang="scss">
.image-picker-container {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 15px;
  cursor: pointer;
}

.image-preview-input {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
}

.image-preview {
  width: 100%;
  height: 100%;
  background-color: #ccc;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  transition: all .3s ease-in-out;
  opacity: var(--switch-disabled-opacity, 1);
}
</style>