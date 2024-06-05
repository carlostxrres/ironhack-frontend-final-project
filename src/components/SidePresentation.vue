<script setup></script>
<template>
  <div class="highlighted-section">
    <h2>
      Welcome
      <br />
      <span class="discreet">t</span>o another
      <br />
      <span class="discreet">t</span>o To
      <br />
      <span class="discreet">t</span>o Do
      <br />
      <span class="discreet">t</span>o App
    </h2>
  </div>
</template>
<style>
.sign-up-section > * {
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
}

.highlighted-section {
  display: none;
  flex: 1;
}
@media (min-width: 768px) {
  .highlighted-section {
    display: inherit;
  }
}

.discreet {
  font-weight: bold;
  opacity: 0.5;
}
</style>
