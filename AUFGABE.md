### 1. MatchesView.vue

1. neue (vorerst leere) `showRecommendedMedia()` Function in script tag schreiben
2. diese Funktion anstelle `router.push('/recommended-media')` aufrufen
3. in dieser Funktion `match` variable aus `v-for` als parameter übergeben

### 2. MatchesStore.ts

1. neue const `selectedMatch` vom typ `Ref<Match>` erstellen und mit leeren object initialisieren
   - leeres object `ref({})` wirft fehler und muss daher gecastet werden `ref({} as Media)` 
   - `selectedMatch` variable im store returnen

### 3. MatchesView.vue

1. `MatchesStore.ts` importieren und initialisieren
2. in `showRecommendedMedia()` Funktion, die `selectedMatch` variable aus dem `MatchesStore.ts`, mit dem übergebenen `match` parameter überschreiben
3. nun (immer noch in `showRecommendedMedia()` Funktion), `router.push('/recommended-media')` aufrufen, um die view zu wechseln

**INFO:** Wir benötigen diese Funktion um in der `RecommendedMediaView.vue` auf das Match, auf das wir geklickt haben zugreifen zu können.\
Vereinfacht gesagt, wir klicken ja auf einen Nutzer, von dem wie dann die verschiedenen Songs anzeigen wollen, die wir nicht kennen. In dieser view müssen wir ja auch die Nutzerdaten, wie den username darstellen. Mit `router.push('/recommended-media')`, können wir aber keine Daten an die view übergeben und deswegen speichern wir und das `Match` Objekt, auf das wir geklickt haben im store, um dann in der view darauf zugreifen zu können.

### 4. MatchesService.ts

1. `userId` muss noch als parameter in der `fetchRecommendedMedia()` function übergeben werden
    - Typ angeben
2. `userId` mit hilfe von string interpolation in die url setzten

### 5. MatchesStore.ts

1. neue const `recommendedMedia` vom typ `MediaSummary[]` erstellen und mit leerem array initialisieren

### 6. MatchesView.vue


1. `fetchRecommendedMedia()` in `onMounted` function aufrufen und der `recommendedMedia` variable aus `MatchesStore.ts` zuweisen
    - await nicht vergessen, function ist asynchron
2. `Media.vue` Komponente importieren und in template über der `<Navbar />` Komponente ausrendern
3. über `recommendedMedia` variable aus `MatchesStore.ts` mit `v-for` iterieren und an `media` prop binden
   - auch `index` binden 
   - Template sollte jetzt schon automatisch ausgerendert werden, da wir `Media.vue` Komponente nachnutzen

### 7. RecommendedMediaHeader.vue

1. `MatchesStore.ts` importieren und initialisieren
2. Daten im template übergeben
   - username
   - zusammen gehörte minuten (hier `secondsToMinutes()` Funktion nutzen)
   - `<div class="profile-image"></div>` gegen `<img />` Tag ersetzten und profilbild an `src` attribut binden. 
