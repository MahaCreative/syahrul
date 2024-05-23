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
        Schema::create('ulasan_studios', function (Blueprint $table) {
            $table->id();
            $table->string('foto')->default('Image/default_profile.webp');
            $table->string('nama');
            $table->longText('ulasan');
            $table->longText('rating');
            $table->string('kofirmasi_ulasan')->default('menunggu kofirmasi'); // menunggu konfirmasi, diterima, ditolak
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ulasan_studios');
    }
};
