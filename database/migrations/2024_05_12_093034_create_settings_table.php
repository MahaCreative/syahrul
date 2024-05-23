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
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('nama_studio');
            $table->string('tagline');
            $table->string('foto_studio');
            $table->string('alamat_studio');
            $table->string('telp_studio');
            $table->string('email_studio')->nullable();
            $table->string('facebook_studio')->nullable();
            $table->string('instagram_studio')->nullable();
            $table->string('link_facebook_studio')->nullable();
            $table->string('link_instagram_studio')->nullable();
            $table->longText('deskripsi_studio');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
