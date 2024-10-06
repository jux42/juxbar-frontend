import {animate, group, query, style, transition, trigger} from "@angular/animations";

export const FadeInOutAnimation = trigger('routeAnimation', [
  transition('* <=> *', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        width: '100%',
        opacity: 0
      })
    ], {optional: true}),

    group([
      query(':leave', [
        animate('0.5s ease-in', style({opacity: 0}))
      ], {optional: true}),

      query(':enter', [
        style({opacity: 0}),
        animate('0.5s ease-out', style({opacity: 1}))
      ], {optional: true})
    ])
  ])
]);
