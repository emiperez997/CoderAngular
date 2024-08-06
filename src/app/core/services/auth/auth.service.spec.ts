import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { Login } from './models/Login';

describe('AuthService', () => {
  let service: AuthService;
  let router: Router;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockProvider(HttpClient), AuthService],
    });
    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should redirect when logout', async () => {
    const routerSpy = spyOn(router, 'navigate');
    service.logout();
    expect(routerSpy).toHaveBeenCalledWith(['auth']);
  });

  it('Should return false if there is no token', async () => {
    service.verifyToken().subscribe((result) => {
      expect(result).toBeFalsy();
    });
  });

  it('Should check localStorage to get token', async () => {
    const spyOnSetItem = spyOn(localStorage, 'getItem');

    service.getToken();

    expect(spyOnSetItem).toHaveBeenCalledWith('token');
  });

  it('Should call post method with correct url and data', async () => {
    const spyOnPost = spyOn(http, 'post');

    const login: Login = {
      email: 'juan@gmail.com',
      password: '123456',
    };

    service.login(login);

    expect(spyOnPost).toHaveBeenCalledWith(
      environment.apiUrl + '/auth/login',
      login,
    );
  });

  it('Should return false if user is not logged in', () => {
    const response = service.isLoggedIn();

    expect(response).toBeFalse();
  });
});
