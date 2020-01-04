export default interface App {
  id: number,
  name: string,
  icon: string,
  homeRoute: string,
  link: string,
  menus: AppMenu[],
}

export interface AppMenu {
  id: number,
  name: string,
  icon: string,
  route: string,
  link: string,
  children: AppMenu[],
}
