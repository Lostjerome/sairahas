<script>
export default {
  props: {
    hint: {
      type: String,
      required: false,
    },
    answer: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
  },
};
</script>
<template>
  <div
    class="w-[16rem] h-[22rem] drop-shadow-md rounded-3xl bg-white text-center py-5 px-8 flex flex-col space-y-5"
  >
    <p class="">
      Hint: <span class="font-bold">{{ hint }}</span>
    </p>
    <div
      :style="{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }"
      class="image w-48 h-48 rounded-2xl bg-gray-200"
    />
    <p class="text-lg font-bold">{{ answer }}</p>
  </div>
</template>
