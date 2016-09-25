///<reference path="./../typings/main.d.ts"/>
import 'reflect-metadata'
import 'es6-shim'
import 'rxjs'
import 'zone.js/dist/zone'
import 'zone.js/dist/long-stack-trace-zone'
import { bootstrap } from '@angular/platform-browser-dynamic'
import {HTTP_PROVIDERS} from '@angular/http'
import {provide} from '@angular/core'
import {AppComponent} from './main'

let universalDeps = [
    HTTP_PROVIDERS,
    provide('api', {useValue: 'http://localhost:3000/'})
]

bootstrap(AppComponent, universalDeps)
