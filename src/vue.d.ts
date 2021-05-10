import Vue from "vue";

declare module "vue/types/vue" {
  interface Vue {
    $moment: any,
    $md5: any
  }
}