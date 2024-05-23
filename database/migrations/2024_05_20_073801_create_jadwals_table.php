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
        Schema::create('jadwals', function (Blueprint $table) {
            $table->id();

            $table->string('kd_pesanan')->nullable();
            $table->string('nama_paket');
            $table->string('judul_jadwal');
            $table->string('nam_pelanggan');
            $table->string('kontak_pelanggan');
            $table->string('lokasi');
            $table->date('tanggal_foto');
            $table->time('jam_foto');

            $table->longText('catatan')->nullable();
            $table->string('status')->default('belum selesai'); // belum selesai, selesai, dibatalkan
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jadwals');
    }
};
