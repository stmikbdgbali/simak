<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Validation\UnauthorizedException;
use Throwable;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\JWTAuth;

class H2HBRKJWTCheckMiddleware
{
    /**
     * The authentication guard factory instance.
     *
     * @var \Illuminate\Contracts\Auth\Factory
     */
    protected $auth;

    /**
     * Create a new middleware instance.
     *
     * @param  \Illuminate\Contracts\Auth\Factory  $auth
     * @return void
     */
    public function __construct(JWTAuth $auth)
    {
        $this->auth = $auth;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $token = $this->authenticate($request);

        $response = $next($request);

        return $this->setAuthenticationHeader($response, $token);
    }
    private function checkToken(Request $request)
    {
        if (!$this->auth->parser()->setRequest($request)->hasToken() || !$this->auth->parseToken()->authenticate()) {
            throw new UnauthorizedException;
        }
    }
    private function authenticate(Request $request)
    {
        try {
            $this->checkToken($request);
        } catch (TokenExpiredException $e) {
            try {
                $token = $this->auth->refresh();
                $request = $this->setAuthenticationHeader($request, $token);

                $this->checkToken($request);

                return $token;
            } catch (Throwable $th) {
                $token='98';
                return $token;
            }
        } catch (Throwable $th) {
            $token='98';
            return $token;
        }
    }
    private function setAuthenticationHeader($object, string $token = null)
    {
        if ($token) {                    
            if ($token=='98')
            {
                $object->setData([
                    'Result'=>[
                        'status'=>'98',
                        'message'=>'Token tidak terdaftar'
                    ]
                ]);                
            }               
            else
            {
                $object->headers->set('Authorization', "Bearer {$token}");
            }                           
        }

        return $object;
    }
}
