import { animate, AnimationEntryMetadata, state, style, transition, trigger } from '@angular/core';

//主页面切换动画
export const routerAnimation: AnimationEntryMetadata =
  trigger('routeAnimation', [
    state('*',
      style({
        opacity: 1,
      })
    ),
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'translateY(10%)',
        width:'100vw',
        height:'100vh'
      }),
      animate('0.4s ease')
    ]),
    // transition(':leave', [
    //   animate('0.2s ease', style({
    //     opacity: 0,
    //     width:'100vw',
    //     height:'100vh'
    //   }))
    // ])
  ]);

//
export const slideLeftAnimation:AnimationEntryMetadata=
  trigger('slideLAnimation',[
    state('*',style({
      opacity:1,
      transform:'translateX(0)'
    })),
    transition(':enter',[
      style({
        opacity:0,
        transform:'translateX(100%)'
      }),
      animate('0.6s ease-in-out')
    ]),
    transition(':leave',[
      animate('0.6s ease-in-out',style({
        opacity:0,
        transform:'translateX(0)'
      }))
    ])
  ]);

//淡出淡入动画
export const fadeInOut:AnimationEntryMetadata =
  trigger('fadeInOut',[
    state('*',style({
      opacity:1
    })),
    transition(':enter',[
      style({
        opacity:0
      }),
      animate('0.2s ease')
    ]),
    transition(':leave',[
      animate('0.4s ease',style({
        opacity:0
      }))
    ])
  ]);

//
export const fadeInUp:AnimationEntryMetadata=
  trigger('fadeInUp',[
    state('*',style({
      transform:'translateY(0)'
    })),
    transition(':enter',[
      style({
        transform:'translateY(100%)'
      }),
      animate('0.2s ease')
    ]),
    transition(':leave',[
      animate('0.4s ease',style({
        transform:'translateY(-100%)'
      }))
    ])
  ]);
