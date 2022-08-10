import { CategoriesLocalization, ServicesLocalization, QualitiesLocalization, PagesLocalization, MiscelaneousLocalization, ButtonsLocalization, TooltipsLocalization, ValidationsLocalization, DialogsLocalization, FooterLocalization, GrantsLocalization, ProductosLocalization } from './model-localization';

export interface LanguageStrings {
  productosLocalization: ProductosLocalization;
  serviceLocalization: ServicesLocalization;
  categoryLocalization: CategoriesLocalization;
  qualitiesLocalization: QualitiesLocalization;
  pagesLocalization: PagesLocalization;
  miscelaneousLocalization: MiscelaneousLocalization;
  buttonsLocalization: ButtonsLocalization;
  tooltipsLocalization: TooltipsLocalization;
  validationsLocalization: ValidationsLocalization;
  dialogsLocalization: DialogsLocalization;
  footerLocalization: FooterLocalization;
  grantsLocalization: GrantsLocalization[];
}
