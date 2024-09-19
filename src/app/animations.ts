import {animate, group, query, style, transition, trigger} from "@angular/animations";

export const FadeInOutAnimation =  trigger('routeAnimation', [
  transition('* <=> *', [
    // Cache l'élément sortant et entrant avec position absolue
    query(':enter, :leave', [
      style({
        position: 'absolute',
        width: '100%',
        opacity: 0 // Initialise l'opacité à 0
      })
    ], { optional: true }),

    group([
      // Animation de fade-out pour l'élément sortant
      query(':leave', [
        animate('0.5s ease-in', style({ opacity: 0 }))
      ], { optional: true }),

      // Animation de fade-in pour l'élément entrant
      query(':enter', [
        style({ opacity: 0 }), // Assure que l'élément est invisible avant le fade-in
        animate('0.5s ease-out', style({ opacity: 1 }))
      ], { optional: true })
    ])
  ])
]);
