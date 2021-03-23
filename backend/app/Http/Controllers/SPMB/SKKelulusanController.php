<?php

namespace App\Http\Controllers\SPMB;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\SPMB\FormulirPendaftaranModel;

use App\Models\System\ConfigurationModel;

class SKKelulusanController extends Controller {
	/**
	 * digunakan untuk mencetak sk kelulusan mahasiswa baru
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function printtopdf1(Request $request,$id)
	{
		$formulir = FormulirPendaftaranModel::find($id);

		if (is_null($formulir))
		{
				return Response()->json([
																'status'=>0,
																'pid'=>'fetchdata',                
																'message'=>["Formulir Pendaftaran dengan ID ($id) gagal diperoleh"]
														],422); 
		}
		else
		{
			$config = ConfigurationModel::getCache();
			$headers=[					
				'HEADER_KOP_SURAT'=>\App\Helpers\Helper::public_path("images/headers/headerreport.png")
			];
			$pdf = \Meneses\LaravelMpdf\Facades\LaravelMpdf::loadView('spmb.ReportSKKelulusan',
																															[
																																'headers'=>$headers,
																																'sign_qrcode'=>\App\Helpers\Helper::public_path('images/signature/166168ec-228c-4aae-9ac3-878f785e14bd.png')
																															],
																															[],
																															[
																																'format'=>'A4',
																																'title'=>'SK Kelulusan',
																															]);

			$file_pdf=\App\Helpers\Helper::public_path("exported/pdf/sklulus_".$formulir->user_id.'.pdf');
			$pdf->save($file_pdf);

			$pdf_file="storages/exported/pdf/sklulus_".$formulir->user_id.".pdf";

			return Response()->json([
															'status'=>1,
															'pid'=>'fetchdata',															
															'pdf_file'=>$pdf_file                        
													],200);
		}			
	}
}