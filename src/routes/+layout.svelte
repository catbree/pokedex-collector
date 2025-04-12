<script>
    import '../app.css';
 </script>

<svelte:head>
  <title>1025 Pokémon National Dex Collection</title>
  <meta name="description" content="A simple tracker for your full National Dex Pokémon card collection." />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="icon" href="/icons/favicon.svg" />

  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XDK4EXJMBM"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XDK4EXJMBM');
  </script>
</svelte:head>

<div class="bg-pkd-green-3 min-h-screen p-2">
	<slot />
</div>