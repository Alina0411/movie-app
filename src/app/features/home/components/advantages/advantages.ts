import { Component } from '@angular/core';
import { Advantage } from './advantages.model';

@Component({
  selector: 'app-advantages',
  imports: [],
  templateUrl: './advantages.html',
  styleUrl: './advantages.scss',
})
export class Advantages {
  advantages: Advantage[] = [
    {
      id: 1,
      icon: 'avatar-man.png',
      title: 'Большой выбор',
      description:
        '10 000 фильмов и сериалов уже в библиотеке.Ежедневное пополнение новинками кино',
    },
    {
      id: 2,
      icon: 'iron-man.png',
      title: 'Список рекомендаций',
      description: 'Персонализированный список рекомендаций, подобранных на основе ваших интересов',
    },
    {
      id: 3,
      icon: 'ioda.png',
      title: 'Лучшее мировое кино',
      description:
        'Кино, сериалы со сего мира, включая Европу и Азию.А также достойное российское кино',
    },
    {
      id: 4,
      icon: 'avatar-man.png',
      title: 'Месяц бесплатно',
      description:
        'Весь каталог КиноДома и все новинки кино и сериалов - бесплатно целый месяц после регистрации',
    },
  ];
}
