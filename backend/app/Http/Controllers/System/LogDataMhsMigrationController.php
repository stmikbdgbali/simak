<?php

namespace App\Http\Controllers\System;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\System\DataMHSMigrationModel;

class LogDataMhsMigrationController extends Controller {    
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {   
        $this->hasPermissionTo('SYSTEM-MIGRATION_BROWSE');

        $this->validate($request, [           
            'ta'=>'required',            
        ]);
        
        $ta=$request->input('ta');
        
        $daftar_log=DataMHSMigrationModel::where('tahun',$ta)
                                        ->get();

        return Response()->json([
                                'status'=>1,
                                'pid'=>'fetchdata',
                                'daftar_log'=>$daftar_log,
                                'message'=>'Fetch data log migrasi berhasil diperoleh'
                            ],200); 
    }    
}
