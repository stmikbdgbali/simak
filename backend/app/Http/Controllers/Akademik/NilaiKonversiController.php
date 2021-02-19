<?php

namespace App\Http\Controllers\Akademik;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Akademik\NilaiKonversi1Model;
use App\Models\Akademik\NilaiKonversi2Model;
use App\Models\Akademik\RegisterMahasiswaModel;
use App\Models\Akademik\MatakuliahModel;

use App\Models\System\ConfigurationModel;

use Illuminate\Validation\Rule;

use Ramsey\Uuid\Uuid;

class NilaiKonversiController  extends Controller 
{
/**
     * daftar nilai konversi
     */
    public function index(Request $request)
    {
        $this->hasPermissionTo('AKADEMIK-NILAI-KONVERSI_BROWSE');
        if ($this->hasRole(['mahasiswa',['mahasiswabaru']]))
        {
            $data = NilaiKonversi1Model::select(\DB::raw('
                                            pe3_nilai_konversi1.*,
                                            0 AS jumlah_matkul,
                                            0 AS jumlah_sks
                                        '))
                                        ->where('user_id',$this->getUserid())                                
                                        ->get();     
        }
        else
        {
            $this->validate($request, [           
                'ta'=>'required',
                'prodi_id'=>'required'
            ]);

            $ta=$request->input('ta');
            $prodi_id=$request->input('prodi_id');
            
            $data = NilaiKonversi1Model::select(\DB::raw('
                                                pe3_nilai_konversi1.*,
                                                0 AS jumlah_matkul,
                                                0 AS jumlah_sks
                                            '))
                                            ->where('kjur',$prodi_id)                            
                                            ->where('tahun',$ta)                            
                                            ->orderBy('nama_mhs','asc')
                                            ->get();                    
            
        }
        $data->transform(function ($item,$key) {    

            $item->jumlah_matkul=\DB::table('pe3_nilai_konversi2')
                                    ->where('nilai_konversi_id',$item->id)
                                    ->count();

            $item->jumlah_sks=\DB::table('pe3_nilai_konversi2')                                    
                                    ->join('pe3_matakuliah','pe3_matakuliah.id','pe3_nilai_konversi2.matkul_id')
                                    ->where('nilai_konversi_id',$item->id)
                                    ->sum('sks');
            return $item;
        });
        return Response()->json([
                                'status'=>1,
                                'pid'=>'fetchdata',  
                                'mahasiswa'=>$data,                                                                                                                                   
                                'message'=>'Fetch data daftar mahasiswa pindahan/ampulan berhasil.'
                            ],200);     
    }
    public function matakuliah(Request $request)
    {
        $this->validate($request, [           
            'ta'=>'required',
            'prodi_id'=>'required'
        ]);
        
        $ta=$request->input('ta');
        $prodi_id=$request->input('prodi_id');

        $matakuliah=MatakuliahModel::select(\DB::raw('
                                    id,
                                    group_alias,                                    
                                    kmatkul,
                                    nmatkul,
                                    sks,
                                    semester,
                                    minimal_nilai,
                                    syarat_skripsi,
                                    status,
                                    null AS kmatkul_asal,
                                    null AS matkul_asal,
                                    null AS sks_asal,                                    
                                    null AS n_kual,
                                    null AS keterangan                                    
                                '))       
                                ->where('kjur',$prodi_id)
                                ->where('ta',$ta)   
                                ->orderBy('semester','ASC')                      
                                ->orderBy('kmatkul','ASC')                      
                                ->get();

        return Response()->json([
                                    'status'=>1,
                                    'pid'=>'fetchdata',  
                                    'matakuliah'=>$matakuliah,                                                                                                                                   
                                    'message'=>'Fetch data matakuliah berhasil.'
                                ],200);    
    }
    public function store(Request $request)
    {
        $this->hasPermissionTo('AKADEMIK-NILAI-KONVERSI_STORE');

        $this->validate($request, [      
            'nim_asal'=>'required',     
            'nama_mhs'=>'required',     
            'alamat'=>'required',     
            'no_telp'=>'required',     
            'email'=>'required|email',     
            'kode_jenjang'=>'required',     
            'kode_pt_asal'=>'required',     
            'nama_pt_asal'=>'required',     
            'kode_ps_asal'=>'required',     
            'nama_ps_asal'=>'required',     
            'tahun'=>'required',     
            'kjur'=>'required|exists:pe3_prodi,id',                  
            'daftar_nilai'=>'required',            
        ]);
        $data_konversi=\DB::transaction(function () use ($request){
            $data_konversi=NilaiKonversi1Model::create([
                'id'=>Uuid::uuid4()->toString(),
                'nim_asal'=>addslashes(trim($request->input('nim_asal'))),     
                'nama_mhs'=>addslashes(trim($request->input('nama_mhs'))),     
                'alamat'=>addslashes(trim($request->input('alamat'))),     
                'no_telp'=>addslashes(trim($request->input('no_telp'))),     
                'email'=>addslashes(trim($request->input('email'))),     
                'kode_jenjang'=>addslashes(trim($request->input('kode_jenjang'))),     
                'kode_pt_asal'=>addslashes(trim($request->input('kode_pt_asal'))),     
                'nama_pt_asal'=>addslashes(trim($request->input('nama_pt_asal'))),     
                'kode_ps_asal'=>addslashes(trim($request->input('kode_ps_asal'))),     
                'nama_ps_asal'=>addslashes(trim($request->input('nama_ps_asal'))),     
                'tahun'=>$request->input('tahun'),     
                'kjur'=>$request->input('kjur'),                                  
            ]);

            $nilai_konversi_id=$data_konversi->id;
            $jumlah_matkul=0;        
            $daftar_nilai=json_decode($request->input('daftar_nilai'),true);
            
            foreach ($daftar_nilai as $v)
            {
                $matkul_id=$v['matkul_id'];
                $kmatkul_asal=$v['kmatkul_asal'];
                $matkul_asal=$v['matkul_asal'];
                $sks_asal=$v['sks_asal'];
                $n_kual=$v['n_kual'];
                
                if ($matkul_id != '' && $kmatkul_asal != '' && $matkul_asal != '' && $sks_asal != '' && $n_kual != '')
                {
                    $nilai=NilaiKonversi2Model::create([
                        'id'=>Uuid::uuid4()->toString(),
                        'nilai_konversi_id'=>$nilai_konversi_id,
                        'matkul_id'=>$matkul_id,
                        'kmatkul_asal'=>$kmatkul_asal,
                        'matkul_asal'=>$matkul_asal,
                        'sks_asal'=>$sks_asal,
                        'n_kual'=>$n_kual,                        
                    ]);
                    $jumlah_matkul+=1;
                }
            } 
            $data=[
                'data_konversi'=>$data_konversi,
                'jumlah_matkul'=>$jumlah_matkul,
            ];
            return $data;
        });
        return Response()->json([
                                    'status'=>1,
                                    'pid'=>'store', 
                                    'data_konversi'=>$data_konversi['data_konversi'],                                     
                                    'jumlah_matkul'=>$data_konversi['jumlah_matkul'],                                     
                                    'message'=>"Nilai (".$data_konversi['jumlah_matkul'].") matakuliah telah tersimpan dengan berhasil" 
                                ],200);     
    }
    public function update(Request $request,$id)
    {
        $this->hasPermissionTo('AKADEMIK-NILAI-KONVERSI_UPDATE');

        $data_konversi=NilaiKonversi1Model::select(\DB::raw('
                                                    pe3_nilai_konversi1.*
                                                '))                                                                                                
                                                ->find($id);


        
        if (is_null($data_konversi))
        {
            return Response()->json([
                                    'status'=>0,
                                    'pid'=>'update',                
                                    'message'=>["Data Konversi dengan ($id) gagal diperoleh"]
                                ],422); 
        }
        else
        {
            $this->validate($request, [      
                'nim_asal'=>'required',     
                'nama_mhs'=>'required',     
                'alamat'=>'required',     
                'no_telp'=>'required',     
                'email'=>'required|email',     
                'kode_jenjang'=>'required',     
                'kode_pt_asal'=>'required',     
                'nama_pt_asal'=>'required',     
                'kode_ps_asal'=>'required',     
                'nama_ps_asal'=>'required',     
                'tahun'=>'required',     
                'kjur'=>'required|exists:pe3_prodi,id',                  
                'daftar_nilai'=>'required',            
            ]);
            $jumlah_matkul=\DB::transaction(function () use ($request,$data_konversi){
                $data_konversi->nim_asal=$request->input('nim_asal');     
                $data_konversi->nama_mhs=$request->input('nama_mhs');     
                $data_konversi->alamat=$request->input('alamat');     
                $data_konversi->no_telp=$request->input('no_telp');     
                $data_konversi->email=$request->input('email');     
                $data_konversi->kode_jenjang=$request->input('kode_jenjang');     
                $data_konversi->kode_pt_asal=$request->input('kode_pt_asal');     
                $data_konversi->nama_pt_asal=$request->input('nama_pt_asal');
                $data_konversi->kode_ps_asal=$request->input('kode_ps_asal');
                $data_konversi->nama_ps_asal=$request->input('nama_ps_asal');                
                
                $data_konversi->save();

                $nilai_konversi_id=$data_konversi->id;
                $jumlah_matkul=0;        
                $daftar_nilai=json_decode($request->input('daftar_nilai'),true);
                
                \DB::table('pe3_nilai_konversi2')
                        ->where('nilai_konversi_id',$data_konversi->id)
                        ->delete();

                foreach ($daftar_nilai as $v)
                {
                    $matkul_id=$v['matkul_id'];
                    $kmatkul_asal=$v['kmatkul_asal'];
                    $matkul_asal=$v['matkul_asal'];
                    $sks_asal=$v['sks_asal'];
                    $n_kual=$v['n_kual'];
                    
                    if ($matkul_id != '' && $kmatkul_asal != '' && $matkul_asal != '' && $sks_asal != '' && $n_kual != '')
                    {
                        $nilai=NilaiKonversi2Model::create([
                            'id'=>Uuid::uuid4()->toString(),
                            'nilai_konversi_id'=>$nilai_konversi_id,
                            'matkul_id'=>$matkul_id,
                            'kmatkul_asal'=>addslashes(trim($kmatkul_asal)),
                            'matkul_asal'=>addslashes(trim($matkul_asal)),
                            'sks_asal'=>addslashes(trim($sks_asal)),
                            'n_kual'=>$n_kual,                        
                        ]);
                        $jumlah_matkul+=1;
                    }
                } 
                $data=[
                    'data_konversi'=>$data_konversi,
                    'jumlah_matkul'=>$jumlah_matkul,
                ];
            });
            return Response()->json([
                                        'status'=>1,
                                        'pid'=>'update', 
                                        'data_konversi'=>$data_konversi['data_konversi'],                                     
                                        'jumlah_matkul'=>$data_konversi['jumlah_matkul'],                                                                        
                                        'message'=>"Nilai (".$data_konversi['jumlah_matkul'].") matakuliah telah tersimpan dengan berhasil" 
                                    ],200);     
        }
    }
    public function show(Request $request,$id)
    {
        $this->hasPermissionTo('AKADEMIK-NILAI-KONVERSI_SHOW');

        if ($this->hasRole('mahasiswa'))
        {
            $data_konversi=NilaiKonversi1Model::where('user_id',$this->getUserid())
                                        ->first();
        }
        else
        {
            $data_konversi=NilaiKonversi1Model::select(\DB::raw('
                                                    pe3_nilai_konversi1.*
                                                '))                                                                                                
                                                ->find($id);
        }
        
        if (is_null($data_konversi))
        {
            return Response()->json([
                                    'status'=>0,
                                    'pid'=>'show',                
                                    'message'=>["Data Konversi dengan ($id) gagal diperoleh"]
                                ],422); 
        }
        else
        {
            $subquery=\DB::table('pe3_nilai_konversi2 AS B')
                            ->select(\DB::raw('
                                B.matkul_id,
                                B.sks_asal,
                                B.kmatkul_asal,
                                B.matkul_asal,
                                B.n_kual,
                                B.keterangan
                            '))                            
                            ->where('B.nilai_konversi_id',$data_konversi->id);                           
                            
            $nilai_konversi=\DB::table('pe3_matakuliah AS A')
                                ->select(\DB::raw('
                                    id,
                                    group_alias,                                    
                                    kmatkul,
                                    nmatkul,
                                    sks,
                                    semester,
                                    minimal_nilai,
                                    syarat_skripsi,
                                    status,
                                    kmatkul_asal,
                                    matkul_asal,
                                    sks_asal,                                    
                                    n_kual,
                                    keterangan                                    
                                '))   
                                ->leftJoinSub($subquery,'B',function($join){
                                    $join->on('B.matkul_id','=','A.id');
                                })    
                                ->where('kjur',$data_konversi->kjur)
                                ->where('ta',$data_konversi->tahun)   
                                ->orderBy('semester','ASC')                      
                                ->orderBy('kmatkul','ASC')                      
                                ->get();
           
            return Response()->json([
                                    'status'=>1,
                                    'pid'=>'fetchdata', 
                                    'data_konversi'=>$data_konversi, 
                                    'nilai_konversi'=>$nilai_konversi,                                                  
                                    'message'=>"Data Nilai Konversi ($id) berhasil diperoleh"
                                ],200); 
        }
    }
    public function plugtomhs (Request $request)
    {
        $this->hasPermissionTo('AKADEMIK-NILAI-KONVERSI_UPDATE');

        $this->validate($request, [     
            'nilai_konversi_id'=>[
                'required',                                            
                Rule::exists('pe3_nilai_konversi1','id')->where(function($query){
                    return $query->whereNotNull('user_id')
                                ->whereNotNull('nim');
                })                       
            ],
            'user_id'=>[
                'required',                                            
                Rule::exists('pe3_register_mahasiswa','user_id')->where(function($query){
                    return $query->where('k_status','A');
                                
                })                       
            ]                         
        ]);
        $data_konversi = NilaiKonversi1Model::find($request->input('nilai_konversi_id')); 

        $mahasiswa=RegisterMahasiswaModel::find($request->input('user_id'));

        $data_konversi->user_id=$mahasiswa->user_id;
        $data_konversi->nim=$mahasiswa->nim;
        $data_konversi->save();

        return Response()->json([
                                    'status'=>1,
                                    'pid'=>'update',                
                                    'message'=>"Data Konversi dengan berhasil dipasangkan dengan data mahasiswa"
                                ],200); 
        
     
    }
    public function destroy (Request $request,$id)
    { 
        $this->hasPermissionTo('AKADEMIK-NILAI-KONVERSI_DESTROY');

        $data_konversi = NilaiKonversi1Model::find($id); 
        
        if (is_null($data_konversi))
        {
            return Response()->json([
                                    'status'=>0,
                                    'pid'=>'destroy',                
                                    'message'=>["Data Konversi ($id) gagal dihapus"]
                                ],422); 
        }
        else
        {
            \App\Models\System\ActivityLog::log($request,[
                                                            'object' => $data_konversi, 
                                                            'object_id' => $data_konversi->id, 
                                                            'user_id' => $this->getUserid(), 
                                                            'message' => 'Menghapus data konversi dengan id ('.$id.') berhasil'
                                                        ]);
            $data_konversi->delete();
            return Response()->json([
                                        'status'=>1,
                                        'pid'=>'destroy',                
                                        'message'=>"Data Konversi dengan kode ($id) berhasil dihapus"
                                    ],200);         
        }
                  
    }   
    public function printpdf1(Request $request,$id)
    {
        if ($this->hasRole('mahasiswa'))
        {
            $data_konversi=NilaiKonversi1Model::select(\DB::raw('
                                            pe3_nilai_konversi1.*,
                                            pe3_prodi.nama_prodi,
                                            pe3_jenjang_studi.nama_jenjang
                                        ')) 
                                        ->join('pe3_prodi','pe3_nilai_konversi1.kjur','pe3_prodi.id')
                                        ->join('pe3_jenjang_studi','pe3_nilai_konversi1.kode_jenjang','pe3_jenjang_studi.kode_jenjang')
                                        ->where('user_id',$this->getUserid())
                                        ->first();
        }
        else
        {
            $data_konversi=NilaiKonversi1Model::select(\DB::raw('
                                                    pe3_nilai_konversi1.*,
                                                    pe3_prodi.nama_prodi,
                                                    pe3_jenjang_studi.nama_jenjang
                                                '))  
                                                ->join('pe3_prodi','pe3_nilai_konversi1.kjur','pe3_prodi.id')
                                                ->join('pe3_jenjang_studi','pe3_nilai_konversi1.kode_jenjang','pe3_jenjang_studi.kode_jenjang')
                                                ->find($id);
        }
        
        if (is_null($data_konversi))
        {
            return Response()->json([
                                    'status'=>0,
                                    'pid'=>'show',                
                                    'message'=>["Data Konversi dengan ($id) gagal diperoleh"]
                                ],422); 
        }
        else
        {
            $subquery=\DB::table('pe3_nilai_konversi2 AS B')
                            ->select(\DB::raw('
                                B.matkul_id,
                                B.sks_asal,
                                B.kmatkul_asal,
                                B.matkul_asal,
                                B.n_kual,
                                B.keterangan
                            '))                            
                            ->where('B.nilai_konversi_id',$data_konversi->id);                           
                            
            $nilai_konversi=\DB::table('pe3_matakuliah AS A')
                                ->select(\DB::raw('
                                    id,
                                    group_alias,                                    
                                    kmatkul,
                                    nmatkul,
                                    sks,
                                    semester,
                                    minimal_nilai,
                                    syarat_skripsi,
                                    status,
                                    kmatkul_asal,
                                    matkul_asal,
                                    sks_asal,                                    
                                    n_kual,
                                    keterangan                                    
                                '))   
                                ->leftJoinSub($subquery,'B',function($join){
                                    $join->on('B.matkul_id','=','A.id');
                                })    
                                ->where('kjur',$data_konversi->kjur)
                                ->where('ta',$data_konversi->tahun)   
                                ->orderBy('semester','ASC')                      
                                ->orderBy('kmatkul','ASC')                      
                                ->get();

            $config = ConfigurationModel::getCache();
            $headers=[
                'HEADER_1'=>$config['HEADER_1'],
                'HEADER_2'=>$config['HEADER_2'],
                'HEADER_3'=>$config['HEADER_3'],
                'HEADER_4'=>$config['HEADER_4'],
                'HEADER_ADDRESS'=>$config['HEADER_ADDRESS'],
                'HEADER_LOGO'=>\App\Helpers\Helper::public_path("images/logo.png")
            ];
            $pdf = \Meneses\LaravelMpdf\Facades\LaravelMpdf::loadView('report.ReportNilaiKonversi1',
                                                                    [
                                                                        'headers'=>$headers,
                                                                        'data_konversi'=>$data_konversi,
                                                                        'daftar_nilai'=>$nilai_konversi,                                                                                                                                                
                                                                        'tanggal'=>\App\Helpers\Helper::tanggal('d F Y',$data_konversi->updated_at)
                                                                    ],
                                                                    [],
                                                                    [
                                                                        'title' => 'Konversi Nilai',
                                                                    ]);

            $file_pdf=\App\Helpers\Helper::public_path("exported/pdf/kn_".$data_konversi->id.'.pdf');
            $pdf->save($file_pdf);

            $pdf_file="storage/exported/pdf/kn_".$data_konversi->id.".pdf";

            return Response()->json([
                                    'status'=>1,
                                    'pid'=>'fetchdata',
                                    'data_konversi'=>$data_konversi,
                                    'pdf_file'=>$pdf_file                                    
                                ],200);
        }
    }    
}