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
        Schema::create('pakets', function (Blueprint $table) {
            $table->id();

            $table->string('nama_paket');
            $table->string('lokasi_foto'); //studio, outdor
            $table->longText('deskripsi_paket');
            $table->integer('harga_paket');
            $table->string('gambar_paket')->default('Image/default_foto.jpg');
            $table->longText('catatan_paket');
            $table->boolean('aktif_paket')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pakets');
    }
};
