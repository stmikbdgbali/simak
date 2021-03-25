<html>
<head>
<style>
body {
  font-family:'Times New Roman';
  font-size:14px;
}
@page {  
	footer: page-footer;
}
</style>
</head>
<body>
@include('spmb.ReportHeaderPMB')
<br>
<br>
<table>
  <tr>
    <td width="100">Nomor</td>
    <td>:</td>
    <td>{{$nomor_surat}}</td>
  </tr>
  <tr>
    <td>Lampiran</td>
    <td>:</td>
    <td>-</td>
  </tr>
  <tr>
    <td>Hal</td>
    <td>:</td>
    <td><strong>Surat Keterangan Lulus Tes Calon Mahasiswa</strong></td>
  </tr>
</table>
<p>
  Kepada Yth.<br>
  <strong>Sdr./i {{strtoupper($formulir->nama_mhs)}}</strong><br>
  DI – <br>
  &nbsp;&nbsp;&nbsp;<u>Tempat</u>
</p>
<p style="text-align: justify;text-justify: inter-word;">
Puji syukur kita panjatkan kehadirat Tuhan Yang Maha Esa atas berkah dan rahmat-Nya sehingga kita dapat melaksanakan aktivitas keseharian.
</p>
<p style="text-align: justify;text-justify: inter-word;">
Menindak lanjuti hasil TES Kompetensi Calon Mahasiswa yang telah diselenggarakan oleh STMIK Bandung Bali, pada tanggal {{$tanggal_lulus}} maka dengan ini kami sampaikan bahwa saudara/i telah LULUS tes sebagai mahasiswa STMIK Bandung Bali tahun akademik {{$formulir->ta}}/{{$formulir->ta+1}}.
</p>
<p style="text-align: justify;text-justify: inter-word;">
Sebagai kelengkapan proses penerimaan mahasiswa baru, kami harapkan kehadiran Saudara/i untuk melakukan pendaftaran ulang pada kampus STMIK BANDUNG BALI segera setelah pelaksanaan TES Kompetensi Calon Mahasiswa selesai dilaksanakan paling lambat tanggal {{$next_day}} dengan melengkapi beberapa persyaratan sebagai berikut :
</p>
<ol>
  <li>
    Membayar Biaya dengan Rincian Biaya sebagai berikut :
    <ul>
      <li>SPP Bulan September 2021 (Rp. {{$spp}})</li>
      <li>PSPT + Jas Almamater (Rp. {{$jas_almamater}})</li>
      <li>Pengembangan (Rp. {{$biaya_pengembangan}})</li>
    </ul>  
  </li>
  <li>
    Metode Pembayaran :
    <ul>
      <li>Setor tunai Bank BPD Bali (Menyebutkan kode billing dan nama kampus STMIK Bandung Bali) Atau</li>
      <li>Setor tunai / transfer BNI <strong>(No. Rek 1000628460 a.n : STMIK Bandung Bali</strong></li>      
    </ul>  
  </li>
  <li>Mengunggah/Upload bukti pembayaran di https://simak.stmikbandungbali.ac.id
</li>
</ol>
<p>Demikian surat pemberitahuan ini, atas perhatian Saudara/i, kami sampaikan terima kasih.</p>
<p>
  Denpasar, {{$tanggal_lulus}}<br>
  Ketua PPMB,<br>
  <img src="{{$sign_qrcode}}" height="150"><br>
  <u>{{$sign_name}}</u><br>  
</p>
<htmlpagefooter name="page-footer">
  <hr>
  Jl. Pb. Sudirman 7X Blok C, Denpasar - 8032. Telp/Fax. 0361 8421556 | 085100475740<br>
  Email: info@stmikbandungbali.ac.id Web: https://www.stmikbandungbali.ac.id
</htmlpagefooter>
</body>
</html>