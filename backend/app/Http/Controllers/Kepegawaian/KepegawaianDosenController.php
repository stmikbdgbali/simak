<?php

namespace App\Http\Controllers\Kepegawaian;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserDosen;
use Spatie\Permission\Models\Role;
use Ramsey\Uuid\Uuid;
use Illuminate\Validation\Rule;

class KepegawaianDosenController extends Controller {         
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {           
        $this->hasPermissionTo('KEPEGAWAIAN-DOSEN_BROWSE');
        $dosen = User::role('dosen')
                    ->select(\DB::raw('
                        users.id,
                        users.username,
                        users.name,
                        CONCAT(COALESCE(pe3_dosen.gelar_depan,\'\'),\'\',users.name,\' \',COALESCE(pe3_dosen.gelar_belakang,\'\')) AS nama_dosen,                        
                        pe3_dosen.nidn,
                        pe3_dosen.nipy,
                        pe3_dosen.gelar_depan,
                        pe3_dosen.gelar_belakang,
                        pe3_dosen.id_jabatan,
                        pe3_jabatan_akademik.nama_jabatan,
                        users.email,
                        users.nomor_hp,
                        users.foto,
                        users.theme,
                        pe3_dosen.is_dw,
                        users.default_role,
                        users.created_at,
                        users.updated_at
                    '))
                    ->join('pe3_dosen','pe3_dosen.user_id','users.id')
                    ->join('pe3_jabatan_akademik','pe3_jabatan_akademik.id_jabatan','pe3_dosen.id_jabatan')
                    ->orderBy('name','ASC')
                    ->get();                           
        
        return Response()->json([
                                'status'=>1,
                                'pid'=>'fetchdata',                                
                                'dosen'=>$dosen,
                                'message'=>'Fetch data users Dosen berhasil diperoleh'
                            ],200);  
    }  
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->hasPermissionTo('KEPEGAWAIAN-DOSEN_UPDATE');

        $user = User::find($id);
        if (is_null($user))
        {
            return Response()->json([
                                    'status'=>0,
                                    'pid'=>'update',                
                                    'message'=>["User ID ($id) gagal diupdate"]
                                ], 422); 
        }
        else
        {
            $this->validate($request, [      
                                        'nidn'=>[
                                                    'numeric',
                                                    'unique:pe3_dosen,nidn,'.$user->id.',user_id'
                                                ],           
                                        'nipy'=>[
                                                    'numeric',
                                                    'unique:pe3_dosen,nipy,'.$user->id.',user_id'
                                                ],           
                                        'name'=>'required',            
                                        'id_jabatan'=>'required',                                                    
                                        'name'=>'required',            
                                        'email'=>'required|string|email|unique:users,email,'.$user->id,
                                        'nomor_hp'=>'required|string|unique:users,nomor_hp,'.$user->id,                                           
                                    ]); 

            $user = \DB::transaction(function () use ($request,$user){

                $user->name = $request->input('name');                
                $user->email = $request->input('email');
                $user->nomor_hp = $request->input('nomor_hp');
                $user->updated_at = \Carbon\Carbon::now()->toDateTimeString();                
                $user->save();

                $user_dosen=UserDosen::find($user->id);
                $user_dosen->nama_dosen=$request->input('name');                
                $user_dosen->id_jabatan=$request->input('id_jabatan');
                $user_dosen->gelar_depan=$request->input('gelar_depan');
                $user_dosen->gelar_belakang=$request->input('gelar_belakang');
                $user_dosen->nidn = $request->input('nidn');
                $user_dosen->nipy = $request->input('nipy');                                                           
                
                $user_dosen->save();   
                return $user;
            });
            
            \App\Models\System\ActivityLog::log($request,[
                                                        'object' => $this->guard()->user(), 
                                                        'object_id' => $this->guard()->user()->id, 
                                                        'user_id' => $this->getUserid(), 
                                                        'message' => 'Mengubah data user Dosen ('.$user->name.') berhasil'
                                                    ]);

            return Response()->json([
                                    'status'=>1,
                                    'pid'=>'update',
                                    'user'=>$user,      
                                    'message'=>'Data user Dosen '.$user->name.' berhasil diubah.'
                                ],200); 
        }        
    }   
    
}