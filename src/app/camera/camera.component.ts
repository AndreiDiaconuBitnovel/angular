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
  @Output() booleanValueChange = new EventEmitter<boolean>();

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
    this.booleanValueChange.emit(!this.showWebcam)
    this.trigger.next()
  }

  onOffWebCame(){
    this.showWebcam=!this.showWebcam
    this.booleanValueChange.emit(!this.showWebcam)

  }

  handleInitError(error:WebcamInitError){
    this.errors.push(error)
  }

  changeWebCame(directionOrDeviceId:boolean|string){
    this.nextWebcam.next(directionOrDeviceId)
  }

  handleImage(webcamImage:WebcamImage){
    this.booleanValueChange.emit(this.showWebcam)

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

}
