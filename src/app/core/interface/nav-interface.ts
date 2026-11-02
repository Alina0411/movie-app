export interface NavInterface {
  groups: NavGroup[];
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export interface NavItem {
  title: string;
  route: string;
}

export interface FooterLink {
  title: string;
  href: string;
  iconId: string;
}
