<?php

namespace App\Http\Controllers\Akademik;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Spatie\Permission\Models\Role;
use App\Models\Akademik\RegisterMahasiswaModel;
use App\Models\SPMB\FormulirPendaftaranModel;

class KemahasiswaanController extends Controller {  
    /**
     * update status mahasiswa baru atau lama
     */
    public function updatestatus(Request $request,$id)
    {
        $this->hasPermissionTo('AKADEMIK-KEMAHASISWAAN-STATUS_UPDATE');

        $this->validate($request,[
            'active'=>'required|numeric'
        ]);

        $user = \App\Models\User::find($id); 
        
        if ($user == null)
        {
            return Response()->json([
                                    'status'=>0,
                                    'pid'=>'store',                
                                    'message'=>["Data User tidak ditemukan."]
                                ],422);         
        }
        else
        {
            $user->active = $request->input('active');
            $user->save();

            \App\Models\System\ActivityLog::log($request,[
                                        'object' => $this->guard()->user(), 
                                        'object_id' => $this->guard()->user()->id, 
                                        'user_id' => $this->getUserid(), 
                                        'message' => 'Merubah status Mahasiswa baru menjadi active A.N ('.$user->username.') berhasil dilakukan'
                                    ]);

            return Response()->json([
                                        'status'=>1,
                                        'pid'=>'update',                                                                                                                                     
                                        'message'=>'Status Mahasiswa berhasil diubah.'
                                    ],200); 
        }
    }
    /**
     * update status mahasiswa baru atau lama
     */
    public function updatebiodata(Request $request,$id)
    {
        if (!$this->hasRole('mahasiswa'))
        {
            $this->hasPermissionTo('KEMAHASISWAAN-PROFIL-MHS_UPDATE');       
        }          
        
        $formulir=FormulirPendaftaranModel::find($id);

        if (is_null($formulir))
        {
            return Response()->json([
                                    'status'=>0,
                                    'pid'=>'update',                
                                    'message'=>["Biodata Mahasiswa dengan User ID ($id) gagal diperoleh"]
                                ],422); 
        }
        else
        {
           
            $this->validate($request, [
                'nama_mhs'=>'required',            
                'tempat_lahir'=>'required',            
                'tanggal_lahir'=>'required',            
                'jk'=>'required',            
                'nomor_hp'=>'required|unique:users,nomor_hp,'.$formulir->user_id,
                'email'=>'required|string|email|unique:users,email,'.$formulir->user_id,
                'nama_ibu_kandung'=>'required',

                'address1_provinsi_id'=>'required',
                'address1_provinsi'=>'required',
                'address1_kabupaten_id'=>'required',
                'address1_kabupaten'=>'required',
                'address1_kecamatan_id'=>'required',
                'address1_kecamatan'=>'required',
                'address1_desa_id'=>'required',
                'address1_kelurahan'=>'required',
                'alamat_rumah'=>'required',                
            ]);

            $data_mhs = \DB::transaction(function () use ($request,$formulir){            
                $formulir->nama_mhs=$request->input('nama_mhs');           
                $formulir->tempat_lahir=$request->input('tempat_lahir');           
                $formulir->tanggal_lahir=$request->input('tanggal_lahir');           
                $formulir->jk=$request->input('jk');           
                $formulir->telp_hp=$request->input('nomor_hp');           
                  
                $formulir->nama_ibu_kandung=$request->input('nama_ibu_kandung');    
                $formulir->address1_provinsi_id=$request->input('address1_provinsi_id');
                $formulir->address1_provinsi=$request->input('address1_provinsi');
                $formulir->address1_kabupaten_id=$request->input('address1_kabupaten_id');
                $formulir->address1_kabupaten=$request->input('address1_kabupaten');
                $formulir->address1_kecamatan_id=$request->input('address1_kecamatan_id');
                $formulir->address1_kecamatan=$request->input('address1_kecamatan');
                $formulir->address1_desa_id=$request->input('address1_desa_id');
                $formulir->address1_kelurahan=$request->input('address1_kelurahan');
                $formulir->alamat_rumah=$request->input('alamat_rumah');                   

                $formulir->save();

                $user=$formulir->User;
                $user->name = $request->input('nama_mhs');
                $user->email = $request->input('email');
                $user->nomor_hp = $request->input('nomor_hp');
                $user->save();    

                \DB::table('model_has_permissions')->where('model_id',$user->id)->delete();
                $permission=Role::findByName('mahasiswa')->permissions;
                $user->givePermissionTo($permission->pluck('name'));             
                
                return $formulir;
            });
            return Response()->json([
                                        'status'=>1,
                                        'pid'=>'update',
                                        'formulir'=>$data_mhs,                                                                                                                                          
                                        'message'=>'Biodata Mahasiswa berhasil diubah.'
                                    ],200)->setEncodingOptions(JSON_NUMERIC_CHECK);
        }
    }
    /**
     * ubah dosen wali mahasiswa
     */
    public function updatedw(Request $request,$id)
    {
        $this->hasPermissionTo('AKADEMIK-KEMAHASISWAAN-DW_UPDATE');

        $mahasiswa = RegisterMahasiswaModel::find($id); 
        
        if ($user == null)
        {
            return Response()->json([
                                    'status'=>0,
                                    'pid'=>'store',                
                                    'message'=>["Data Mahasiswa tidak ditemukan."]
                                ],422);         
        }
        else
        {
            $this->validate($request,[
                'dosen_id'=>'required|exists:pe3_dosen,user_id'
            ]);

            $mahasiswa->dosen_id = $request->input('dosen_id');
            $mahasiswa->save();

            \App\Models\System\ActivityLog::log($request,[
                                        'object' => $mahasiswa, 
                                        'object_id' => $mahasiswa->user_id, 
                                        'user_id' => $this->getUserid(), 
                                        'message' => 'Merubah dosen wali mahasiswa menjadi berhasil dilakukan'
                                    ]);

            return Response()->json([
                                        'status'=>1,
                                        'pid'=>'update',                                                                                                                                     
                                        'message'=>'Dosen wali Mahasiswa berhasil diubah.'
                                    ],200); 
        }
    }
}