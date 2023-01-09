<script setup>
import InputCard from "./components/input-card.vue";
import HintCard from "./components/hint-card.vue";
import Pill from "./components/pill.vue";
</script>

<template>
  <div class="px-5">
    <div class="mt-20" />
    <div class="w-full max-w-xl m-auto flex flex-col items-center text-center">
      <Pill>Sairahas name</Pill>
      <InputCard />
    </div>
    <div
      class="flex w-full md:w-[90%] m-auto justify-center items-center space-x-3 md:space-x-5 my-20"
    >
      <div class="h-[1px] w-full bg-black"></div>
      <div class="whitespace-nowrap">Revealed hints</div>
      <div class="h-[1px] w-full bg-black"></div>
    </div>
  </div>
  <div class="flex space-x-5 overflow-auto px-5">
    <HintCard />
    <HintCard />
    <HintCard />
  </div>
  <div class="mt-20" />
</template>
