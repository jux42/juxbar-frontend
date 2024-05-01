import {animate, group, query, style, transition, trigger} from "@angular/animations";

export const slideInAnimation = trigger('routeAnimation', [
  transition('* <=> *', [
    query(':enter, :leave', [
      style({
        position: 'absolute',

        width: '100%'
      })
    ], {optional: true}),


    group([
      query(':leave', [
        animate('0.3s 50ms ease-in', style({transform: 'translateX(-100%)'}))
      ], {optional: true}),

      query(':enter', [
        style({transform: 'scale(0.2)'}),
        animate('500ms 50ms ease-out', style({transform: 'translateX(0)'}))
      ], {optional: true})
    ])
  ])
]);
