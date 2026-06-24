<script>
  import { signIn, signUp } from "$lib/stores/auth";

  // Called when the user dismisses the modal (backdrop, ✕, or after sign-in).
  let { onClose } = $props();

  let mode = $state("signin"); // "signin" | "signup"
  let email = $state("");
  let password = $state("");
  let loading = $state(false);
  let error = $state("");
  let notice = $state("");

  async function handleSubmit(event) {
    event.preventDefault();
    loading = true;
    error = "";
    notice = "";

    if (mode === "signup") {
      const { error: err } = await signUp(email, password);
      if (err) error = err.message;
      else notice = "Account created. Check your email to confirm, then sign in.";
    } else {
      const { error: err } = await signIn(email, password);
      if (err) error = err.message;
      else onClose(); // signed in — close the modal; the layout merges the cloud collection
    }

    loading = false;
  }

  function switchMode() {
    mode = mode === "signin" ? "signup" : "signin";
    error = "";
    notice = "";
  }
</script>

<!-- Backdrop: clicking outside the card closes the modal. -->
<div
  class="fixed inset-0 z-50 flex items-center justify-center bg-pkd-ink/70 px-4"
  onclick={onClose}
  role="presentation"
>
  <!-- Card: stop clicks here from bubbling up to the backdrop. -->
  <div
    class="relative w-full max-w-sm bg-pkd-cream border-[3px] border-pkd-ink p-6"
    style="box-shadow: 6px 6px 0 var(--color-pkd-ink);"
    onclick={(e) => e.stopPropagation()}
    role="presentation"
  >
    <button
      onclick={onClose}
      aria-label="Close"
      class="absolute right-3 top-3 cursor-pointer p-1 opacity-60 transition hover:opacity-100"
    >
      <img src="/icons/cross.svg" alt="" class="h-3 w-3" />
    </button>

    <h1 class="mb-1 text-center font-pokemon text-sm text-pkd-ink">Pokédex Collector</h1>
    <p class="mb-5 text-center font-pokemon text-3xs text-pkd-green">
      {mode === "signin" ? "Sign in to save your progress" : "Create an account to save your progress"}
    </p>

    <form onsubmit={handleSubmit} class="flex flex-col gap-3">
      <label class="flex flex-col gap-1 font-pokemon text-3xs text-pkd-ink">
        Email
        <input
          type="email"
          bind:value={email}
          required
          autocomplete="email"
          class="border-[2px] border-pkd-ink bg-white px-2 py-2 font-pokemon text-2xs text-pkd-ink focus:outline-none focus:ring-2 focus:ring-pkd-lens"
        />
      </label>

      <label class="flex flex-col gap-1 font-pokemon text-3xs text-pkd-ink">
        Password
        <input
          type="password"
          bind:value={password}
          required
          minlength="6"
          autocomplete={mode === "signin" ? "current-password" : "new-password"}
          class="border-[2px] border-pkd-ink bg-white px-2 py-2 font-pokemon text-2xs text-pkd-ink focus:outline-none focus:ring-2 focus:ring-pkd-lens"
        />
      </label>

      {#if error}<p class="font-pokemon text-3xs text-[#c94a3f]">{error}</p>{/if}
      {#if notice}<p class="font-pokemon text-3xs text-pkd-green-on">{notice}</p>{/if}

      <button
        type="submit"
        disabled={loading}
        class="mt-1 cursor-pointer border-[3px] border-pkd-ink bg-pkd-shell px-3 py-2 font-pokemon text-2xs text-white transition hover:bg-pkd-shell-2 active:translate-x-[3px] active:translate-y-[3px] active:shadow-none disabled:opacity-60"
        style="box-shadow: 3px 3px 0 var(--color-pkd-ink);"
      >
        {loading ? "Please wait…" : mode === "signin" ? "Sign in" : "Sign up"}
      </button>
    </form>

    <button
      onclick={switchMode}
      class="mt-4 w-full cursor-pointer text-center font-pokemon text-3xs text-pkd-green hover:underline"
    >
      {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
    </button>
  </div>
</div>
