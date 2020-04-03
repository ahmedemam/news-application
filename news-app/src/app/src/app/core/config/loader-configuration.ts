import { NgxUiLoaderConfig } from 'ngx-ui-loader';

export class LoaderConfiguration {
  static configuration: NgxUiLoaderConfig = {
    bgsColor: 'black',
    bgsOpacity: 0.5,
    bgsPosition: 'bottom-right',
    bgsSize: 130,
    bgsType: 'pulse',
    blur: 5,
    delay: 0,
    fgsColor: 'Black',
    fgsPosition: 'center-center',
    fgsSize: 70,
    fgsType: 'pulse',
    gap: 16,
    logoPosition: 'center-center',
    logoSize: 120,
    logoUrl: 'assets/angular.png',
    masterLoaderId: 'master',
    overlayBorderRadius: '0',
    overlayColor: 'rgba(40, 40, 40, 0.8)',
    pbColor: 'black',
    pbDirection: 'ltr',
    pbThickness: 5,
    hasProgressBar: true,
    text: '',
    textColor: '#000000',
    textPosition: 'center-center',
    maxTime: -1,
    minTime: 300
  };
}
