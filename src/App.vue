<script setup>
import InputCard from "./components/input-card.vue";
import HintCard from "./components/hint-card.vue";
import Pill from "./components/pill.vue";
import Label from "./components/revealed-hints-label.vue";
import CardsContainer from "./layouts/cards-container.vue";
import CongratsCard from "./components/congrats-card.vue";
import { ref, watch } from "vue";

import sunIcon from "./assets/sun.png";
import moonIcon from "./assets/moon.png";

import sairahas from "./utils/sairahas";

const savedSairahas = ref(JSON.parse(localStorage.getItem("savedSairahas")));

let sairahasName = ref(savedSairahas.value?.name || "");

let currentSairahas = ref(
  sairahas.value.find((sairaha) => sairaha.name === sairahasName.value)
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
      (sairaha) => sairaha.name === newVal
    );
    if (currentSairahas.value) {
      name = currentSairahas.value.name;
      hints = currentSairahas.value.hints;
      currHint.value = hints.find((hint) => !hint.revealed);
    }
  }
);

const submitName = () => {
  const nameInput = document.getElementById("sairahas-name");
  if (
    nameInput &&
    sairahas.value.find((item) => item.name === nameInput.value)
  ) {
    sairahasName.value = nameInput.value;
  }
};

!sairahasName.value &&
  window.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      submitName();
    }
  });

const btnIconToggle = () => {
  setTimeout(() => {
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    darkModeToggle.innerHTML = !isDarkMode.value
      ? `<img src=${sunIcon} class="w-6 h-6" />`
      : `<img  src=${moonIcon} class="w-6 h-6" />`;
  }, 1);
};

const toggleDarkMode = () => {
  const body = document.querySelector("body");
  if (body) {
    body.classList.toggle("dark");
  }

  // Save dark mode preference to local storage
  isDarkMode = ref(body.classList.contains("dark"));
  localStorage.setItem("darkMode", isDarkMode.value);
  btnIconToggle();
};

let isDarkMode = ref(localStorage.getItem("darkMode") === "true");
if (isDarkMode.value) {
  toggleDarkMode();
}
btnIconToggle();
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
        v-for="(hint, index) in hints
          .filter((hint) => hint.revealed)
          .slice()
          .reverse()"
        :key="index"
        :hint="hint.hint"
        :answer="hint.answer"
        :image="hint.image"
      />
    </CardsContainer>
  </div>
  <div
    v-else
    class="w-10/12 max-w-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center space-y-8"
  >
    <input
      id="sairahas-name"
      placeholder="Fill your sairahas name here"
      class="w-full px-10 py-3 bg-white dark:bg-slate-700 text-center outline-none drop-shadow-lg rounded-full"
    />
    <p class="text-gray-400">Enter to continue</p>
  </div>
  <button
    id="dark-mode-toggle"
    @click="toggleDarkMode"
    class="p-3 dark:bg-slate-700 bg-white drop-shadow-lg m-3 rounded-full fixed top-0 right-0"
  ></button>
</template>
