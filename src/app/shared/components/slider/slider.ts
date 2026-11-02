import { Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { SwiperContainer } from 'swiper/element';
import { SliderVariant } from './slider-variant';
import { Movie } from '../../../features/movie/models/movie.models';

@Component({
  selector: 'app-slider',
  imports: [],
  templateUrl: './slider.html',
  styleUrl: './slider.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Slider implements AfterViewInit {
  @ViewChild('swiper') swiperRef!: ElementRef<SwiperContainer>;
  @ViewChild('prevBtn') prevBtn!: ElementRef<HTMLButtonElement>;
  @ViewChild('nextBtn') nextBtn!: ElementRef<HTMLButtonElement>;
  items = input<Movie[]>([]);
  variant = input<SliderVariant>('default');

  private readonly sliderOptions = {
    hero: {
      slidesPerView: 'auto',
      spaceBetween: -16,
      slidesPerGroup: 1,
      speed: 600,
    },
    default: {
      slidesPerView: 4,
      spaceBetween: 20,
      slidesPerGroup: 1,
      speed: 400,
    },
  } as const;

  ngAfterViewInit(): void {
    const swiperEl = this.swiperRef.nativeElement;

    Object.assign(swiperEl, {
      ...this.sliderOptions[this.variant()],
      navigation: {
        prevEl: this.prevBtn.nativeElement,
        nextEl: this.nextBtn.nativeElement,
      },
    });

    swiperEl.initialize();
  }
}
