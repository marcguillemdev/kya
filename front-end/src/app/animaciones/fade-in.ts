import { animate, style, transition, trigger } from "@angular/animations";

export const fadeIn = trigger('onOff', [
  // The '* => *' will trigger the animation to change between any two states
  transition('* => *', [style({
    opacity: 0
  }),
    animate(800)
  ])
]);
