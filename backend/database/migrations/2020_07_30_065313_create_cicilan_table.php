<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCicilanTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{   
		Schema::defaultStringLength(191);
		Schema::create('pe3_cicilan', function (Blueprint $table) {
			$table->uuid('id')->primary(); 
			$table->uuid('user_id');
			
			$table->string('no_formulir',11)->nullable();
			$table->string('nim')->nullable(); 

			$table->smallInteger('kombi_id'); 
			$table->string('nama_kombi');  
			$table->decimal('biaya',15,2);
			$table->string('promocode')->nullable();
			$table->string('promotype')->nullable();
			$table->decimal('promovalue',15,2)->default(0);
			$table->smallInteger('jumlah')->default(0);                                                            
			$table->tinyInteger('bulan')->nullable();                                                            
			$table->year('tahun')->nullable();
			$table->decimal('total',15,2)->default(0); 
			$table->integer('jumlah_cicilan')->default(0); 
			$table->integer('sudah_nyicil')->default(0); 
			$table->decimal('sisa_rp_cicilan',15,2)->default(0); 
			$table->date('tanggal');
			
			$table->unsignedInteger('kjur');
			$table->year('ta');
			$table->tinyInteger('idsmt');
			$table->char('idkelas',1);
			$table->string('desc')->nullable();
			$table->tinyInteger('status')->default(0); 

			$table->timestamps();      
		});

		Schema::create('pe3_cicilan_detail', function (Blueprint $table) {
			$table->uuid('id')->primary(); 
			$table->uuid('user_id');
			$table->uuid('cicilan_id');
			$table->uuid('transaksi_id');
			$table->uuid('transaksi_detail_id');
			$table->decimal('cicilan',15,2)->default(0);
			$table->timestamps();   
			
			$table->foreign('cicilan_id')
				->references('id')
				->on('pe3_cicilan')
				->onDelete('cascade') 
				->onUpdate('cascade');
				
			$table->foreign('transaksi_id')
				->references('id')
				->on('pe3_transaksi')
				->onDelete('cascade') 
				->onUpdate('cascade');

			$table->foreign('transaksi_detail_id')
				->references('id')
				->on('pe3_transaksi_detail')
				->onDelete('cascade') 
				->onUpdate('cascade');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('pe3_cicilan_detail');
		Schema::dropIfExists('pe3_cicilan');
	}
}
