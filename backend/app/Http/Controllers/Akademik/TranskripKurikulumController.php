<?php

namespace App\Http\Controllers\Akademik;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Akademik\RegisterMahasiswaModel;
use App\Models\Akademik\RekapTranskripKurikulumModel;
use App\Models\Akademik\MatakuliahModel;

use App\Models\System\ConfigurationModel;

class TranskripKurikulumController  extends Controller 
{
/**
     * daftar nilai mahasiswa
     */
    public function index(Request $request)
    {
        $this->hasPermissionTo('AKADEMIK-NILAI-TRANSKRIP-KURIKULUM_BROWSE');
        if ($this->hasRole('mahasiswa'))
        {
            $data = RegisterMahasiswaModel::select(\DB::raw('        
                                    pe3_register_mahasiswa.user_id,                                
                                    pe3_register_mahasiswa.nim,                                
                                    pe3_formulir_pendaftaran.nama_mhs,                                
                                    pe3_register_mahasiswa.idkelas,   
                                    COALESCE(pe3_rekap_transkrip_kurikulum.jumlah_matkul,0) AS jumlah_matkul,
                                    COALESCE(pe3_rekap_transkrip_kurikulum.jumlah_sks,0) AS jumlah_sks,
                                    COALESCE(pe3_rekap_transkrip_kurikulum.ipk,0.00) AS ipk                               
                                '))
                                ->join('pe3_formulir_pendaftaran','pe3_register_mahasiswa.user_id','pe3_formulir_pendaftaran.user_id')                                                    
                                ->leftJoin('pe3_rekap_transkrip_kurikulum','pe3_rekap_transkrip_kurikulum.user_id','pe3_register_mahasiswa.user_id')                                
                                ->where('pe3_register_mahasiswa.user_id',$this->getUserid())                                
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
            
            $data = RegisterMahasiswaModel::select(\DB::raw('        
                                    pe3_register_mahasiswa.user_id,                                
                                    pe3_register_mahasiswa.nim,                                
                                    pe3_formulir_pendaftaran.nama_mhs,                                
                                    pe3_register_mahasiswa.idkelas,   
                                    COALESCE(pe3_rekap_transkrip_kurikulum.jumlah_matkul,0) AS jumlah_matkul,
                                    COALESCE(pe3_rekap_transkrip_kurikulum.jumlah_sks,0) AS jumlah_sks,
                                    COALESCE(pe3_rekap_transkrip_kurikulum.ipk,0.00) AS ipk                               
                                '))
                                ->join('pe3_formulir_pendaftaran','pe3_register_mahasiswa.user_id','pe3_formulir_pendaftaran.user_id')                                                    
                                ->leftJoin('pe3_rekap_transkrip_kurikulum','pe3_rekap_transkrip_kurikulum.user_id','pe3_register_mahasiswa.user_id')
                                ->where('pe3_register_mahasiswa.kjur',$prodi_id)                            
                                ->where('pe3_register_mahasiswa.tahun',$ta)                            
                                ->orderBy('nama_mhs','asc')
                                ->get();                    
            
        }
        return Response()->json([
                                        'status'=>1,
                                        'pid'=>'fetchdata',  
                                        'mahasiswa'=>$data,                                                                                                                                   
                                        'message'=>'Fetch data daftar mahasiswa berhasil.'
                                    ],200);     
    }
    public function show(Request $request,$id)
    {
        if ($this->hasRole('mahasiswa'))
        {
            $mahasiswa=RegisterMahasiswaModel::select(\DB::raw('
                                                    A.user_id,
                                                    A.nama_mhs,
                                                    A.jk,
                                                    C.email,
                                                    C.nomor_hp,
                                                    A.alamat_rumah,
                                                    A.no_formulir,
                                                    pe3_register_mahasiswa.nim,
                                                    pe3_register_mahasiswa.nirm,
                                                    pe3_register_mahasiswa.kjur,
                                                    B.nama_prodi,
                                                    D.nkelas,
                                                    pe3_register_mahasiswa.tahun,
                                                    E.n_status,
                                                    pe3_register_mahasiswa.created_at,
                                                    pe3_register_mahasiswa.updated_at,
                                                    C.foto
                                                '))
                                                ->join('pe3_formulir_pendaftaran AS A','A.user_id','pe3_register_mahasiswa.user_id')
                                                ->join('pe3_prodi AS B','B.id','pe3_register_mahasiswa.kjur')                                            
                                                ->join('users AS C','C.id','pe3_register_mahasiswa.user_id')
                                                ->join('pe3_kelas AS D','D.idkelas','pe3_register_mahasiswa.idkelas')
                                                ->join('pe3_status_mahasiswa AS E','E.k_status','pe3_register_mahasiswa.k_status')
                                                ->find($this->getUserid());
        }
        else
        {
            $mahasiswa=RegisterMahasiswaModel::select(\DB::raw('
                                                    A.user_id,
                                                    A.nama_mhs,
                                                    A.jk,
                                                    C.email,
                                                    C.nomor_hp,
                                                    COALESCE(A.alamat_rumah,\'N.A\') AS alamat_rumah,
                                                    A.no_formulir,
                                                    pe3_register_mahasiswa.nim,
                                                    pe3_register_mahasiswa.nirm,
                                                    pe3_register_mahasiswa.kjur,
                                                    B.nama_prodi,
                                                    D.nkelas,
                                                    pe3_register_mahasiswa.tahun,
                                                    E.n_status,
                                                    pe3_register_mahasiswa.created_at,
                                                    pe3_register_mahasiswa.updated_at,
                                                    C.foto
                                                '))
                                                ->join('pe3_formulir_pendaftaran AS A','A.user_id','pe3_register_mahasiswa.user_id')
                                                ->join('pe3_prodi AS B','B.id','pe3_register_mahasiswa.kjur')                                            
                                                ->join('users AS C','C.id','pe3_register_mahasiswa.user_id')
                                                ->join('pe3_kelas AS D','D.idkelas','pe3_register_mahasiswa.idkelas')
                                                ->join('pe3_status_mahasiswa AS E','E.k_status','pe3_register_mahasiswa.k_status')
                                                ->find($id);
        }
        
        if (is_null($mahasiswa))
        {
            return Response()->json([
                                    'status'=>0,
                                    'pid'=>'destroy',                
                                    'message'=>["Mahasiswa dengan ($id) gagal diperoleh"]
                                ],422); 
        }
        else
        {
            $daftar_matkul=MatakuliahModel::select(\DB::raw('
                                                0 AS no,
                                                id,
                                                group_alias,                                    
                                                kmatkul,
                                                nmatkul,
                                                sks,
                                                semester,
                                                \'-\' AS HM,
                                                \'-\' AS AM,
                                                \'-\' AS M                                              
                                            '))
                                            ->where('kjur',$mahasiswa->kjur)
                                            ->where('ta',$mahasiswa->tahun)   
                                            ->orderBy('semester','ASC')                      
                                            ->orderBy('kmatkul','ASC')    
                                            ->get();

            $jumlah_sks=0;            
            $jumlah_sks_nilai=0;            
            $jumlah_am=0;
            $jumlah_m=0;
            $jumlah_matkul=0;

            $daftar_nilai=[];
            foreach ($daftar_matkul as $key=>$item)
            {
                $user_id=$mahasiswa->user_id;
                $nilai=\DB::table('pe3_nilai_matakuliah AS A')
                            ->select(\DB::raw('
                                A.n_kual,                                
                                A.n_mutu
                            '))
                            ->join('pe3_krsmatkul AS B','A.krsmatkul_id','B.id')
                            ->join('pe3_krs AS C','B.krs_id','C.id')
                            ->join('pe3_penyelenggaraan AS D','A.penyelenggaraan_id','D.id')
                            ->where('C.user_id',$mahasiswa->user_id)
                            ->where('D.matkul_id',$item->id)
                            ->orderBy('n_mutu','desc')
                            ->limit(1)
                            ->get();
                
                $HM=$item->HM;
                $AM=$item->AM;
                $M=$item->M;

                if (isset($nilai[0]))
                {
                    $HM=$nilai[0]->n_kual;
                    $AM=number_format($nilai[0]->n_mutu,0);
                    $M=$AM*$item->sks;
                    $jumlah_m+=$M;
                    $jumlah_am+=$AM;
                    $jumlah_matkul+=1;
                    $jumlah_sks_nilai+=$item->sks;
                }
                $daftar_nilai[]=[
                    'id'=>$item->id,
                    'no'=>$key+1,
                    'kmatkul'=>$item->kmatkul,
                    'nmatkul'=>$item->nmatkul,
                    'sks'=>$item->sks,
                    'semester'=>$item->semester,
                    'group_alias'=>$item->group_alias,
                    'HM'=>$HM,
                    'AM'=>$AM,
                    'M'=>$M
                ];

                $jumlah_sks+=$item->sks;                 
            }         
            $ipk=\App\Helpers\HelperAkademik::formatIPK($jumlah_m,$jumlah_sks_nilai);            
            $rekap=RekapTranskripKurikulumModel::find($mahasiswa->user_id);
            if (is_null($rekap))
            {

                RekapTranskripKurikulumModel::updateOrCreate([
                    'user_id'=>$mahasiswa->user_id,
                    'jumlah_matkul'=>$jumlah_matkul,
                    'jumlah_sks'=>$jumlah_sks_nilai,
                    'jumlah_am'=>$jumlah_am,
                    'jumlah_m'=>$jumlah_m,
                    'ipk'=>$ipk,
                ]);   
            }
            else
            {
                $rekap->jumlah_matkul=$jumlah_matkul;
                $rekap->jumlah_sks=$jumlah_sks_nilai;
                $rekap->jumlah_am=$jumlah_am;
                $rekap->jumlah_m=$jumlah_m;
                $rekap->ipk=$ipk;

                $rekap->save();
            }
           
            return Response()->json([
                                    'status'=>1,
                                    'pid'=>'fetchdata', 
                                    'mahasiswa'=>$mahasiswa, 
                                    'nilai_matakuliah'=>$daftar_nilai,              
                                    'jumlah_sks'=>$jumlah_sks,              
                                    'jumlah_sks_nilai'=>$jumlah_sks_nilai,              
                                    'jumlah_am'=>$jumlah_am,              
                                    'jumlah_m'=>$jumlah_m,              
                                    'ipk'=>$ipk,
                                    'message'=>"Transkrip Nilai ($id) berhasil diperoleh"
                                ],200); 
        }
    }
    public function history(Request $request,$id)
    {
        $matakuliah = MatakuliahModel::find($id);
        if (is_null($matakuliah))
        {
            return Response()->json([
                                    'status'=>0,
                                    'pid'=>'update',                
                                    'message'=>["matakuliah dengan id ($id) gagal diperoleh"]
                                ],422); 
        }
        else
        {
            $this->validate($request, [
                'user_id'=>'required|exists:pe3_register_mahasiswa,user_id'
            ]);
            $history=\DB::table('pe3_nilai_matakuliah AS A')
                                    ->select(\DB::raw('
                                        B.id AS krsmatkul_id,
                                        D.id AS penyelenggaraan_id,                                                                                
                                        A.n_kual, 
                                        A.n_mutu,
                                        A.n_kuan,
                                        C.tasmt,
                                        D.ta_matkul,
                                        E.username,
                                        A.created_at,
                                        A.updated_at
                                    '))
                                    ->join('pe3_krsmatkul AS B','A.krsmatkul_id','B.id')
                                    ->join('pe3_krs AS C','B.krs_id','C.id')
                                    ->join('pe3_penyelenggaraan AS D','A.penyelenggaraan_id','D.id')
                                    ->leftJoin('users AS E','E.id','A.user_id_updated')
                                    ->where('C.user_id',$request->input('user_id'))
                                    ->where('D.matkul_id',$id)
                                    ->orderBy('D.created_at','desc')
                                    ->get();   
                                    
            return Response()->json([
                                    'status'=>1,
                                    'pid'=>'fetchdata', 
                                    'matakuliah'=>$matakuliah,                                     
                                    'history'=>$history,                                     
                                    'message'=>"History Nilai (".$matakuliah->nmatkul.") berhasil diperoleh"
                                ],200); 
        }
    }
    public function printpdf1(Request $request,$id)
    {
        if ($this->hasRole('mahasiswa'))
        {
            $mahasiswa=RegisterMahasiswaModel::select(\DB::raw('
                                                    A.user_id,
                                                    A.nama_mhs,
                                                    A.jk,
                                                    C.email,
                                                    C.nomor_hp,
                                                    A.no_formulir,
                                                    pe3_register_mahasiswa.nim,
                                                    pe3_register_mahasiswa.nirm,
                                                    pe3_register_mahasiswa.kjur,
                                                    B.nama_prodi,
                                                    D.nkelas,
                                                    pe3_register_mahasiswa.tahun,
                                                    E.n_status,
                                                    pe3_register_mahasiswa.created_at,
                                                    pe3_register_mahasiswa.updated_at,
                                                    C.foto
                                                '))
                                                ->join('pe3_formulir_pendaftaran AS A','A.user_id','pe3_register_mahasiswa.user_id')
                                                ->join('pe3_prodi AS B','B.id','pe3_register_mahasiswa.kjur')                                            
                                                ->join('users AS C','C.id','pe3_register_mahasiswa.user_id')
                                                ->join('pe3_kelas AS D','D.idkelas','pe3_register_mahasiswa.idkelas')
                                                ->join('pe3_status_mahasiswa AS E','E.k_status','pe3_register_mahasiswa.k_status')
                                                ->find($this->getUserid());
        }
        else
        {
            $mahasiswa=RegisterMahasiswaModel::select(\DB::raw('
                                                    A.user_id,
                                                    A.nama_mhs,
                                                    A.jk,
                                                    C.email,
                                                    C.nomor_hp,
                                                    A.no_formulir,
                                                    pe3_register_mahasiswa.nim,
                                                    pe3_register_mahasiswa.nirm,
                                                    pe3_register_mahasiswa.kjur,
                                                    B.nama_prodi,
                                                    D.nkelas,
                                                    pe3_register_mahasiswa.tahun,
                                                    E.n_status,
                                                    pe3_register_mahasiswa.created_at,
                                                    pe3_register_mahasiswa.updated_at,
                                                    C.foto
                                                '))
                                                ->join('pe3_formulir_pendaftaran AS A','A.user_id','pe3_register_mahasiswa.user_id')
                                                ->join('pe3_prodi AS B','B.id','pe3_register_mahasiswa.kjur')                                            
                                                ->join('users AS C','C.id','pe3_register_mahasiswa.user_id')
                                                ->join('pe3_kelas AS D','D.idkelas','pe3_register_mahasiswa.idkelas')
                                                ->join('pe3_status_mahasiswa AS E','E.k_status','pe3_register_mahasiswa.k_status')
                                                ->find($id);
        }
        if (is_null($mahasiswa))
        {
            return Response()->json([
                                    'status'=>0,
                                    'pid'=>'show',                
                                    'message'=>["Mahasiswa dengan ($id) gagal diperoleh"]
                                ],422); 
        }
        else
        {
            $user_id=$mahasiswa->user_id;
            $daftar_nilai=[];

            $jumlah_matkul_all=0;
            $jumlah_sks_all=0;
            $jumlah_sks_all_tanpa_nilai=0;
            $jumlah_m_all=0;
            $jumlah_am_all=0;

            $ipk=0;
            for ($i=1;$i<=8;$i++)
            {
                $jumlah_matkul_smt=0;
                $jumlah_sks_smt=0;
                $jumlah_sks_smt_tanpa_nilai=0;
                $jumlah_am_smt=0;
                $jumlah_m_smt=0;                

                $daftar_matkul=MatakuliahModel::select(\DB::raw('
                                                0 AS no,
                                                id,
                                                group_alias,                                    
                                                kmatkul,
                                                nmatkul,
                                                sks,
                                                semester,
                                                \'-\' AS HM,
                                                \'-\' AS AM,
                                                \'-\' AS M                                              
                                            '))
                                            ->where('kjur',$mahasiswa->kjur)
                                            ->where('ta',$mahasiswa->tahun) 
                                            ->where('semester',$i)  
                                            ->orderBy('semester','ASC')                      
                                            ->orderBy('kmatkul','ASC')    
                                            ->get();
                $data_nilai_smt=[];
                foreach ($daftar_matkul as $key=>$item)
                {
                    $subquery=\DB::table('pe3_nilai_matakuliah AS A')
                                            ->select(\DB::raw('
                                                A.id
                                            '))
                                            ->join('pe3_krsmatkul AS B','A.krsmatkul_id','B.id')
                                            ->join('pe3_krs AS C','B.krs_id','C.id')
                                            ->join('pe3_penyelenggaraan AS D','A.penyelenggaraan_id','D.id')
                                            ->where('C.user_id',$mahasiswa->user_id)
                                            ->where('D.matkul_id',$item->id)
                                            ->orderBy('A.n_mutu','DESC')
                                            ->limit(1);

                    $nilai=\DB::table('pe3_nilai_matakuliah AS A')
                            ->select(\DB::raw('
                                A.n_kual,                                
                                A.n_mutu
                            '))
                            ->joinSub($subquery,'B',function($join){
                                $join->on('A.id','=','B.id');
                            })
                            ->get();
                    
                    $HM=$item->HM;
                    $AM=$item->AM;
                    $M=$item->M;

                    if (isset($nilai[0]))
                    {
                        $HM=$nilai[0]->n_kual;
                        $AM=number_format($nilai[0]->n_mutu,0);
                        $M=$AM*$item->sks;

                        $jumlah_m_smt+=$M;
                        $jumlah_am_smt+=$AM;
                        $jumlah_matkul_smt+=1;
                        $jumlah_sks_smt+=$item->sks;

                        $jumlah_m_all+=$M;
                        $jumlah_sks_all+=$item->sks;
                        $jumlah_am_all+=$jumlah_am_smt;                        
                    }
                    $data_nilai_smt[$key]=[
                        'pid'=>'body',
                        'no'=>$key+1,
                        'kmatkul'=>$item->kmatkul,
                        'nmatkul'=>$item->nmatkul,
                        'sks'=>$item->sks,
                        'semester'=>$item->semester,
                        'group_alias'=>$item->group_alias,
                        'HM'=>$HM,
                        'AM'=>$AM,
                        'M'=>$M
                    ];

                    $jumlah_matkul_all+=1;
                }
                $ips=\App\Helpers\HelperAkademik::formatIPK($jumlah_m_smt,$jumlah_sks_smt);
                $ipk=\App\Helpers\HelperAkademik::formatIPK($jumlah_m_all,$jumlah_sks_all);

                $data_nilai_smt[]=[
                    'pid'=>'footer',
                    'jumlah_sks_smt'=>$jumlah_sks_smt,
                    'jumlah_am_smt'=>$jumlah_am_smt,
                    'jumlah_m_smt'=>$jumlah_m_smt,
                    'jumlah_sks_all'=>$jumlah_sks_all,
                    'ips'=>$ips,
                    'ipk'=>$ipk,
                ];
                $daftar_nilai[$i]=$data_nilai_smt;                
            }
            
            $rekap=RekapTranskripKurikulumModel::find($mahasiswa->user_id);
            if (is_null($rekap))
            {

                RekapTranskripKurikulumModel::updateOrCreate([
                    'user_id'=>$mahasiswa->user_id,
                    'jumlah_matkul'=>$jumlah_matkul_all,
                    'jumlah_sks'=>$jumlah_sks_all,
                    'jumlah_am'=>$jumlah_am_all,
                    'jumlah_m'=>$jumlah_m_all,
                    'ipk'=>$ipk,
                ]);   
            }
            else
            {
                $rekap->jumlah_matkul=$jumlah_matkul_all;
                $rekap->jumlah_sks=$jumlah_sks_all;
                $rekap->jumlah_am=$jumlah_am_all;
                $rekap->jumlah_m=$jumlah_m_all;
                $rekap->ipk=$ipk;

                $rekap->save();
            }

            $config = ConfigurationModel::getCache();
            $headers=[
                'HEADER_1'=>$config['HEADER_1'],
                'HEADER_2'=>$config['HEADER_2'],
                'HEADER_3'=>$config['HEADER_3'],
                'HEADER_4'=>$config['HEADER_4'],
                'HEADER_ADDRESS'=>$config['HEADER_ADDRESS'],
                'HEADER_LOGO'=>\App\Helpers\Helper::public_path("images/logo.png")
            ];
            $pdf = \Meneses\LaravelMpdf\Facades\LaravelMpdf::loadView('report.ReportTranskripKurikulum1',
                                                                    [
                                                                        'headers'=>$headers,
                                                                        'mahasiswa'=>$mahasiswa,
                                                                        'daftar_nilai'=>$daftar_nilai,                                                                        
                                                                        'jumlah_sks'=>$jumlah_sks_all,
                                                                        'jumlah_am'=>$jumlah_am_all,
                                                                        'jumlah_m'=>$jumlah_m_all,
                                                                        'jumlah_matkul'=>$jumlah_matkul_all,
                                                                        'ipk'=>$ipk,
                                                                        'tanggal'=>\App\Helpers\Helper::tanggal('d F Y')
                                                                    ],
                                                                    [],
                                                                    [
                                                                        'title' => 'Transkrip Kurikulum',
                                                                    ]);

            $file_pdf=\App\Helpers\Helper::public_path("exported/pdf/tk_".$mahasiswa->user_id.'.pdf');
            $pdf->save($file_pdf);

            $pdf_file="storage/exported/pdf/tk_".$mahasiswa->user_id.".pdf";

            return Response()->json([
                                    'status'=>1,
                                    'pid'=>'fetchdata',
                                    'mahasiswa'=>$mahasiswa,
                                    'pdf_file'=>$pdf_file                                    
                                ],200);
        }
    }
    public function printpdf2(Request $request,$id)
    {
        if ($this->hasRole('mahasiswa'))
        {
            $mahasiswa=RegisterMahasiswaModel::select(\DB::raw('
                                                    A.user_id,
                                                    A.nama_mhs,
                                                    A.jk,
                                                    C.email,
                                                    C.nomor_hp,
                                                    A.no_formulir,
                                                    pe3_register_mahasiswa.nim,
                                                    pe3_register_mahasiswa.nirm,
                                                    pe3_register_mahasiswa.kjur,
                                                    B.nama_prodi,
                                                    D.nkelas,
                                                    pe3_register_mahasiswa.tahun,
                                                    E.n_status,
                                                    pe3_register_mahasiswa.created_at,
                                                    pe3_register_mahasiswa.updated_at,
                                                    C.foto
                                                '))
                                                ->join('pe3_formulir_pendaftaran AS A','A.user_id','pe3_register_mahasiswa.user_id')
                                                ->join('pe3_prodi AS B','B.id','pe3_register_mahasiswa.kjur')                                            
                                                ->join('users AS C','C.id','pe3_register_mahasiswa.user_id')
                                                ->join('pe3_kelas AS D','D.idkelas','pe3_register_mahasiswa.idkelas')
                                                ->join('pe3_status_mahasiswa AS E','E.k_status','pe3_register_mahasiswa.k_status')
                                                ->find($this->getUserid());
        }
        else
        {
            $mahasiswa=RegisterMahasiswaModel::select(\DB::raw('
                                                    A.user_id,
                                                    A.nama_mhs,
                                                    A.tempat_lahir,
                                                    A.tanggal_lahir,                                                                                                
                                                    A.ta,
                                                    pe3_register_mahasiswa.nim,
                                                    pe3_register_mahasiswa.nirm,
                                                    pe3_register_mahasiswa.kjur,
                                                    B.nama_prodi,
                                                    D.nkelas,
                                                    pe3_register_mahasiswa.tahun,
                                                    E.n_status,
                                                    pe3_register_mahasiswa.created_at,
                                                    pe3_register_mahasiswa.updated_at,
                                                    C.foto
                                                '))
                                                ->join('pe3_formulir_pendaftaran AS A','A.user_id','pe3_register_mahasiswa.user_id')
                                                ->join('pe3_prodi AS B','B.id','pe3_register_mahasiswa.kjur')                                            
                                                ->join('users AS C','C.id','pe3_register_mahasiswa.user_id')
                                                ->join('pe3_kelas AS D','D.idkelas','pe3_register_mahasiswa.idkelas')
                                                ->join('pe3_status_mahasiswa AS E','E.k_status','pe3_register_mahasiswa.k_status')
                                                ->find($id);
        }
        if (is_null($mahasiswa))
        {
            return Response()->json([
                                    'status'=>0,
                                    'pid'=>'show',                
                                    'message'=>["Mahasiswa dengan ($id) gagal diperoleh"]
                                ],422); 
        }
        else
        {
            $user_id=$mahasiswa->user_id;
            $daftar_nilai=[];
            
            $pdf = new \App\Helpers\HelperReport('fpdf','Legal');                   
            
            $pdf->setHeader();

            $rpt=$pdf->report;

            $rpt->setTitle('Transkrip Nilai Semester');
            $rpt->setSubject('Transkrip Nilai Semester');

            $row=$pdf->getCurrentRow();                
            $rpt->SetFont ('helvetica','B',12);	
            $rpt->setXY(0.5,$row);			
            $rpt->Cell(0,0.5,'TRANSKRIP NILAI SEMESTER',0,2,'C');

            $row+=0.6;
            $rpt->setXY(0.5,$row);	            
            // left
            $rpt->SetFont ('helvetica','B',8);
            $rpt->Cell(4,0.5,'NAMA MAHASISWA',0);

            $rpt->SetFont ('helvetica','',8);
            $rpt->Cell(0.3,0.5,':',0);
            $rpt->Cell(6,0.5,$mahasiswa->nama_mhs,0);
            // right
            $rpt->SetFont ('helvetica','B',8);
            $rpt->Cell(4,0.5,'PROGRAM STUDI',0);

            $rpt->SetFont ('helvetica','',8);
            $rpt->Cell(0.3,0.5,':',0);
            $rpt->Cell(6,0.5,$mahasiswa->nama_prodi,0);

            $row+=0.5;
            $rpt->setXY(0.5,$row);	            
            // left
            $rpt->SetFont ('helvetica','B',8);
            $rpt->Cell(4,0.5,'TEMPAT, TANGGAL LAHIR',0);

            $rpt->SetFont ('helvetica','',8);
            $rpt->Cell(0.3,0.5,':',0);
            $rpt->Cell(6,0.5,$mahasiswa->tempat_lahir.', '.\App\Helpers\Helper::tanggal('d F Y',$mahasiswa->tanggal_lahir),0);
            // right
            $rpt->SetFont ('helvetica','B',8);
            $rpt->Cell(4,0.5,'FAKULTAS',0);

            $rpt->SetFont ('helvetica','',8);
            $rpt->Cell(0.3,0.5,':',0);
            $rpt->Cell(6,0.5,'-',0);

            $row+=0.5;
            $rpt->setXY(0.5,$row);	            
            // left
            $rpt->SetFont ('helvetica','B',8);
            $rpt->Cell(4,0.5,'NIM',0);

            $rpt->SetFont ('helvetica','',8);
            $rpt->Cell(0.3,0.5,':',0);
            $rpt->Cell(6,0.5,$mahasiswa->nim,0);
            // right
            $rpt->SetFont ('helvetica','B',8);
            $rpt->Cell(4,0.5,'KONSENTRASI',0);

            $rpt->SetFont ('helvetica','',8);
            $rpt->Cell(0.3,0.5,':',0);
            $rpt->Cell(6,0.5,'-',0);

            $row+=0.5;
            $rpt->setXY(0.5,$row);	            
            // left
            $rpt->SetFont ('helvetica','B',8);
            $rpt->Cell(4,0.5,'NIRM',0);

            $rpt->SetFont ('helvetica','',8);
            $rpt->Cell(0.3,0.5,':',0);
            $rpt->Cell(6,0.5,$mahasiswa->nirm,0);
            // right
            $rpt->SetFont ('helvetica','B',8);
            $rpt->Cell(4,0.5,'ANGKATAN',0);

            $rpt->SetFont ('helvetica','',8);
            $rpt->Cell(0.3,0.5,':',0);
            $rpt->Cell(6,0.5,$mahasiswa->ta,0);

            $row+=0.5;
            $rpt->setXY(0.5,$row);	
            $rpt->SetFont ('helvetica','B',8);     
            //ganjil                        				
            $rpt->Cell(0.7,0.5,'NO',1,null,'C');
            $rpt->Cell(1.5,0.5,'KODE',1,null,'C');
            $rpt->Cell(5,0.5,'MATA KULIAH',1,null,'C');
            $rpt->Cell(1,0.5,'SKS',1,null,'C');
            $rpt->Cell(1,0.5,'HM',1,null,'C');
            $rpt->Cell(1,0.5,'AM',1,null,'C');
            $rpt->Cell(0.1,0.5,'');				
            //genap                       			
            $rpt->Cell(0.7,0.5,'NO',1,null,'C');
            $rpt->Cell(1.5,0.5,'KODE',1,null,'C');
            $rpt->Cell(5,0.5,'MATA KULIAH',1,null,'C');
            $rpt->Cell(1,0.5,'SKS',1,null,'C');
            $rpt->Cell(1,0.5,'HM',1,null,'C');
            $rpt->Cell(1,0.5,'AM',1,null,'C');
            $rpt->Cell(0.1,0.5,'');				

            $totalMatkul=0;
            $totalSks=0;
            $totalAM=0;
            $totalM=0;
            $row+=0.5;
            $row_ganjil=$row;
            $row_genap = $row;

            // $rpt->setXY(0.5,$row);            
            $tambah_ganjil_row=false;		
            $tambah_genap_row=false;
            for ($i = 1; $i <= 8; $i++) {
                $no_semester=1;
                $rpt->SetFont ('helvetica','',6);
                $daftar_matkul=MatakuliahModel::select(\DB::raw('
                                        0 AS no,
                                        id,
                                        group_alias,                                    
                                        kmatkul,
                                        nmatkul,
                                        sks,
                                        semester                                                                                  
                                    '))
                                    ->where('kjur',$mahasiswa->kjur)
                                    ->where('ta',$mahasiswa->tahun) 
                                    ->where('semester',$i)  
                                    ->orderBy('semester','ASC')                      
                                    ->orderBy('kmatkul','ASC')    
                                    ->get();
                if ($i%2==0) 
                {//genap
                    $smt_genap=$i;
                    $tambah_genap_row=true;
                    $genap_total_m=0;
                    $genap_total_sks=0;		
                    foreach ($daftar_matkul as $key=>$item)
                    {
                        $subquery=\DB::table('pe3_nilai_matakuliah AS A')
                                    ->select(\DB::raw('
                                        A.id
                                    '))
                                    ->join('pe3_krsmatkul AS B','A.krsmatkul_id','B.id')
                                    ->join('pe3_krs AS C','B.krs_id','C.id')
                                    ->join('pe3_penyelenggaraan AS D','A.penyelenggaraan_id','D.id')
                                    ->where('C.user_id',$mahasiswa->user_id)
                                    ->where('D.matkul_id',$item->id)
                                    ->orderBy('A.n_mutu','DESC')
                                    ->limit(1);

                        $nilai=\DB::table('pe3_nilai_matakuliah AS A')
                                    ->select(\DB::raw('
                                        A.n_kual,                                
                                        A.n_mutu
                                    '))
                                    ->joinSub($subquery,'B',function($join){
                                        $join->on('A.id','=','B.id');
                                    })
                                    ->get();
                        
                        $rpt->setXY(10.8,$row_genap);	
                        $rpt->Cell(0.7,0.5,$no_semester,1,null,'C');
                        $rpt->Cell(1.5,0.5,$item['kmatkul'],1,null,'C');
                        $rpt->Cell(5,0.5,$item['nmatkul'],1,null);
                        $rpt->Cell(1,0.5,$item['sks'],1,null,'C');
                        $totalMatkul+=1;
                        $genap_total_sks += $item['sks'];
                        if (isset($nilai[0]))
                        {
                            $HM=$nilai[0]->n_kual;
                            $AM=number_format($nilai[0]->n_mutu,0);
                            $M=$AM*$item->sks;
                            $genap_total_m+=$M;
                            $totalSks+=$item->sks;
                            $totalM+=$M;
                            $totalAM+=$AM;

                            $rpt->Cell(1,0.5,$HM,1,null,'C');
                            $rpt->Cell(1,0.5,$AM,1,null,'C');
                        }
                        else
                        {
                            $rpt->Cell(1,0.5,'-',1,null,'C');
                            $rpt->Cell(1,0.5,'-',1,null,'C');
                        }
                        $rpt->Cell(0.1,0.5,'');				
                        $row_genap+=0.5;
                        $no_semester++;
                    }
                    $ipk_genap=\App\Helpers\HelperAkademik::formatIPK($totalM,$totalSks);
                }
                else
                {//ganjil
                    $tambah_ganjil_row=true;
                    $ganjil_total_m=0;
                    $ganjil_total_sks=0;
                    $smt_ganjil=$i;
                    foreach ($daftar_matkul as $key=>$item)
                    {
                        $subquery=\DB::table('pe3_nilai_matakuliah AS A')
                                    ->select(\DB::raw('
                                        A.id
                                    '))
                                    ->join('pe3_krsmatkul AS B','A.krsmatkul_id','B.id')
                                    ->join('pe3_krs AS C','B.krs_id','C.id')
                                    ->join('pe3_penyelenggaraan AS D','A.penyelenggaraan_id','D.id')
                                    ->where('C.user_id',$mahasiswa->user_id)
                                    ->where('D.matkul_id',$item->id)
                                    ->orderBy('A.n_mutu','DESC')
                                    ->limit(1);

                        $nilai=\DB::table('pe3_nilai_matakuliah AS A')
                                    ->select(\DB::raw('
                                        A.n_kual,                                
                                        A.n_mutu
                                    '))
                                    ->joinSub($subquery,'B',function($join){
                                        $join->on('A.id','=','B.id');
                                    })
                                    ->get();
                        $rpt->setXY(0.5,$row_ganjil);	                                        				
                        $rpt->Cell(0.7,0.5,$no_semester,1,null,'C');
                        $rpt->Cell(1.5,0.5,$item['kmatkul'],1,null,'C');
                        $rpt->Cell(5,0.5,$item['nmatkul'],1,null);
                        $rpt->Cell(1,0.5,$item['sks'],1,null,'C');
                        $totalMatkul+=1;
                        $ganjil_total_sks += $item['sks'];
                        if (isset($nilai[0]))
                        {
                            $HM=$nilai[0]->n_kual;
                            $AM=number_format($nilai[0]->n_mutu,0);
                            $M=$AM*$item->sks;
                            $ganjil_total_m+=$M;
                            $totalSks+=$item->sks;
                            $totalM+=$M;
                            $totalAM+=$AM;

                            $rpt->Cell(1,0.5,$HM,1,null,'C');
                            $rpt->Cell(1,0.5,$AM,1,null,'C');
                        }
                        else
                        {
                            $rpt->Cell(1,0.5,'-',1,null,'C');
                            $rpt->Cell(1,0.5,'-',1,null,'C');                            
                        }                                                
                        $rpt->Cell(0.1,0.5,'');				
                        $row_ganjil+=0.5;
                        $no_semester++;
                    }
                    $ipk_ganjil=\App\Helpers\HelperAkademik::formatIPK($totalM,$totalSks);
                }
                if ($tambah_ganjil_row && $tambah_genap_row) 
                {
                    $tambah_ganjil_row=false;
                    $tambah_genap_row=false;						
                    if ($row_ganjil < $row_genap){ // berarti tambah row yang ganjil
                        $sisa=$row_ganjil + ($row_genap-$row_ganjil);
                        for ($c=$row_ganjil;$c <= $row_genap;$c+=0.5) {
                            $rpt->setXY(0.5,$c);
                            $rpt->Cell(10.2,0.5,'',1,0);
                        }
                        $row_ganjil=$sisa;
                    }else{ // berarti tambah row yang genap
                        $sisa=$row_genap + ($row_ganjil-$row_genap);						
                        for ($c=$row_genap;$c < $row_ganjil;$c+=0.5) {
                            $rpt->setXY(10.8,$c);
                            $rpt->Cell(10.2,0.5,'',1,0);
                        }
                        $row_genap=$sisa;
                    }
                    $rpt->SetFont ('helvetica','B',6);
                    //ganjil
                    $rpt->setXY(0.5,$row_ganjil);	                                        				
                    $rpt->Cell(2.2,0.5,'SEMESTER',1,null,'C');                    
                    $rpt->Cell(5,0.5,'Jumlah',1,null,'L');                    
                    $rpt->Cell(1,0.5,$ganjil_total_sks,1,null,'C');                    
                    $rpt->Cell(1,0.5,'',1,null,'C');                    
                    $rpt->Cell(1,0.5,$ganjil_total_m,1,null,'C');                    

                    $row_ganjil+=0.5;
                    $rpt->setXY(0.5,$row_ganjil);	                                        				
                    $rpt->Cell(2.2,0.5,$smt_ganjil,1,null,'C');                    
                    $rpt->Cell(7,0.5,'Indeks Prestasi Semester',1,null,'L');                    
                    $ips=\App\Helpers\HelperAkademik::formatIPK($ganjil_total_m,$ganjil_total_sks);                                       				
                    $rpt->Cell(1,0.5,$ips,1,null,'C');

                    $row_ganjil+=0.5;
                    $rpt->setXY(2.7,$row_ganjil);	                        
                    $rpt->Cell(7,0.5,'Indeks Prestasi Kumulatif',1,null,'L');                      
                    $rpt->Cell(1,0.5,$ipk_ganjil,1,null,'C');

                    $row_ganjil+=0.6;
                    
                    //genap                    
                    $rpt->setXY(10.8,$row_genap);	    
                    $rpt->Cell(2.2,0.5,'SEMESTER',1,null,'C');                                                        				
                    $rpt->Cell(5,0.5,'Jumlah',1,null,'L');                    
                    $rpt->Cell(1,0.5,$genap_total_sks,1,null,'C');  
                    $rpt->Cell(1,0.5,'',1,null,'C');                    
                    $rpt->Cell(1,0.5,$genap_total_m,1,null,'C');  

                    $row_genap+=0.5;
                    $rpt->setXY(10.8,$row_genap);	      
                    $rpt->Cell(2.2,0.5,$smt_genap,1,null,'C');                                  				
                    $rpt->Cell(7,0.5,'Indeks Prestasi Semester',1,null,'L'); 
                    $ips=\App\Helpers\HelperAkademik::formatIPK($genap_total_m,$genap_total_sks);                                       				
                    $rpt->Cell(1,0.5,$ips,1,null,'C');
                                       
                    $row_genap+=0.5;
                    $rpt->setXY(13,$row_genap);	                                        				
                    $rpt->Cell(7,0.5,'Indeks Prestasi Kumulatif',1,null,'L');
                    $rpt->Cell(1,0.5,$ipk_genap,1,null,'C');
                    
                    $row_genap+=0.6;
                }               
            }
            $rpt->SetFont ('helvetica','B',6);
            $row=$row_genap+0.1;
            $rpt->SetXY(4.3,$row);	
            $rpt->Cell(3,0.5,'Total Kredit Kumulatif',0,0,'L');
            $rpt->Cell(0.2,0.5,':',0,0,'L');
            $rpt->SetFont ('helvetica','',6);
            $rpt->Cell(1,0.5,$totalSks,0,0,'L');

            $rpt->SetFont ('helvetica','B',6);                                    	
            $rpt->Cell(3,0.5,'Jumlah Nilai Kumulatif',0,0,'L');
            $rpt->Cell(0.2,0.5,':',0,0,'L');
            $rpt->SetFont ('helvetica','',6);
            $rpt->Cell(1,0.5,$totalM,0,0,'L');
            
            $rpt->SetFont ('helvetica','B',6);   
            $rpt->Cell(3,0.5,'Indeks Prestasi Kumulatif',0,0,'L');
            $rpt->Cell(0.2,0.5,':',0,0,'L');
            $ipk=\App\Helpers\HelperAkademik::formatIPK($totalM,$totalSks);
            $rpt->SetFont ('helvetica','',6);
            $rpt->Cell(1,0.5,$ipk,0,0,'C');
            
            $rpt->SetFont ('helvetica','B',6);   
            $row+=0.5;
            $rpt->SetXY(10.3,$row);	
            $rpt->Cell(5,0.5,'Tanjungpinang, '.\App\Helpers\Helper::tanggal('d F Y'),0,0,'L');
            $row+=0.3;
            $rpt->SetXY(10.3,$row);	
            $rpt->Cell(5,0.5,'Wakil Ketua I',0,0,'L');

            $row+=1.1;
            $rpt->SetXY(10.3,$row);	
            $rpt->Cell(5,0.5,'Suhardiman, M.Pd.I',0,0,'L');
            $row+=0.3;
            $rpt->SetXY(10.3,$row);	
            $rpt->Cell(5,0.5,'NIDN: 2128087201 / LEKTOR',0,0,'L');

            $file_pdf=\App\Helpers\Helper::public_path("exported/pdf/tk_".$mahasiswa->user_id.'.pdf');            

            $pdf_file="storage/exported/pdf/tk_".$mahasiswa->user_id.".pdf";            

            $pdf->save($file_pdf);            

            $rekap=RekapTranskripKurikulumModel::find($mahasiswa->user_id);
            if (is_null($rekap))
            {

                RekapTranskripKurikulumModel::updateOrCreate([
                    'user_id'=>$mahasiswa->user_id,
                    'jumlah_matkul'=>$totalMatkul,
                    'jumlah_sks'=>$totalSks,
                    'jumlah_am'=>$totalAM,
                    'jumlah_m'=>$totalM,
                    'ipk'=>$ipk,
                ]);   
            }
            else
            {
                $rekap->jumlah_matkul=$totalMatkul;
                $rekap->jumlah_sks=$totalSks;
                $rekap->jumlah_am=$totalAM;
                $rekap->jumlah_m=$totalM;
                $rekap->ipk=$ipk;

                $rekap->save();
            }
            return Response()->json([
                                    'status'=>1,
                                    'pid'=>'fetchdata',
                                    'mahasiswa'=>$mahasiswa,
                                    'pdf_file'=>$pdf_file                                    
                                ],200);
        }
    }
}