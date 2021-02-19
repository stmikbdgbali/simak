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
}
h2, h3{
    text-align:center;
    margin:1px
}
</style>
</head>
<body>
@include('report.ReportHeader')
<h2>KONVERSI NILAI</h2>
<h3>PROGRAM STUDI {{strtoupper($data_konversi->nama_prodi)}}</h3>
<h3>KURIKULUM TAHUN {{strtoupper($data_konversi->tahun)}}</h3>
<table style="font-size:12px">
    <tbody>
        <tr>
            <td width="180"><strong>NAMA MAHASISWA</strong></td>
            <td width="30">:</td>
            <td>{{$data_konversi->nama_mhs}}</td>            
        </tr> 
        <tr>
            <td><strong>ALAMAT</strong></td>
            <td>:</td>
            <td>{{$data_konversi->alamat}}</td>            
        </tr>                    
        <tr>
            <td><strong>NO. TELEPON/HP</strong></td>
            <td>:</td>
            <td>{{$data_konversi->no_telp}}</td>            
        </tr>                    
        <tr>
            <td><strong>NIM ASAL / SISTEM</strong></td>
            <td>:</td>
            <td>{{$data_konversi->nim_asal}} / {{$data_konversi->nim==null?'N.A':$data_konversi->nim}} </td>            
        </tr>   
        <tr>
            <td><strong>PERGURUAN TINGGI ASAL</strong></td>
            <td>:</td>
            <td>[{{$data_konversi->kode_pt_asal}}] {{$data_konversi->nama_pt_asal}}</td>            
        </tr>             
        <tr>
            <td><strong>PROGRAM STUDI ASAL</strong></td>
            <td>:</td>
            <td>[{{$data_konversi->kode_ps_asal}}] {{$data_konversi->nama_ps_asal}} JENJANG {{$data_konversi->nama_jenjang}}</td>            
        </tr>             
    </tbody>
</table>
<table class="table">    
    <thead>
        <tr>
            <th width="10">NO</th>
            <th width="70">KODE</th>
            <th width="250">NAMA</th>            
            <th width="50">SKS</th>
            <th width="50">KODE MATKUL ASAL</th>
            <th width="250">MATAKULIAH ASAL</th>
            <th width="50">SKS ASAL</th>
            <th width="50">NILAI</th>            
        </tr>
    </thead>
    <tbody>
        @php
            $jumlah_matkul=0;
            $jumlah_sks=0;
        @endphp
        @foreach ($daftar_nilai as $key=>$item)
        <tr>
            <td style="text-align:center">{{$key + 1}}</td>
            <td style="text-align:center">{{$item->kmatkul}}</td>
            <td>                                       
                {{$item->nmatkul}}
            </td> 
            <td style="text-align:center">                                       
                {{$item->sks}}
            </td> 
            <td style="text-align:center">                                       
                {{$item->kmatkul_asal}}
            </td> 
            <td>                                       
                {{$item->matkul_asal}}
            </td> 
            <td style="text-align:center">                                       
                {{$item->sks_asal}}
            </td> 
            <td style="text-align:center">                                       
                {{$item->n_kual}}
            </td> 
        </tr>
        @php
            if (!is_null($item->n_kual))
            {
                $jumlah_matkul+=1;
                $jumlah_sks+=$item->sks;
            }            
        @endphp
        @endforeach
    </tbody>
</table>
<table style="font-size:12px">
    <tbody>
        <tr>
            <td width="200"><strong>MATAKULIAH TERKKONVERSI</strong></td>           
            <td width="5">:</td>
            <td>{{$jumlah_matkul}}</td>            
        </tr>                
        <tr>
            <td width="200"><strong>SKS TERKKONVERSI</strong></td>           
            <td width="5">:</td>
            <td>{{$jumlah_sks}}</td>                       
        </tr>                
    </tbody>
</table>
<table style="font-size:12px">
    <tbody>
        <tr>
            <td width="65%"></td>
            <td><strong>Tanjungpinang, {{$tanggal}}</strong></td>                                   
        </tr>        
        <tr>
            <td width="65%"></td>
            <td><strong>Wakil Ketua I Bidang Akademik</strong></td>                                   
        </tr>        
        <tr>
            <td width="65%"></td>
            <td>
                <br>
                <br>
                <br>
                <br>
                <br><strong><u>SUHARDIMAN, M.Pd.I</u></strong><br>
                <strong>LEKTOR NIDN:</strong>2128087201
            </td>                                   
        </tr>        
            
    </tbody>
</table>
</body>
</html>
