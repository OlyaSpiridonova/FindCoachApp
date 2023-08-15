<template>
  <div v-if="isLoading" class="loading">
    <base-spinner></base-spinner>
  </div>
  <div v-else>
    <section>
      <base-card>
        <h1>{{ fullName }}</h1>
        <h2>${{ rate }}/hour</h2>
      </base-card>
    </section>
    <section>
      <base-card>
        <header v-if="!isHide">
          <h2>Interested? Reach out now!</h2>
          <base-button link :to="contactLink">Contact</base-button>
        </header>
        <router-view></router-view>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge
          v-for="area in areas"
          :key="area"
          :type="area"
          :title="area"
          >{{ area }}</base-badge
        >
        <p>{{ description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      isLoading: false,
      selectedCoach: null,
    };
  },
  computed: {
    fullName() {
      return this.selectedCoach.firstName + " " + this.selectedCoach.lastName;
    },
    rate() {
      return this.selectedCoach.hourlyRate;
    },
    contactLink() {
      return this.$route.path + "/contact";
    },
    areas() {
      return this.selectedCoach.areas;
    },
    description() {
      return this.selectedCoach.description;
    },
    isHide() {
      return this.$route.fullPath.includes("contact");
    },
  },
  methods: {
    async loadCoaches() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("coaches/loadCoaches");
        this.selectedCoach = this.$store.getters["coaches/coaches"].find(
          (coach) => coach.id === this.id
        );
        console.log(this.selectedCoach);
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
      this.isLoading = false;
    },
  },
  created() {
    this.loadCoaches();
  },
};
</script>

<style scoped>
.loading {
  margin-top: 30px;
}
</style>
