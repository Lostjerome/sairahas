import { ref } from "vue";

const sairahas = ref([
  {
    name: "Jerome",
    hints: [
      {
        hint: "Red + White",
        answer: "Pink",
        image:
          "https://htmlcolorcodes.com/assets/images/colors/neon-pink-color-solid-background-1920x1080.png",
        revealed: false,
      },
      {
        hint: "Hello World 2022",
        answer: "Fennec",
        image: "",
        revealed: false,
      },
      {
        hint: "King Vamp",
        answer: "Playboi Carti",
        image: "",
        revealed: false,
      },
      {
        hint: "The 3rd",
        answer: "The 3rd",
        image: "",
        revealed: false,
      },
    ],
  },
]);

export default sairahas;
