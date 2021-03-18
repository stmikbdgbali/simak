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
					'HEADER_1'=>$config['HEADER_1'],
					'HEADER_2'=>$config['HEADER_2'],
					'HEADER_3'=>$config['HEADER_3'],
					'HEADER_4'=>$config['HEADER_4'],
					'HEADER_ADDRESS'=>$config['HEADER_ADDRESS'],
					'HEADER_LOGO'=>\App\Helpers\Helper::public_path("images/logo.png")
			];
			$pdf = \Meneses\LaravelMpdf\Facades\LaravelMpdf::loadView('spmb.ReportSKKelulusan',
																															[
																																	'headers'=>$headers,																																	
																															],
																															[],
																															[
																																	'title' => 'SK Kelulusan',
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