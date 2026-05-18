# Struttura del sito Laruccia

## File principali

- `index.html`: home page
- `prodotti.html`: pagina con tutte le categorie e i brand
- `brand.html`: pagina dinamica dei singoli brand
- `chi-siamo.html`, `progetti.html`, `download.html`: pagine istituzionali
- `navbar.html`, `footer.html`: componenti caricati nelle pagine
- `cookie-policy.html`, `policy-privacy.html`: pagine legali

## Cartelle attive

- `css/`: tutti gli stili del sito
- `js/`: logica del sito e dati dei brand
- `img/`: immagini usate dal sito
- `img/prodotti/`: immagini delle card nella pagina prodotti
- `img/brand/`: immagini delle collezioni dentro le pagine brand
- `img/video/`: video della home

## Dove mettere le nuove immagini

Le immagini delle card prodotto vanno in:

```text
img/prodotti/nome-categoria/
```

Le immagini delle collezioni dei brand vanno in:

```text
img/brand/nome-brand/
```

I percorsi sono gestiti in:

- `js/products-data.js` per le card della pagina prodotti
- `js/brand-data.js` per le pagine dei singoli brand

## Archivio

La cartella `_archivio/` contiene file vecchi o non usati dal sito attivo.
Non cancellarla subito: serve come recupero nel caso qualcosa debba tornare utile.
