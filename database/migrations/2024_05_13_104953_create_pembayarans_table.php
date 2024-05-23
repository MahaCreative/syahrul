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
        Schema::create('pembayarans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('pesanan_id')->constrained('pesanans')->onDelete('cascade');

            $table->string('status_pembayaran')->default('uang muka'); // uang muka, lunas
            $table->string('jenis_pembayaran'); // langsung, transfer
            $table->string('tgl_konfirmasi');
            $table->string('nama_petugas_penerima');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pembayarans');
    }
};
