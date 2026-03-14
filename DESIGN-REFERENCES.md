# Design References

Ce fichier sert de garde-fou visuel pour les prochaines itérations du projet.

## Direction

La cible n'est pas "EVA poster", "cyberpunk SaaS" ou "dashboard glossy".

La cible est :
- NERV operations
- urgence militaire
- HUD de monitoring
- panneaux segmentés
- densité contrôlée
- labels intégrés à la structure

## Références prioritaires

Ce sont les images les plus utiles pour juger la cohérence du système :

- [screenshots/cards.png](/home/mooty/dev/repos/mattloyed/eva-ui/screenshots/cards.png)
- [screenshots/card-line-subtitles.png](/home/mooty/dev/repos/mattloyed/eva-ui/screenshots/card-line-subtitles.png)
- [screenshots/live-cursor-card.png](/home/mooty/dev/repos/mattloyed/eva-ui/screenshots/live-cursor-card.png)
- [screenshots/phase-lists.png](/home/mooty/dev/repos/mattloyed/eva-ui/screenshots/phase-lists.png)
- [screenshots/phase-lists-2.png](/home/mooty/dev/repos/mattloyed/eva-ui/screenshots/phase-lists-2.png)
- [screenshots/battery-like-status-display-list.png](/home/mooty/dev/repos/mattloyed/eva-ui/screenshots/battery-like-status-display-list.png)
- [screenshots/timer-with-titles.png](/home/mooty/dev/repos/mattloyed/eva-ui/screenshots/timer-with-titles.png)
- [screenshots/linked-stacked-lists-monochromic.png](/home/mooty/dev/repos/mattloyed/eva-ui/screenshots/linked-stacked-lists-monochromic.png)
- [screenshots/vertical-life-lines.png](/home/mooty/dev/repos/mattloyed/eva-ui/screenshots/vertical-life-lines.png)
- [screenshots/magi-3-sides-quadrant-monitoring-display.png](/home/mooty/dev/repos/mattloyed/eva-ui/screenshots/magi-3-sides-quadrant-monitoring-display.png)
- [screenshots/alert.png](/home/mooty/dev/repos/mattloyed/eva-ui/screenshots/alert.png)

## Ce qu'il faut lire dans ces refs

### 1. Bordures

- Traits fins avant tout
- Cadres imbriqués, pas gros rectangles décoratifs
- Labels accrochés au châssis
- Séparateurs internes fréquents

### 2. Spacing

- Densité plus serrée que dans une UI marketing
- Peu de padding gratuit
- Peu de grands vides noirs sans structure
- Rythme répétable entre header, panel, footer, statut, label

### 3. Typo

- Display condensé pour titres et labels système
- Mono pour données, codes et télémétrie
- Très peu de serif
- Très peu de hiérarchie "poster"

### 4. Data-viz

- Préférer rails, stacks, zones, listes, statuts linéaires
- Les formes circulaires doivent ressembler à des instruments
- Éviter le rendu "widget dashboard moderne"

## Références secondaires

Utiles, mais à employer avec plus de prudence :

- [screenshots/3-side-monitor.png](/home/mooty/dev/repos/mattloyed/eva-ui/screenshots/3-side-monitor.png)
- [screenshots/magi-3-sides-quadrant-monitoring-display-2.png](/home/mooty/dev/repos/mattloyed/eva-ui/screenshots/magi-3-sides-quadrant-monitoring-display-2.png)
- [screenshots/linked-stacked-lists-monochromic-2.png](/home/mooty/dev/repos/mattloyed/eva-ui/screenshots/linked-stacked-lists-monochromic-2.png)
- [screenshots/multiple-gradient-bar-with-caution-danger.png](/home/mooty/dev/repos/mattloyed/eva-ui/screenshots/multiple-gradient-bar-with-caution-danger.png)
- [screenshots/stacked-bars-charts.png](/home/mooty/dev/repos/mattloyed/eva-ui/screenshots/stacked-bars-charts.png)
- [screenshots/alert-2.png](/home/mooty/dev/repos/mattloyed/eva-ui/screenshots/alert-2.png)
- [screenshots/refused-display.png](/home/mooty/dev/repos/mattloyed/eva-ui/screenshots/refused-display.png)
- [screenshots/shoot-mode.png](/home/mooty/dev/repos/mattloyed/eva-ui/screenshots/shoot-mode.png)

## Références à traiter comme avertissements

Ces images peuvent être utiles pour des détails, mais ne doivent pas dicter la grammaire principale :

- [screenshots/dognut-chart.png](/home/mooty/dev/repos/mattloyed/eva-ui/screenshots/dognut-chart.png)
- [screenshots/weird-chart.png](/home/mooty/dev/repos/mattloyed/eva-ui/screenshots/weird-chart.png)
- [screenshots/crooked-phase-lists.png](/home/mooty/dev/repos/mattloyed/eva-ui/screenshots/crooked-phase-lists.png)

Pourquoi :
- trop proches d'un rendu "chart gimmick"
- ou trop spécifiques pour devenir un langage système global

## Anti-objectifs

À éviter quand on retouche les composants ou les pages :

- cartes modernes génériques avec beaucoup d'air
- coins coupés utilisés partout comme gimmick
- serif géant hors écrans cérémoniels
- gauges/pies trop lisses ou trop "analytics"
- landing pages trop startup ou trop poster
- bordures épaisses sans sous-structure

## Workflow conseillé

Avant une refonte visuelle importante :

1. comparer la page à au moins 3 refs prioritaires
2. vérifier bordures, densité, labels, typo, data-viz
3. corriger les primitives avant les pages
4. valider desktop + mobile

## Notes locales

- Les images `apollo-*.png`, `docs-*.png` et `output/` sont des artefacts locaux d'audit ou de debug.
- Elles sont ignorées par git et ne servent pas de référence canonique pour la direction visuelle.
