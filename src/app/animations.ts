import {animate, group, query, style, transition, trigger} from "@angular/animations";

export const slideInAnimation = trigger('routeAnimation', [
  transition('* <=> *', [ // Appliquez cette animation pour tout changement de route
    // Commencez par cacher tous les éléments animés
    query(':enter, :leave', [
      style({
        position: 'absolute',

        width: '100%'
      })
    ], {optional: true}),

    // Animation de groupe pour permettre à plusieurs animations de se produire simultanément
    group([
      // Faire sortir les éléments actuels (si présents)
      query(':leave', [
        animate('0.3s 50ms ease-in', style({transform: 'translateX(-100%)'}))
      ], {optional: true}),

      // Faire entrer les nouveaux éléments
      query(':enter', [
        style({transform: 'scale(0.5)'}), // Commencez petit
        animate('1.5s 50ms ease-out', style({transform: 'translateX(0)'})) // Finissez à la taille normale
      ], {optional: true})
    ])
  ])
]);
