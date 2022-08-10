import { firstValueFrom } from 'rxjs';
import { CssSelectors } from './../../constantes/css/css-selectors';
import { CssClassProperties } from './../../modelos/css-class';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { CssCorporativo } from 'src/app/constantes/css/colores-corporativos';
import { siteConstants } from 'src/app/constantes/site-constants';
import { UpdateService } from '../update-service/update.service';

@Injectable({
  providedIn: 'root'
})
export class CssService {

  private readonly styleSelector: string = "style";

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private updateService: UpdateService
  ) { }

  public setCustomStyles(): void {
    this.setAngularMaterialCustomStyle();
    this.setBootstrapCustomStyle();
    this.setCustomCssStyle();
    this.setCustomButtons();
    this.overrideBootsrapMediaQuery();
    this.writeHitboxes();
    this.defineScrollTopOffset();
  }

  private setBootstrapCustomStyle(): void {
    this.setImgFluidStyle();
  }

  private setAngularMaterialCustomStyle(): void {
    this.setMatFormFieldColor();
    this.setMatTooltipColor();
    //this.setNavbarButtonsStyle();
    //this.setMatButtons();
    //this.setMatSlider();
    //this.setBannerStyle();
    //this.setMatCardStyle();
    this.setFooterStyle();
    this.setLinksStyle();
    //this.setSidenavBackgroundColor();
    this.setMiscelaneusStyle();
  }

  private async defineScrollTopOffset(): Promise<void> {
    let headerHeight: number = await firstValueFrom(this.updateService.currentHeaderHeight);
    // Round header height
    headerHeight = Math.round(headerHeight);
    document.getElementsByTagName("body")[0].style.scrollMarginTop = headerHeight + "px";
  }

  private writeHitboxes(): void {
    if(siteConstants.writeHitboxes) {
      let hitboxClass: CssClassProperties[] = [];
      hitboxClass.push(new CssClassProperties("border", "2px solid green !important"));
      this.setCssClassIntoDocument("row", hitboxClass);
      let hitbox2Class: CssClassProperties[] = [];
      hitbox2Class.push(new CssClassProperties("border", "1px solid red !important"));
      this.setCssClassIntoDocument("col, .col-md-5, .col-lg-6, a, div", hitbox2Class);
    }
  }

  private setSidenavBackgroundColor(): void {
    let sidenavcBackgroundClass: CssClassProperties[] = [];
    sidenavcBackgroundClass.push(new CssClassProperties("-webkit-text-fill-color", "transparent"));
    sidenavcBackgroundClass.push(new CssClassProperties("-webkit-background-clip", "text"));
    sidenavcBackgroundClass.push(new CssClassProperties("background", "linear-gradient(260deg, " + this.hexToRGB(CssCorporativo.PRIMARY) + "27%, " + this.hexToRGB(CssCorporativo.ACCENT) + " 100%)" + " !important"));
    this.setCssClassIntoDocument("navbar-mobile-button", sidenavcBackgroundClass);
  }

  private setCustomButtons(): void {

    //CUSTOM PRIMARY BUTTON
    let primaryButtonClass: CssClassProperties[] = [];
    primaryButtonClass.push(new CssClassProperties("background-color", this.editColor(CssCorporativo.PRIMARY, 0)));
    primaryButtonClass.push(new CssClassProperties("border-color", this.editColor(CssCorporativo.PRIMARY, 0)));
    primaryButtonClass.push(new CssClassProperties("color", "white"));
    primaryButtonClass.push(new CssClassProperties("transition", "0.5s !important"));
    primaryButtonClass.push(new CssClassProperties("border-radius", "6px"));
    primaryButtonClass.push(new CssClassProperties("padding", "10px"));
    primaryButtonClass.push(new CssClassProperties("font-family", "Inter"));
    primaryButtonClass.push(new CssClassProperties("font-size", "1.2em"));
    primaryButtonClass.push(new CssClassProperties("text-decoration", "none"));
    primaryButtonClass.push(new CssClassProperties("white-space", "normal"));
    this.setCssClassIntoDocument(CssSelectors.PRIMARY_BUTTON, primaryButtonClass);

    //CUSTOM PRIMARY HOVER BUTTON
    let primaryHoverButtonClass: CssClassProperties[] = [];
    primaryHoverButtonClass.push(new CssClassProperties("box-shadow", "0px 0px 15px 2px " + this.getTinyColorAsRGBA(CssCorporativo.PRIMARY, 0, "0.62")));
    primaryHoverButtonClass.push(new CssClassProperties("color", "white"));
    this.setCssClassIntoDocument(CssSelectors.PRIMARY_BUTTON + ":hover", primaryHoverButtonClass);

    //CUSTOM ACCENT BUTTON
    let accentButtonClass: CssClassProperties[] = [];
    accentButtonClass.push(new CssClassProperties("background-color", this.hexToRGB(this.editColor(CssCorporativo.ACCENT, 0), "0.9") + " !important"));
    accentButtonClass.push(new CssClassProperties("border-color", this.editColor(CssCorporativo.ACCENT, 0) + " !important"));
    accentButtonClass.push(new CssClassProperties("color", "white !important"));
    accentButtonClass.push(new CssClassProperties("transition", "0.5s !important"));
    accentButtonClass.push(new CssClassProperties("border-radius", "6px"));
    accentButtonClass.push(new CssClassProperties("padding", "10px"));
    accentButtonClass.push(new CssClassProperties("font-family", "Inter"));
    accentButtonClass.push(new CssClassProperties("font-size", "1.2em"));
    accentButtonClass.push(new CssClassProperties("text-decoration", "none"));
    accentButtonClass.push(new CssClassProperties("white-space", "normal"));
    accentButtonClass.push(new CssClassProperties("transition", ".5s"));
    this.setCssClassIntoDocument(CssSelectors.ACCENT_BUTTON, accentButtonClass);

    // PSEUDOCLASS FOR ACCENTBUTTON
    let accentButtonPseudoClassTwo: CssClassProperties[] = [];
    accentButtonPseudoClassTwo.push(new CssClassProperties("box-shadow", "0 0 0 0 " + this.editColor(CssCorporativo.ACCENT, 0) + " !important"));
    this.setCssClassIntoDocument(CssSelectors.ACCENT_BUTTON + ":active:after", accentButtonPseudoClassTwo);

    // PSEUDOCLASS FOR ACCENTBUTTON
    let accentButtonPseudoClassOne: CssClassProperties[] = [];
    accentButtonPseudoClassOne.push(new CssClassProperties("box-shadow", "0 0 10px 20px " + this.editColor(CssCorporativo.ACCENT, 0) + " !important"));
    this.setCssClassIntoDocument(CssSelectors.ACCENT_BUTTON + ":after", accentButtonPseudoClassOne);

    // PSEUDOCLASS FOR PRIMARYBUTTON
    let primaryButtonPseudoClassTwo: CssClassProperties[] = [];
    primaryButtonPseudoClassTwo.push(new CssClassProperties("box-shadow", "0 0 0 0 " + this.editColor(CssCorporativo.PRIMARY, 0) + " !important"));
    this.setCssClassIntoDocument(CssSelectors.PRIMARY_BUTTON + ":active:after", primaryButtonPseudoClassTwo);

    // PSEUDOCLASS FOR PRIMARYBUTTON
    let primaryButtonPseudoClassOne: CssClassProperties[] = [];
    primaryButtonPseudoClassOne.push(new CssClassProperties("box-shadow", "0 0 10px 20px " + this.editColor(CssCorporativo.PRIMARY, 0) + " !important"));
    this.setCssClassIntoDocument(CssSelectors.PRIMARY_BUTTON + ":after", primaryButtonPseudoClassOne);

    //CUSTOM ACCENT HOVER BUTTON
    let accentHoverButtonClass: CssClassProperties[] = [];
    accentHoverButtonClass.push(new CssClassProperties("box-shadow", "0px 0px 15px 2px " + this.getTinyColorAsRGBA(CssCorporativo.ACCENT, 0, "0.62")));
    this.setCssClassIntoDocument(CssSelectors.ACCENT_BUTTON + ":hover", accentHoverButtonClass);

    // CUSTOM ACCENT LIGHT BUTTON
    let accentLightButtonClass: CssClassProperties[] = [];
    let accentLightColor = this.getTinyColorAsRGBA(CssCorporativo.ACCENT, -10, "1");
    accentLightButtonClass.push(new CssClassProperties("background-color", accentLightColor + " !important"));
    accentLightButtonClass.push(new CssClassProperties("border-color", this.editColor(CssCorporativo.ACCENT, 0) + " !important"));
    accentLightButtonClass.push(new CssClassProperties("color", "white !important"));
    accentLightButtonClass.push(new CssClassProperties("transition", "0.5s !important"));
    accentLightButtonClass.push(new CssClassProperties("border-radius", "6px"));
    accentLightButtonClass.push(new CssClassProperties("padding", "10px"));
    accentLightButtonClass.push(new CssClassProperties("font-family", "Inter"));
    accentLightButtonClass.push(new CssClassProperties("font-size", "1.2em"));
    accentLightButtonClass.push(new CssClassProperties("text-decoration", "none"));
    accentLightButtonClass.push(new CssClassProperties("white-space", "normal"));
    this.setCssClassIntoDocument("custom-accent-light-button", accentLightButtonClass);


    // CUSTOM NAVBAR BUTTON
    let navbarCustomButton: CssClassProperties[] = [];
    navbarCustomButton.push(new CssClassProperties("color", this.hexToRGB(CssCorporativo.PRIMARY) + " !important"));
    navbarCustomButton.push(new CssClassProperties("transition", "0.5s !important"));
    navbarCustomButton.push(new CssClassProperties("border-radius", "6px"));
    navbarCustomButton.push(new CssClassProperties("padding", "10px"));
    navbarCustomButton.push(new CssClassProperties("font-family", "Inter"));
    navbarCustomButton.push(new CssClassProperties("font-size", "1.2em"));
    navbarCustomButton.push(new CssClassProperties("text-decoration", "none"));
    navbarCustomButton.push(new CssClassProperties("white-space", "normal"));
    this.setCssClassIntoDocument(CssSelectors.NAVBAR_BUTTON, navbarCustomButton);

    // CUSTOM NAVBAR HOVER BUTTON
    let navbarButtonHoverClass: CssClassProperties[] = [];
    navbarButtonHoverClass.push(new CssClassProperties("color", this.hexToRGB(CssCorporativo.PRIMARY) + " !important"));
    this.setCssClassIntoDocument(CssSelectors.NAVBAR_BUTTON + ":hover", navbarButtonHoverClass);

    // GLOW PRIMARY
    let primaryGlowClass: CssClassProperties[] = [];
    primaryGlowClass.push(new CssClassProperties("box-shadow", "5px 2px 38px -1px " + this.hexToRGB(CssCorporativo.PRIMARY, "0.62") + " !important"));
    this.setCssClassIntoDocument(CssSelectors.PRIMARY_GLOW, primaryGlowClass);

    // GLOW ACCENT
    let accentGlowClass: CssClassProperties[] = [];
    accentGlowClass.push(new CssClassProperties("box-shadow", "5px 2px 38px -1px " + this.hexToRGB(CssCorporativo.ACCENT, "0.62") + " !important"));
    this.setCssClassIntoDocument(CssSelectors.ACCENT_GLOW, accentGlowClass);

    // WHITE GLOW
    let whiteGlowClass: CssClassProperties[] = [];
    whiteGlowClass.push(new CssClassProperties("box-shadow", "5px 2px 38px -1px rgba(255,255,255,0.3) !important"));
    this.setCssClassIntoDocument("glow-white", whiteGlowClass);

    // WHITE TEXT GLOW
    let whiteTextGlowClass: CssClassProperties[] = [];
    whiteTextGlowClass.push(new CssClassProperties("text-shadow", "0px 0px 18px rgba(255,255,255,0.5) !important"));
    this.setCssClassIntoDocument("text-glow-white", whiteTextGlowClass);

    // BLACK TEXT GLOW
    let blackGlowClass: CssClassProperties[] = [];
    blackGlowClass.push(new CssClassProperties("text-shadow", "0px 0px 18px rgba(0,0,0,1) !important"));
    this.setCssClassIntoDocument("text-glow-black", blackGlowClass);

    // ACCENT TEXT GLOW
    let accentTextGlowClass: CssClassProperties[] = [];
    accentTextGlowClass.push(new CssClassProperties("text-shadow", "0px 0px 18px " + this.hexToRGB(CssCorporativo.ACCENT, "0.62") + " !important"));
    this.setCssClassIntoDocument("text-glow-accent", accentTextGlowClass);

    // PRIMARY TEXT GLOW
    let primaryTextGlowClass: CssClassProperties[] = [];
    primaryTextGlowClass.push(new CssClassProperties("text-shadow", "0px 0px 18px " + this.hexToRGB(CssCorporativo.PRIMARY, "0.62") + " !important"));
    this.setCssClassIntoDocument("text-glow-primary", primaryTextGlowClass);

  }

  private setCustomCssStyle(): void {

    //HEADER WITH BACKGROUND + BORDERS ON BOTH SIDES
    let headerWithBothBorders: CssClassProperties[] = [];
    headerWithBothBorders.push(new CssClassProperties("background-color", CssCorporativo.PRIMARY + " !important"));
    headerWithBothBorders.push(new CssClassProperties("border-radius", "5px !important"));
    headerWithBothBorders.push(new CssClassProperties("border-left", "15px solid " + CssCorporativo.ACCENT + " !important"));
    headerWithBothBorders.push(new CssClassProperties("border-right", "15px solid " + CssCorporativo.ACCENT + " !important"));
    this.setCssClassIntoDocument(CssSelectors.HEADER_ACCENT_BACKGROUND_BOTH_BORDER, headerWithBothBorders);

    //HEADER WITH BACKGROUND + BORDERS ON BOTH SIDES
    let headerWithStartBorder: CssClassProperties[] = [];
    headerWithStartBorder.push(new CssClassProperties("background-color", CssCorporativo.PRIMARY + " !important"));
    headerWithStartBorder.push(new CssClassProperties("border-radius", "5px !important"));
    headerWithStartBorder.push(new CssClassProperties("border-left", "15px solid " + CssCorporativo.ACCENT + " !important"));
    this.setCssClassIntoDocument(CssSelectors.HEADER_ACCENT_BACKGROUND_START_BORDER, headerWithStartBorder);

    //GRADIENT WITH ANIMATION
    let gradientBackgroundClass: CssClassProperties[] = [];
    gradientBackgroundClass.push(new CssClassProperties("background", "linear-gradient(260deg, " + this.hexToRGB(CssCorporativo.PRIMARY, "0.78") + "27%, " + this.hexToRGB(CssCorporativo.ACCENT, "0.86") + " 100%)" + " !important"));
    this.setCssClassIntoDocument("gradient::before", gradientBackgroundClass);

    // pattern-banner
    let patternBannerClass: CssClassProperties[] = [];
    patternBannerClass.push(new CssClassProperties("background", this.hexToRGB(CssCorporativo.ACCENT, "1") + " !important"));
    //patternBannerClass.push(new CssClassProperties("background", "linear-gradient(260deg, " + this.hexToRGB(CssCorporativo.PRIMARY, "1") + "34%, " + this.hexToRGB(CssCorporativo.ACCENT, "1") + " 100%)" + " !important"));
    this.setCssClassIntoDocument("pattern-banner", patternBannerClass);

    // pattern-banner-inverted
    let patternBannerInvertedClass: CssClassProperties[] = [];
    patternBannerInvertedClass.push(new CssClassProperties("background", this.hexToRGB(CssCorporativo.PRIMARY, "1") + " !important"));
    //patternBannerInvertedClass.push(new CssClassProperties("background", "linear-gradient(260deg, " + this.hexToRGB(CssCorporativo.ACCENT, "1") + "34%, " + this.hexToRGB(CssCorporativo.PRIMARY, "1") + " 100%)" + " !important"));
    this.setCssClassIntoDocument("pattern-banner-inverted", patternBannerInvertedClass);

    // Selection color
    /*let selectionBackgroundColor: CssClassProperties[] = [];
    selectionBackgroundColor.push(new CssClassProperties("background", this.hexToRGB(CssCorporativo.ACCENT, "0.5") + " !important"));
    this.setCssClassIntoDocument("::selection", selectionBackgroundColor, true);*/

    //BACKGROUND COLOR
    let bgCustomBackground: CssClassProperties[] = [];
    bgCustomBackground.push(new CssClassProperties("background", this.hexToRGB(CssCorporativo.PRIMARY) + " !important"));
    this.setCssClassIntoDocument(CssSelectors.PRIMARY_BACKGROUND, bgCustomBackground);

    //BACKGROUND ACCENT COLOR
    let bgCustomBackgroundAccent: CssClassProperties[] = [];
    bgCustomBackgroundAccent.push(new CssClassProperties("background", this.hexToRGB(CssCorporativo.ACCENT) + " !important"));
    this.setCssClassIntoDocument(CssSelectors.ACCENT_BACKGROUND, bgCustomBackgroundAccent);

    //BACKGROUND ERROR COLOR
    let bgCustomBackgroundError: CssClassProperties[] = [];
    bgCustomBackgroundError.push(new CssClassProperties("background", this.hexToRGB(CssCorporativo.ERROR) + " !important"));
    this.setCssClassIntoDocument(CssSelectors.ERROR_BACKGROUND, bgCustomBackgroundError);

    //BACKGROUND WITH LINEAR GRADIENT
    let bgCustomBackgroundLinearGradient: CssClassProperties[] = [];
    bgCustomBackgroundLinearGradient.push(new CssClassProperties("background", "linear-gradient(260deg, " + this.hexToRGB(CssCorporativo.ACCENT, "1") + "34%, " + this.hexToRGB(CssCorporativo.PRIMARY, "1") + " 100%)" + " !important"));
    this.setCssClassIntoDocument(CssSelectors.PRIMARY_BACKGROUND_LINEAR_GRADIENT, bgCustomBackgroundLinearGradient);

    //PRIMARY TEXT COLOR
    let customPrimaryTextColor: CssClassProperties[] = [];
    customPrimaryTextColor.push(new CssClassProperties("color", this.hexToRGB(CssCorporativo.PRIMARY) + " !important"));
    this.setCssClassIntoDocument(CssSelectors.TEXT_PRIMARY, customPrimaryTextColor);

    //ACCENT TEXT COLOR
    let customAccentTextColor: CssClassProperties[] = [];
    customAccentTextColor.push(new CssClassProperties("color", this.hexToRGB(CssCorporativo.ACCENT) + " !important"));
    this.setCssClassIntoDocument(CssSelectors.TEXT_ACCENT, customAccentTextColor);

    //ERROR TEXT COLOR
    let customErrorTextColor: CssClassProperties[] = [];
    customErrorTextColor.push(new CssClassProperties("color", this.hexToRGB(CssCorporativo.ERROR) + " !important"));
    this.setCssClassIntoDocument(CssSelectors.TEXT_ERROR, customErrorTextColor);

  }

  private setImgFluidStyle(): void {
    let imgFluidClass: CssClassProperties[] = [];
    imgFluidClass.push(new CssClassProperties("border-left", "10px solid " + CssCorporativo.ACCENT));
    imgFluidClass.push(new CssClassProperties("border-radius", "10px"));
    this.setCssClassIntoDocument("img-fluid", imgFluidClass);
  }

  private setLinksStyle(): void {
    //link underline animation color
    let backgroundColorLinkClass: CssClassProperties[] = [];
    let animationColor: string = this.getTinyColorAsRGBA(CssCorporativo.ACCENT, 50, "1");
    backgroundColorLinkClass.push(new CssClassProperties("background-color", animationColor + "!important"));
    this.setCssClassIntoDocument("link::before, .link::after", backgroundColorLinkClass);
    //link underline inverted color animation
    let backgroundInvertedColorLinkClass: CssClassProperties[] = [];
    let animationInvertedColor: string = this.getTinyColorAsRGBA(CssCorporativo.PRIMARY, 50, "1");
    backgroundInvertedColorLinkClass.push(new CssClassProperties("background-color", animationInvertedColor + "!important"));
    this.setCssClassIntoDocument("linkInverted::before, .linkInverted::after", backgroundInvertedColorLinkClass);
    // link multi line animation
    let multiLineLinkAnimationClass: CssClassProperties[] = [];
    let animationMultiLineColor: string = this.getTinyColorAsRGBA(CssCorporativo.ACCENT, 50, "1");
    multiLineLinkAnimationClass.push(new CssClassProperties("background-image", "linear-gradient(" + animationMultiLineColor + ", " + animationMultiLineColor + ") !important"));
    this.setCssClassIntoDocument("multiline-link", multiLineLinkAnimationClass);
  }

  private setMiscelaneusStyle(): void {
    //Mat ripple color
    let matRippleClass: CssClassProperties[] = [];
    let matRippleColor: string = this.getTinyColorAsRGBA(CssCorporativo.MAT_RIPPLE_COLOR, 0, "0.3");
    matRippleClass.push(new CssClassProperties("background-color", matRippleColor + " !important"));
    this.setCssClassIntoDocument("mat-ripple-element", matRippleClass);
    //UNDERLINE_AFTER_DECORATOR
    let underlineAfterDecoratorClass: CssClassProperties[] = [];
    underlineAfterDecoratorClass.push(new CssClassProperties("border", "3px solid" + CssCorporativo.PRIMARY + " !important"));
    this.setCssClassIntoDocument(CssSelectors.UNDERLINE_AFTER_DECORATOR + "::after", underlineAfterDecoratorClass);
    //UNDERLINE_BEFORE_DECORATOR
    let underlineBeforeDecoratorClass: CssClassProperties[] = [];
    underlineBeforeDecoratorClass.push(new CssClassProperties("border", "3px solid" + CssCorporativo.PRIMARY + " !important"));
    this.setCssClassIntoDocument(CssSelectors.UNDERLINE_BEFORE_DECORATOR + "::before", underlineBeforeDecoratorClass);

    //TITLE UNDERLINE PRIMARY
    let underlineTitlePrimaryClass: CssClassProperties[] = [];
    let titleUnderlinePrimaryColor: string = this.getTinyColorAsRGBA(CssCorporativo.PRIMARY, 50, "1");
    underlineTitlePrimaryClass.push(new CssClassProperties("background-image", "linear-gradient(" + titleUnderlinePrimaryColor + ", " + titleUnderlinePrimaryColor + ") !important"));
    this.setCssClassIntoDocument(CssSelectors.UNDERLINE_TITLE_PRIMARY , underlineTitlePrimaryClass);

    //TITLE UNDERLINE ACCENT
    let underlineTitleClass: CssClassProperties[] = [];
    let titleUnderlineColor: string = this.getTinyColorAsRGBA(CssCorporativo.ACCENT, 50, "1");
    underlineTitleClass.push(new CssClassProperties("background-image", "linear-gradient(" + titleUnderlineColor + ", " + titleUnderlineColor + ") !important"));
    this.setCssClassIntoDocument(CssSelectors.UNDERLINE_TITLE , underlineTitleClass);
  }

  private setMatCardStyle(): void {
    let matCardHeaderTextClass: CssClassProperties[] = [];
    let matCardSubtitleTextClass: CssClassProperties[] = [];
    let matCardFirstChildClass: CssClassProperties[] = [];
    let matCardTitleTextClass: CssClassProperties[] = [];
    let backgroundHeaderColor: string = this.getTinyColorAsRGBA(CssCorporativo.ACCENT, 0, "1");
    matCardHeaderTextClass.push(new CssClassProperties("background-color", backgroundHeaderColor + " !important"));
    matCardHeaderTextClass.push(new CssClassProperties("margin", "0px" + " !important"));
    matCardHeaderTextClass.push(new CssClassProperties("padding-top", "16px" + " !important"));
    matCardHeaderTextClass.push(new CssClassProperties("padding-left", "16px" + " !important"));
    matCardHeaderTextClass.push(new CssClassProperties("width", "100%" + " !important"));
    matCardHeaderTextClass.push(new CssClassProperties("color", "white" + " !important"));
    matCardHeaderTextClass.push(new CssClassProperties("border-bottom", "3px solid white" + " !important"));
    matCardSubtitleTextClass.push(new CssClassProperties("color", "white"));
    matCardTitleTextClass.push(new CssClassProperties("padding-right", "15px"));
    matCardFirstChildClass.push(new CssClassProperties("margin-top", "0px !important"));

    this.setCssClassIntoDocument("mat-card-image:first-child", matCardFirstChildClass);
    this.setCssClassIntoDocument("mat-card-title", matCardTitleTextClass);
    this.setCssClassIntoDocument("mat-card-header-text", matCardHeaderTextClass);
    this.setCssClassIntoDocument("mat-card-subtitle", matCardSubtitleTextClass);
  }

  private setBannerStyle(): void {
    let backgroundBannerClass: CssClassProperties[] = [];
    let bannerLinkClass: CssClassProperties[] = [];
    let backgoundColorBanner: string = this.getTinyColorAsRGBA(CssCorporativo.BANNER_BACKGROUND, 0, CssCorporativo.BANNER_BACKGROUND_ALPHA);
    backgroundBannerClass.push(new CssClassProperties("background-color", backgoundColorBanner + " !important"));
    backgroundBannerClass.push(new CssClassProperties("color", CssCorporativo.BANNER_TEXT + " !important"));
    bannerLinkClass.push(new CssClassProperties("color", CssCorporativo.BANNER_LINK_TEXT));
    bannerLinkClass.push(new CssClassProperties("display", "inline-flex" + " !important"));

    this.setCssClassIntoDocument(CssSelectors.BANNER_BACKGROUND, backgroundBannerClass);
    this.setCssClassIntoDocument(CssSelectors.BANNER_LINK, bannerLinkClass);
  }

  private setFooterStyle(): void {
    let footerBelowClass: CssClassProperties[] = [];
    footerBelowClass.push(new CssClassProperties("background-color", this.editColor(CssCorporativo.PRIMARY, 0) + " !important"));
    this.setCssClassIntoDocument(CssSelectors.FOOTER_BACKGROUND, footerBelowClass);
  }

  private setMatFormFieldColor(): void {
    let selectedOptionMatSelectClass: CssClassProperties[] = [];
    let matFormErrorClass: CssClassProperties[] = [];
    let matFormFieldBackgroundClass: CssClassProperties[] = [];
    let matFormFieldUnderlineClass: CssClassProperties[] = [];
    let matFormFieldLabelClass: CssClassProperties[] = [];
    let matFormFieldOutLineColorClass: CssClassProperties[] = [];
    let matFormFieldCheckBoxColorClass: CssClassProperties[] = [];

    let matFormFieldBackgroundColor: string = this.getTinyColorAsRGBA(CssCorporativo.PRIMARY, 50, "0.1");

    selectedOptionMatSelectClass.push(new CssClassProperties("color", "white"));
    selectedOptionMatSelectClass.push(new CssClassProperties("background", "linear-gradient(260deg, " + this.hexToRGB(CssCorporativo.ACCENT, "1") + "0%, " + this.hexToRGB(CssCorporativo.PRIMARY, "1") + " 100%)" + " !important"));

    selectedOptionMatSelectClass.push(new CssClassProperties("font-weight", "bolder"));
    matFormErrorClass.push(new CssClassProperties("font-size", "15px"));
    matFormErrorClass.push(new CssClassProperties("font-weight", "normal"));
    matFormFieldBackgroundClass.push(new CssClassProperties("background-color", matFormFieldBackgroundColor));
    matFormFieldUnderlineClass.push(new CssClassProperties("background-color", CssCorporativo.MAT_FORM_FIELD_UNDERLINE + " !important"));
    matFormFieldLabelClass.push(new CssClassProperties("color", CssCorporativo.PRIMARY + " !important"));
    matFormFieldOutLineColorClass.push(new CssClassProperties("color", CssCorporativo.ACCENT + " !important"));
    matFormFieldCheckBoxColorClass.push(new CssClassProperties("background", CssCorporativo.ACCENT + " !important"));

    this.setCssClassIntoDocument("mat-primary .mat-option.mat-selected:not(.mat-option-disabled)", selectedOptionMatSelectClass);
    this.setCssClassIntoDocument("mat-error", matFormErrorClass);
    this.setCssClassIntoDocument("mat-form-field-ripple", matFormFieldUnderlineClass);
    this.setCssClassIntoDocument("mat-form-field-label", matFormFieldLabelClass);
    this.setCssClassIntoDocument("mat-form-field-appearance-fill .mat-form-field-flex", matFormFieldBackgroundClass);
    this.setCssClassIntoDocument("mat-form-field-appearance-outline .mat-form-field-outline-thick", matFormFieldOutLineColorClass);
    this.setCssClassIntoDocument("mat-checkbox-checked:not(.mat-checkbox-disabled).mat-accent .mat-ripple-element, .mat-checkbox:active:not(.mat-checkbox-disabled).mat-accent .mat-ripple-element", matFormFieldCheckBoxColorClass);
    this.setCssClassIntoDocument("mat-checkbox-indeterminate.mat-accent .mat-checkbox-background, .mat-checkbox-checked.mat-accent .mat-checkbox-background", matFormFieldCheckBoxColorClass);
  }

  private setMatTooltipColor(): void {
    let cssClassData: CssClassProperties[] = [];
    let matToolTipBackgroundTinyColor: string = this.getTinyColorAsRGBA(CssCorporativo.MAT_TOOLTIP_BACKGROUND, -30, CssCorporativo.MAT_TOOLTIP_BACKGROUND_ALPHA);

    cssClassData.push(new CssClassProperties("font-size", CssCorporativo.MAT_TOOLTIP_FONT_SIZE + " !important"));
    cssClassData.push(new CssClassProperties("color", CssCorporativo.MAT_TOOLTIP_TEXT + " !important"));
    cssClassData.push(new CssClassProperties("background-color", matToolTipBackgroundTinyColor + " !important"));
    this.setCssClassIntoDocument("mat-tooltip", cssClassData);
  }

  private setNavbarButtonsStyle(): void {
    let buttonNavbarClass: CssClassProperties[] = [];
    let buttonNavbarHoverClass: CssClassProperties[] = [];

    let tinyBackgroundColor: string = this.getTinyColorAsRGBA(CssCorporativo.NAVBAR_BUTTON_SELECTED_BACKGROUND, 0, CssCorporativo.NAVBAR_BUTTON_SELECTED_BACKGROUND_ALPHA);

    buttonNavbarClass.push(new CssClassProperties("color", CssCorporativo.NAVBAR_BUTTON_COLOR));
    buttonNavbarHoverClass.push(new CssClassProperties("background-color", tinyBackgroundColor));
    buttonNavbarHoverClass.push(new CssClassProperties("color", CssCorporativo.NAVBAR_BUTTON_COLOR));

    this.setCssClassIntoDocument("button-navbar", buttonNavbarClass);
    this.setCssClassIntoDocument("button-navbar:hover", buttonNavbarHoverClass);
  }


  private setMatSlider(): void {
    let checkedDotClass: CssClassProperties[] = [];
    checkedDotClass.push(new CssClassProperties("background-color", CssCorporativo.ACCENT + " !important"));

    let bodyClass: CssClassProperties[] = [];
    let backgroundTinyColor: string = this.getTinyColorAsRGBA(CssCorporativo.ACCENT, 70, "0.7");
    bodyClass.push(new CssClassProperties("background-color", backgroundTinyColor + " !important"));

    this.setCssClassIntoDocument("mat-slide-toggle.mat-checked .mat-slide-toggle-thumb", checkedDotClass);
    this.setCssClassIntoDocument("mat-slide-toggle.mat-checked .mat-slide-toggle-bar", bodyClass);
  }

  private getTinyColorAsRGBA(hexColor: string, amount: number, alpha: string) {
    return this.hexToRGB(this.editColor(hexColor, amount), alpha);
  }

  private setCssClassIntoDocument(className: string, propertiesWithValue: CssClassProperties[], pseudoClass?: Boolean) {
    let classInString: string;
    if(pseudoClass) {
      classInString = className + "{";
    } else {
      classInString = "." + className + "{";
    }
    for(let propertyWithValue of propertiesWithValue) {
      classInString += propertyWithValue.property + ": " + propertyWithValue.value + ";";
    }
    classInString += "}";
    this.setTagInHeader(classInString, this.styleSelector);
  }

  private overrideBootsrapMediaQuery(): void {
    let mediaQueryForTabletFix: string = "@media (min-width: 768px) {.container-md, .container-sm, .container {max-width: 1320px !important;}}";
    this.setTagInHeader(mediaQueryForTabletFix, this.styleSelector);
  }

  private setTagInHeader(content: string, selector: string): void {
    let element: HTMLStyleElement  = this.document.createElement(selector) as HTMLStyleElement;
    element.innerHTML = content;
    let header: HTMLHeadElement = document.getElementsByTagName("HEAD")[0] as HTMLHeadElement;
    header.appendChild(element) ;
  }

  public editColor(color: string, amount: number) {
    return '#' + color.replace(/^#/, '').replace(/../g, color =>
      ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
  }

  private hexToRGB(hex: string, alpha?: string) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    if (alpha) {
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    return `rgb(${r}, ${g}, ${b})`;
  }

}
