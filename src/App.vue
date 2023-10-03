<script setup lang="ts">
import InputComponent from "@/components/InputComponent.vue";
import { computed, onMounted, ref, watch } from "vue";

/**
 * Define default values
 */
const filamentDiameter = ref(1.75);
const filamentDensity = ref(1.25);
const emptySpoolWeight = ref(270);
const actualSpoolWeight = ref(1270);
const spoolPrice = ref(20);
const resetMessage = ref("");

/**
 * Function to calculate the remaining filament length
 */
function getFilamentLength(): number {
  const filamentMass =
    Number(actualSpoolWeight.value) - Number(emptySpoolWeight.value);
  const filamentRay = Number(filamentDiameter.value) / 2;
  const crossSectionalArea = Math.PI * Math.pow(filamentRay, 2);

  return filamentMass / (Number(filamentDensity.value) * crossSectionalArea);
}

/**
 * Compute property to calculate the results
 */
const results = computed(() => {
  const remainingFilamentLength = getFilamentLength().toFixed(2);
  const filamentPricePerMeter = (
    Number(spoolPrice.value) / getFilamentLength()
  ).toFixed(4);

  return [
    {
      spoolPriceValue: Number(spoolPrice.value),
      actualSpoolWeightValue: Number(actualSpoolWeight.value),
      emptySpoolWeightValue: Number(emptySpoolWeight.value),
      filamentDensityValue: Number(filamentDensity.value),
      filamentDiameter: Number(filamentDiameter.value),
      remainingFilamentLength: Number(remainingFilamentLength),
      filamentPricePerMeter: Number(filamentPricePerMeter),
    },
  ];
});

/**
 * Function to save the data to localStorage
 */
function saveData() {
  localStorage.setItem("filamentDiameter", filamentDiameter.value.toString());
  localStorage.setItem("filamentDensity", filamentDensity.value.toString());
  localStorage.setItem("emptySpoolWeight", emptySpoolWeight.value.toString());
  localStorage.setItem("actualSpoolWeight", actualSpoolWeight.value.toString());
  localStorage.setItem("spoolPrice", spoolPrice.value.toString());
}

/**
 * Function to load the data from localStorage
 */
function loadData() {
  const filamentDiameterValue = localStorage.getItem("filamentDiameter");
  const filamentDensityValue = localStorage.getItem("filamentDensity");
  const emptySpoolWeightValue = localStorage.getItem("emptySpoolWeight");
  const actualSpoolWeightValue = localStorage.getItem("actualSpoolWeight");
  const spoolPriceValue = localStorage.getItem("spoolPrice");

  if (filamentDiameterValue) {
    filamentDiameter.value = Number(filamentDiameterValue);
  }

  if (filamentDensityValue) {
    filamentDensity.value = Number(filamentDensityValue);
  }

  if (emptySpoolWeightValue) {
    emptySpoolWeight.value = Number(emptySpoolWeightValue);
  }

  if (actualSpoolWeightValue) {
    actualSpoolWeight.value = Number(actualSpoolWeightValue);
  }

  if (spoolPriceValue) {
    spoolPrice.value = Number(spoolPriceValue);
  }
}

/**
 * Watcher to save the data to localStorage
 */
watch(
  [
    filamentDiameter,
    filamentDensity,
    emptySpoolWeight,
    actualSpoolWeight,
    spoolPrice,
  ],
  () => {
    saveData();
  },
);

/**
 * Load the data from localStorage
 */
onMounted(() => {
  loadData();
});

/*
 * Function to reset the localStorage
 */
function resetLocalStorage() {
  filamentDiameter.value = 1.75;
  filamentDensity.value = 1.25;
  emptySpoolWeight.value = 270;
  actualSpoolWeight.value = 1270;
  spoolPrice.value = 20;
  localStorage.removeItem("filamentDiameter");
  localStorage.removeItem("filamentDensity");
  localStorage.removeItem("emptySpoolWeight");
  localStorage.removeItem("actualSpoolWeight");
  localStorage.removeItem("spoolPrice");

  resetMessage.value = "Form and localStorage cleared!";
  setTimeout(() => {
    resetMessage.value = "";
  }, 3000);
}
</script>

