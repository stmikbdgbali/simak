<?php

namespace App\Helpers;
use \Codedge\Fpdf\Fpdf\Fpdf;

use App\Models\System\ConfigurationModel;

class HelperReport 
{
    /**
     * global object each driver 
     */
    public $report; 
    /**
	* posisi row sekarang	
	*/
    private $currentRow=1;
    
    /**
     * digunakan untuk inisialisasi awal
     */
    public function __construct($driver='fpdf',$size='A4',$orientation='P')
    {
        switch($driver)
        {
            case 'fpdf' :
                $this->driver = $driver;
                $this->report = new Fpdf($orientation,'cm',$size);
                $this->report->setMargins(0.4,0.3);
                $this->report->addPage();
            break;
            default :
                throw new Exception ("Driver report ($driver) tidak dikenal");
        }        
    }   
    public function setHeader()
    {
        $config = ConfigurationModel::getCache();
        switch($this->driver)
        {
            case 'fpdf' :
                $rpt=$this->report;
                $rpt->Image(Helper::public_path("images/logo.png"),1,null,2.2);
                
                $rpt->SetFont ('helvetica','B',12);
                $rpt->SetXY(3,0.3);
                $rpt->Cell (0,0.5,$config['HEADER_1'],0,2,'C');	
                $rpt->Cell (0,0.5,$config['HEADER_2'],0,2,'C');
                
                $rpt->SetFont ('helvetica','B',10);                
                $rpt->Cell (0,0.5,$config['HEADER_3'],0,2,'C');                
                $rpt->Cell (0,0.5,$config['HEADER_4'],0,2,'C');
                $rpt->Cell (0,0.5,$config['HEADER_ADDRESS'],0,2,'C');
                $rpt->Line(0,3,$rpt->GetPageWidth(),3);
                // $rpt->Line(20, 45, 210-20, 45); 
                $this->currentRow=3.2;   
            break;
            
        }           
    }
    public function setCurrentRow($row)
    {
        $this->currentRow=$row;
    }
    public function getCurrentRow()
    {
        return $this->currentRow;
    }
    public function save($nama_file,$mode='F')
    {
        $this->report->Output($mode,$nama_file);
    }
}