<template>
  <div class="hello">
    Difficulty: {{ difficulty }}
    Name: <input type="text" v-model='name' />
    <input type="button" @click="createName()" value="Create" />
    <input type="button" @click="randomName()" value="Random name" />
  </div>
</template>

<script>
import NS from "@/utils/iota-ns/ns.js"
var ns = new NS()

export default {
  methods: {
    createName() {
      ns.createName(this.name)
    },
    randomName() {
      this.name = NS.randomName()
    }
  },
  watch: {
    name() {
      this.difficulty = NS.calculateDifficulty(this.name)
    }
  },
  data() {
    return {
      name: '',
      difficulty: 0
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