<template>
  <main>
    <h1 class="text-gray-100 text-2xl font-bold text-center mt-8">
      Remaining Filament Calculator
    </h1>
    <div class="flex flex-col justify-center items-center">
      <div>
        <button
          class="px-4 py-2 rounded text-gray-100 bg-gray-800 m-4 hover:bg-red-800 transition-colors"
          @click="resetLocalStorage"
        >
          Reset data
        </button>
      </div>
      <p class="text-green-500">{{ resetMessage }}</p>
    </div>

    <div class="m-auto mt-8 grid grid-cols-2 max-w-screen-sm flex-col gap-6">
      <InputComponent
        v-model="filamentDiameter"
        title="Filament Diameter (in mm)"
      />
      <InputComponent
        v-model="filamentDensity"
        title="Filament Density (in g/cm³)"
      />
      <InputComponent
        v-model="emptySpoolWeight"
        title="Empty Spool Weight (in grams)"
      />
      <InputComponent
        v-model="actualSpoolWeight"
        title="Actual Spool Weight (in grams)"
      />
      <InputComponent v-model="spoolPrice" title="Spool Price (in €)" />
    </div>

    <div
      class="m-auto mt-8 max-w-screen-sm rounded bg-gray-800 px-4 py-2 text-gray-300"
    >
      <div v-if="results.length > 0">
        <div
          class="flex flex-col gap-8 py-4 text-lg"
          v-for="resultItem in results"
          :key="resultItem.remainingFilamentLength"
        >
          <div class="grid grid-cols-2 gap-8">
            <div>
              <p class="text-xl">Filament Diameter</p>
              <p class="font-bold">
                <span class="text-blue-300">
                  {{ resultItem.filamentDiameter }}
                </span>
                mm
              </p>
            </div>
            <div>
              <p class="text-xl">Filament Density</p>
              <p class="font-bold">
                <span class="text-blue-300">
                  {{ resultItem.filamentDensityValue }}
                </span>
                g/cm³
              </p>
            </div>
            <div>
              <p class="text-xl">Empty Spool Weight</p>
              <p class="font-bold">
                <span class="text-blue-300">
                  {{ resultItem.emptySpoolWeightValue }}
                </span>
                g
              </p>
            </div>
            <div>
              <p class="text-xl">Actual Spool Weight</p>
              <p class="font-bold">
                <span class="text-blue-300">
                  {{ resultItem.actualSpoolWeightValue }}
                </span>
                g
              </p>
            </div>
            <div>
              <p class="text-xl">Filament Spool Price</p>
              <p class="font-bold">
                <span class="text-blue-300">
                  {{ resultItem.spoolPriceValue }}
                </span>
                €
              </p>
            </div>
          </div>

          <hr class="border-gray-700" />

          <div class="grid grid-cols-2 gap-8">
            <div>
              <p class="text-xl">Remaining filament</p>
              <p class="font-bold">
                ~
                <span
                  :class="{
                    'text-green-500': resultItem.remainingFilamentLength >= 0,
                    'text-red-500': resultItem.remainingFilamentLength < 0,
                  }"
                >
                  {{ resultItem.remainingFilamentLength }}
                </span>
                m
              </p>
            </div>
            <div>
              <p class="text-xl">Filament Price per meter</p>
              <p class="font-bold">
                ~
                <span
                  :class="{
                    'text-green-500': resultItem.filamentPricePerMeter >= 0,
                    'text-red-500': resultItem.filamentPricePerMeter < 0,
                  }"
                >
                  {{ resultItem.filamentPricePerMeter }}
                </span>
                €/m
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
