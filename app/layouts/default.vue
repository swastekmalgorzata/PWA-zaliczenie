<template>
  <div class="min-h-screen bg-gray-50">
    <div class="flex">
<main class="flex-1 p-4 lg:p-8 pb-20 lg:pb-8">
        <div class="max-w-7xl mx-auto">
          <slot />
        </div>
      </main>
    </div>

    <AppFooter />
    <MobileBottomNav />
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
</style>
