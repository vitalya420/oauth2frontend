<template>
  <input
    type="checkbox"
    class="input-switch"
    :style="{
      '--switch-width': size * 60 + 'px', // Scale width
      '--switch-height': size * 34 + 'px', // Scale height
      '--circle-size': size * 26 + 'px', // Scale circle size
      '--circle-margin': size * 4 + 'px', // Scale circle margin
      '--switch-checked-color': color,
      '--switch-disabled-opacity': disabled ? '0.5' : '1'
    }"
    :disabled="disabled"
    :checked="checked"
    @change="handleChange"
  >
</template>


<script>
export default {
  name: "SwitchComponent",
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: '#f42956'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: Number,
      default: 1
    },
    onChange: {
      type: Function,
      default: () => {} // No-op function if no callback is provided
    }
  },
  methods: {
    handleChange(event) {
      // Invoke the callback, passing the new checked state
      this.onChange(event.target.checked);
    }
  }
}
</script>

<style lang="scss" scoped>
input[type="checkbox"].input-switch {
	-webkit-appearance: none;
	appearance: none;
	position: relative;
	width: var(--switch-width, 60px); /* Default to 60px if not set */
	height: var(--switch-height, 34px); /* Default to 34px if not set */
	border-radius: var(--switch-height, 34px); /* Make border-radius equal to height for perfect circle */
	background-color: #cccccc;
	//margin: 15px;
	cursor: pointer;
	-webkit-transition: all .3s ease-in-out;
	-o-transition: all .3s ease-in-out;
	transition: all .3s ease-in-out;
  opacity: var(--switch-disabled-opacity, 1);

	&:before {
		position: absolute;
		content: "";
		top: 50%;
		left: var(--circle-margin, 4px); /* Adjust left margin */
		width: var(--circle-size, 26px); /* Circle size */
		height: var(--circle-size, 26px); /* Circle size */
		margin-top: calc(var(--circle-size, 26px) / -2); /* Center vertically */
		background-color: #FFFFFF;
		border-radius: 50%;
		transition: all 0.3s ease-in-out;
	}

	&:checked {
		background-color: var(--switch-checked-color, #f42956);

		&:before {
			transform: translateX(calc(var(--switch-width, 60px) - var(--circle-size, 26px) - var(--circle-margin, 4px) * 2));
		}
	}

	&:disabled {
		cursor: not-allowed;
	}
}
</style>
