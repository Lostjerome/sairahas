<script setup>
import InputCard from "./components/input-card.vue";
import HintCard from "./components/hint-card.vue";
import Pill from "./components/pill.vue";
import Label from "./components/revealed-hints-label.vue";
import CardsContainer from "./layouts/cards-container.vue";
import CongratsCard from "./components/congrats-card.vue";
import { ref, watch } from "vue";

import sairahas from "./utils/sairahas";

const savedSairahas = ref(JSON.parse(localStorage.getItem("savedSairahas")));

let sairahasName = ref(savedSairahas.value?.name || "");
// savedSairahas.value?.name
//   ? (sairahasName.value = savedSairahas.value.name)
//   : (sairahasName.value = "");

let currentSairahas = ref(
  sairahas.value.find(
    (sairaha) => sairaha.name.toLowerCase() === sairahasName.value.toLowerCase()
  )
);
let { name, hints } = currentSairahas.value || { name: "", hints: [] };

//Restore revealed hints from local storage
if (savedSairahas.value) {
  if (savedSairahas.value.name === name) {
    hints = hints.map((hint) => {
      const savedHints = savedSairahas.value.hints.find(
        (savedHint) => savedHint.answer === hint.answer
      );

      if (savedHints) {
        return {
          ...hint,
          revealed: true,
        };
      }
      return hint;
    });
  }
}

let currHint = ref(hints.find((hint) => !hint.revealed));
function revealHint() {
  currHint.value.revealed = true;
  currHint = ref(hints.find((hint) => !hint.revealed));

  const savingSairahas = sairahas.value.map((item) => {
    if (item.name === name) {
      return {
        ...item,
        hints: hints
          .filter((hint) => hint.revealed)
          .map((hint) => {
            return {
              hint: hint.hint,
              answer: hint.answer,
            };
          }),
      };
    }
    return item;
  });
  localStorage.setItem("savedSairahas", JSON.stringify(savingSairahas[0]));
}

watch(
  () => sairahasName.value,
  (newVal) => {
    currentSairahas.value = sairahas.value.find(
      (sairaha) => sairaha.name.toLowerCase() === newVal.toLowerCase()
    );
    if (currentSairahas.value) {
      name = currentSairahas.value.name;
      hints = currentSairahas.value.hints;
      currHint.value = hints.find((hint) => !hint.revealed);
    }
  }
);

!sairahasName.value &&
  window.addEventListener("keydown", (e) => {
    const nameInput = document.getElementById("sairahas-name");

    if (e.key === "Enter") {
      sairahasName.value = nameInput.value;
      console.log(sairahasName.value);
      nameInput.value = "";
    }
  });
</script>

<template>
  <div class="my-20" v-if="sairahasName">
    <div class="px-5">
      <div
        class="w-full max-w-xl m-auto flex flex-col items-center text-center"
      >
        <Pill>{{ sairahasName }}</Pill>
        <InputCard
          v-if="currHint"
          @reveal="revealHint"
          :hint="currHint.hint"
          :answer="currHint.answer"
          :revealed="currHint.revealed"
        />
        <CongratsCard v-else />
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
  <input
    v-else
    id="sairahas-name"
    placeholder="Enter a sairahas name"
    class="px-10 py-3 bg-white text-center outline-none drop-shadow-lg rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
  />
</template>
