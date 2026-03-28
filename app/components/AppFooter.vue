<template>
  <footer class="bg-gray-900 text-gray-300 border-t border-gray-800">
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <div class="flex items-center gap-2 mb-4">
            <div class="bg-primary p-2 rounded-lg">
              <GraduationCap class="w-5 h-5 text-white" />
            </div>
            <span class="text-xl font-medium text-white">Merito GO</span>
          </div>
          <p class="text-sm text-gray-400 leading-relaxed">
            Excellence in education, innovation in learning. Preparing students for success in a global world.
          </p>
        </div>

        <div>
          <h3 class="text-white font-medium mb-4">Contact Us</h3>
          <div class="space-y-3">
            <div class="flex items-start gap-2">
              <MapPin class="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <p class="text-sm">
                Merito University<br>
                ul. Grunwaldzka 472A<br>
                80-309 Gdańsk, Poland
              </p>
            </div>
            <div class="flex items-center gap-2">
              <Phone class="w-4 h-4 text-primary flex-shrink-0" />
              <p class="text-sm">+48 58 511 11 45</p>
            </div>
            <div class="flex items-center gap-2">
              <Mail class="w-4 h-4 text-primary flex-shrink-0" />
              <p class="text-sm">info@gdansk.merito.pl</p>
            </div>
          </div>
        </div>

        <div>
          <h3 class="text-white font-medium mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-sm hover:text-primary transition-colors">About Merito</a></li>
            <li><a href="#" class="text-sm hover:text-primary transition-colors">Academic Programs</a></li>
            <li><a href="#" class="text-sm hover:text-primary transition-colors">Admissions</a></li>
            <li><a href="#" class="text-sm hover:text-primary transition-colors">Student Resources</a></li>
            <li><a href="#" class="text-sm hover:text-primary transition-colors">Faculty &amp; Staff</a></li>
          </ul>
        </div>

        <div>
          <h3 class="text-white font-medium mb-4">Connect With Us</h3>
          <div class="flex gap-3 mb-4">
            <a href="#" class="bg-gray-800 hover:bg-primary p-2 rounded transition-colors">
              <Facebook class="w-4 h-4" />
            </a>
            <a href="#" class="bg-gray-800 hover:bg-primary p-2 rounded transition-colors">
              <Twitter class="w-4 h-4" />
            </a>
            <a href="#" class="bg-gray-800 hover:bg-primary p-2 rounded transition-colors">
              <Instagram class="w-4 h-4" />
            </a>
            <a href="#" class="bg-gray-800 hover:bg-primary p-2 rounded transition-colors">
              <Linkedin class="w-4 h-4" />
            </a>
          </div>
          <div class="space-y-2">
            <p class="text-sm font-medium text-white">Support Hours</p>
            <p class="text-sm text-gray-400">Mon - Fri: 8:00 AM - 6:00 PM</p>
            <p class="text-sm text-gray-400">Sat: 9:00 AM - 2:00 PM</p>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-sm text-gray-400">© 2026 Merito University Gdańsk. All rights reserved.</p>
        <div class="flex gap-6">
          <a href="#" class="text-sm text-gray-400 hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" class="text-sm text-gray-400 hover:text-primary transition-colors">Terms of Service</a>
          <a href="#" class="text-sm text-gray-400 hover:text-primary transition-colors">Cookie Policy</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { GraduationCap, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-vue-next'
</script>

<style lang="scss" scoped>
</style>
