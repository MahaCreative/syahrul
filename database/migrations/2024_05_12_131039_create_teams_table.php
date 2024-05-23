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
        Schema::create('teams', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('posisi');
            $table->string('foto')->default('Image/default_profile.webp');
            $table->longText('deskripsi');
            $table->string('facebook_studio')->nullable();
            $table->string('instagram_studio')->nullable();
            $table->string('link_facebook_studio')->nullable();
            $table->string('link_instagram_studio')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teams');
    }
};
