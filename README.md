# Sito del matrimonio

Sito statico realizzato con HTML, CSS e JavaScript, senza framework o dipendenze da installare.

## Anteprima locale

Dalla cartella del progetto, avvia un piccolo server:

```bash
python3 -m http.server 8000
```

Poi apri <http://localhost:8000>. Il server è necessario per provare il sito come verrà pubblicato, con i file CSS, JavaScript e le immagini separati.

## Pubblicazione con GitHub Pages

1. Pubblica il branch `main` su GitHub.
2. Nel repository apri **Settings → Pages**.
3. In **Build and deployment**, scegli **Deploy from a branch**, poi `main` e la cartella `/(root)`.
4. Salva e attendi che GitHub Pages completi la pubblicazione.

La pagina iniziale è `index.html`, come richiesto da GitHub Pages per la cartella principale. Non serve una fase di build.

## Struttura

- `index.html`: contenuti della pagina.
- `styles.css`: stili e layout.
- `script.js`: conto alla rovescia, link WhatsApp, copia dell'IBAN e galleria.
- `assets/`: font, illustrazioni e fotografie. La mappa interattiva dell'itinerario è in `assets/images/thailand-map.svg`, con la relativa immagine WebP.

## Prima di pubblicare

Controllate date, orari, indirizzi, recapiti, link WhatsApp e coordinate per i regali. GitHub Pages è pubblico: i contenuti del sito, comprese le informazioni personali e bancarie inserite nella pagina, saranno visibili a chiunque. Verificate anche di avere il consenso per pubblicare le fotografie.
