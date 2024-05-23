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
        Schema::create('pesanans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('kd_pesanan')->unique();
            $table->string('tgl_pesanan');
            $table->integer('uang_muka')->default(0);
            $table->integer('sisa_pembayaran')->default(0);
            $table->integer('total_pembayaran');
            $table->string('status_pembayaran')->default('belum lunas'); // belum lunas, lunas , pending,
            $table->string('status_pemesanan')->default('belum selesai'); // belum selesai, selesai, dibatalkan
            $table->string('aktif_payment')->default('tidak'); // ya, tidak
            $table->string('tanggal_pembayaran')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pesanans');
    }
};
