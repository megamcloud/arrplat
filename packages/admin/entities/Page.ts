export interface BasePage {
  id: number
  username: string
  headImage: string
  intro: string
  phoneNumber: number
  sections: PageSection[]
  metas: PageMeta
}

export default interface PCPage extends BasePage {

}

export interface MobilePage extends BasePage {

}

export interface PageMeta {
  title: string
  description: string
  keywords: string[]
}

export interface PageSection {

}
