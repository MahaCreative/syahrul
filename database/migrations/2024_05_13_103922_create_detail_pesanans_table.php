<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('detail_pesanans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pesanan_id')->constrained('pesanans')->onDelete('cascade');
            $table->foreignId('paket_id')->references('id')->on('pakets')->onDelete('cascade');
            $table->date('tanggal_foto');
            $table->time('jam_foto');
            $table->integer('harga_booking');
            $table->longText('catatan')->nullable();
            $table->string('catatan_penolakan')->nullable();
            $table->string('status_pesanan_paket')->default('menunggu konfirmasi'); // menunggu konfirmasi, di terima, di tolak
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_pesanans');
    }
};
