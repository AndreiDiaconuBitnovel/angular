import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {TitleStrategy} from '@angular/router';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthServiceExtensionService } from '../services/authServiceExtension/auth-service-extension.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css'],
})
export class CameraComponent implements OnInit {
  isCmaeraExist: boolean = true;
  showWebcam: boolean = true;
  @Output() getPicture = new EventEmitter<WebcamImage>();

  imageUrl:string=''

  errors: WebcamInitError[] = [];

  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean | string> = new Subject<
    boolean | string
  >();

  constructor(
    private authService: AuthService,
    private authExtensionService: AuthServiceExtensionService
  ) {}
  ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs().then(
      (mediaDevices: MediaDeviceInfo[]) => {
        this.isCmaeraExist = mediaDevices && mediaDevices.length > 0;
      }
    );
  }

  takeSnapshot():void{
    this.trigger.next()
  }

  onOffWebCame(){
    this.showWebcam=!this.showWebcam
  }

  handleInitError(error:WebcamInitError){
    this.errors.push(error)
  }

  changeWebCame(directionOrDeviceId:boolean|string){
    this.nextWebcam.next(directionOrDeviceId)
  }

  handleImage(webcamImage:WebcamImage){
    this.getPicture.emit(webcamImage)
    this.showWebcam=false
  }

   get triggerObservable():Observable<void>{
    return this.trigger.asObservable()
  }

  get nextWebcamObservable():Observable<boolean|string>
  {
    return this.nextWebcam.asObservable();
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    // this.authService.register(file,'usernamePuternic', 'andrei.diaconu@bitnovel.com').subscribe({
    //   next: (res) => {
    //     console.log(res)
    //   },
    //   error: (err) => {
    //     console.log('Error Inserting Document :', err);
    //   },
    // });

    this.authExtensionService.login(file, 'usernamePuternic').subscribe({
      next: (res) => {
        console.log('worked')
        console.log(res);
      },
      error: (err) => {
        console.log('Error :', err);
      },
    });
  }
}
