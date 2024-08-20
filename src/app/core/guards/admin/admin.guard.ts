import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  const router = inject(Router);

  return authService.verifyAdmin().pipe(
    map((isVerified) => {
      if (!isVerified) {
        router.navigate(['auth']);
      }

      return isVerified;
    }),
  );
};
