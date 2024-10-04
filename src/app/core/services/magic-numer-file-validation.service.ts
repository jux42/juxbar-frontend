import {Injectable} from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MagicNumerFileValidationService {

  private readonly magicNumbers: { [key: string]: string } = {
    "89504E47": "image/png",
    "FFD8FF": "image/jpeg",
    "47494638": "image/gif",
    "52494646": "image/webp"
  };

  constructor() {
  }

  validateFile(file: File): Observable<boolean> {
    const fileReader = new FileReader();

    return new Observable<boolean>((observer) => {
      fileReader.onloadend = () => {
        if (fileReader.result instanceof ArrayBuffer) {
          const arr = new Uint8Array(fileReader.result);
          let header = this.getHeader(arr);

          if (header === "52494646" && this.isWebP(arr)) {
            observer.next(true);
            observer.complete();
            return;
          }

          if (this.magicNumbers[header]) {
            observer.next(true);
          } else {
            observer.next(false);
          }
          observer.complete();
        } else {
          observer.error("an error occured");
        }
      };

      fileReader.readAsArrayBuffer(file.slice(0, 12));
    });
  }

  private getHeader(arr: Uint8Array): string {
    let header = "";
    for (let i = 0; i < 4; i++) {
      header += arr[i].toString(16).toUpperCase().padStart(2, "0");
    }
    return header;
  }

  private isWebP(arr: Uint8Array): boolean {
    const webpSignature = String.fromCharCode(...arr.slice(8, 12));
    return webpSignature === "WEBP";
  }
}
