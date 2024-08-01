<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import useToasterStore from "@/stores/toaster.js";
import router from "@/router/index.js";
import { ERROR_EXPLANATIONS, H_CAPTCHA_SITE_KEY } from "@/CONSTANTS.js";
import { errorUi } from "@/services/validateForm.js";
import HorizontalRule from "@/components/HorizontalRule.vue";
import DialogComponent from "@/components/DialogComponent.vue";
import VueHcaptcha from "@hcaptcha/vue3-hcaptcha";

const userStore = useUserStore();
const toasterStore = useToasterStore();
const shouldDialogBeOpened = ref(false);

const continueAnonymously = async (captchaToken) => {
  if (!captchaToken) return;

  const response = await userStore.signInAnonymously(captchaToken);
  if (response.error) {
    errorUi(
      {
        conditionName: ERROR_EXPLANATIONS()[response.error] || "",
        invalidMessage: response.error,
      },
      toasterStore
    );
  } else {
    toasterStore.success({
      // to do: change to "warning"
      title: "Anonymously signed in -  all data will be deleted as you log out",
      timeout: 5000,
    });
    shouldDialogBeOpened.value = false;
    router.push("tasks");
  }
};

const notificateCaptchaError = (error) => {
  toasterStore.error({
    title: `There was some error processing your Captcha`,
    text: error,
  });
};

const openDialog = () => {
  shouldDialogBeOpened.value = true;
};
</script>

<template>
  <br />
  <HorizontalRule text="or..." style="margin-bottom: 0" />
  <button class="button-tertiary" @click="openDialog">Continue anonymously</button>

  <DialogComponent
    title="Anonymous sign-in"
    :onOpen="focusOnInput"
    showMethod="show"
    v-if="shouldDialogBeOpened"
  >
    <VueHcaptcha
      :sitekey="H_CAPTCHA_SITE_KEY()"
      @verify="continueAnonymously"
      @error="notificateCaptchaError"
    />
  </DialogComponent>
</template>
