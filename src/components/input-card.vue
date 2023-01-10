<script setup>
import { defineEmits, defineProps, onMounted } from "vue";

const props = defineProps({
  hint: {
    type: String,
    required: false,
  },
  answer: {
    type: String,
    required: false,
  },
  revealed: {
    type: Boolean,
    required: false,
  },
});

const emit = defineEmits(["reveal"]);

function alert(msg, className) {
  const notification = document.getElementById("notification");
  notification.classList.remove("text-green-500", "text-red-500");
  notification.classList.add(className);
  notification.innerText = msg;

  setTimeout(() => {
    notification.classList.remove(className);
    notification.innerText === msg && (notification.innerText = "");
  }, 2000);
}

function submit() {
  const input = document.getElementById("input-answer");
  const inputAnswer = input.value;

  if (inputAnswer.trim().toLowerCase() === props.answer.trim().toLowerCase()) {
    alert("Correct!", "text-green-500");
    emit.call(this, "reveal");
    input.value = "";
    setTimeout(() => {
      window.scrollTo({
        top: 500,
        behavior: "smooth",
      });
    }, 1);
  } else {
    alert("Try again!", "text-red-500");
  }
}

onMounted(() => {
  const input = document.getElementById("input-answer");
  input.focus();
  window.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      submit();
    }
  });
});
</script>
<template>
  <div
    class="h-60 w-full bg-white drop-shadow-lg rounded-3xl p-5 pb-8 md:p-5 flex flex-col justify-between"
  >
    <p>
      Hint: <span class="font-bold">{{ hint || "No hint" }}</span>
    </p>
    <input
      type="text"
      placeholder="Your answer"
      id="input-answer"
      class="w-full outline-0 bg-gray-200 rounded-md p-2 text-center text-lg self-center"
    />
    <div class="flex justify-between items-center">
      <div class="w-10 h-10 hidden md:block" />
      <div id="notification" class="hidden md:block"></div>
      <button
        @click="submit"
        class="w-full md:w-10 h-10 bg-blue-500 text-white rounded-full self-end active:scale-90 duration-200"
      >
        <span class="md:hidden"> Submit</span>
      </button>
    </div>
  </div>
</template>
