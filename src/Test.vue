<template>
  <div>
    <input
      v-model="inputText"
      @input="onInputChange"
      @keydown.down="selectNext"
      @keydown.up="selectPrevious"
      @keydown.enter="selectWord"
      placeholder="Type something..."
    />
    <ul v-if="showRecommendations">
      <li
        v-for="(word, index) in recommendedWords"
        :key="index"
        @click="selectWordFromList(word)"
        :class="{ active: index === selectedWordIndex }"
      >
        {{ word }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputText: '',
      recommendedWords: [],
      showRecommendations: false,
      selectedWordIndex: -1,
    };
  },
  methods: {
    onInputChange() {
      this.selectedWordIndex = -1; // Reset the selected word index
      this.recommendedWords = this.getRecommendedWords(this.inputText);
      this.showRecommendations = this.inputText.length > 1;
    },
    getRecommendedWords(input) {
      const predefinedWords = [
        'today',
        'yesterday',
        'tomorrow',
        'the day before today',
        'next',
      ];
      return predefinedWords.filter((word) =>
        word.toLowerCase().includes(input.toLowerCase())
      );
    },
    selectWordFromList(word) {
      this.inputText = word;
      this.showRecommendations = false;
    },
    selectNext() {
      if (this.selectedWordIndex < this.recommendedWords.length - 1) {
        this.selectedWordIndex++;
      }
    },
    selectPrevious() {
      if (this.selectedWordIndex > 0) {
        this.selectedWordIndex--;
      }
    },
    selectWord() {
      if (this.selectedWordIndex !== -1) {
        this.inputText = this.recommendedWords[this.selectedWordIndex];
        this.showRecommendations = false;
      }
    },
  },
};
</script>

<style scoped>
/* Style for the active recommendation */
li.active {
  background-color: #f0f0f0;
}
</style>
