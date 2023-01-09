<script setup>
import InputCard from "./components/input-card.vue";
import HintCard from "./components/hint-card.vue";
import Pill from "./components/pill.vue";
import Label from "./components/revealed-hints-label.vue";
import CardsContainer from "./layouts/cards-container.vue";
</script>

<template>
  <div class="my-20">
    <div class="px-5">
      <div
        class="w-full max-w-xl m-auto flex flex-col items-center text-center"
      >
        <Pill>Sairahas name</Pill>
        <InputCard />
      </div>
    </div>
    <Label />
    <CardsContainer>
      <HintCard />
      <HintCard />
      <HintCard />
    </CardsContainer>
  </div>
</template>
