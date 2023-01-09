<script setup></script>
<template>
  <div
    class="h-60 w-full bg-white drop-shadow-lg rounded-3xl p-5 pb-8 md:p-5 flex flex-col justify-between"
  >
    <p class="font-bold">Hint: {{ "Your hint" }}</p>
    <input
      type="text"
      placeholder="Your answer"
      class="w-full outline-0 bg-gray-200 rounded-md p-2 text-center text-lg self-center"
    />
    <div class="flex justify-between">
      <div class="w-10 h-10 hidden md:block" />
      <div class="hidden md:block">{{ "notification" }}</div>
      <button
        class="w-full md:w-10 h-10 bg-blue-500 text-white rounded-full self-end active:scale-90 duration-200"
      >
        <span class="md:hidden"> Submit</span>
      </button>
    </div>
  </div>
</template>
