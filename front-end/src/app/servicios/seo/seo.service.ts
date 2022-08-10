import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Type } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { PagesId } from 'src/app/constantes/pages';
import { siteConstants } from 'src/app/constantes/site-constants';
import { StringUtilsService } from '../string-utils/string-utils.service';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  private routeListOfInvertedTitleStructure: string[] = [PagesId.LOGIN];

  constructor(
    @Inject(DOCUMENT) private doc,
    private title: Title,
    private meta: Meta,
    private stringUtilsService: StringUtilsService
  ) {

   }

  // Method that check if given string is in routeListOfInvertedTitleStructure
  public isInRouteList(routeToCheck: string): boolean {
    //console.log("Checking if " + routeToCheck + "is in " + this.routeListOfInvertedTitleStructure);
    routeToCheck = this.stringUtilsService.replaceAll(routeToCheck, '/', '');
    return this.routeListOfInvertedTitleStructure.includes(routeToCheck);
  }

/*public setTitle(newTitle: string): void {
    let currentRoute: string = this.router.url;
    if(this.isInRouteList(currentRoute)) {
      this.title.setTitle(`${siteConstants.name} | ${newTitle}`);
    } else {
      //console.log(newTitle.length);
      this.title.setTitle(`${newTitle} | ${siteConstants.name}`);
    }
  }*/

  public setTitle(title: string): void {
    this.title.setTitle(title);
  }

  public setFacebookImageOpenGraphTags(image: string, width: string, height: string, mimeType: string, alt: string): void {
    /*this.setMetaTag('og:image', image);
    this.setMetaTag('og:image:width', width);
    this.setMetaTag('og:image:height', height);
    this.setMetaTag('og:image:type', mimeType);
    this.setMetaTag('og:image:alt', alt);
    this.setMetaTag("og:image:secure_url", image);
    this.setMetaTag("fb:app_id", siteConstants.facebookAppId.toString());*/
  }

  public setFacebookOpenGraphTags(title: string, description: string, url: string): void {
    this.setMetaTag('og:title', title);
    this.setMetaTag('og:description', description);
    this.setMetaTag('og:url', url);
    this.setMetaTag('og:type', "website");
    this.setMetaTag('og:locale', "es_ES");
  }

  public setTwitterCardTags(title: string, description: string, image: string, url: string): void {
    this.setMetaTag('twitter:card', 'summary');
    this.setMetaTag('twitter:title', title);
    this.setMetaTag('twitter:description', description);
    this.setMetaTag('twitter:image', image);
    this.setMetaTag('twitter:url', url);
  }

  public setDescription(description: string): void {
    this.removeMetaTag("description");
    this.setMetaTag('description', description);
  }

  public getTitle(): void {
    this.title.getTitle();
  }

  public setMetaTag(tagName: string, tagValue: string): void {
    if(tagName.startsWith("og:") || tagName.startsWith("fb:")) {
      this.meta.updateTag({ property: tagName, content: tagValue });
    } else {
      this.meta.addTag({name: tagName, content: tagValue});
    }
  }

  public removeMetaTag(tagName: string): void {
    //this.meta.removeTag(`name="${tagName}"`);
    this.meta.removeTag('name="' + tagName + '"');
  }

  public checkTagExists(tagName: string): boolean {
    return this.meta.getTag('name="' + tagName + '"') !== null;
  }

  private sanitizeAndRemoveHTMLTags(jsonldObject: string) {
    let sanitizedString: string = jsonldObject.replace(/<(.|\n)*?>/g, '');
    return sanitizedString;
  }

  public setCanonicalUrl(canonicalUrl: string): void {
    let link: HTMLLinkElement = this.doc.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', canonicalUrl);
    this.doc.head.appendChild(link);
  }

  private getFilename(url: string, extension: boolean): string {
    let splittedUrl: string[] = url.split("/");
    if(extension) {
      return splittedUrl[splittedUrl.length - 1];
    }
    return splittedUrl[splittedUrl.length - 1].split(".")[0];
  }

}

