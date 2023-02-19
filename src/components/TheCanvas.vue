<script>
import { QwertyKeeb } from '../assets/js/Keeb';
export default {
  data: () => ({
    letters: 'test'
  }),
  computed: {
    pts() {
      const keeb = new QwertyKeeb()
      if (this.letters) {
        return this.letters.split("").map((l) => {
          const key = keeb.getKeyPoint(l)
          return key.x + "," + key.y
        }).join(' ')
      } else {
        return "0,0"
      }
      
    }
  }
}
</script>

<template>
  <svg height="200" width="500">
    <polyline :points="pts" style="fill:none;stroke:black;stroke-width:3" />
    Sorry, your browser does not support inline SVG.
  </svg>
  <div>
    <textarea v-model="letters" placeholder="Type here"></textarea>
  </div>
</template>

<style scoped>
/* TODO */
</style>

