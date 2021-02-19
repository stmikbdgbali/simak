<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use App\Models\System\ConfigurationModel;

class AuthController extends Controller
{
    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $this->validate($request, [            
            'username'=>'required',
            'password'=>'required',                        
        ]);
        $credentials = $request->only('username', 'password');
        $credentials['active']=1;
        
        $config = ConfigurationModel::getCache();
        $ttl_expire=60;

        if ($config['TOKEN_TTL_EXPIRE'])
        {
            $ttl_expire=$config['TOKEN_TTL_EXPIRE'];
        }
        
        if (! $token = $this->guard()->attempt($credentials, ['exp' => \Carbon\Carbon::now()->addMinutes($ttl_expire)->timestamp])) {
            return response()->json([
                                    'page' => 'login',
                                    'error' => 'Unauthorized',                                    
                                ], 401);
        }
        //log user loggin
        \App\Models\System\ActivityLog::log($request,[
                                                        'object' => $this->guard()->user(), 
                                                        'object_id'=>$this->getUserid(), 
                                                        'user_id' => $this->getUserid(), 
                                                        'message' => 'user '.$credentials['username'].' berhasil login'
                                                    ]);

        ConfigurationModel::toCache();
        return $this->respondWithToken($token);
    }
    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        $user = $this->guard()->user()->toArray();
        if ($this->hasRole('mahasiswabaru'))
        {
            $formulir = \App\Models\SPMB\FormulirPendaftaranModel::find($user['id']);
            $user['idsmt']=$formulir->idsmt;
        }
        $user['role']=$this->getRoleNames();
        $user['issuperadmin']=$this->hasRole('superadmin');
        $user['isdw']=$this->hasRole('dosenwali');
        $user['permissions']=$this->guard()->user()->permissions->pluck('id','name')->toArray();
        return response()->json($user);
    }    
    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => $this->guard()->factory()->getTTL() * 14400
        ]);
    }
}