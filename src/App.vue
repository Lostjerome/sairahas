<script setup>
import InputCard from "./components/input-card.vue";
import HintCard from "./components/hint-card.vue";
import Pill from "./components/pill.vue";
import Label from "./components/revealed-hints-label.vue";
import CardsContainer from "./layouts/cards-container.vue";
import { inject, ref } from "vue";

const sairahas = inject("sairahas");
let { name, hints } = sairahas.value[0];
let currHint = ref(hints.find((hint) => !hint.revealed));

function revealHint() {
  currHint.value.revealed = true;
  console.log(currHint.value);
  currHint = ref(hints.find((hint) => !hint.revealed)) || ref("");
  console.log(hints);
}
</script>

<template>
  <div class="my-20">
    <div class="px-5">
      <div
        class="w-full max-w-xl m-auto flex flex-col items-center text-center"
      >
        <Pill>{{ name }}</Pill>
        <InputCard
          v-if="currHint"
          @reveal="revealHint"
          :hint="currHint.hint"
          :answer="currHint.answer"
          :revealed="currHint.revealed"
        />
        <div
          v-else
          class="h-60 w-full bg-white drop-shadow-lg rounded-3xl p-5 pb-8 md:p-5 flex flex-col justify-between"
        >
          <p>
            <span class="font-bold">Congratulations!</span> You have completed
            all the hints for this sairahas.
          </p>
          <div
            class="w-full outline-0 bg-gray-200 rounded-md p-2 text-center text-lg self-center"
          ></div>
        </div>
      </div>
      <Label v-if="hints.find((hint) => hint.revealed)" />
    </div>
    <CardsContainer>
      <HintCard
        v-for="(hint, index) in hints.filter((hint) => hint.revealed)"
        :key="index"
        :hint="hint.hint"
        :answer="hint.answer"
        :image="hint.image"
      />
    </CardsContainer>
  </div>
</template>
