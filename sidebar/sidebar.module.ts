import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessengerSideBarComponent } from './presentation/sidebar.component';
import { ComponentsModule } from 'src/app/core/components/components.module';
import {
  SvgPaperPlane,
  SvgSquareAndPencil,
  SvgPaperClip,
  SvgChevronForward,
  SvgXMark,
  SvgSearch,
  SvgArrowRight,
  SvgLink,
  SvgDocText,
  SvgCamera,
  SvgVideo,
  SvgTurnUpBackward,
  SvgLeave,
  SvgPlus,
  SvgArrowBackWard,
} from 'src/app/core/components/svg-components/svg.components';
import { MessengerSideBarService } from './domain/sidebar-service';
import { MessengerSideBarServiceImpl } from './data/sidebar-service-impl';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    SvgSquareAndPencil,
    SvgPaperPlane,
    SvgPaperClip,
    SvgChevronForward,
    SvgXMark,
    SvgSearch,
    SvgArrowRight,
    SvgLink,
    SvgDocText,
    SvgCamera,
    SvgVideo,
    SvgTurnUpBackward,
    SvgLeave,
    SvgPlus,
    SvgArrowBackWard,
  ],
  declarations: [MessengerSideBarComponent],
  providers: [
    {
      provide: MessengerSideBarService,
      useClass: MessengerSideBarServiceImpl,
    },
  ],
  exports: [MessengerSideBarComponent],
})
export class MessengerSideBarModule {}
