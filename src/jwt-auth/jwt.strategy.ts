import { jwtConstants } from './jwt-constants';
import { Inject, Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

const JwtSecretId = Symbol('JwtSecretId');
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(JwtSecretId) jwtSecret: string
  ) {
    const strategyOptions: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.JWT_SECRET,
    };
    super(strategyOptions);
  }

  /**
   * Adiciona o payload no request.user (request.user = {...payload})
   * 
   * É preferivel pegar o payload pelo controller e passar para os serviços que irá utilizar,
   * como mostrado a baixo.
   * 
   * ```
   *   import {Request} from 'express';
   *   async foo(
   *     @Body() body: any,
   *     @Req() request: Request,
   *   ){ 
   *     return request.user;
   *   }
   * ```
   * 
   * É possivel pegar o request pelo service, porém não é recomendado como explicado a baixo.
   * (https://docs.nestjs.com/fundamentals/injection-scopes#injection-scopes)
   * ```
   *   @Injectable({scope: Scope.REQUEST})
   *   export class FooService {
   *     constructor(@Inject(REQUEST) private request: Request) {}
   *     ...
   *   }
   * ```
   * O problema de utilizar a injeção por request-scope é que, por padrão as classes são singleton, 
   *  e quando utilizado o request-scoped cria-se uma nova instancia para cada request
   * ("new instance of the provider is created exclusively for each incoming request.
   *  The instance is garbage-collected after the request has completed processing.")
   * Além disso, todas as classes que injetam esse classe também param de se tornar singleton:
   * ("Imagine the following dependency graph: CatsController <- CatsService <- CatsRepository. 
   *  If CatsService is request-scoped (and the others are default singletons), 
   *  the CatsController will become request-scoped as it is dependent on the injected service. 
   *  The CatsRepository, which is not dependent, would remain singleton-scoped.")
   * Afetando diretamente a performace.
   * @param payload
   */
  async validate(payload: any) {
    return { ...payload };
  }
}