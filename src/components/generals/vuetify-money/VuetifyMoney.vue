<template>
  <div>
    <v-text-field
      v-model="cmpValue"
      :label="label"
      :placeholder="placeholder"
      :readonly="readonly"
      :disabled="disabled"
      :outlined="outlined"
      :dense="dense"
      :hide-details="hideDetails"
      :error="error"
      :error-messages="errorMessages"
      :rules="rules"
      :clearable="clearable"
      :background-color="backgroundColor"
      :prefix="options.prefix"
      :suffix="options.suffix"
      v-bind="properties"
      @keypress="keyPress"
      @blur="onBlur"
      :prepend-icon="prependIcon"
    ></v-text-field>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  value: {
    type: [String, Number],
    default: '0'
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: undefined
  },
  readonly: {
    type: Boolean,
    default: false
  },
  dense: {
    type: Boolean,
    default: false
  },
  error: {
    type: Boolean,
    default: false
  },
  hideDetails: {
    type: [Boolean, String],
    default: false
  },
  errorMessages: {
    type: [Array, String],
    default: () => []
  },
  rules: {
    type: [Array, String],
    default: () => []
  },
  disabled: {
    type: Boolean,
    default: false
  },
  outlined: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: false
  },
  backgroundColor: {
    type: String,
    default: 'white'
  },
  valueWhenIsEmpty: {
    type: String,
    default: ''
  },
  valueOptions: {
    type: Object,
    default: () => ({
      min: 0,
      minEvent: 'SetValueMin'
    })
  },
  options: {
    type: Object,
    default: () => ({
      locale: 'es-CO',
      prefix: '',
      suffix: '$',
      length: 11,
      precision: 0
    })
  },
  properties: {
    type: Object,
    default: () => ({})
  },
  prependIcon: {
    type: String,
    default: 'mdi-cash'
  }
})

const modelValue = defineModel({ type: [String, Number], default: '0' })


const emit = defineEmits(['input', 'SetValueMin', 'SetValueMax'])

// Computed
const cmpValue = computed({
  get() {
    return modelValue.value !== null && modelValue.value !== ''
      ? humanFormat(modelValue.value.toString())
      : props.valueWhenIsEmpty
  },
  set(newValue) {
    const formatted = machineFormat(newValue)
    modelValue.value = formatted
  }
})


// Métodos auxiliares
function humanFormat(number) {
  if (isNaN(number)) return ''
  return Number(number).toLocaleString(props.options.locale, {
    maximumFractionDigits: props.options.precision,
    minimumFractionDigits: props.options.precision
  })
}

function machineFormat(number) {
  if (number) {
    number = cleanNumber(number)
    number = number.padStart(props.options.precision + 1, '0')
    number =
      number.substring(0, number.length - props.options.precision) +
      '.' +
      number.substring(
        number.length - props.options.precision,
        number.length
      )
    if (isNaN(number)) {
      number = props.valueWhenIsEmpty
    }
  } else {
    number = props.valueWhenIsEmpty
  }
  if (props.options.precision === 0) {
    number = cleanNumber(number)
  }
  return number
}

function cleanNumber(value) {
  let result = ''
  if (value) {
    let flag = false
    const arrayValue = value.toString().split('')
    for (let i = 0; i < arrayValue.length; i++) {
      if (isInteger(arrayValue[i])) {
        if (!flag) {
          if (arrayValue[i] !== '0') {
            result += arrayValue[i]
            flag = true
          }
        } else {
          result += arrayValue[i]
        }
      }
    }
  }
  return result
}

function isInteger(value) {
  return Number.isInteger(parseInt(value))
}

function targetLength() {
  return (
    Number(cleanNumber(props.value).length) >= Number(props.options.length)
  )
}

function keyPress(event) {
  const keyCode = event.keyCode || event.which
  if (keyCode < 48 || keyCode > 57) {
    event.preventDefault()
  }
  if (targetLength()) {
    event.preventDefault()
  }
}

function onBlur() {
  const val = parseFloat(modelValue.value)

  if (!modelValue.value || val <= props.valueOptions.min) {
    emit(props.valueOptions.minEvent || 'SetValueMin', props.valueOptions.min)
  }

  if (props.valueOptions.max && val >= props.valueOptions.max) {
    emit(props.valueOptions.maxEvent || 'SetValueMax', props.valueOptions.max)
  }

  // 💡 NO formatees ni cambies cmpValue aquí directamente
}

</script>
