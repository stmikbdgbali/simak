<html>
<head>
<style>
.header{
    width:100%;
    font-weight:bold;
    text-align:center;
    border-collapse: collapse;   
    border-bottom: 2px solid black;
}
.table {		
    width:100%;
    border-collapse: collapse;   
    font-size: 12px; 
    margin-bottom: 10px;
}
.table th {
    border: 1px solid #000;	    
}
.table td {
    border: 1px solid #000;	 
    padding:5px 5px;   
}
h2{
    text-align:center;
}
</style>
</head>
<body>
@include('report.ReportHeader')
<h2>KARTU HASIL STUDI</h2>
<table style="font-size:14px">
    <tbody>
        <tr>
            <td><strong>Nama Mahasiswa</strong></td>
            <td>:</td>
            <td width="250">{{$data_krs->nama_mhs}} ({{$data_krs->jk}})</td>

            <td><strong>Fakultas</strong></td>
            <td>:</td>
            <td>-</td>
        </tr>
        <tr>
            <td><strong>NIRM</strong></strong></td>
            <td>:</td>
            <td>{{$data_krs->nirm}}</td>

            <td><strong>Program Studi</strong></td>
            <td>:</td>
            <td>{{$data_krs->nama_prodi}}</td>
        </tr>
        <tr>
            <td><strong>NIM</strong></td>
            <td>:</td>
            <td>{{$data_krs->nim}}</td>

            <td><strong>Semester / T.A</strong></td>
            <td>:</td>
            <td>{{ucwords(strtolower($nama_semester))}} / {{$data_krs->tahun}}-{{$data_krs->tahun+1}}</td>
        </tr>
    </tbody>
</table>
<table class="table">
    <thead>
        <tr>
            <th width="10" rowspan="2">NO</th>
            <th width="250" rowspan="2">MATAKULIAH</th>
            <th width="50" rowspan="2">SKS</th>
            <th width="100" colspan="2">NILAI</th>
            <th rowspan="2" width="50" >SKS x AM</th>
            <th rowspan="2">NAMA DOSEN</th>
        </tr>
        <tr>            
            <th width="50">HM</th>
            <th width="50">AM</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($daftar_nilai as $key=>$item)
        <tr>
            <td style="text-align:center">
                {{ $key + 1 }}    
            </td>  
            <td>
                {{ $item['nmatkul']}}    
            </td>              
            <td style="text-align:center">                  
                {{ $item['sks']}}    
            </td>  
            <td style="text-align:center">                  
                {{ $item['HM']}}    
            </td>  
            <td style="text-align:center">                  
                {{ $item['AM'],0}}    
            </td>  
            <td style="text-align:center">                  
                {{ $item['M']}}    
            </td>  
            <td>{{$item['nama_dosen']}}</td>            
        </tr>
        @endforeach
    </tbody>
    <tfoot>
        <tr>
            <td colspan="2" style="text-align:right"><strong>Jumlah</strong></td>            
            <td style="text-align:center">{{$jumlah_sks}}</td>            
            <td></td>
            <td style="text-align:center">{{$jumlah_am}}</td>            
            <td style="text-align:center">{{$jumlah_m}}</td>  
            <td></td>          
        </tr>   
        <tr>
            <td colspan="2" style="text-align:right"><strong>Index Prestasi Semester</strong></td>            
            <td style="text-align:center" colspan="4">{{number_format($ips,2)}}</td>                        
        </tr>        
        <tr>
            <td colspan="2" style="text-align:right"><strong>SKS Total</strong></td>            
            <td style="text-align:center" colspan="4">{{$data_krs->jumlah_sks_2}}</td>                        
        </tr>        
        <tr>
            <td colspan="2" style="text-align:right"><strong>IPK</strong></td>            
            <td style="text-align:center" colspan="4">{{number_format($ipk,2)}}</td>                        
        </tr>        
    </tfoot>
</table>
<table width="100%" cellspacing="0px" cellpadding="0px">
    <tr>
        <td width="65%"></td>
        <td><strong>Tanjungpinang, {{$tanggal}}</strong></td>                                   
    </tr>      
    <tr>
        <td style="font-weight:bold;font-size:14px;text-align:left">DIKETAHUI OLEH<br>WAKIL KETUA I</td>        
        <td style="font-weight:bold;font-size:14px;text-align:left">KETUA PROGRAM STUDI<br>{{$data_krs->nama_prodi}}</td>
    </tr>
    <tr>
        <td width="50%" style="text-align:left">
            <br>
            <br>
            <br>
            <br>
            <br>
            <span>
                <strong><u>SUHARDIMAN. M.Pd.I</u></strong><br>
                <strong>LEKTOR NIDN:</strong> 2128087201
            </span>                
        </td>        
        <td width="50%" style="text-align:left">
            <br>
            <br>
            <br>
            <br>
            <br>
            <span>
                <strong><u>{{$kaprodi->name}}</u></strong><br>
                <strong>NIDN/NIDK:</strong> {{$kaprodi->nidn}} / {{$kaprodi->nipy}}
            </span>                
        </td>
    </tr>
</table>
</body>
</html>
