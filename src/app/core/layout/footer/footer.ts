import { Component } from '@angular/core';
import { FooterLink, NavGroup } from '../../interface/nav-interface';
import { RouterLink } from '@angular/router';
import { Logo } from '../../../shared/components/logo/logo';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, Logo],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  private readonly menuGroup: NavGroup = {
    title: 'Меню',
    items: [
      { title: 'Фильмы', route: '/movies' },
      { title: 'Сериалы', route: '/series' },
      { title: 'Подборки', route: '/collections' },
    ],
  };

  private readonly subscriptionGroup: NavGroup = {
    title: 'Подписка',
    items: [
      { title: 'Тарифный план', route: '/subscription/plans' },
      { title: 'Акции', route: '/subscription/promo' },
      { title: 'Подписка за баллы', route: '/subscription/points' },
    ],
  };

  private readonly catalogGroup: NavGroup = {
    title: 'Кино и сериалы',
    items: [
      { title: 'Весь каталог', route: '/catalog' },
      { title: 'Комедии', route: '/genre/comedy' },
      { title: 'Драмы', route: '/genre/drama' },
      { title: 'Фэнтези', route: '/genre/fantasy' },
      { title: 'Триллеры', route: '/genre/thriller' },
      { title: 'Детективы', route: '/genre/detective' },
    ],
  };

  private readonly cooperationGroup: NavGroup = {
    title: 'Сотрудничество',
    items: [
      { title: 'Размещение рекламы', route: '/advertising' },
      { title: 'Партнерам', route: '/partners' },
      { title: 'Партнерская программа', route: '/affiliate' },
      { title: 'Пользовательское соглашение', route: '/terms' },
      { title: 'Политика конфиденциальности', route: '/privacy' },
    ],
  };

  private readonly faqGroup: NavGroup = {
    title: 'Вопросы и ответы',
    items: [],
  };

  readonly navColumns: NavGroup[][] = [
    [this.menuGroup, this.subscriptionGroup],
    [this.catalogGroup],
    [this.cooperationGroup, this.faqGroup],
  ];

  readonly supportContacts: FooterLink[] = [
    { title: '8 800 800 80 80', href: 'tel:88008008080', iconId: 'phone' },
    { title: 'support@mail.ru', href: 'mailto:support@mail.ru', iconId: 'email' },
  ];

  readonly socialLinks: FooterLink[] = [
    { title: 'Facebook', href: 'https://www.facebook.com/', iconId: 'facebook' },
    { title: 'ВКонтакте', href: 'https://vk.com/', iconId: 'vk' },
    { title: 'Instagram', href: 'https://www.instagram.com/', iconId: 'instagram' },
  ];
}
